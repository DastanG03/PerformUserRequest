import { useState, useRef } from "react"
import type { Lang, Page } from "../data/constants"
import { TX } from "../data/constants"

interface Props {
  onClose: () => void
  lang: Lang
  setPage: (p: Page) => void
}

const QUICK = [
  "Service times",
  "Prayer request",
  "Location",
  "Youth / Pathfinders",
  "Donate / Give",
  "Live stream",
]

export default function AIAssistant({ onClose, lang, setPage }: Props) {
  const tx = TX[lang]
  const [msgs, setMsgs] = useState([{ from: "bot", text: tx.aiGreeting }])
  const [inp, setInp] = useState("")
  const endRef = useRef<HTMLDivElement>(null)

  const respond = (q: string): string => {
    const l = q.toLowerCase()
    if (l.includes("time") || l.includes("service") || l.includes("sabbath") || l.includes("sabato") || l.includes("when"))
      return "Sabbath School: 9:30 AM · Divine Service: 11:00 AM every Saturday at Murimi Business Center, Kariakoo, Dar es Salaam. All are welcome! 🙏"
    if (l.includes("location") || l.includes("address") || l.includes("where") || l.includes("wapi") || l.includes("map"))
      return "We are at Murimi Business Center, Kariakoo, Dar es Salaam, Tanzania. You can find us on the Location section of the website or click 'Open in Maps' for GPS directions. 📍"
    if (l.includes("prayer") || l.includes("maombi") || l.includes("pray"))
      return "Visit our Prayer Wall page to submit a prayer request — you can choose public or private. Our dedicated prayer team intercedes daily for every request. 🙏"
    if (l.includes("contact") || l.includes("reach") || l.includes("call") || l.includes("email"))
      return "📞 +255 756 123 456 · ✉️ info@kariakoosdachurch.org. Visit our Contact page to send a message, request counseling, or register for an event."
    if (l.includes("donat") || l.includes("give") || l.includes("toa") || l.includes("changia") || l.includes("tithe") || l.includes("offering"))
      return "Give via M-Pesa, Airtel Money, Tigo Pesa, HaloPesa or Bank Transfer. Visit the Give page to see current fundraising goals and donate securely. 💙"
    if (l.includes("pathfinder") || l.includes("adventurer") || l.includes("ambassador") || l.includes("youth") || l.includes("vijana"))
      return "Our Youth Dept has: Adventurers (6-9), Pathfinders (10-15), Ambassadors (16-21), Adult Youth (22-35). Camporee 2026 registration is open! Visit the Youth page. ⛺"
    if (l.includes("choir") || l.includes("kwaya") || l.includes("music") || l.includes("sing"))
      return "We have four choirs: The Hannanims, The Disciples, TUCASA DMI Choir, and Children's Choir. Visit the Choir page for schedules and audio. 🎵"
    if (l.includes("live") || l.includes("stream") || l.includes("youtube") || l.includes("video"))
      return "We livestream every Saturday at 11:00 AM on YouTube! Subscribe to never miss a service. Check the Sermons page for the link and past recordings. 📺"
    if (l.includes("pastor") || l.includes("mchungaji") || l.includes("leader"))
      return "Our Senior Pastor is Pastor Timothy Mwenda. Visit the About page to meet our full leadership team and read the pastor's message. 📖"
    if (l.includes("belief") || l.includes("doctrine") || l.includes("faith") || l.includes("advent") || l.includes("seventh"))
      return "We are Seventh-day Adventists holding the 28 Fundamental Beliefs. Visit the About page where you can read each belief in a detailed expandable format. ✝️"
    if (l.includes("resource") || l.includes("bible") || l.includes("book") || l.includes("lesson") || l.includes("egw") || l.includes("ellen"))
      return "Visit our Spiritual Resources page for the Holy Bible, Ellen G. White books, Sabbath School lessons, Church Manuals, and downloadable PDFs. 📚"
    if (l.includes("event") || l.includes("program") || l.includes("tukio"))
      return "Check our Events page for upcoming events including evangelism campaigns, camporee, concerts, and community outreach programs. 📅"
    if (l.includes("counsel") || l.includes("help") || l.includes("problem") || l.includes("personal"))
      return "We offer pastoral counseling services. Visit the Contact page and select 'Counseling Request' form. Pastor Timothy Mwenda and our elders are here to help. 🤝"
    if (l.includes("hello") || l.includes("hi") || l.includes("halo") || l.includes("habari") || l.includes("salaam"))
      return "Habari! Welcome to Kariakoo SDA Church. I can help you with service times, events, prayer requests, location, donations, ministries and much more. What would you like to know? 😊"
    return "Thank you for reaching out! For more detailed information please visit the relevant page using the navigation menu, or contact us at +255 756 123 456 or info@kariakoosdachurch.org. God bless you! 🙏"
  }

  const send = (text?: string) => {
    const q = text ?? inp
    if (!q.trim()) return
    const u = { from: "user", text: q }
    const b = { from: "bot", text: respond(q) }
    setMsgs(m => [...m, u, b])
    setInp("")
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 80)
  }

  return (
    <div style={{ position: "fixed", bottom: 88, right: 16, width: 340, background: "#fff", borderRadius: 20, boxShadow: "0 20px 60px rgba(8,21,46,.28)", zIndex: 400, display: "flex", flexDirection: "column", overflow: "hidden", border: "1.5px solid #dde6f5", maxHeight: 500 }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#08152e,#1739a0)", padding: "13px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#f0b22a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#08152e", fontSize: "0.8rem" }}>AI</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>Church Assistant</div>
            <div style={{ color: "rgba(190,215,255,.7)", fontSize: "0.69rem" }}>English · Swahili · 24/7</div>
          </div>
        </div>
        <button onClick={onClose} style={{ color: "rgba(255,255,255,.6)", background: "none", border: "none", cursor: "pointer", fontSize: "1rem" }}>✕</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0.875rem", display: "flex", flexDirection: "column", gap: 8, minHeight: 0 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "85%", padding: "8px 13px", borderRadius: 14, fontSize: "0.82rem", lineHeight: 1.6, background: m.from === "user" ? "#1739a0" : "#f0f4fb", color: m.from === "user" ? "#fff" : "#08152e" }}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Quick replies */}
      {msgs.length < 3 && (
        <div style={{ padding: "0 0.875rem 0.5rem", display: "flex", flexWrap: "wrap", gap: 5 }}>
          {QUICK.map(q => (
            <button key={q} onClick={() => send(q)} style={{ padding: "4px 10px", borderRadius: 999, fontSize: "0.72rem", fontWeight: 600, border: "1.5px solid #d5dff0", background: "#f4f6fb", color: "#1739a0", cursor: "pointer" }}>{q}</button>
          ))}
        </div>
      )}

      {/* Quick nav links inside chat */}
      {msgs.length >= 3 && (
        <div style={{ padding: "4px 0.875rem 4px", display: "flex", gap: 5, flexWrap: "wrap" }}>
          {([["prayer", "🙏 Prayer"], ["contact", "📞 Contact"], ["events", "📅 Events"]] as [Page, string][]).map(([p, lbl]) => (
            <button key={p} onClick={() => { setPage(p); onClose() }} style={{ padding: "3px 9px", borderRadius: 999, fontSize: "0.7rem", fontWeight: 600, border: "1px solid #d5dff0", background: "#fff", color: "#1739a0", cursor: "pointer" }}>{lbl}</button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ padding: "10px 12px", borderTop: "1px solid #e8edf5", display: "flex", gap: 8 }}>
        <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask anything..." style={{ flex: 1, border: "1.5px solid #d5dff0", borderRadius: 10, padding: "8px 12px", fontSize: "0.82rem", outline: "none", fontFamily: "inherit", color: "#08152e" }} />
        <button onClick={() => send()} style={{ padding: "8px 14px", background: "#1739a0", color: "#fff", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700 }}>→</button>
      </div>
    </div>
  )
}
