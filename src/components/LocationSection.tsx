export default function LocationSection() {
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.078!2d39.2762!3d-6.8160!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4b0000000001%3A0x0!2sKariakoo%2C%20Dar%20es%20Salaam!5e0!3m2!1sen!2stz!4v1699000000000!5m2!1sen!2stz"

  return (
    <section style={{ background: "#f4f6fb", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.7rem,3vw,2.4rem)", fontWeight: 700, color: "#08152e", marginBottom: 8 }}>Find Us</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", margin: "8px 0" }}>
            <div style={{ height: 1, width: 60, background: "linear-gradient(to right,transparent,#c4880a66)" }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#c4880a" }} />
            <div style={{ height: 1, width: 60, background: "linear-gradient(to left,transparent,#c4880a66)" }} />
          </div>
          <p style={{ color: "#4b607d", fontSize: "0.95rem" }}>Kariakoo SDA Church · Murimi Business Center, Kariakoo, Dar es Salaam</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "2rem", alignItems: "start" }}>
          {/* Info panel */}
          <div style={{ background: "#fff", borderRadius: 20, padding: "1.75rem", border: "1.5px solid #e0e8f5", boxShadow: "0 4px 20px rgba(8,21,46,.06)" }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.1rem", color: "#08152e", marginBottom: "1.25rem" }}>Church Location</div>
            {[
              { icon: "📍", label: "Address", val: "Murimi Business Center, Kariakoo, Dar es Salaam, Tanzania" },
              { icon: "🕐", label: "Sabbath School", val: "Every Saturday · 9:30 AM" },
              { icon: "⛪", label: "Divine Service", val: "Every Saturday · 11:00 AM" },
              { icon: "📞", label: "Phone", val: "+255 756 123 456" },
              { icon: "✉️", label: "Email", val: "info@kariakoosdachurch.org" },
            ].map(c => (
              <div key={c.label} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: "1.1rem", flexShrink: 0, marginTop: 1 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#4b607d", textTransform: "uppercase", letterSpacing: ".08em" }}>{c.label}</div>
                  <div style={{ color: "#08152e", fontSize: "0.875rem", fontWeight: 500 }}>{c.val}</div>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "1.25rem" }}>
              <a href="https://maps.google.com/?q=Kariakoo+SDA+Church+Dar+es+Salaam" target="_blank" rel="noreferrer" style={{ display: "block", padding: "11px 18px", background: "#1739a0", color: "#fff", borderRadius: 11, fontWeight: 700, fontSize: "0.875rem", textAlign: "center", textDecoration: "none", transition: "background .2s" }}>
                📍 Open in Google Maps
              </a>
              <a href="https://maps.google.com/?q=Kariakoo+SDA+Church+Dar+es+Salaam&nav=1" target="_blank" rel="noreferrer" style={{ display: "block", padding: "11px 18px", background: "#f0f4fb", color: "#1739a0", borderRadius: 11, fontWeight: 700, fontSize: "0.875rem", textAlign: "center", textDecoration: "none", border: "1.5px solid #d5dff0" }}>
                🧭 Get GPS Directions
              </a>
            </div>
          </div>

          {/* Map */}
          <div style={{ borderRadius: 20, overflow: "hidden", border: "1.5px solid #e0e8f5", boxShadow: "0 4px 20px rgba(8,21,46,.06)", height: 380 }}>
            <iframe
              src={mapSrc}
              width="100%" height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kariakoo SDA Church Location"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
