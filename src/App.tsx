import { useState, useEffect, useRef, useCallback } from "react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ScrollButtons from "./components/ScrollButtons"
import AIAssistant from "./components/AIAssistant"
import LocationSection from "./components/LocationSection"
import AnnouncementsCenter from "./components/AnnouncementsCenter"
import AboutPage from "./pages/About"
import MinistriesPage from "./pages/Ministries"
import ResourcesPage from "./pages/Resources"
import PrayerPage from "./pages/Prayer"
import ContactPage from "./pages/Contact"
import AdminPage from "./pages/Admin"
import { HERO_SLIDES, TX, MINISTRIES_DATA, DONATE_GOALS, type Lang, type Page } from "./data/constants"

/* ─── SHARED HELPERS ─────────────────────────────────── */
function GoldBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "8px 0" }}>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,transparent,#c4880a66)" }} />
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#c4880a" }} />
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to left,transparent,#c4880a66)" }} />
    </div>
  )
}

function SectionHead({ title, sub, light = false }: { title: string; sub?: string; light?: boolean }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.65rem,3vw,2.4rem)", fontWeight: 700, color: light ? "#fff" : "#08152e", marginBottom: 8 }}>{title}</h2>
      <GoldBar />
      {sub && <p style={{ marginTop: 10, color: light ? "rgba(200,220,255,.82)" : "#4b607d", fontSize: "0.97rem" }}>{sub}</p>}
    </div>
  )
}

function PageBanner({ title, sub, img }: { title: string; sub: string; img?: string }) {
  return (
    <div style={{ position: "relative", height: 260, display: "flex", alignItems: "center", justifyContent: "center", background: "#08152e", overflow: "hidden" }}>
      {img && <img src={img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .22 }} />}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,#08152e,transparent)" }} />
      <div style={{ position: "relative", textAlign: "center", padding: "0 1.5rem" }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800, color: "#fff", marginBottom: 6 }}>{title}</h1>
        <p style={{ color: "#f0b22a", fontWeight: 600, fontSize: "0.9rem" }}>{sub}</p>
      </div>
    </div>
  )
}

/* ─── HERO SLIDER ────────────────────────────────────── */
function HeroSlider({ lang }: { lang: Lang }) {
  const tx = TX[lang]
  const [cur, setCur] = useState(0)
  const [fading, setFading] = useState(false)
  const touchX = useRef(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const go = useCallback((idx: number) => {
    setFading(true)
    setTimeout(() => { setCur((idx + HERO_SLIDES.length) % HERO_SLIDES.length); setFading(false) }, 360)
  }, [])

  useEffect(() => {
    timer.current = setInterval(() => go((cur + 1) % HERO_SLIDES.length), 5500)
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [cur, go])

  const s = HERO_SLIDES[cur]

  return (
    <section style={{ position: "relative", width: "100%", height: "100vh", minHeight: 600, overflow: "hidden" }}
      onTouchStart={e => { touchX.current = e.touches[0].clientX }}
      onTouchEnd={e => { const dx = e.changedTouches[0].clientX - touchX.current; if (Math.abs(dx) > 55) go(cur + (dx < 0 ? 1 : -1)) }}>

      {HERO_SLIDES.map((sl, i) => (
        <div key={i} style={{ position: "absolute", inset: 0, transition: "opacity .55s ease", opacity: i === cur && !fading ? 1 : 0 }}>
          <img src={sl.bg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
        </div>
      ))}

      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(110deg,rgba(8,21,46,.93) 0%,rgba(8,21,46,.55) 55%,rgba(8,21,46,.18) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(8,21,46,.75) 0%,transparent 60%)" }} />

      {/* Tag */}
      <div style={{ position: "absolute", top: "7rem", left: "clamp(1.5rem,5vw,5rem)", opacity: fading ? 0 : 1, transition: "opacity .4s" }}>
        <span style={{ display: "inline-block", padding: "4px 14px", fontSize: "0.7rem", fontFamily: "'JetBrains Mono',monospace", letterSpacing: ".14em", textTransform: "uppercase", color: "#f0b22a", background: "rgba(240,178,42,.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(240,178,42,.3)", borderRadius: 999 }}>
          {s.tag}
        </span>
      </div>

      {/* Content */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 clamp(1.5rem,5vw,5rem)", maxWidth: 860, opacity: fading ? 0 : 1, transition: "opacity .4s ease" }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.2rem,5.5vw,4.2rem)", fontWeight: 800, color: "#fff", lineHeight: 1.12, marginBottom: 16, textShadow: "0 2px 24px rgba(0,0,0,.35)" }}>{s.title}</h1>
        <p style={{ color: "rgba(190,215,255,.88)", fontSize: "clamp(.95rem,1.5vw,1.15rem)", marginBottom: 32, maxWidth: 480 }}>{s.sub}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <button style={{ padding: "13px 26px", background: "#c4880a", color: "#fff", fontWeight: 700, fontSize: "0.875rem", borderRadius: 11, border: "none", cursor: "pointer" }}>📺 {tx.watchLive}</button>
          <button style={{ padding: "12px 24px", background: "rgba(255,255,255,.1)", backdropFilter: "blur(8px)", color: "#fff", fontWeight: 600, fontSize: "0.875rem", borderRadius: 11, border: "1px solid rgba(255,255,255,.25)", cursor: "pointer" }}>🙏 {tx.prayerReq}</button>
          <button style={{ padding: "12px 24px", background: "#1739a0", color: "#fff", fontWeight: 600, fontSize: "0.875rem", borderRadius: 11, border: "none", cursor: "pointer" }}>💙 {tx.giveBtn}</button>
        </div>
      </div>

      {/* Arrows */}
      {(["‹", "›"] as const).map((ch, i) => (
        <button key={ch} onClick={() => go(cur + (i === 0 ? -1 : 1))} style={{ position: "absolute", top: "50%", [i === 0 ? "left" : "right"]: "1rem", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,.2)", color: "#fff", fontSize: "1.4rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {ch}
        </button>
      ))}

      {/* Dots */}
      <div style={{ position: "absolute", bottom: 88, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8 }}>
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => go(i)} style={{ height: 9, width: i === cur ? 28 : 9, borderRadius: 999, border: "none", cursor: "pointer", transition: "all .3s", background: i === cur ? "#f0b22a" : "rgba(255,255,255,.38)" }} />
        ))}
      </div>

      {/* Sabbath strip */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(8,21,46,.82)", backdropFilter: "blur(16px)", borderTop: "1px solid rgba(240,178,42,.18)", padding: "13px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "8px 20px", fontSize: "0.82rem", color: "rgba(190,215,255,.9)" }}>
        <span style={{ color: "#f0b22a", fontWeight: 700 }}>⛪ {tx.joinSabbath}</span>
        <span style={{ color: "rgba(255,255,255,.25)" }}>·</span>
        <span>{tx.sabbathSch}</span>
        <span style={{ color: "rgba(255,255,255,.25)" }}>·</span>
        <span>{tx.divineService}</span>
        <span style={{ color: "rgba(255,255,255,.25)" }}>·</span>
        <span>Murimi Business Center, Kariakoo</span>
      </div>
    </section>
  )
}

/* ─── ANNOUNCEMENT TICKER ────────────────────────────── */
const TICKER_MSGS = [
  "📢 OneVoice Evangelism Campaign begins August 23 — All members invited",
  "⛺ Pathfinder Camporee 2026 Registration OPEN — Closes Sept 1",
  "🎵 Hannanims Choir Concert — Saturday Sept 13, 5:00 PM · Main Sanctuary",
  "🏃 Health Ministry Marathon — Saturday Sept 6, 6:30 AM · Kariakoo Square",
  "📖 New Sabbath School Quarterly now available at the Welcome Desk",
]

function AnnouncementTicker({ lang }: { lang: Lang }) {
  const tx = TX[lang]
  return (
    <div style={{ background: "#060e1e", padding: "9px 0", overflow: "hidden", borderBottom: "1px solid rgba(240,178,42,.18)" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ flexShrink: 0, padding: "0 14px", fontFamily: "'JetBrains Mono',monospace", color: "#f0b22a", fontSize: "0.7rem", fontWeight: 600, letterSpacing: ".12em", borderRight: "1px solid rgba(240,178,42,.22)" }}>
          {tx.announceBanner ?? "📢 LIVE:"}
        </span>
        <div style={{ flex: 1, overflow: "hidden" }}>
          <span style={{ display: "inline-block", animation: "ticker 32s linear infinite", color: "rgba(190,215,255,.82)", fontSize: "0.82rem", paddingLeft: 24, whiteSpace: "nowrap" }}>
            {TICKER_MSGS.join("   •   ")}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─── STATS ──────────────────────────────────────────── */
function StatsRow({ lang }: { lang: Lang }) {
  const tx = TX[lang]
  return (
    <section style={{ background: "#08152e", padding: "3.5rem 1.5rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem" }}>
        {[
          { v: "2,400+", l: tx.members, i: "👥" },
          { v: "14",     l: tx.mins,    i: "🏛️" },
          { v: "38",     l: tx.years,   i: "📖" },
          { v: "850+",   l: tx.souls,   i: "✝️" },
        ].map(s => (
          <div key={s.l} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: 6 }}>{s.i}</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.5rem", fontWeight: 800, color: "#f0b22a", lineHeight: 1 }}>{s.v}</div>
            <div style={{ color: "rgba(190,215,255,.72)", fontSize: "0.82rem", marginTop: 6, fontWeight: 500 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── VERSE OF THE DAY ───────────────────────────────── */
function VerseOfDay() {
  return (
    <section style={{ background: "linear-gradient(135deg,#1739a0,#08152e)", padding: "3rem 1.5rem", textAlign: "center" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", color: "#f0b22a", fontSize: "0.7rem", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 12 }}>Verse of the Day</div>
        <blockquote style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.05rem,2.5vw,1.45rem)", fontStyle: "italic", color: "#fff", lineHeight: 1.7, marginBottom: 10 }}>
          "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."
        </blockquote>
        <cite style={{ color: "rgba(190,215,255,.7)", fontSize: "0.875rem", fontWeight: 500 }}>— Jeremiah 29:11 (NIV)</cite>
      </div>
    </section>
  )
}

/* ─── PASTOR ─────────────────────────────────────────── */
function PastorSection({ lang }: { lang: Lang }) {
  const tx = TX[lang]
  return (
    <section style={{ background: "#fff", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionHead title={tx.pastorMsg ?? "Pastor's Message"} />
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "3rem", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, border: "2px solid #f0b22a", borderRadius: 20, transform: "translate(10px,10px)", opacity: .28 }} />
            <img src="/src/imports/pastor-real.jpg" alt={tx.pastorName} style={{ position: "relative", width: 280, aspectRatio: "3/4", objectFit: "cover", objectPosition: "center top", borderRadius: 18, boxShadow: "0 20px 56px rgba(8,21,46,.2)", display: "block" }} />
            <div style={{ position: "absolute", bottom: -14, right: -8, background: "#08152e", color: "#fff", padding: "10px 18px", borderRadius: 12, boxShadow: "0 8px 24px rgba(8,21,46,.3)" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "0.82rem" }}>{tx.pastorName}</div>
              <div style={{ color: "#f0b22a", fontSize: "0.7rem", marginTop: 2 }}>{tx.pastorRole}</div>
            </div>
          </div>
          <div>
            <blockquote style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.15rem", fontStyle: "italic", color: "#1739a0", borderLeft: "4px solid #c4880a", paddingLeft: "1.2rem", marginBottom: "1.5rem", lineHeight: 1.7 }}>
              {tx.pastorQuote}
            </blockquote>
            <p style={{ color: "#4b607d", lineHeight: 1.9, fontSize: "1rem", marginBottom: "2rem" }}>{tx.pastorBio}</p>
            <button style={{ padding: "12px 28px", background: "#1739a0", color: "#fff", fontWeight: 700, borderRadius: 11, border: "none", cursor: "pointer", fontSize: "0.9rem" }}>
              Read Full Message →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── MINISTRIES PREVIEW ─────────────────────────────── */
function MinistriesPreview({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <section style={{ background: "#f4f6fb", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHead title="Our Ministries" sub="Serving every generation with purpose and passion" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: "0.875rem", marginBottom: "2rem" }}>
          {MINISTRIES_DATA.slice(0, 12).map(m => (
            <div key={m.slug} onClick={() => setPage("ministries")} style={{ background: "#fff", borderRadius: 15, padding: "1.1rem", border: "1.5px solid #e0e8f5", cursor: "pointer", transition: "all .2s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "0 8px 28px rgba(23,57,160,.1)"; el.style.borderColor = "#1739a0"; el.style.transform = "translateY(-2px)" }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "none"; el.style.borderColor = "#e0e8f5"; el.style.transform = "none" }}>
              <div style={{ fontSize: "1.7rem", marginBottom: 7 }}>{m.icon}</div>
              <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "#08152e", marginBottom: 3 }}>{m.name}</div>
              <p style={{ color: "#4b607d", fontSize: "0.72rem", lineHeight: 1.6 }}>{m.desc.split(".")[0]}.</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <button onClick={() => setPage("ministries")} style={{ padding: "12px 32px", background: "#1739a0", color: "#fff", fontWeight: 700, borderRadius: 11, border: "none", cursor: "pointer", fontSize: "0.9rem" }}>
            View All Ministries →
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─── EVENTS ─────────────────────────────────────────── */
const EVENTS_DATA = [
  { mon: "AUG", day: "23", title: "OneVoice Evangelism Campaign",     cat: "Evangelism", loc: "Kariakoo SDA Church Grounds", time: "6:00 PM", c: "#7c3aed" },
  { mon: "AUG", day: "30", title: "Pathfinder Camporee Registration", cat: "Youth",      loc: "Church Hall",                 time: "9:00 AM", c: "#1739a0" },
  { mon: "SEP", day: "06", title: "Health Ministry Marathon",         cat: "Health",     loc: "Kariakoo Square",             time: "6:30 AM", c: "#059669" },
  { mon: "SEP", day: "13", title: "Hannanims Choir Concert",          cat: "Music",      loc: "Main Sanctuary",              time: "5:00 PM", c: "#c4880a" },
  { mon: "SEP", day: "20", title: "Community Food Drive",             cat: "Community",  loc: "Murimi Business Center",      time: "8:00 AM", c: "#dc2626" },
  { mon: "OCT", day: "04", title: "Annual Camp Meeting",              cat: "Camp",       loc: "Morogoro Camp Site",          time: "All Day", c: "#0891b2" },
]

function EventsSection() {
  return (
    <section style={{ background: "#fff", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHead title="Upcoming Events" sub="Stay connected with what's happening at Kariakoo SDA" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1rem" }}>
          {EVENTS_DATA.map(ev => (
            <div key={ev.title} style={{ display: "flex", borderRadius: 15, overflow: "hidden", border: "1.5px solid #e0e8f5", background: "#f9fafd", cursor: "pointer", transition: "all .2s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "0 8px 28px rgba(23,57,160,.1)"; el.style.borderColor = "#c4880a" }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "none"; el.style.borderColor = "#e0e8f5" }}>
              <div style={{ width: 70, background: "#08152e", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0.875rem .5rem", flexShrink: 0 }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", color: "#f0b22a", fontSize: "0.62rem", fontWeight: 600, letterSpacing: ".1em" }}>{ev.mon}</div>
                <div style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: "2.1rem", fontWeight: 800, lineHeight: 1 }}>{ev.day}</div>
              </div>
              <div style={{ padding: "0.875rem 1rem", flex: 1 }}>
                <span style={{ display: "inline-block", padding: "2px 9px", borderRadius: 999, fontSize: "0.67rem", fontWeight: 700, background: ev.c + "18", color: ev.c, marginBottom: 5 }}>{ev.cat}</span>
                <div style={{ fontWeight: 700, fontSize: "0.87rem", color: "#08152e", lineHeight: 1.3, marginBottom: 5 }}>{ev.title}</div>
                <div style={{ color: "#4b607d", fontSize: "0.74rem", lineHeight: 1.7 }}>
                  <div>📍 {ev.loc}</div>
                  <div>🕐 {ev.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── SERMONS ────────────────────────────────────────── */
const SERMONS_DATA = [
  { title: "The Power of Sabbath Rest",       pastor: "Pastor Timothy Mwenda", date: "Aug 9, 2026",  dur: "52 min", views: "1,284", scripture: "Exodus 20:8–11", img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=480&h=270&fit=crop&auto=format" },
  { title: "Umoja wa Familia — Family Unity", pastor: "Elder James Kiprotich", date: "Aug 2, 2026",  dur: "44 min", views: "987",   scripture: "Ephesians 5:25",  img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=480&h=270&fit=crop&auto=format" },
  { title: "Hope in the Last Days",           pastor: "Pastor Timothy Mwenda", date: "Jul 26, 2026", dur: "58 min", views: "2,103", scripture: "Daniel 12:1–3",   img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=480&h=270&fit=crop&auto=format" },
]

function SermonsSection() {
  return (
    <section style={{ background: "#08152e", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHead title="Sermons & Media" light />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.25rem", marginBottom: "2.5rem" }}>
          {SERMONS_DATA.map(s => (
            <div key={s.title} style={{ borderRadius: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.04)", cursor: "pointer", transition: "all .22s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = "rgba(255,255,255,.08)"; el.style.borderColor = "rgba(240,178,42,.3)" }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = "rgba(255,255,255,.04)"; el.style.borderColor = "rgba(255,255,255,.08)" }}>
              <div style={{ position: "relative", aspectRatio: "16/9", background: "#0e2048", overflow: "hidden" }}>
                <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(8,21,46,.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(196,136,10,.9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", color: "#fff" }}>▶</div>
                </div>
                <div style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(0,0,0,.7)", color: "#fff", fontSize: "0.68rem", padding: "2px 8px", borderRadius: 6, fontFamily: "'JetBrains Mono',monospace" }}>{s.dur}</div>
              </div>
              <div style={{ padding: "1rem" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", color: "#f0b22a", fontSize: "0.7rem", marginBottom: 4 }}>{s.scripture}</div>
                <div style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontWeight: 700, fontSize: "1rem", marginBottom: 8, lineHeight: 1.3 }}>{s.title}</div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(190,215,255,.65)", fontSize: "0.75rem" }}>
                  <span>{s.pastor}</span><span>{s.views} views</span>
                </div>
                <div style={{ color: "rgba(190,215,255,.4)", fontSize: "0.72rem", marginTop: 2 }}>{s.date}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: "linear-gradient(135deg,#1739a0,#0e2048)", borderRadius: 20, padding: "2rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", border: "1px solid rgba(240,178,42,.18)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "0.75rem" }}>LIVE</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: "1.25rem", fontWeight: 700 }}>Watch Live Every Sabbath</div>
              <div style={{ color: "rgba(190,215,255,.7)", fontSize: "0.85rem" }}>Divine Service streams live at 11:00 AM on YouTube</div>
            </div>
          </div>
          <button style={{ padding: "12px 26px", background: "#f0b22a", color: "#08152e", fontWeight: 800, borderRadius: 12, border: "none", cursor: "pointer", fontSize: "0.9rem", flexShrink: 0 }}>
            📺 Subscribe on YouTube
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─── GALLERY PREVIEW ────────────────────────────────── */
const GALLERY_IMGS = [
  { src: "/src/imports/real-gallery-1.jpg", cap: "Hannanims Choir — OneVoice Concert" },
  { src: "/src/imports/real-gallery-2.jpg", cap: "Youth Choir — Blue & Gold Robes" },
  { src: "/src/imports/real-gallery-3.jpg", cap: "Disciples Choir — Women's Section" },
  { src: "/src/imports/real-gallery-4.jpg", cap: "Fellowship Joy" },
  { src: "/src/imports/real-gallery-5.jpg", cap: "Community Fellowship Feast" },
  { src: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=700&h=450&fit=crop&auto=format", cap: "Sabbath Worship Service" },
]

function GalleryPreview() {
  const [lb, setLb] = useState<string | null>(null)
  return (
    <section style={{ background: "#f4f6fb", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHead title="Gallery" sub="Moments of faith, community, worship and celebration" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: "0.75rem" }}>
          {GALLERY_IMGS.map((img, i) => (
            <div key={i} onClick={() => setLb(img.src)} style={{ position: "relative", borderRadius: 15, overflow: "hidden", aspectRatio: "4/3", background: "#e8edf5", cursor: "pointer" }}>
              <img src={img.src} alt={img.cap} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .45s" }}
                onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = "scale(1.07)" }}
                onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = "scale(1)" }} />
            </div>
          ))}
        </div>
        {lb && (
          <div onClick={() => setLb(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.92)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
            <img src={lb} alt="" style={{ maxWidth: "100%", maxHeight: "90vh", borderRadius: 14, objectFit: "contain" }} />
            <button style={{ position: "absolute", top: 18, right: 18, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,.12)", border: "none", color: "#fff", cursor: "pointer" }}>✕</button>
          </div>
        )}
      </div>
    </section>
  )
}

/* ─── DONATION ───────────────────────────────────────── */
function DonateSection() {
  const [active, setActive] = useState(0)
  const [amount, setAmount] = useState("")
  const presets = ["5,000", "10,000", "25,000", "50,000", "100,000"]
  const methods = [{ n: "M-Pesa", i: "📱" }, { n: "Airtel Money", i: "📲" }, { n: "Tigo Pesa", i: "💳" }, { n: "HaloPesa", i: "📳" }, { n: "Bank", i: "🏦" }]
  const fmtTZS = (n: number) => n >= 1_000_000 ? (n / 1_000_000).toFixed(1) + "M" : (n / 1000).toFixed(0) + "K"

  return (
    <section style={{ background: "linear-gradient(150deg,#08152e 0%,#0e2048 60%,#1739a0 100%)", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHead title="Support Our Mission" sub="Your generosity transforms lives across Dar es Salaam" light />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {DONATE_GOALS.map((g, i) => {
              const pct = Math.round((g.raised / g.goal) * 100)
              return (
                <div key={g.name} onClick={() => setActive(i)} style={{ borderRadius: 15, padding: "1.1rem 1.2rem", cursor: "pointer", transition: "all .2s", background: active === i ? "rgba(255,255,255,.15)" : "rgba(255,255,255,.05)", border: `1.5px solid ${active === i ? "rgba(240,178,42,.5)" : "rgba(255,255,255,.08)"}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: "1.4rem" }}>{g.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>{g.name}</div>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", color: "rgba(190,215,255,.6)", fontSize: "0.68rem" }}>TZS {fmtTZS(g.raised)} of {fmtTZS(g.goal)}</div>
                    </div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", color: pct >= 70 ? "#f0b22a" : "rgba(190,215,255,.7)", fontWeight: 700, fontSize: "0.85rem" }}>{pct}%</div>
                  </div>
                  <div style={{ height: 6, background: "rgba(255,255,255,.1)", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 999, background: "linear-gradient(to right,#c4880a,#f0b22a)", width: `${pct}%`, transition: "width .6s" }} />
                  </div>
                </div>
              )
            })}
          </div>

          <div style={{ background: "#fff", borderRadius: 22, padding: "2rem", boxShadow: "0 24px 64px rgba(8,21,46,.3)" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.15rem", fontWeight: 700, color: "#08152e", marginBottom: 4 }}>Donate to {DONATE_GOALS[active].name}</div>
            <div style={{ color: "#4b607d", fontSize: "0.8rem", marginBottom: "1.25rem" }}>All gifts go directly to Kariakoo SDA Church, Dar es Salaam</div>
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#08152e", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 7 }}>Quick Amount (TZS)</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {presets.map(p => (
                  <button key={p} onClick={() => setAmount(p)} style={{ padding: "7px 13px", borderRadius: 9, fontSize: "0.8rem", fontWeight: 600, border: `1.5px solid ${amount === p ? "#1739a0" : "#d5dff0"}`, background: amount === p ? "#1739a0" : "#f4f6fb", color: amount === p ? "#fff" : "#08152e", cursor: "pointer" }}>{p}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#08152e", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 7 }}>Custom Amount (TZS)</div>
              <input type="text" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount..." style={{ width: "100%", border: "1.5px solid #d5dff0", borderRadius: 11, padding: "11px 14px", fontSize: "1.05rem", fontFamily: "'JetBrains Mono',monospace", color: "#08152e", outline: "none" }} />
            </div>
            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#08152e", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 7 }}>Payment Method</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 6 }}>
                {methods.map(m => (
                  <button key={m.n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "8px 4px", borderRadius: 9, border: "1.5px solid #d5dff0", background: "#f9fafd", cursor: "pointer", fontSize: "0.65rem", fontWeight: 600, color: "#08152e" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = "#1739a0"; el.style.background = "#eef2ff" }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = "#d5dff0"; el.style.background = "#f9fafd" }}>
                    <span style={{ fontSize: "1.3rem" }}>{m.i}</span>
                    <span style={{ textAlign: "center", lineHeight: 1.2 }}>{m.n}</span>
                  </button>
                ))}
              </div>
            </div>
            <button style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg,#1739a0,#2650cc)", color: "#fff", fontWeight: 800, fontSize: "1rem", borderRadius: 14, border: "none", cursor: "pointer" }}>
              💙 Give Now — TZS {amount || "0"}
            </button>
            <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#4b607d", marginTop: 10 }}>🔒 Secure · God bless your generosity</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── YOUTH PAGE ─────────────────────────────────────── */
function YouthPage() {
  const depts = [
    { n: "Adventurers", ages: "Ages 6–9",   img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&h=320&fit=crop&auto=format", desc: "Character building, crafts and faith foundations for our youngest members.", count: 42 },
    { n: "Pathfinders", ages: "Ages 10–15", img: "https://images.unsplash.com/photo-1559494017-3d50b3ff3fc1?w=500&h=320&fit=crop&auto=format", desc: "Adventure, camping, honour badges and Christ-centred discipleship.", count: 78 },
    { n: "Ambassadors", ages: "Ages 16–21", img: "/src/imports/real-gallery-3.jpg", desc: "Leadership development, evangelism training and community impact.", count: 65 },
    { n: "Adult Youth",  ages: "Ages 22–35", img: "/src/imports/real-gallery-4.jpg", desc: "Young professionals and families growing in faith, purpose and community.", count: 120 },
  ]
  return (
    <div>
      <PageBanner title="Youth Department" sub="Raising the Next Generation for Christ" img="/src/imports/real-gallery-2.jpg" />
      <section style={{ background: "#f4f6fb", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1.25rem", marginBottom: "2.5rem" }}>
            {depts.map(d => (
              <div key={d.n} style={{ background: "#fff", borderRadius: 18, overflow: "hidden", border: "1.5px solid #e0e8f5", transition: "all .22s", cursor: "pointer" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "0 12px 36px rgba(23,57,160,.1)"; el.style.transform = "translateY(-3px)" }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "none"; el.style.transform = "none" }}>
                <div style={{ aspectRatio: "16/9", overflow: "hidden", background: "#e8edf5" }}>
                  <img src={d.img} alt={d.n} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "1.1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1rem", color: "#08152e" }}>{d.n}</div>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem", background: "#f0f4fb", color: "#4b607d", padding: "2px 9px", borderRadius: 999 }}>{d.count}</span>
                  </div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#c4880a", marginBottom: 6 }}>{d.ages}</div>
                  <p style={{ color: "#4b607d", fontSize: "0.8rem", lineHeight: 1.7 }}>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "linear-gradient(135deg,#08152e,#1739a0)", borderRadius: 20, padding: "2.5rem", textAlign: "center", color: "#fff" }}>
            <div style={{ fontSize: "2rem", marginBottom: 10 }}>⛺</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", fontWeight: 800, marginBottom: 8 }}>Camporee 2026 Registration Open</div>
            <p style={{ color: "rgba(190,215,255,.8)", maxWidth: 480, margin: "0 auto 1.5rem" }}>Join hundreds of Pathfinders from across Tanzania for an unforgettable experience. Register before September 1, 2026.</p>
            <button style={{ padding: "13px 32px", background: "#f0b22a", color: "#08152e", fontWeight: 800, borderRadius: 14, border: "none", cursor: "pointer", fontSize: "0.95rem" }}>Register for Camporee 2026</button>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ─── CHOIR PAGE ─────────────────────────────────────── */
function ChoirPage() {
  const choirs = [
    { n: "The Hannanims Choir", img: "/src/imports/real-gallery-1.jpg", desc: "Our flagship choir since 2009. Blending contemporary gospel with rich Swahili worship at Kariakoo and across Tanzania.", count: 32, year: "2009" },
    { n: "The Disciples Choir", img: "/src/imports/real-gallery-3.jpg", desc: "Powerful harmonies carrying the message of salvation — known for elegant navy and lime uniforms.", count: 24, year: "2011" },
    { n: "TUCASA DMI Choir",    img: "/src/imports/real-gallery-2.jpg", desc: "Student ministry choir in royal blue robes connecting campus faith with congregational worship.", count: 18, year: "2015" },
    { n: "Children's Choir",    img: "https://images.unsplash.com/photo-1488509082528-cefbba5ad692?w=600&h=380&fit=crop&auto=format", desc: "Nurturing the next generation of worshippers. Joyful voices praising God every Sabbath morning.", count: 28, year: "2003" },
  ]
  return (
    <div>
      <PageBanner title="Music Ministry" sub="Lifting Kariakoo in Praise — Four Voices, One Mission" img="/src/imports/real-gallery-1.jpg" />
      <section style={{ background: "#f4f6fb", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1.5rem" }}>
          {choirs.map(c => (
            <div key={c.n} style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1.5px solid #e0e8f5", transition: "all .22s", cursor: "pointer" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "0 14px 40px rgba(23,57,160,.12)"; el.style.transform = "translateY(-4px)" }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "none"; el.style.transform = "none" }}>
              <div style={{ aspectRatio: "16/9", overflow: "hidden", background: "#e8edf5" }}>
                <img src={c.img} alt={c.n} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              </div>
              <div style={{ padding: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.05rem", color: "#08152e", flex: 1 }}>{c.n}</div>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem", background: "#f0f4fb", color: "#4b607d", padding: "2px 9px", borderRadius: 999, flexShrink: 0 }}>{c.count}</span>
                </div>
                <div style={{ fontSize: "0.72rem", color: "#c4880a", fontWeight: 600, marginBottom: 8 }}>Est. {c.year}</div>
                <p style={{ color: "#4b607d", fontSize: "0.8rem", lineHeight: 1.7, marginBottom: "1rem" }}>{c.desc}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ padding: "7px 14px", background: "#1739a0", color: "#fff", borderRadius: 9, border: "none", cursor: "pointer", fontSize: "0.76rem", fontWeight: 700 }}>🎵 Listen</button>
                  <button style={{ padding: "7px 14px", background: "#f0f4fb", color: "#08152e", borderRadius: 9, border: "none", cursor: "pointer", fontSize: "0.76rem", fontWeight: 600 }}>📸 Gallery</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

/* ─── HOME PAGE ──────────────────────────────────────── */
function HomePage({ lang, setPage }: { lang: Lang; setPage: (p: Page) => void }) {
  return (
    <>
      <HeroSlider lang={lang} />
      <AnnouncementTicker lang={lang} />
      <StatsRow lang={lang} />
      <VerseOfDay />
      <PastorSection lang={lang} />
      <MinistriesPreview setPage={setPage} />
      <EventsSection />
      <SermonsSection />
      <AnnouncementsCenter />
      <GalleryPreview />
      <LocationSection />
      <DonateSection />
    </>
  )
}

/* ─── STANDALONE PAGES ───────────────────────────────── */
function SermonsPage() { return <><PageBanner title="Sermons & Media" sub="The Word Proclaimed — Watch · Listen · Share" /><SermonsSection /></> }
function EventsPage()  { return <><PageBanner title="Events & Programs" sub="Stay Connected with What's Happening" /><EventsSection /></> }
function DonatePage()  { return <><PageBanner title="Give & Donate" sub="Your Generosity Transforms Lives in Dar es Salaam" /><DonateSection /></> }

/* ─── APP ────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState<Page>("home")
  const [lang, setLang] = useState<Lang>("en")
  const [showAI, setShowAI] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [page])

  const renderPage = () => {
    switch (page) {
      case "about":      return <AboutPage />
      case "ministries": return <MinistriesPage />
      case "youth":      return <YouthPage />
      case "choir":      return <ChoirPage />
      case "sermons":    return <SermonsPage />
      case "events":     return <EventsPage />
      case "prayer":     return <PrayerPage />
      case "resources":  return <ResourcesPage />
      case "donate":     return <DonatePage />
      case "contact":    return <ContactPage />
      case "admin":      return <AdminPage />
      default:           return <HomePage lang={lang} setPage={setPage} />
    }
  }

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Outfit',sans-serif" }}>
      <Navbar page={page} setPage={setPage} lang={lang} setLang={setLang} />

      <main style={{ paddingTop: page !== "home" ? 64 : 0 }}>
        {renderPage()}
      </main>

      {page !== "admin" && <Footer setPage={setPage} />}

      <ScrollButtons />

      {/* AI FAB */}
      <button
        onClick={() => setShowAI(v => !v)}
        style={{ position: "fixed", bottom: 24, right: 16, width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,#1739a0,#08152e)", border: "2px solid rgba(240,178,42,.5)", color: "#fff", fontSize: "1.5rem", boxShadow: "0 8px 24px rgba(8,21,46,.4)", cursor: "pointer", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .2s" }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)" }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)" }}>
        {showAI ? "✕" : "🤖"}
      </button>

      {showAI && <AIAssistant onClose={() => setShowAI(false)} lang={lang} setPage={setPage} />}

      {/* Subtle admin access */}
      <button onClick={() => setPage("admin")} style={{ position: "fixed", bottom: 24, left: 16, width: 36, height: 36, borderRadius: "50%", background: "rgba(8,21,46,.4)", border: "1px solid rgba(255,255,255,.08)", color: "rgba(255,255,255,.2)", fontSize: "0.65rem", cursor: "pointer", zIndex: 100 }} title="Admin">⚙</button>

      <style>{`
        @keyframes ticker { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @media(max-width:680px) {
          .donate-grid { grid-template-columns:1fr !important; }
        }
        @media(max-width:480px) {
          .stats-grid { grid-template-columns:1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}
