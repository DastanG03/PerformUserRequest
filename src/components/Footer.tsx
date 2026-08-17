import { SOCIAL_LINKS, NAV_ITEMS, type Page } from "../data/constants"

interface Props { setPage: (p: Page) => void }

const SocialIcon = ({ name, color, url }: { name: string; color: string; url: string }) => {
  const icons: Record<string, string> = {
    facebook: "f", youtube: "▶", instagram: "◉", x: "𝕏", tiktok: "♪", whatsapp: "💬"
  }
  return (
    <a href={url} target="_blank" rel="noreferrer" title={name} style={{ width: 36, height: 36, borderRadius: 9, background: color + "22", border: `1px solid ${color}44`, display: "flex", alignItems: "center", justifyContent: "center", color, fontSize: name === "whatsapp" ? "1rem" : "0.85rem", fontWeight: 900, textDecoration: "none", transition: "all .2s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = color + "44"; (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.1)" }}
      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = color + "22"; (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)" }}>
      {icons[name.toLowerCase()] ?? name[0]}
    </a>
  )
}

export default function Footer({ setPage }: Props) {
  return (
    <footer style={{ background: "#040d1e", color: "rgba(190,215,255,.65)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3.5rem 1.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "2rem" }}>

        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: "#1739a0", display: "flex", alignItems: "center", justifyContent: "center", color: "#f0b22a", fontWeight: 800, fontSize: "1.1rem", fontFamily: "'Playfair Display',serif" }}>K</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem", lineHeight: 1.2 }}>Kariakoo SDA Church</div>
              <div style={{ color: "#f0b22a", fontSize: "0.68rem" }}>Dar es Salaam, Tanzania</div>
            </div>
          </div>
          <p style={{ fontSize: "0.78rem", lineHeight: 1.85, marginBottom: 16 }}>A growing family of faith, worship and service in the heart of Kariakoo since 1988. All are welcome.</p>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {SOCIAL_LINKS.map(s => <SocialIcon key={s.name} {...s} />)}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: ".09em", marginBottom: 14 }}>Navigate</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {NAV_ITEMS.slice(0, 6).map(n => (
              <button key={n.page} onClick={() => setPage(n.page)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(190,215,255,.6)", fontSize: "0.82rem", textAlign: "left", padding: 0 }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#f0b22a" }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(190,215,255,.6)" }}>
                {n.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ministries */}
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: ".09em", marginBottom: 14 }}>Ministry</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {NAV_ITEMS.slice(6).map(n => (
              <button key={n.page} onClick={() => setPage(n.page)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(190,215,255,.6)", fontSize: "0.82rem", textAlign: "left", padding: 0 }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#f0b22a" }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(190,215,255,.6)" }}>
                {n.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: ".09em", marginBottom: 14 }}>Contact</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9, fontSize: "0.78rem" }}>
            <div>📍 Murimi Business Center, Kariakoo, Dar es Salaam, Tanzania</div>
            <div>📞 +255 756 123 456</div>
            <div>✉️ info@kariakoosdachurch.org</div>
            <div style={{ marginTop: 8, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,.06)" }}>
              <div style={{ color: "#f0b22a", fontWeight: 600, fontSize: "0.74rem", marginBottom: 5 }}>Sabbath Hours</div>
              <div>Sabbath School · 9:30 AM</div>
              <div>Divine Service · 11:00 AM</div>
              <div style={{ marginTop: 4, color: "rgba(190,215,255,.45)", fontSize: "0.72rem" }}>Every Saturday</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,.05)", padding: "1.25rem 1.5rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 8, fontSize: "0.72rem", color: "rgba(190,215,255,.35)" }}>
        <div>© 2026 Kariakoo SDA Church · Dar es Salaam, Tanzania · All rights reserved</div>
        <div style={{ display: "flex", gap: 16 }}>
          {["Privacy Policy", "Terms of Use", "Sitemap"].map(l => (
            <button key={l} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(190,215,255,.35)", fontSize: "0.72rem" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(190,215,255,.75)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(190,215,255,.35)" }}>
              {l}
            </button>
          ))}
        </div>
      </div>
    </footer>
  )
}
