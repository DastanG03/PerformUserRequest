import { useState } from "react"
import { MINISTRIES_DATA } from "../data/constants"

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.92)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <img src={src} alt="" style={{ maxWidth: "100%", maxHeight: "90vh", borderRadius: 14, objectFit: "contain" }} />
      <button onClick={onClose} style={{ position: "absolute", top: 18, right: 18, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,.12)", border: "none", color: "#fff", fontSize: "1.1rem", cursor: "pointer" }}>✕</button>
    </div>
  )
}

function MinistryCard({ m }: { m: typeof MINISTRIES_DATA[0] }) {
  const [expanded, setExpanded] = useState(false)
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1.5px solid #e0e8f5", transition: "all .22s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 36px rgba(23,57,160,.1)"; (e.currentTarget as HTMLDivElement).style.borderColor = "#b8c8e8" }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.borderColor = "#e0e8f5" }}>
      <div style={{ aspectRatio: "16/9", overflow: "hidden", background: "#f0f4fb" }}>
        <img src={m.img} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .45s" }}
          onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = "scale(1.06)" }}
          onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = "scale(1)" }} />
      </div>
      <div style={{ padding: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: "1.6rem" }}>{m.icon}</span>
          <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1rem", color: "#08152e" }}>{m.name}</div>
        </div>
        <p style={{ color: "#4b607d", fontSize: "0.82rem", lineHeight: 1.7, marginBottom: "0.875rem" }}>{m.desc}</p>

        <div style={{ fontSize: "0.75rem", color: "#4b607d", marginBottom: "0.875rem" }}>
          <span style={{ fontWeight: 700, color: "#08152e" }}>Leader: </span>{m.leaders}
        </div>

        {expanded && (
          <div style={{ borderTop: "1px solid #e8edf5", paddingTop: "0.875rem" }}>
            <div style={{ fontWeight: 700, fontSize: "0.78rem", color: "#08152e", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 8 }}>Activities</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: "1rem" }}>
              {m.activities.map(a => (
                <span key={a} style={{ padding: "3px 10px", borderRadius: 999, fontSize: "0.72rem", fontWeight: 600, background: "#eef2ff", color: "#1739a0" }}>{a}</span>
              ))}
            </div>

            {m.gallery.length > 0 && (
              <>
                <div style={{ fontWeight: 700, fontSize: "0.78rem", color: "#08152e", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 8 }}>Gallery</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(80px,1fr))", gap: 6 }}>
                  {m.gallery.map((g, i) => (
                    <div key={i} onClick={() => setLightbox(g)} style={{ aspectRatio: "1", borderRadius: 9, overflow: "hidden", cursor: "pointer", background: "#f0f4fb" }}>
                      <img src={g} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <button onClick={() => setExpanded(v => !v)} style={{ marginTop: "0.75rem", width: "100%", padding: "8px", borderRadius: 10, background: expanded ? "#f0f4fb" : "#1739a0", color: expanded ? "#1739a0" : "#fff", fontWeight: 700, fontSize: "0.78rem", border: "none", cursor: "pointer", transition: "all .15s" }}>
          {expanded ? "Show Less ↑" : "View Activities & Gallery ↓"}
        </button>
      </div>
      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  )
}

export default function MinistriesPage() {
  const [search, setSearch] = useState("")
  const filtered = MINISTRIES_DATA.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.desc.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div style={{ position: "relative", height: 260, display: "flex", alignItems: "center", justifyContent: "center", background: "#08152e", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=400&fit=crop&auto=format" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .2 }} />
        <div style={{ position: "relative", textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800, color: "#fff", marginBottom: 6 }}>Our Ministries</h1>
          <p style={{ color: "#f0b22a", fontWeight: 600 }}>Serving Every Generation with Purpose and Passion</p>
        </div>
      </div>

      <section style={{ background: "#f4f6fb", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ maxWidth: 400, margin: "0 auto 2.5rem" }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search ministries..." style={{ width: "100%", border: "1.5px solid #d5dff0", borderRadius: 12, padding: "11px 16px", fontSize: "0.9rem", outline: "none", fontFamily: "inherit", color: "#08152e", background: "#fff" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.25rem" }}>
            {filtered.map(m => <MinistryCard key={m.slug} m={m} />)}
          </div>
          {filtered.length === 0 && <div style={{ textAlign: "center", padding: "3rem", color: "#4b607d" }}>No ministries found for "{search}"</div>}
        </div>
      </section>
    </div>
  )
}
