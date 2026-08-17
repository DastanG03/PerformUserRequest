import { useState } from "react"
import { supabase } from "../lib/supabase"

type FormType = "general" | "prayer" | "counseling" | "event_reg"

const FORM_TYPES: { k: FormType; label: string; icon: string }[] = [
  { k: "general",    label: "General Message",     icon: "✉️" },
  { k: "prayer",     label: "Prayer Request",       icon: "🙏" },
  { k: "counseling", label: "Counseling Request",   icon: "🤝" },
  { k: "event_reg",  label: "Event Registration",   icon: "📅" },
]

export default function ContactPage() {
  const [formType, setFormType] = useState<FormType>("general")
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const submit = async () => {
    if (!form.name || !form.email || !form.message) return
    setSubmitting(true)
    const { error } = await supabase.from("contact_submissions").insert({
      name: form.name, email: form.email, phone: form.phone,
      subject: form.subject || formType, message: form.message, form_type: formType,
    })
    if (!error) { setDone(true); setForm({ name: "", email: "", phone: "", subject: "", message: "" }) }
    setSubmitting(false)
  }

  return (
    <div>
      <div style={{ position: "relative", height: 240, display: "flex", alignItems: "center", justifyContent: "center", background: "#08152e" }}>
        <div style={{ position: "relative", textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800, color: "#fff", marginBottom: 6 }}>Contact Us</h1>
          <p style={{ color: "#f0b22a", fontWeight: 600 }}>We would love to hear from you</p>
        </div>
      </div>

      <section style={{ background: "#f4f6fb", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1050, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "2.5rem", alignItems: "start" }}>

          {/* Info */}
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.3rem", color: "#08152e", marginBottom: "1.5rem" }}>Church Information</div>
            {[
              { icon: "📍", l: "Address",       v: "Murimi Business Center, Kariakoo, Dar es Salaam, Tanzania" },
              { icon: "📞", l: "Phone",          v: "+255 756 123 456" },
              { icon: "✉️", l: "Email",          v: "info@kariakoosdachurch.org" },
              { icon: "💬", l: "WhatsApp",       v: "+255 756 123 456" },
              { icon: "🕐", l: "Sabbath School", v: "Every Saturday · 9:30 AM" },
              { icon: "⛪", l: "Divine Service", v: "Every Saturday · 11:00 AM" },
            ].map(c => (
              <div key={c.l} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#4b607d", textTransform: "uppercase", letterSpacing: ".08em" }}>{c.l}</div>
                  <div style={{ color: "#08152e", fontWeight: 500, fontSize: "0.875rem" }}>{c.v}</div>
                </div>
              </div>
            ))}

            {/* Office hours */}
            <div style={{ background: "#fff", borderRadius: 16, padding: "1.25rem", border: "1.5px solid #e0e8f5", marginTop: "1.5rem" }}>
              <div style={{ fontWeight: 700, color: "#08152e", fontSize: "0.85rem", marginBottom: 8 }}>Office Hours</div>
              {[
                { d: "Monday – Friday", h: "8:00 AM – 5:00 PM" },
                { d: "Saturday (Sabbath)", h: "9:00 AM – 2:00 PM" },
                { d: "Sunday", h: "Closed" },
              ].map(row => (
                <div key={row.d} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#4b607d", padding: "4px 0", borderBottom: "1px solid #f0f4fb" }}>
                  <span>{row.d}</span><span style={{ fontWeight: 600, color: "#08152e" }}>{row.h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ background: "#fff", borderRadius: 22, padding: "2rem", border: "1.5px solid #e0e8f5", boxShadow: "0 4px 24px rgba(8,21,46,.07)" }}>
            {done ? (
              <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: 12 }}>✅</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontWeight: 700, color: "#08152e", marginBottom: 8 }}>Message Received!</div>
                <p style={{ color: "#4b607d", marginBottom: "1.5rem" }}>Thank you for reaching out. We will get back to you within 24–48 hours. God bless you!</p>
                <button onClick={() => setDone(false)} style={{ padding: "10px 24px", background: "#1739a0", color: "#fff", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700 }}>Send Another</button>
              </div>
            ) : (
              <>
                {/* Form type selector */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#08152e", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>Form Type</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
                    {FORM_TYPES.map(t => (
                      <button key={t.k} onClick={() => setFormType(t.k)} style={{ padding: "9px 8px", borderRadius: 10, fontSize: "0.78rem", fontWeight: 700, border: `1.5px solid ${formType === t.k ? "#1739a0" : "#d5dff0"}`, background: formType === t.k ? "#eef2ff" : "#f9fafd", color: formType === t.k ? "#1739a0" : "#4b607d", cursor: "pointer" }}>
                        {t.icon} {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    {["name", "email"].map(f => (
                      <div key={f}>
                        <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, color: "#08152e", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 5 }}>{f === "name" ? "Full Name *" : "Email *"}</label>
                        <input type={f === "email" ? "email" : "text"} value={form[f as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))} placeholder={f === "name" ? "John Doe" : "john@example.com"} style={{ width: "100%", border: "1.5px solid #d5dff0", borderRadius: 10, padding: "10px 13px", fontSize: "0.875rem", outline: "none", fontFamily: "inherit", color: "#08152e" }} />
                      </div>
                    ))}
                  </div>
                  {["phone", "subject"].map(f => (
                    <div key={f}>
                      <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, color: "#08152e", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 5 }}>{f === "phone" ? "Phone Number" : "Subject"}</label>
                      <input value={form[f as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))} style={{ width: "100%", border: "1.5px solid #d5dff0", borderRadius: 10, padding: "10px 13px", fontSize: "0.875rem", outline: "none", fontFamily: "inherit", color: "#08152e" }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, color: "#08152e", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 5 }}>Message *</label>
                    <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Your message..." style={{ width: "100%", border: "1.5px solid #d5dff0", borderRadius: 10, padding: "10px 13px", fontSize: "0.875rem", outline: "none", fontFamily: "inherit", color: "#08152e", resize: "none", minHeight: 110 }} />
                  </div>
                  <button onClick={submit} disabled={submitting || !form.name || !form.email || !form.message} style={{ padding: "13px", background: submitting ? "#999" : "#1739a0", color: "#fff", fontWeight: 800, borderRadius: 13, border: "none", cursor: submitting ? "not-allowed" : "pointer", fontSize: "0.9rem" }}>
                    {submitting ? "Sending…" : "Send Message →"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
