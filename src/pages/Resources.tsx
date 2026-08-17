import { useState } from "react"
import { RESOURCES_DATA } from "../data/constants"

export default function ResourcesPage() {
  const [activeCat, setActiveCat] = useState("All")
  const [search, setSearch] = useState("")
  const cats = ["All", ...RESOURCES_DATA.map(r => r.cat)]

  const filtered = RESOURCES_DATA
    .filter(r => activeCat === "All" || r.cat === activeCat)
    .map(r => ({
      ...r,
      items: r.items.filter(i => i.title.toLowerCase().includes(search.toLowerCase())),
    }))
    .filter(r => r.items.length > 0)

  const badge = (type: string) => {
    if (type === "pdf") return { bg: "#dc262618", color: "#dc2626", label: "PDF" }
    if (type === "read") return { bg: "#059669" + "18", color: "#059669", label: "Read Online" }
    return { bg: "#1739a018", color: "#1739a0", label: "Link" }
  }

  return (
    <div>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg,#08152e,#1739a0)", padding: "5rem 1.5rem 3rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800, color: "#fff", marginBottom: 8 }}>Spiritual Resources</h1>
        <p style={{ color: "rgba(190,215,255,.8)", marginBottom: "2rem", fontSize: "1rem" }}>Holy Bible · Ellen G. White · Sabbath School · Church Manuals · Youth & Family Resources</p>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search resources..." style={{ width: "100%", border: "1.5px solid rgba(255,255,255,.2)", borderRadius: 14, padding: "13px 20px", fontSize: "0.95rem", outline: "none", fontFamily: "inherit", color: "#08152e", background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,.15)" }} />
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ background: "#fff", borderBottom: "1.5px solid #e0e8f5", padding: "0 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 4, overflowX: "auto" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setActiveCat(c)} style={{ padding: "0.875rem 1rem", fontWeight: 700, fontSize: "0.8rem", border: "none", cursor: "pointer", whiteSpace: "nowrap", background: "transparent", borderBottom: activeCat === c ? "3px solid #1739a0" : "3px solid transparent", color: activeCat === c ? "#1739a0" : "#4b607d" }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <section style={{ background: "#f4f6fb", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {filtered.map(r => (
            <div key={r.cat}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.25rem" }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: r.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>{r.icon}</div>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.25rem", color: "#08152e" }}>{r.cat}</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "0.875rem" }}>
                {r.items.map(item => {
                  const b = badge(item.type)
                  return (
                    <a key={item.title} href={item.url} target="_blank" rel="noreferrer" style={{ background: "#fff", borderRadius: 14, padding: "1rem 1.1rem", border: "1.5px solid #e0e8f5", textDecoration: "none", display: "flex", alignItems: "center", gap: 12, transition: "all .2s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 6px 20px ${r.color}18`; (e.currentTarget as HTMLAnchorElement).style.borderColor = r.color + "44"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)" }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "#e0e8f5"; (e.currentTarget as HTMLAnchorElement).style.transform = "none" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 9, background: r.color + "14", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1.1rem" }}>{r.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: "0.83rem", color: "#08152e", lineHeight: 1.35, marginBottom: 4 }}>{item.title}</div>
                        <span style={{ padding: "2px 8px", borderRadius: 999, fontSize: "0.68rem", fontWeight: 700, background: b.bg, color: b.color }}>{b.label}</span>
                      </div>
                      <span style={{ color: r.color, fontSize: "1rem", flexShrink: 0 }}>{item.type === "pdf" ? "⬇" : "→"}</span>
                    </a>
                  )
                })}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div style={{ textAlign: "center", padding: "3rem", color: "#4b607d" }}>No resources found for "{search}"</div>}
        </div>
      </section>
    </div>
  )
}
