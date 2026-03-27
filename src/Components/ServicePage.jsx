import { useState, useEffect, useRef } from "react";

const services = [
  {
    number: "01",
    title: "Web Design",
    sub: "Visuell identitet & UI",
    desc: "Vi skapar webbplatser som stannar kvar i minnet. Varje pixel är genomtänkt — från typografi till rörelse.",
    tags: ["Figma", "Prototyping", "Brand Identity"],
  },
  {
    number: "02",
    title: "Development",
    sub: "Kod som presterar",
    desc: "React, Next.js, animationer och allt däremellan. Vi bygger snabbt, skalbart och med känsla för detaljer.",
    tags: ["React", "Next.js", "Framer Motion"],
  },
  {
    number: "03",
    title: "E-Commerce",
    sub: "Butiker som konverterar",
    desc: "Från Shopify till skräddarsydda lösningar. Vi bygger upplevelser som förvandlar besökare till kunder.",
    tags: ["Shopify", "WooCommerce", "Custom"],
  },
  {
    number: "04",
    title: "Motion & 3D",
    sub: "Animationer som imponerar",
    desc: "Subtila mikrointeraktioner eller fullskaliga 3D-upplevelser. Vi ger din sida liv och rörelse.",
    tags: ["Three.js", "GSAP", "CSS Animation"],
  },
  {
    number: "05",
    title: "SEO & Performance",
    sub: "Syns & laddas snabbt",
    desc: "En vacker sida som ingen hittar är värdelös. Vi optimerar för sökmotorer och blixtsnabb laddning.",
    tags: ["Core Web Vitals", "Schema", "Analytics"],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function ServiceCard({ service, index }) {
  const [ref, visible] = useInView(0.1);
  const [open, setOpen] = useState(false);

  return (
    <div
      ref={ref}
      onClick={() => setOpen(!open)}
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "28px 0",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
      }}
    >
      {/* Top row — alltid synlig */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "10px",
            color: open ? "rgb(255,166,0)" : "rgba(255,255,255,0.2)",
            letterSpacing: "0.2em",
            transition: "color 0.3s ease",
            flexShrink: 0,
          }}>
            {service.number}
          </span>
          <div>
            <div style={{
              fontFamily: "'Inria Serif', serif",
              fontSize: "clamp(22px, 5vw, 44px)",
              fontWeight: 300,
              color: open ? "#ffffff" : "rgba(255,255,255,0.8)",
              lineHeight: 1,
              transition: "color 0.3s ease",
            }}>
              {service.title}
            </div>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              marginTop: "5px",
            }}>
              {service.sub}
            </div>
          </div>
        </div>

        {/* Plus/minus ikon */}
        <div style={{
          width: "32px",
          height: "32px",
          border: `1px solid ${open ? "rgb(255,166,0)" : "rgba(255,255,255,0.15)"}`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "border-color 0.3s ease, transform 0.3s ease",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line x1="6" y1="0" x2="6" y2="12" stroke={open ? "rgb(255,166,0)" : "rgba(255,255,255,0.4)"} strokeWidth="1" />
            <line x1="0" y1="6" x2="12" y2="6" stroke={open ? "rgb(255,166,0)" : "rgba(255,255,255,0.4)"} strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Expanderat innehåll */}
      <div style={{
        maxHeight: open ? "300px" : "0",
        overflow: "hidden",
        transition: "max-height 0.5s ease",
      }}>
        <div style={{ paddingTop: "20px", paddingLeft: "38px" }}>
          <p style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "12px",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.8,
            margin: "0 0 16px",
          }}>
            {service.desc}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {service.tags.map((tag) => (
              <span key={tag} style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgb(255,166,0)",
                border: "1px solid rgba(255,166,0,0.3)",
                padding: "5px 12px",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [headerRef, headerVisible] = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inria+Serif:ital,wght@0,300;0,400;1,300&family=DM+Mono:wght@300;400&display=swap');

        .srv-section {
          position: relative;
          background: rgb(15, 13, 13);
          padding: 120px 0 80px;
          overflow: hidden;
        }

        .srv-inner {
          position: relative;
          z-index: 2;
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .srv-marquee-wrap {
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 14px 0;
          margin-top: 60px;
        }

        .srv-marquee-track {
          display: flex;
          gap: 40px;
          width: max-content;
          animation: srv-scroll 20s linear infinite;
        }

        .srv-marquee-item {
          font-family: 'Inria Serif', serif;
          font-size: 12px;
          font-style: italic;
          font-weight: 300;
          color: rgba(255,255,255,0.15);
          letter-spacing: 0.1em;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .srv-marquee-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgb(255,166,0);
          opacity: 0.5;
          flex-shrink: 0;
        }

        @keyframes srv-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <section className="srv-section">
        <div className="srv-inner">

          <div ref={headerRef}>
            <p style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgb(255,166,0)",
              margin: "0 0 20px",
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}>
              — Vad vi gör
            </p>

            <h2 style={{
              fontFamily: "'Inria Serif', serif",
              fontSize: "clamp(36px, 7vw, 80px)",
              fontWeight: 300,
              color: "#fafafa",
              lineHeight: 0.95,
              margin: "0 0 60px",
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
            }}>
              Tjänster som<br />
              <em style={{ fontStyle: "italic", color: "rgb(255,166,0)" }}>förändrar</em> din<br />
              digitala närvaro
            </h2>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {services.map((s, i) => (
              <ServiceCard key={s.number} service={s} index={i} />
            ))}
          </div>

        </div>

        <div className="srv-marquee-wrap">
          <div className="srv-marquee-track">
            {[...Array(2)].map((_, i) =>
              ["Web Design", "Development", "E-Commerce", "Motion & 3D", "SEO & Performance"].map((item) => (
                <div key={`${i}-${item}`} className="srv-marquee-item">
                  {item}
                  <span className="srv-marquee-dot" />
                </div>
              ))
            )}
          </div>
        </div>

      </section>
    </>
  );
}