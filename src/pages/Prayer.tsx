import { useState, useEffect } from "react"
import { supabase, type PrayerRow } from "../lib/supabase"

const CAT_COLORS: Record<string, string> = {
  Health: "#059669", Employment: "#1739a0", Family: "#7c3aed",
  Testimony: "#c4880a", Healing: "#dc2626", Guidance: "#0891b2", General: "#4b607d", Thanksgiving: "#f0b22a",
}
const PRAYER_CATS = ["Health", "Employment", "Family", "Healing", "Guidance", "Testimony", "Thanksgiving", "General"]

const SEED_PRAYERS: PrayerRow[] = [
  { id: "1", name: "Grace M.", email: "", request_text: "Please pray for my mother who is having surgery next week. We trust completely in God's healing power.", is_public: true, is_anonymous: false, status: "praying", admin_reply: null, pray_count: 47, created_at: new Date(Date.now() - 7200000).toISOString() },
  { id: "2", name: "Anonymous", email: "", request_text: "Please pray for employment. Six months without work. God's timing is always perfect — I stand firm in faith.", is_public: true, is_anonymous: true, status: "praying", admin_reply: null, pray_count: 83, created_at: new Date(Date.now() - 18000000).toISOString() },
  { id: "3", name: "Ruth N.", email: "", request_text: "Thanksgiving! My son passed Form 4 exams with Division One distinction. God is faithful, always and forever! Hallelujah!", is_public: true, is_anonymous: false, status: "answered", admin_reply: "Praise God! We celebrate this testimony with you. — Pastoral Team", pray_count: 201, created_at: new Date(Date.now() - 172800000).toISOString() },
  { id: "4", name: "Samuel T.", email: "", request_text: "Requesting prayer for complete healing from diabetes. The doctor's report was discouraging but God's word says otherwise.", is_public: true, is_anonymous: false, status: "pending", admin_reply: null, pray_count: 62, created_at: new Date(Date.now() - 259200000).toISOString() },
]

export default function PrayerPage() {
  const [prayers, setPrayers] = useState<PrayerRow[]>([])
  const [loading, setLoading] = useState(true)
  const [prayed, setPrayed] = useState<Set<string>>(new Set())
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState<"all" | "answered">("all")

  const [form, setForm] = useState({ name: "", email: "", category: "General", request: "", is_public: true, is_anonymous: false })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const load = async () => {
    const { data, error } = await supabase
      .from("prayer_requests")
      .select("*")
      .eq("is_public", true)
      .order("created_at", { ascending: false })
    if (error || !data || data.length === 0) setPrayers(SEED_PRAYERS)
    else setPrayers(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const submitPrayer = async () => {
    if (!form.request.trim()) return
    setSubmitting(true)
    const payload = {
      name: form.is_anonymous ? "Anonymous" : (form.name || "Anonymous"),
      email: form.email,
      request_text: form.request,
      is_public: form.is_public,
      is_anonymous: form.is_anonymous,
      status: "pending",
      pray_count: 0,
    }
    const { error } = await supabase.from("prayer_requests").insert(payload)
    if (!error) {
      setSubmitted(true)
      setForm({ name: "", email: "", category: "General", request: "", is_public: true, is_anonymous: false })
      await load()
    }
    setSubmitting(false)
  }

  const togglePray = async (p: PrayerRow) => {
    const already = prayed.has(p.id)
    const newSet = new Set(prayed)
    already ? newSet.delete(p.id) : newSet.add(p.id)
    setPrayed(newSet)
    const delta = already ? -1 : 1
    await supabase.from("prayer_requests").update({ pray_count: p.pray_count + delta }).eq("id", p.id)
    setPrayers(prev => prev.map(pr => pr.id === p.id ? { ...pr, pray_count: pr.pray_count + delta } : pr))
  }

  const displayed = filter === "answered" ? prayers.filter(p => p.status === "answered") : prayers

  return (
    <div>
      <div style={{ position: "relative", height: 260, display: "flex", alignItems: "center", justifyContent: "center", background: "#08152e", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&h=400&fit=crop&auto=format" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .18 }} />
        <div style={{ position: "relative", textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800, color: "#fff", marginBottom: 6 }}>Prayer Wall</h1>
          <p style={{ color: "#f0b22a", fontWeight: 600 }}>Standing Together in Faith and Intercession</p>
        </div>
      </div>

      <section style={{ background: "#f4f6fb", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Submit button + filters */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "2rem" }}>
            <div style={{ display: "flex", gap: 8 }}>
              {(["all", "answered"] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 18px", borderRadius: 9, fontWeight: 700, fontSize: "0.82rem", border: "none", cursor: "pointer", background: filter === f ? "#1739a0" : "#fff", color: filter === f ? "#fff" : "#4b607d", boxShadow: filter === f ? "none" : "0 2px 8px rgba(8,21,46,.07)" }}>
                  {f === "all" ? "All Requests" : "✅ Answered Prayers"}
                </button>
              ))}
            </div>
            <button onClick={() => setShowForm(v => !v)} style={{ padding: "10px 22px", background: "#c4880a", color: "#fff", fontWeight: 700, borderRadius: 10, border: "none", cursor: "pointer", fontSize: "0.875rem" }}>
              🙏 {showForm ? "Close Form" : "Submit Prayer Request"}
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <div style={{ background: "#fff", borderRadius: 20, padding: "2rem", marginBottom: "2rem", border: "1.5px solid #e0e8f5", boxShadow: "0 8px 32px rgba(8,21,46,.08)" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <div style={{ fontSize: "3rem", marginBottom: 12 }}>🙏</div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontWeight: 700, color: "#08152e", marginBottom: 8 }}>Prayer Request Received</div>
                  <p style={{ color: "#4b607d", marginBottom: "1.5rem" }}>Thank you for trusting us with your prayer request. Our prayer team will intercede for you. God bless you!</p>
                  <button onClick={() => setSubmitted(false)} style={{ padding: "10px 24px", background: "#1739a0", color: "#fff", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700 }}>Submit Another</button>
                </div>
              ) : (
                <>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.1rem", color: "#08152e", marginBottom: "1.5rem" }}>Submit a Prayer Request</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#08152e", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>Your Name</label>
                      <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full Name" disabled={form.is_anonymous} style={{ width: "100%", border: "1.5px solid #d5dff0", borderRadius: 10, padding: "10px 13px", fontSize: "0.875rem", outline: "none", fontFamily: "inherit", color: "#08152e", opacity: form.is_anonymous ? .5 : 1 }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#08152e", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>Category</label>
                      <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={{ width: "100%", border: "1.5px solid #d5dff0", borderRadius: 10, padding: "10px 13px", fontSize: "0.875rem", outline: "none", fontFamily: "inherit", color: "#08152e" }}>
                        {PRAYER_CATS.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#08152e", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>Prayer Request *</label>
                    <textarea value={form.request} onChange={e => setForm(f => ({ ...f, request: e.target.value }))} placeholder="Share your prayer request with the Kariakoo SDA family..." style={{ width: "100%", border: "1.5px solid #d5dff0", borderRadius: 10, padding: "10px 13px", fontSize: "0.875rem", outline: "none", fontFamily: "inherit", color: "#08152e", resize: "none", minHeight: 110 }} />
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "1.5rem" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "#4b607d", cursor: "pointer" }}>
                      <input type="checkbox" checked={form.is_anonymous} onChange={e => setForm(f => ({ ...f, is_anonymous: e.target.checked }))} /> Keep anonymous
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "#4b607d", cursor: "pointer" }}>
                      <input type="checkbox" checked={!form.is_public} onChange={e => setForm(f => ({ ...f, is_public: !e.target.checked }))} /> Private (only pastoral team sees this)
                    </label>
                  </div>
                  <button onClick={submitPrayer} disabled={submitting || !form.request.trim()} style={{ padding: "12px 28px", background: submitting ? "#999" : "#1739a0", color: "#fff", fontWeight: 700, borderRadius: 11, border: "none", cursor: submitting ? "not-allowed" : "pointer", fontSize: "0.9rem" }}>
                    {submitting ? "Submitting…" : "Submit Prayer Request 🙏"}
                  </button>
                </>
              )}
            </div>
          )}

          {/* Prayer cards */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "#4b607d" }}>Loading prayer requests…</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1rem" }}>
              {displayed.map(p => {
                const catColor = CAT_COLORS.General
                const timeAgo = Math.floor((Date.now() - new Date(p.created_at).getTime()) / 3600000)
                const timeStr = timeAgo < 1 ? "Just now" : timeAgo < 24 ? `${timeAgo}h ago` : `${Math.floor(timeAgo / 24)}d ago`

                return (
                  <div key={p.id} style={{ background: "#fff", borderRadius: 18, padding: "1.25rem", border: "1.5px solid #e0e8f5", transition: "box-shadow .2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 28px rgba(8,21,46,.08)" }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1739a0", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem", flexShrink: 0 }}>
                          {p.is_anonymous ? "?" : p.name[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#08152e" }}>{p.is_anonymous ? "Anonymous" : p.name}</div>
                          <div style={{ color: "#4b607d", fontSize: "0.72rem" }}>{timeStr}</div>
                        </div>
                      </div>
                      {p.status === "answered" && (
                        <span style={{ padding: "3px 9px", borderRadius: 999, fontSize: "0.68rem", fontWeight: 700, background: "#05966918", color: "#059669" }}>✅ Answered</span>
                      )}
                    </div>
                    <p style={{ color: "#4b607d", fontSize: "0.83rem", lineHeight: 1.75, marginBottom: 12 }}>{p.request_text}</p>
                    {p.admin_reply && (
                      <div style={{ background: "#f0f4fb", borderRadius: 10, padding: "0.625rem 0.875rem", marginBottom: 12, borderLeft: "3px solid #1739a0" }}>
                        <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#1739a0", marginBottom: 2 }}>Pastoral Response</div>
                        <p style={{ fontSize: "0.8rem", color: "#4b607d" }}>{p.admin_reply}</p>
                      </div>
                    )}
                    <button onClick={() => togglePray(p)} style={{ padding: "6px 16px", borderRadius: 999, fontSize: "0.76rem", fontWeight: 700, border: "none", cursor: "pointer", transition: "all .2s", background: prayed.has(p.id) ? "#1739a0" : "#f0f4fb", color: prayed.has(p.id) ? "#fff" : "#1739a0" }}>
                      🙏 {prayed.has(p.id) ? "Praying" : "Pray"} · {p.pray_count + (prayed.has(p.id) ? 0 : 0)}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
