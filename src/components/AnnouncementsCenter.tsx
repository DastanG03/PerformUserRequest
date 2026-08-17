import { useState, useEffect } from "react"
import { supabase, type AnnouncementRow } from "../lib/supabase"
import { ANNOUNCEMENTS_SEED } from "../data/constants"

const CAT_COLORS: Record<string, string> = {
  Evangelism: "#7c3aed", Youth: "#1739a0", Music: "#c4880a",
  Worship: "#059669", General: "#4b607d", Community: "#dc2626", Health: "#0891b2",
}

export default function AnnouncementsCenter() {
  const [items, setItems] = useState<AnnouncementRow[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("All")
  const cats = ["All", "General", "Evangelism", "Youth", "Music", "Worship", "Community", "Health"]

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })

      if (error || !data || data.length === 0) {
        // Use seed data if table empty / not yet created
        setItems(ANNOUNCEMENTS_SEED.map((s, i) => ({
          id: String(i), title: s.title, body: s.body, category: s.category,
          is_active: true, scheduled_at: null,
          created_at: new Date(Date.now() - i * 86400000).toISOString()
        })))
      } else {
        setItems(data)
      }
      setLoading(false)
    }
    load()
  }, [])

  const filtered = filter === "All" ? items : items.filter(i => i.category === filter)

  return (
    <section style={{ background: "#fff", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.7rem,3vw,2.4rem)", fontWeight: 700, color: "#08152e", marginBottom: 8 }}>Announcements</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", margin: "8px 0" }}>
            <div style={{ height: 1, width: 60, background: "linear-gradient(to right,transparent,#c4880a66)" }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#c4880a" }} />
            <div style={{ height: 1, width: 60, background: "linear-gradient(to left,transparent,#c4880a66)" }} />
          </div>
          <p style={{ color: "#4b607d" }}>Church notices, upcoming programs and important updates</p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center", marginBottom: "2rem" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{ padding: "6px 15px", borderRadius: 999, fontSize: "0.8rem", fontWeight: 600, border: "none", cursor: "pointer", transition: "all .15s", background: filter === c ? "#1739a0" : "#f0f4fb", color: filter === c ? "#fff" : "#4b607d" }}>
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#4b607d" }}>Loading announcements…</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1rem" }}>
            {filtered.map(item => {
              const color = CAT_COLORS[item.category] ?? "#4b607d"
              const daysAgo = Math.floor((Date.now() - new Date(item.created_at).getTime()) / 86400000)
              return (
                <div key={item.id} style={{ background: "#f9fafd", borderRadius: 16, padding: "1.25rem", border: `1.5px solid ${color}22`, transition: "all .2s", cursor: "default" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 28px ${color}18`; (e.currentTarget as HTMLDivElement).style.borderColor = color + "55" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.borderColor = color + "22" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ padding: "3px 10px", borderRadius: 999, fontSize: "0.7rem", fontWeight: 700, background: color + "18", color }}>{item.category}</span>
                    <span style={{ fontSize: "0.7rem", color: "#4b607d" }}>{daysAgo === 0 ? "Today" : daysAgo === 1 ? "Yesterday" : `${daysAgo}d ago`}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#08152e", marginBottom: 6, lineHeight: 1.35 }}>📢 {item.title}</div>
                  <p style={{ color: "#4b607d", fontSize: "0.83rem", lineHeight: 1.7 }}>{item.body}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
