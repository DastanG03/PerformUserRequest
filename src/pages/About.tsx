import { useState } from "react"
import { BELIEFS } from "../data/beliefs"

function PageHero({ title, sub, img }: { title: string; sub: string; img?: string }) {
  return (
    <div style={{ position: "relative", height: 280, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#08152e" }}>
      {img && <img src={img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .22 }} />}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,#08152e,transparent)" }} />
      <div style={{ position: "relative", textAlign: "center", padding: "0 1.5rem" }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800, color: "#fff", marginBottom: 8 }}>{title}</h1>
        <p style={{ color: "#f0b22a", fontWeight: 600, fontSize: "0.9rem" }}>{sub}</p>
      </div>
    </div>
  )
}

function BeliefAccordion() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {BELIEFS.map(b => {
        const isOpen = open === b.num
        return (
          <div key={b.num} style={{ border: `1.5px solid ${isOpen ? "#1739a0" : "#e0e8f5"}`, borderRadius: 14, overflow: "hidden", transition: "border .2s" }}>
            <button
              onClick={() => setOpen(isOpen ? null : b.num)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "1rem 1.25rem", background: isOpen ? "#eef2ff" : "#fff", border: "none", cursor: "pointer", textAlign: "left", transition: "background .2s" }}
            >
              <span style={{ width: 34, height: 34, borderRadius: "50%", background: isOpen ? "#1739a0" : "#f0f4fb", color: isOpen ? "#fff" : "#1739a0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.8rem", flexShrink: 0, fontFamily: "'JetBrains Mono',monospace" }}>
                {String(b.num).padStart(2, "0")}
              </span>
              <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#08152e", flex: 1 }}>{b.title}</span>
              <span style={{ color: "#1739a0", fontWeight: 700, fontSize: "1.1rem", flexShrink: 0, transition: "transform .25s", transform: isOpen ? "rotate(180deg)" : "none" }}>⌄</span>
            </button>
            {isOpen && (
              <div style={{ padding: "0 1.25rem 1.1rem 4.5rem", background: "#fff", borderTop: "1px solid #e8edf5" }}>
                <p style={{ color: "#4b607d", fontSize: "0.875rem", lineHeight: 1.85, paddingTop: "0.875rem" }}>{b.text}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

const LEADERSHIP = [
  { name: "Pastor Timothy Mwenda", role: "Senior Pastor", img: "/src/imports/pastor-real.jpg" },
  { name: "Elder James Kiprotich", role: "Church Elder & Sabbath School Supt.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format" },
  { name: "Elder Peter Makene", role: "Church Board Chairman", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&auto=format" },
  { name: "Deaconess Sarah Omondi", role: "Head Deaconess / Women's Ministry", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=300&fit=crop&auto=format" },
  { name: "Bro. Daniel Musyoka", role: "Head of Music Ministry", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&auto=format" },
  { name: "Sis. Esther Kariuki", role: "Women's Ministry Leader", img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&h=300&fit=crop&auto=format" },
]

const TIMELINE = [
  { year: "1988", ev: "Kariakoo SDA Church founded by pioneering families in Kariakoo, Dar es Salaam" },
  { year: "1995", ev: "Membership surpasses 500 · First dedicated building constructed at Murimi Business Center" },
  { year: "2002", ev: "Youth departments officially commissioned — Pathfinders & Adventurers begin" },
  { year: "2009", ev: "Hannanims Choir formed — begins transforming Dar es Salaam gospel music scene" },
  { year: "2015", ev: "Congregation reaches 1,500 · Community services program expanded citywide" },
  { year: "2020", ev: "Online worship launched — livestreams reach 10,000+ viewers every Sabbath" },
  { year: "2023", ev: "OneVoice Evangelism Campaign — 312 souls baptised across Kariakoo district" },
  { year: "2026", ev: "Digital platform launched, serving 2,400+ members across Dar es Salaam" },
]

export default function AboutPage() {
  const [tab, setTab] = useState<"overview" | "beliefs" | "leadership" | "history">("overview")
  const tabs: { k: typeof tab; label: string }[] = [
    { k: "overview", label: "Mission & Vision" },
    { k: "beliefs", label: "28 Fundamental Beliefs" },
    { k: "leadership", label: "Leadership" },
    { k: "history", label: "Church History" },
  ]

  return (
    <div>
      <PageHero title="About Our Church" sub="Faith · Heritage · Community · Mission since 1988" img="https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200&h=400&fit=crop&auto=format" />

      {/* Tab bar */}
      <div style={{ background: "#fff", borderBottom: "1.5px solid #e0e8f5", position: "sticky", top: 64, zIndex: 10 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 1.5rem", display: "flex", gap: 4, overflowX: "auto" }}>
          {tabs.map(t => (
            <button key={t.k} onClick={() => setTab(t.k)} style={{ padding: "1rem 1.25rem", fontWeight: 700, fontSize: "0.83rem", border: "none", cursor: "pointer", whiteSpace: "nowrap", background: "transparent", borderBottom: tab === t.k ? "3px solid #1739a0" : "3px solid transparent", color: tab === t.k ? "#1739a0" : "#4b607d", transition: "all .15s" }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "3.5rem 1.5rem" }}>

        {tab === "overview" && (
          <div>
            {/* Pastor message */}
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "2.5rem", alignItems: "center", marginBottom: "3.5rem", background: "#f4f6fb", borderRadius: 20, padding: "2rem", border: "1.5px solid #e0e8f5" }}>
              <img src="/src/imports/pastor-real.jpg" alt="Pastor Timothy Mwenda" style={{ width: 140, height: 170, objectFit: "cover", objectPosition: "center top", borderRadius: 14, boxShadow: "0 8px 28px rgba(8,21,46,.15)" }} />
              <div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", color: "#f0b22a", fontSize: "0.7rem", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8 }}>Pastor's Message</div>
                <blockquote style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.05rem", fontStyle: "italic", color: "#1739a0", borderLeft: "3px solid #c4880a", paddingLeft: "1rem", marginBottom: "0.875rem", lineHeight: 1.65 }}>
                  "Come to me, all who are weary and burdened, and I will give you rest." — Matthew 11:28
                </blockquote>
                <p style={{ color: "#4b607d", fontSize: "0.88rem", lineHeight: 1.8 }}>Beloved congregation — Kariakoo SDA Church is more than a building. It is a family called to worship God, love one another, and transform this great city of Dar es Salaam. Whether you are joining us for the first time or have walked with us for decades — you are family.</p>
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#08152e" }}>Pastor Timothy Mwenda</div>
                  <div style={{ color: "#c4880a", fontSize: "0.75rem" }}>Senior Pastor, Kariakoo SDA Church</div>
                </div>
              </div>
            </div>

            {/* MVV cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1.25rem", marginBottom: "3rem" }}>
              {[
                { icon: "🎯", t: "Our Mission", d: "To proclaim the everlasting gospel of Jesus Christ and prepare a people for His soon return through worship, fellowship, discipleship, ministry and evangelism across Dar es Salaam and Tanzania." },
                { icon: "👁️", t: "Our Vision", d: "A thriving, Spirit-filled community where every person in Kariakoo knows Jesus Christ — transforming families, neighbourhoods, and the nation of Tanzania." },
                { icon: "✝️", t: "Core Values", d: "Scripture-based faith · Inclusive community · Servant leadership · Excellence in worship · Integrity in all things · Compassion for the vulnerable" },
              ].map(c => (
                <div key={c.t} style={{ background: "#fff", borderRadius: 18, padding: "1.5rem", border: "1.5px solid #e0e8f5" }}>
                  <div style={{ fontSize: "2rem", marginBottom: 10 }}>{c.icon}</div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.05rem", color: "#08152e", marginBottom: 8 }}>{c.t}</div>
                  <p style={{ color: "#4b607d", fontSize: "0.85rem", lineHeight: 1.8 }}>{c.d}</p>
                </div>
              ))}
            </div>

            {/* Org structure visual */}
            <div style={{ background: "#08152e", borderRadius: 20, padding: "2rem", textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.5rem" }}>Church Organizational Structure</div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
                  {[
                    { label: "Church Board", bg: "#f0b22a", color: "#08152e" },
                    { label: "Senior Pastor", bg: "#1739a0", color: "#fff" },
                    { label: "Elders · Deacons · Deaconesses", bg: "#1739a044", color: "#fff" },
                    { label: "Department Leaders", bg: "#1739a022", color: "rgba(190,215,255,.9)" },
                    { label: "Ministries & Members", bg: "#ffffff0f", color: "rgba(190,215,255,.7)" },
                  ].map((n, i) => (
                    <div key={i} style={{ background: n.bg, color: n.color, padding: "8px 32px", borderRadius: 9, fontWeight: 600, fontSize: "0.82rem", width: "clamp(220px,50vw,380px)", textAlign: "center" }}>{n.label}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "beliefs" && (
          <div>
            <div style={{ background: "linear-gradient(135deg,#1739a0,#08152e)", borderRadius: 18, padding: "1.75rem", marginBottom: "2rem", textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: "1.5rem", fontWeight: 700, marginBottom: 6 }}>28 Fundamental Beliefs</div>
              <p style={{ color: "rgba(190,215,255,.8)", fontSize: "0.88rem", maxWidth: 560, margin: "0 auto" }}>The Seventh-day Adventist Church holds these beliefs as authoritative expressions of Scripture. Click each belief to expand and read the full statement.</p>
            </div>
            <BeliefAccordion />
          </div>
        )}

        {tab === "leadership" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "1.5rem" }}>
              {LEADERSHIP.map(l => (
                <div key={l.name} style={{ background: "#fff", borderRadius: 18, overflow: "hidden", border: "1.5px solid #e0e8f5", transition: "all .2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 32px rgba(23,57,160,.12)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.transform = "none" }}>
                  <div style={{ height: 180, overflow: "hidden", background: "#f0f4fb" }}>
                    <img src={l.img} alt={l.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                  </div>
                  <div style={{ padding: "1rem" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#08152e" }}>{l.name}</div>
                    <div style={{ color: "#c4880a", fontSize: "0.75rem", marginTop: 3, fontWeight: 600 }}>{l.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "history" && (
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom,#1739a0,#c4880a)" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {TIMELINE.map(item => (
                <div key={item.year} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", paddingLeft: 56, position: "relative" }}>
                  <div style={{ position: "absolute", left: 12, top: 10, width: 18, height: 18, borderRadius: "50%", background: "#f0b22a", border: "3px solid #fff", boxShadow: "0 0 0 2px #c4880a" }} />
                  <div style={{ background: "#fff", border: "1.5px solid #e0e8f5", borderRadius: 14, padding: "0.875rem 1.125rem", flex: 1 }}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", color: "#1739a0", fontWeight: 700, fontSize: "0.8rem", marginBottom: 4 }}>{item.year}</div>
                    <p style={{ color: "#4b607d", fontSize: "0.875rem", lineHeight: 1.7 }}>{item.ev}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
