import { useState, useEffect } from "react"
import { supabase, type AnnouncementRow, type PrayerRow, type ContactRow } from "../lib/supabase"

const ADMIN_PIN = "kariakoo2026"

const SQL_SETUP = `-- Run this once in your Supabase SQL Editor to create all tables:

create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  category text not null default 'General',
  is_active boolean not null default true,
  scheduled_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists prayer_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  request_text text not null,
  is_public boolean not null default true,
  is_anonymous boolean not null default false,
  status text not null default 'pending',
  admin_reply text,
  pray_count integer not null default 0,
  created_at timestamptz default now()
);

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  form_type text not null default 'general',
  created_at timestamptz default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date date not null,
  event_time text,
  location text,
  category text not null default 'General',
  image_url text,
  created_at timestamptz default now()
);

-- RLS policies (allow public reads + inserts):
alter table announcements enable row level security;
alter table prayer_requests enable row level security;
alter table contact_submissions enable row level security;
alter table events enable row level security;

create policy "anon read active" on announcements for select using (is_active=true);
create policy "anon insert" on announcements for insert with check (true);
create policy "anon update" on announcements for update using (true);
create policy "anon delete" on announcements for delete using (true);

create policy "anon read public prayers" on prayer_requests for select using (is_public=true);
create policy "anon insert prayer" on prayer_requests for insert with check (true);
create policy "anon update prayer" on prayer_requests for update using (true);

create policy "anon insert contact" on contact_submissions for insert with check (true);
create policy "anon read contact" on contact_submissions for select using (true);

create policy "anon read events" on events for select using (true);
create policy "anon insert events" on events for insert with check (true);
create policy "anon update events" on events for update using (true);
create policy "anon delete events" on events for delete using (true);`

type AdminTab = "dashboard" | "announcements" | "prayers" | "contacts" | "setup"

export default function AdminPage() {
  const [pin, setPin] = useState("")
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState<AdminTab>("dashboard")
  const [announcements, setAnnouncements] = useState<AnnouncementRow[]>([])
  const [prayers, setPrayers] = useState<PrayerRow[]>([])
  const [contacts, setContacts] = useState<ContactRow[]>([])
  const [copied, setCopied] = useState(false)

  // New announcement form
  const [aForm, setAForm] = useState({ title: "", body: "", category: "General" })
  const [aSaving, setASaving] = useState(false)

  const [replyId, setReplyId] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")

  useEffect(() => {
    if (!authed) return
    loadAll()
  }, [authed])

  const loadAll = async () => {
    const [a, p, c] = await Promise.all([
      supabase.from("announcements").select("*").order("created_at", { ascending: false }),
      supabase.from("prayer_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
    ])
    if (a.data) setAnnouncements(a.data)
    if (p.data) setPrayers(p.data)
    if (c.data) setContacts(c.data)
  }

  const saveAnnouncement = async () => {
    if (!aForm.title || !aForm.body) return
    setASaving(true)
    await supabase.from("announcements").insert({ title: aForm.title, body: aForm.body, category: aForm.category, is_active: true })
    setAForm({ title: "", body: "", category: "General" })
    await loadAll()
    setASaving(false)
  }

  const toggleAnnouncement = async (id: string, current: boolean) => {
    await supabase.from("announcements").update({ is_active: !current }).eq("id", id)
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, is_active: !current } : a))
  }

  const deleteAnnouncement = async (id: string) => {
    await supabase.from("announcements").delete().eq("id", id)
    setAnnouncements(prev => prev.filter(a => a.id !== id))
  }

  const updatePrayerStatus = async (id: string, status: string) => {
    await supabase.from("prayer_requests").update({ status }).eq("id", id)
    setPrayers(prev => prev.map(p => p.id === id ? { ...p, status: status as PrayerRow["status"] } : p))
  }

  const submitReply = async () => {
    if (!replyId || !replyText.trim()) return
    await supabase.from("prayer_requests").update({ admin_reply: replyText, status: "answered" }).eq("id", replyId)
    setPrayers(prev => prev.map(p => p.id === replyId ? { ...p, admin_reply: replyText, status: "answered" } : p))
    setReplyId(null)
    setReplyText("")
  }

  const copySQL = () => { navigator.clipboard.writeText(SQL_SETUP); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  const stat = (label: string, val: number, icon: string, color: string) => (
    <div style={{ background: "#fff", borderRadius: 16, padding: "1.25rem", border: `1.5px solid ${color}22`, flex: 1, minWidth: 120 }}>
      <div style={{ fontSize: "1.6rem", marginBottom: 4 }}>{icon}</div>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 800, color }}>{val}</div>
      <div style={{ color: "#4b607d", fontSize: "0.78rem", marginTop: 2 }}>{label}</div>
    </div>
  )

  const tabBtn = (k: AdminTab, label: string) => (
    <button key={k} onClick={() => setTab(k)} style={{ padding: "9px 16px", borderRadius: 9, fontWeight: 700, fontSize: "0.82rem", border: "none", cursor: "pointer", background: tab === k ? "#1739a0" : "#f0f4fb", color: tab === k ? "#fff" : "#4b607d" }}>
      {label}
    </button>
  )

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#f4f6fb", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: "2.5rem", width: "100%", maxWidth: 380, boxShadow: "0 20px 60px rgba(8,21,46,.1)", border: "1.5px solid #e0e8f5", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "#1739a0", margin: "0 auto 1rem", display: "flex", alignItems: "center", justifyContent: "center", color: "#f0b22a", fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: "1.4rem" }}>K</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontWeight: 700, color: "#08152e", marginBottom: 4 }}>Admin Dashboard</div>
          <div style={{ color: "#4b607d", fontSize: "0.85rem", marginBottom: "1.5rem" }}>Kariakoo SDA Church · Restricted Access</div>
          <input type="password" value={pin} onChange={e => setPin(e.target.value)} onKeyDown={e => e.key === "Enter" && pin === ADMIN_PIN && setAuthed(true)} placeholder="Enter admin password" style={{ width: "100%", border: "1.5px solid #d5dff0", borderRadius: 12, padding: "12px 16px", fontSize: "0.9rem", outline: "none", fontFamily: "inherit", color: "#08152e", marginBottom: "1rem", textAlign: "center" }} />
          <button onClick={() => { if (pin === ADMIN_PIN) setAuthed(true) }} style={{ width: "100%", padding: "12px", background: "#1739a0", color: "#fff", fontWeight: 700, borderRadius: 12, border: "none", cursor: "pointer", fontSize: "0.9rem" }}>
            Access Dashboard
          </button>
          <p style={{ color: "#4b607d", fontSize: "0.72rem", marginTop: "1rem" }}>Authorised church administrators only</p>
          <p style={{ color: "#c4880a", fontSize: "0.7rem", marginTop: 4, fontFamily: "'JetBrains Mono',monospace" }}>Demo PIN: kariakoo2026</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: "#f4f6fb", minHeight: "100vh" }}>
      {/* Admin header */}
      <div style={{ background: "#08152e", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#1739a0", display: "flex", alignItems: "center", justifyContent: "center", color: "#f0b22a", fontFamily: "'Playfair Display',serif", fontWeight: 800 }}>K</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>Admin Dashboard</div>
            <div style={{ color: "#f0b22a", fontSize: "0.68rem" }}>Kariakoo SDA Church</div>
          </div>
        </div>
        <button onClick={() => setAuthed(false)} style={{ padding: "7px 14px", background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)", color: "#fff", borderRadius: 9, cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}>Sign Out</button>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "2rem" }}>
          {tabBtn("dashboard", "📊 Dashboard")}
          {tabBtn("announcements", "📢 Announcements")}
          {tabBtn("prayers", "🙏 Prayer Requests")}
          {tabBtn("contacts", "📬 Contact Submissions")}
          {tabBtn("setup", "⚙️ DB Setup")}
        </div>

        {/* Dashboard */}
        {tab === "dashboard" && (
          <div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
              {stat("Announcements", announcements.length, "📢", "#1739a0")}
              {stat("Active Announcements", announcements.filter(a => a.is_active).length, "✅", "#059669")}
              {stat("Prayer Requests", prayers.length, "🙏", "#7c3aed")}
              {stat("Answered Prayers", prayers.filter(p => p.status === "answered").length, "✝️", "#c4880a")}
              {stat("Contact Messages", contacts.length, "📬", "#0891b2")}
            </div>
            <div style={{ background: "#fff", borderRadius: 18, padding: "1.5rem", border: "1.5px solid #e0e8f5" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.1rem", color: "#08152e", marginBottom: "1rem" }}>Recent Activity</div>
              {[...announcements.slice(0, 3).map(a => ({ type: "Announcement", text: a.title, time: a.created_at })),
                ...prayers.slice(0, 3).map(p => ({ type: "Prayer", text: p.is_anonymous ? "Anonymous prayer request" : `${p.name}: ${p.request_text.slice(0, 50)}…`, time: p.created_at })),
                ...contacts.slice(0, 2).map(c => ({ type: "Contact", text: `${c.name}: ${c.subject || c.form_type}`, time: c.created_at }))
              ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 8).map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "0.625rem 0", borderBottom: "1px solid #f0f4fb" }}>
                  <span style={{ padding: "2px 8px", borderRadius: 999, fontSize: "0.68rem", fontWeight: 700, background: item.type === "Announcement" ? "#1739a018" : item.type === "Prayer" ? "#7c3aed18" : "#0891b218", color: item.type === "Announcement" ? "#1739a0" : item.type === "Prayer" ? "#7c3aed" : "#0891b2" }}>{item.type}</span>
                  <span style={{ fontSize: "0.82rem", color: "#4b607d", flex: 1 }}>{item.text}</span>
                  <span style={{ fontSize: "0.72rem", color: "#4b607d", fontFamily: "'JetBrains Mono',monospace", flexShrink: 0 }}>{new Date(item.time).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Announcements */}
        {tab === "announcements" && (
          <div>
            <div style={{ background: "#fff", borderRadius: 18, padding: "1.5rem", border: "1.5px solid #e0e8f5", marginBottom: "1.5rem" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.1rem", color: "#08152e", marginBottom: "1rem" }}>Create New Announcement</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1rem", marginBottom: "0.875rem" }}>
                <input value={aForm.title} onChange={e => setAForm(f => ({ ...f, title: e.target.value }))} placeholder="Announcement title..." style={{ border: "1.5px solid #d5dff0", borderRadius: 10, padding: "10px 13px", fontSize: "0.875rem", outline: "none", fontFamily: "inherit", color: "#08152e" }} />
                <select value={aForm.category} onChange={e => setAForm(f => ({ ...f, category: e.target.value }))} style={{ border: "1.5px solid #d5dff0", borderRadius: 10, padding: "10px 13px", fontSize: "0.875rem", outline: "none", fontFamily: "inherit", color: "#08152e" }}>
                  {["General", "Evangelism", "Youth", "Music", "Worship", "Community", "Health"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <textarea value={aForm.body} onChange={e => setAForm(f => ({ ...f, body: e.target.value }))} placeholder="Announcement body..." style={{ width: "100%", border: "1.5px solid #d5dff0", borderRadius: 10, padding: "10px 13px", fontSize: "0.875rem", outline: "none", fontFamily: "inherit", color: "#08152e", resize: "none", minHeight: 80, marginBottom: "0.875rem" }} />
              <button onClick={saveAnnouncement} disabled={aSaving} style={{ padding: "10px 24px", background: "#1739a0", color: "#fff", fontWeight: 700, borderRadius: 10, border: "none", cursor: "pointer" }}>
                {aSaving ? "Saving…" : "📢 Publish Announcement"}
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {announcements.map(a => (
                <div key={a.id} style={{ background: "#fff", borderRadius: 14, padding: "1rem 1.25rem", border: "1.5px solid #e0e8f5", display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#08152e" }}>{a.title}</div>
                      <span style={{ padding: "2px 8px", borderRadius: 999, fontSize: "0.68rem", fontWeight: 700, background: a.is_active ? "#05966918" : "#dc262618", color: a.is_active ? "#059669" : "#dc2626" }}>{a.is_active ? "Active" : "Hidden"}</span>
                      <span style={{ padding: "2px 8px", borderRadius: 999, fontSize: "0.68rem", background: "#f0f4fb", color: "#4b607d" }}>{a.category}</span>
                    </div>
                    <p style={{ color: "#4b607d", fontSize: "0.82rem" }}>{a.body}</p>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <button onClick={() => toggleAnnouncement(a.id, a.is_active)} style={{ padding: "6px 12px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 700, border: "none", cursor: "pointer", background: a.is_active ? "#dc262618" : "#05966918", color: a.is_active ? "#dc2626" : "#059669" }}>
                      {a.is_active ? "Hide" : "Show"}
                    </button>
                    <button onClick={() => deleteAnnouncement(a.id)} style={{ padding: "6px 12px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 700, border: "none", cursor: "pointer", background: "#dc262618", color: "#dc2626" }}>Delete</button>
                  </div>
                </div>
              ))}
              {announcements.length === 0 && <div style={{ textAlign: "center", padding: "3rem", color: "#4b607d" }}>No announcements yet. Create one above.</div>}
            </div>
          </div>
        )}

        {/* Prayer requests */}
        {tab === "prayers" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {prayers.map(p => (
              <div key={p.id} style={{ background: "#fff", borderRadius: 16, padding: "1.25rem", border: "1.5px solid #e0e8f5" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#08152e" }}>{p.is_anonymous ? "Anonymous" : p.name} {p.email && `· ${p.email}`}</div>
                    <div style={{ color: "#4b607d", fontSize: "0.72rem" }}>{new Date(p.created_at).toLocaleString()}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {["pending", "praying", "answered"].map(s => (
                      <button key={s} onClick={() => updatePrayerStatus(p.id, s)} style={{ padding: "4px 10px", borderRadius: 999, fontSize: "0.68rem", fontWeight: 700, border: "none", cursor: "pointer", background: p.status === s ? "#1739a0" : "#f0f4fb", color: p.status === s ? "#fff" : "#4b607d" }}>{s}</button>
                    ))}
                  </div>
                </div>
                <p style={{ color: "#4b607d", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: 10 }}>{p.request_text}</p>
                {p.admin_reply && <div style={{ background: "#f0f4fb", borderRadius: 9, padding: "0.625rem 0.875rem", marginBottom: 10, borderLeft: "3px solid #1739a0", fontSize: "0.82rem", color: "#4b607d" }}>Reply: {p.admin_reply}</div>}
                {replyId === p.id ? (
                  <div style={{ display: "flex", gap: 8 }}>
                    <input value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Type your reply..." style={{ flex: 1, border: "1.5px solid #d5dff0", borderRadius: 9, padding: "8px 12px", fontSize: "0.82rem", outline: "none", fontFamily: "inherit", color: "#08152e" }} />
                    <button onClick={submitReply} style={{ padding: "8px 16px", background: "#1739a0", color: "#fff", borderRadius: 9, border: "none", cursor: "pointer", fontWeight: 700, fontSize: "0.8rem" }}>Send</button>
                    <button onClick={() => setReplyId(null)} style={{ padding: "8px 12px", background: "#f0f4fb", color: "#4b607d", borderRadius: 9, border: "none", cursor: "pointer", fontSize: "0.8rem" }}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => { setReplyId(p.id); setReplyText(p.admin_reply ?? "") }} style={{ padding: "6px 14px", background: "#eef2ff", color: "#1739a0", borderRadius: 9, border: "none", cursor: "pointer", fontSize: "0.78rem", fontWeight: 700 }}>
                    {p.admin_reply ? "Edit Reply" : "Reply"}
                  </button>
                )}
              </div>
            ))}
            {prayers.length === 0 && <div style={{ textAlign: "center", padding: "3rem", color: "#4b607d" }}>No prayer requests yet.</div>}
          </div>
        )}

        {/* Contacts */}
        {tab === "contacts" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {contacts.map(c => (
              <div key={c.id} style={{ background: "#fff", borderRadius: 14, padding: "1.25rem", border: "1.5px solid #e0e8f5" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#08152e" }}>{c.name}</div>
                  <span style={{ padding: "2px 8px", borderRadius: 999, fontSize: "0.68rem", fontWeight: 700, background: "#1739a018", color: "#1739a0" }}>{c.form_type}</span>
                  <span style={{ fontSize: "0.72rem", color: "#4b607d", marginLeft: "auto" }}>{new Date(c.created_at).toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.8rem", color: "#4b607d", marginBottom: 8 }}>
                  <span>✉️ {c.email}</span>
                  {c.phone && <span>📞 {c.phone}</span>}
                </div>
                {c.subject && <div style={{ fontWeight: 600, fontSize: "0.82rem", color: "#08152e", marginBottom: 4 }}>{c.subject}</div>}
                <p style={{ color: "#4b607d", fontSize: "0.83rem", lineHeight: 1.7 }}>{c.message}</p>
              </div>
            ))}
            {contacts.length === 0 && <div style={{ textAlign: "center", padding: "3rem", color: "#4b607d" }}>No contact submissions yet.</div>}
          </div>
        )}

        {/* DB Setup */}
        {tab === "setup" && (
          <div style={{ background: "#fff", borderRadius: 18, padding: "1.75rem", border: "1.5px solid #e0e8f5" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.2rem", color: "#08152e", marginBottom: 8 }}>Database Setup</div>
            <p style={{ color: "#4b607d", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Run the SQL below once in your <strong>Supabase SQL Editor</strong> to create all required tables with Row Level Security policies.</p>
            <div style={{ position: "relative" }}>
              <pre style={{ background: "#060e1e", color: "#a8d8b0", fontSize: "0.75rem", padding: "1.25rem", borderRadius: 12, overflow: "auto", maxHeight: 400, lineHeight: 1.6, fontFamily: "'JetBrains Mono',monospace" }}>
                {SQL_SETUP}
              </pre>
              <button onClick={copySQL} style={{ position: "absolute", top: 10, right: 10, padding: "5px 12px", background: copied ? "#059669" : "#1739a0", color: "#fff", borderRadius: 7, border: "none", cursor: "pointer", fontSize: "0.75rem", fontWeight: 700 }}>
                {copied ? "✅ Copied!" : "Copy SQL"}
              </button>
            </div>
            <div style={{ marginTop: "1.5rem", background: "#f0f4fb", borderRadius: 12, padding: "1rem", fontSize: "0.82rem", color: "#4b607d" }}>
              <strong style={{ color: "#08152e" }}>Steps:</strong>
              <ol style={{ marginTop: 6, paddingLeft: "1.25rem", lineHeight: 2 }}>
                <li>Open your Supabase project dashboard</li>
                <li>Go to <strong>SQL Editor</strong></li>
                <li>Paste the SQL above and click <strong>Run</strong></li>
                <li>All tables will be created with proper security policies</li>
                <li>Return here and use the tabs above to manage content</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
