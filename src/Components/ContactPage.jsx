import { useState, useEffect, useRef } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("https://formspree.io/f/mojpvjnj", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) setSubmitted(true);
  } catch (err) {
    console.error("Misslyckades:", err);
  }
};

  const fields = [
    { key: "name", label: "Ditt namn", type: "text", placeholder: "Angelo" },
    { key: "email", label: "E-post", type: "email", placeholder: "angelo@studio.se" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inria+Serif:ital,wght@0,300;0,400;1,300&family=DM+Mono:wght@300;400&display=swap');

        .ct-section {
          position: relative;
          background: rgb(15, 13, 13);
          min-height: 100vh;
          overflow: hidden;
          padding: 120px 0 80px;
          font-family: 'DM Mono', monospace;
        }

        .ct-orb {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,166,0,0.07) 0%, transparent 70%);
          pointer-events: none;
          transition: transform 0.1s ease;
          top: -100px;
          left: -100px;
          transform: translate(
            calc(var(--mx, 50) * 0.3px),
            calc(var(--my, 50) * 0.3px)
          );
        }

        .ct-noise {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        .ct-grid-line {
          position: absolute;
          background: rgba(255,166,0,0.06);
          pointer-events: none;
        }
        .ct-grid-line--h { height: 1px; width: 100%; }
        .ct-grid-line--v { width: 1px; height: 100%; }

        .ct-inner {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 48px;
        }

        .ct-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgb(255,166,0);
          margin: 0 0 24px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .ct-eyebrow.ct-visible { opacity: 1; transform: translateY(0); }

        .ct-headline {
          font-family: 'Inria Serif', serif;
          font-size: clamp(52px, 8vw, 120px);
          font-weight: 300;
          color: #fafafa;
          line-height: 0.95;
          margin: 0 0 16px;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s;
        }
        .ct-headline.ct-visible { opacity: 1; transform: translateY(0); }

        .ct-headline em {
          font-style: italic;
          color: rgb(255,166,0);
        }

        .ct-sub {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.15em;
          margin: 0 0 80px;
          opacity: 0;
          transition: opacity 0.8s ease 0.3s;
        }
        .ct-sub.ct-visible { opacity: 1; }

        .ct-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        .ct-form {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .ct-field {
          position: relative;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding: 24px 0 16px;
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease;
        }
        .ct-field.ct-visible { opacity: 1; transform: translateX(0); }
        .ct-field.ct-active { border-bottom-color: rgb(255,166,0); }

        .ct-field-label {
          position: absolute;
          top: 24px;
          left: 0;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          pointer-events: none;
          transition: all 0.3s ease;
        }
        .ct-field.ct-active .ct-field-label,
        .ct-field.ct-has-value .ct-field-label {
          top: 6px;
          font-size: 9px;
          color: rgb(255,166,0);
        }

        .ct-input {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'Inria Serif', serif;
          font-size: 22px;
          font-weight: 300;
          color: #fafafa;
          padding: 12px 0 0;
          box-sizing: border-box;
        }

        .ct-textarea-wrap {
          position: relative;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding: 24px 0 16px;
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s, border-color 0.3s ease;
        }
        .ct-textarea-wrap.ct-visible { opacity: 1; transform: translateX(0); }
        .ct-textarea-wrap.ct-active { border-bottom-color: rgb(255,166,0); }

        .ct-textarea-wrap .ct-field-label {
          position: absolute;
          top: 24px;
          left: 0;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          pointer-events: none;
          transition: all 0.3s ease;
        }
        .ct-textarea-wrap.ct-active .ct-field-label,
        .ct-textarea-wrap.ct-has-value .ct-field-label {
          top: 6px;
          font-size: 9px;
          color: rgb(255,166,0);
        }

        .ct-textarea {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'Inria Serif', serif;
          font-size: 22px;
          font-weight: 300;
          color: #fafafa;
          padding: 12px 0 0;
          box-sizing: border-box;
          resize: none;
          min-height: 120px;
        }

        .ct-submit-wrap {
          margin-top: 48px;
          opacity: 0;
          transition: opacity 0.6s ease 0.6s;
        }
        .ct-submit-wrap.ct-visible { opacity: 1; }

        .ct-submit {
          position: relative;
          background: transparent;
          border: 1px solid rgb(255,166,0);
          color: rgb(255,166,0);
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          padding: 18px 48px;
          cursor: pointer;
          overflow: hidden;
          transition: color 0.4s ease;
        }

        .ct-submit::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgb(255,166,0);
          transform: translateX(-100%);
          transition: transform 0.4s ease;
          z-index: 0;
        }

        .ct-submit:hover::before { transform: translateX(0); }
        .ct-submit:hover { color: rgb(15,13,13); }
        .ct-submit span { position: relative; z-index: 1; }

        .ct-info {
          display: flex;
          flex-direction: column;
          gap: 48px;
          padding-top: 40px;
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
        }
        .ct-info.ct-visible { opacity: 1; transform: translateX(0); }

        .ct-info-block {}

        .ct-info-label {
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgb(255,166,0);
          margin-bottom: 8px;
        }

        .ct-info-value {
          font-family: 'Inria Serif', serif;
          font-size: 20px;
          font-weight: 300;
          color: rgba(255,255,255,0.7);
          line-height: 1.4;
        }

        .ct-drawing {
          margin-top: 48px;
        }

        .ct-svg-line {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          transition: stroke-dashoffset 1.5s ease;
        }
        .ct-svg-line.ct-visible { stroke-dashoffset: 0; }

        .ct-counter {
          display: flex;
          gap: 40px;
          margin-top: 40px;
          padding-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .ct-counter-item {}

        .ct-counter-num {
          font-family: 'Inria Serif', serif;
          font-size: 40px;
          font-weight: 300;
          color: #fafafa;
          line-height: 1;
        }

        .ct-counter-num em {
          font-style: normal;
          color: rgb(255,166,0);
        }

        .ct-counter-desc {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-top: 4px;
        }

        .ct-success {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          min-height: 400px;
          gap: 16px;
        }

        .ct-success-icon {
          width: 64px;
          height: 64px;
        }

        .ct-success-title {
          font-family: 'Inria Serif', serif;
          font-size: 40px;
          font-weight: 300;
          color: #fafafa;
          margin: 0;
        }

        .ct-success-sub {
          font-size: 12px;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.3);
          margin: 0;
        }

        .ct-check-path {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: ct-draw-check 0.6s ease 0.3s forwards;
        }

        @keyframes ct-draw-check {
          to { stroke-dashoffset: 0; }
        }

        @media (max-width: 768px) {
          .ct-inner { padding: 0 24px; }
          .ct-layout { grid-template-columns: 1fr; gap: 60px; }
          .ct-info { padding-top: 0; }
        }
      `}</style>

      <section
        className="ct-section"
        ref={sectionRef}
        style={{ "--mx": mousePos.x, "--my": mousePos.y }}
      >
        <div className="ct-noise" />
        <div className="ct-orb" />
        <div className="ct-grid-line ct-grid-line--h" style={{ top: "30%" }} />
        <div className="ct-grid-line ct-grid-line--h" style={{ top: "70%" }} />
        <div className="ct-grid-line ct-grid-line--v" style={{ left: "50%" }} />

        <div className="ct-inner">
          <p className={`ct-eyebrow ${visible ? "ct-visible" : ""}`}>
            — Kontakta oss
          </p>

          <h2 className={`ct-headline ${visible ? "ct-visible" : ""}`}>
            Låt oss skapa<br />
            något <em>extraordinärt</em>
          </h2>

          <p className={`ct-sub ${visible ? "ct-visible" : ""}`}>
            SIMPLE WEB STUDIO — STOCKHOLM
          </p>

          <div className="ct-layout">

            {/* FORM */}
            <div>
              {submitted ? (
                <div className="ct-success">
                  <svg className="ct-success-icon" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="31" stroke="rgb(255,166,0)" strokeWidth="1" />
                    <path
                      className="ct-check-path"
                      d="M18 32 L28 42 L46 22"
                      stroke="rgb(255,166,0)"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                  <h3 className="ct-success-title">Meddelande skickat.</h3>
                  <p className="ct-success-sub">Vi hör av oss inom 24 timmar.</p>
                </div>
              ) : (
                <form className="ct-form" onSubmit={handleSubmit}>
                  {fields.map((f, i) => (
                    <div
                      key={f.key}
                      className={[
                        "ct-field",
                        visible ? "ct-visible" : "",
                        focused === f.key ? "ct-active" : "",
                        formData[f.key] ? "ct-has-value" : "",
                      ].join(" ")}
                      style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
                    >
                      <span className="ct-field-label">{f.label}</span>
                      <input
                        className="ct-input"
                        type={f.type}
                        placeholder=""
                        value={formData[f.key]}
                        onFocus={() => setFocused(f.key)}
                        onBlur={() => setFocused(null)}
                        onChange={e => setFormData(p => ({ ...p, [f.key]: e.target.value }))}
                        required
                      />
                    </div>
                  ))}

                  <div
                    className={[
                      "ct-textarea-wrap",
                      visible ? "ct-visible" : "",
                      focused === "message" ? "ct-active" : "",
                      formData.message ? "ct-has-value" : "",
                    ].join(" ")}
                  >
                    <span className="ct-field-label">Ditt meddelande</span>
                    <textarea
                      className="ct-textarea"
                      value={formData.message}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      required
                    />
                  </div>

                  <div className={`ct-submit-wrap ${visible ? "ct-visible" : ""}`}>
                    <button className="ct-submit" type="submit">
                      <span>Skicka meddelande</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* INFO */}
            <div className={`ct-info ${visible ? "ct-visible" : ""}`}>
              <div className="ct-info-block">
                <p className="ct-info-label">E-post</p>
                <p className="ct-info-value">AngeloCollocolo@Hotmail.com</p>
              </div>
              <div className="ct-info-block">
                <p className="ct-info-label">Plats</p>
                <p className="ct-info-value">Stockholm,<br />Sverige</p>
              </div>
              <div className="ct-info-block">
                <p className="ct-info-label">Tillgänglighet</p>
                <p className="ct-info-value">Öppen för projekt<br />från Q3 2026</p>
              </div>

              <div className="ct-drawing">
                <svg width="100%" height="80" viewBox="0 0 300 80" fill="none">
                  <path
                    className={`ct-svg-line ${visible ? "ct-visible" : ""}`}
                    d="M0 40 Q75 10 150 40 Q225 70 300 40"
                    stroke="rgb(255,166,0)"
                    strokeWidth="0.5"
                    fill="none"
                  />
                  <path
                    className={`ct-svg-line ${visible ? "ct-visible" : ""}`}
                    d="M0 50 Q75 20 150 50 Q225 80 300 50"
                    stroke="rgba(255,166,0,0.3)"
                    strokeWidth="0.5"
                    fill="none"
                    style={{ transitionDelay: "0.3s" }}
                  />
                </svg>
              </div>

              <div className="ct-counter">
                <div className="ct-counter-item">
                  <div className="ct-counter-num">4<em>+</em></div>
                  <div className="ct-counter-desc">Projekt</div>
                </div>
                <div className="ct-counter-item">
                  <div className="ct-counter-num">3<em>år</em></div>
                  <div className="ct-counter-desc">Erfarenhet</div>
                </div>
                <div className="ct-counter-item">
                  <div className="ct-counter-num">100<em>%</em></div>
                  <div className="ct-counter-desc">Nöjda kunder</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}