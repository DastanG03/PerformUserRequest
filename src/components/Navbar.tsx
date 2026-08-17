import { useState, useEffect } from "react"
import { NAV_ITEMS, TX, type Lang, type Page } from "../data/constants"

interface Props {
  page: Page
  setPage: (p: Page) => void
  lang: Lang
  setLang: (l: Lang) => void
}

export default function Navbar({ page, setPage, lang, setLang }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const tx = TX[lang]

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const navigate = (p: Page) => { setPage(p); setOpen(false) }

  const solid = scrolled || page !== "home"

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: solid ? "rgba(8,21,46,.97)" : "transparent",
      backdropFilter: solid ? "blur(18px)" : "none",
      borderBottom: solid ? "1px solid rgba(240,178,42,.12)" : "none",
      transition: "background .3s,border .3s",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.25rem", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <button onClick={() => navigate("home")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>
          <div style={{ width: 40, height: 40, borderRadius: 11, background: "linear-gradient(135deg,#1739a0,#08152e)", border: "1.5px solid rgba(240,178,42,.4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f0b22a", fontWeight: 800, fontSize: "1.1rem", fontFamily: "'Playfair Display',serif" }}>K</div>
          <div style={{ display: window.innerWidth < 500 ? "none" : "block" }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.82rem", lineHeight: 1.2 }}>Kariakoo SDA Church</div>
            <div style={{ color: "#f0b22a", fontSize: "0.64rem", letterSpacing: ".06em" }}>Dar es Salaam · Tanzania</div>
          </div>
        </button>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 1, overflow: "hidden" }} className="nav-links">
          {NAV_ITEMS.slice(0, 8).map(n => (
            <button key={n.page} onClick={() => navigate(n.page)} style={{
              padding: "6px 9px", borderRadius: 8, fontSize: "0.78rem", fontWeight: 600,
              border: "none", cursor: "pointer", transition: "all .15s", whiteSpace: "nowrap",
              background: page === n.page ? "rgba(240,178,42,.16)" : "transparent",
              color: page === n.page ? "#f0b22a" : "rgba(210,230,255,.85)",
            }}>{n.label}</button>
          ))}
          <button onClick={() => navigate("resources")} style={{ padding: "6px 9px", borderRadius: 8, fontSize: "0.78rem", fontWeight: 600, border: "none", cursor: "pointer", background: page === "resources" ? "rgba(240,178,42,.16)" : "transparent", color: page === "resources" ? "#f0b22a" : "rgba(210,230,255,.85)" }}>Resources</button>
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <button onClick={() => setLang(lang === "en" ? "sw" : "en")} style={{ padding: "6px 11px", borderRadius: 8, border: "1px solid rgba(255,255,255,.18)", background: "rgba(255,255,255,.07)", color: "#fff", fontSize: "0.73rem", fontWeight: 600, cursor: "pointer" }} className="lang-toggle">
            {lang === "en" ? "🇹🇿 SW" : "🇬🇧 EN"}
          </button>
          <button onClick={() => navigate("donate")} style={{ padding: "8px 16px", borderRadius: 8, background: "#c4880a", color: "#fff", fontWeight: 700, fontSize: "0.78rem", border: "none", cursor: "pointer" }} className="give-btn">
            Give
          </button>
          <button onClick={() => setOpen(v => !v)} style={{ width: 40, height: 40, borderRadius: 9, background: "rgba(255,255,255,.07)", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5 }} className="burger">
            {[0, 1, 2].map(i => (
              <span key={i} style={{ display: "block", width: 20, height: 2, background: "#fff", borderRadius: 2, transition: "all .25s", transform: open && i === 0 ? "rotate(45deg) translate(5px,5px)" : open && i === 1 ? "scaleX(0)" : open && i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "none", opacity: open && i === 1 ? 0 : 1 }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "rgba(8,21,46,.98)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,.07)", padding: "1rem 1.25rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "0.75rem" }}>
            {NAV_ITEMS.map(n => (
              <button key={n.page} onClick={() => navigate(n.page)} style={{ padding: "10px 14px", borderRadius: 11, fontSize: "0.85rem", fontWeight: 600, border: "none", cursor: "pointer", textAlign: "left", background: page === n.page ? "rgba(240,178,42,.18)" : "rgba(255,255,255,.05)", color: page === n.page ? "#f0b22a" : "rgba(210,230,255,.8)" }}>
                {n.label}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, paddingTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,.07)" }}>
            <button onClick={() => { setLang(lang === "en" ? "sw" : "en") }} style={{ flex: 1, padding: 10, borderRadius: 11, border: "1px solid rgba(255,255,255,.15)", background: "transparent", color: "#fff", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer" }}>
              {lang === "en" ? "🇹🇿 Swahili" : "🇬🇧 English"}
            </button>
            <button onClick={() => navigate("donate")} style={{ flex: 1, padding: 10, borderRadius: 11, background: "#c4880a", color: "#fff", fontWeight: 700, fontSize: "0.82rem", border: "none", cursor: "pointer" }}>
              💙 Give / Donate
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:960px){.nav-links{display:none !important;}}
        @media(max-width:600px){.give-btn{display:none !important;} .lang-toggle{display:none !important;}}
        @media(min-width:961px){.burger{display:none !important;}}
      `}</style>
    </nav>
  )
}
