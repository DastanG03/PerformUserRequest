import { useState, useEffect } from "react"

export default function ScrollButtons() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 300)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const btn: React.CSSProperties = {
    width: 40, height: 40, borderRadius: "50%", border: "1.5px solid rgba(240,178,42,.4)",
    background: "rgba(8,21,46,.92)", backdropFilter: "blur(10px)", color: "#f0b22a",
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "1rem", fontWeight: 700, transition: "all .2s", boxShadow: "0 4px 16px rgba(8,21,46,.3)",
  }

  if (!show) return null

  return (
    <div style={{ position: "fixed", bottom: 90, right: 16, display: "flex", flexDirection: "column", gap: 8, zIndex: 150 }}>
      <button style={btn} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} title="Scroll to top">↑</button>
      <button style={btn} onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })} title="Scroll to bottom">↓</button>
    </div>
  )
}
