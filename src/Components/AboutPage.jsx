import { useState, useEffect, useRef } from "react";

const values = [
  {
    number: "01",
    title: "Enkelhet",
    desc: "Vi tror att det bästa designen är den som känns självklar. Inget onödigt — varje element har ett syfte.",
  },
  {
    number: "02",
    title: "Hantverk",
    desc: "Vi behandlar varje projekt som ett konstverk. Detaljer som ingen märker medvetet men alla känner av.",
  },
  {
    number: "03",
    title: "Ärlighet",
    desc: "Inga tomma löften. Vi säger vad vi kan leverera och levererar vad vi lovar — i tid och inom budget.",
  },
  {
    number: "04",
    title: "Nyfikenhet",
    desc: "Tekniken förändras snabbt. Vi håller oss alltid i framkant och utforskar nya verktyg och metoder.",
  },
];

const projects = [
  {
    number: "01",
    client: "Faraya",
    type: "Dinner Club — Stockholm",
    year: "2025",
    headline: "En hel digital upplevelse för en av Stockholms exklusivaste dinner clubs.",
    points: [
      "Landing page med modern, atmosfärisk design byggd i React",
      "Integrerad chattassistent som hanterar frågor & minskar telefonbokningar",
      "Boknings- & betalningssystem via samarbete med Bokabord.se",
      "Automatiserat gästlistesystem — kunder bjuds in via mail efter bokning",
      "Mini CMS-system för enkel innehållshantering via Firestore & Cloudinary",
    ],
    tags: ["React", "Firestore", "Cloudinary", "Figma", "Bokabord.se"],
  },
];

const team = [
  { name: "Angelo", role: "Creative Director & Developer", letter: "A" },
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

function ValueRow({ item, index }) {
  const [ref, visible] = useInView(0.1);
  const [open, setOpen] = useState(false);

  return (
    <div
      ref={ref}
      onClick={() => setOpen(!open)}
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "24px 0",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "10px",
            color: open ? "rgb(255,166,0)" : "rgba(255,255,255,0.2)",
            letterSpacing: "0.2em",
            transition: "color 0.3s ease",
            flexShrink: 0,
          }}>
            {item.number}
          </span>
          <div style={{
            fontFamily: "'Inria Serif', serif",
            fontSize: "clamp(22px, 5vw, 40px)",
            fontWeight: 300,
            color: open ? "#ffffff" : "rgba(255,255,255,0.8)",
            lineHeight: 1,
            transition: "color 0.3s ease",
          }}>
            {item.title}
          </div>
        </div>
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
      <div style={{ maxHeight: open ? "200px" : "0", overflow: "hidden", transition: "max-height 0.5s ease" }}>
        <p style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "12px",
          color: "rgba(255,255,255,0.45)",
          lineHeight: 1.8,
          margin: "16px 0 0 38px",
        }}>
          {item.desc}
        </p>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [ref, visible] = useInView(0.1);
  const [open, setOpen] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{
          padding: "32px 0",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "10px",
            color: open ? "rgb(255,166,0)" : "rgba(255,255,255,0.2)",
            letterSpacing: "0.2em",
            transition: "color 0.3s ease",
            flexShrink: 0,
          }}>
            {project.number}
          </span>
          <div>
            <div style={{
              fontFamily: "'Inria Serif', serif",
              fontSize: "clamp(22px, 5vw, 40px)",
              fontWeight: 300,
              color: open ? "#ffffff" : "rgba(255,255,255,0.8)",
              lineHeight: 1,
              transition: "color 0.3s ease",
            }}>
              {project.client}
            </div>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              marginTop: "5px",
              display: "flex",
              gap: "16px",
            }}>
              <span>{project.type}</span>
              <span style={{ color: "rgba(255,166,0,0.5)" }}>—</span>
              <span>{project.year}</span>
            </div>
          </div>
        </div>
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

      <div style={{ maxHeight: open ? "600px" : "0", overflow: "hidden", transition: "max-height 0.5s ease" }}>
        <div style={{ paddingLeft: "38px", paddingBottom: "32px" }}>
          <p style={{
            fontFamily: "'Inria Serif', serif",
            fontSize: "clamp(15px, 2vw, 18px)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.6,
            margin: "0 0 24px",
          }}>
            {project.headline}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
            {project.points.map((point, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{
                  color: "rgb(255,166,0)",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  marginTop: "3px",
                  flexShrink: 0,
                }}>→</span>
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.7,
                }}>
                  {point}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {project.tags.map((tag) => (
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

export default function About() {
  const [heroRef, heroVisible] = useInView(0.1);
  const [storyRef, storyVisible] = useInView(0.1);
  const [projectsRef, projectsVisible] = useInView(0.1);
  const [valuesRef, valuesVisible] = useInView(0.1);
  const [teamRef, teamVisible] = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inria+Serif:ital,wght@0,300;0,400;1,300&family=DM+Mono:wght@300;400&display=swap');
        .abt-section { background: rgb(15,13,13); overflow: hidden; }
        .abt-inner { max-width: 900px; margin: 0 auto; padding: 0 24px; }
        .abt-marquee-wrap {
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 14px 0;
        }
        .abt-marquee-track {
          display: flex;
          gap: 40px;
          width: max-content;
          animation: abt-scroll 25s linear infinite;
        }
        .abt-marquee-item {
          font-family: 'Inria Serif', serif;
          font-size: 12px;
          font-style: italic;
          font-weight: 300;
          color: rgba(255,255,255,0.12);
          letter-spacing: 0.1em;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 40px;
        }
        .abt-marquee-dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: rgb(255,166,0); opacity: 0.5; flex-shrink: 0;
        }
        @keyframes abt-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .abt-team-card {
          border: 1px solid rgba(255,255,255,0.07);
          padding: 32px;
          display: flex;
          align-items: center;
          gap: 24px;
          transition: border-color 0.3s ease;
        }
        .abt-team-card:hover { border-color: rgba(255,166,0,0.3); }
      `}</style>

      <section className="abt-section">

        {/* HERO */}
        <div style={{ padding: "140px 0 80px" }}>
          <div className="abt-inner">
            <div ref={heroRef}>
              <p style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgb(255,166,0)",
                margin: "0 0 20px",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}>
                — Om oss
              </p>
              <h1 style={{
                fontFamily: "'Inria Serif', serif",
                fontSize: "clamp(40px, 8vw, 100px)",
                fontWeight: 300,
                color: "#fafafa",
                lineHeight: 0.95,
                margin: "0 0 40px",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
              }}>
                Vi är <em style={{ fontStyle: "italic", color: "rgb(255,166,0)" }}>Simple</em><br />
                — en studio<br />
                utan kompromiss
              </h1>
              <p style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "12px",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.15em",
                margin: 0,
                opacity: heroVisible ? 1 : 0,
                transition: "opacity 0.8s ease 0.3s",
              }}>
                STOCKHOLM — GRUNDAT 2025
              </p>
            </div>
          </div>
        </div>

        {/* MARQUEE 1 */}
        <div className="abt-marquee-wrap">
          <div className="abt-marquee-track">
            {[...Array(2)].map((_, i) =>
              ["Design", "Development", "Motion", "Strategy", "Identity", "E-Commerce"].map((item) => (
                <div key={`${i}-${item}`} className="abt-marquee-item">
                  {item}<span className="abt-marquee-dot" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* STORY */}
        <div style={{ padding: "100px 0" }}>
          <div className="abt-inner">
            <div ref={storyRef}>
              <div style={{
                opacity: storyVisible ? 1 : 0,
                transform: storyVisible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.8s ease, transform 0.8s ease",
              }}>
                <p style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgb(255,166,0)",
                  margin: "0 0 20px",
                }}>
                  — Vår historia
                </p>
                <p style={{
                  fontFamily: "'Inria Serif', serif",
                  fontSize: "clamp(18px, 3vw, 26px)",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.6,
                  margin: "0 0 24px",
                }}>
                  Simple startades med en enkel övertygelse — att bra design och solid kod inte ska behöva vara två separata saker.
                </p>
                <p style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.3)",
                  lineHeight: 1.8,
                  margin: 0,
                }}>
                  Vi är ett litet men ambitiöst studio baserat i Stockholm. Vi jobbar nära våra kunder — från idé till lansering — och behandlar varje projekt som om det vore vårt eget varumärke.
                </p>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                marginTop: "48px",
                opacity: storyVisible ? 1 : 0,
                transition: "opacity 0.8s ease 0.2s",
              }}>
                {[
                  { num: "4", suffix: "+", label: "Projekt" },
                  { num: "3", suffix: "år", label: "Erfarenhet" },
                  { num: "100", suffix: "%", label: "Nöjda kunder" },
                ].map((stat, i) => (
                  <div key={i} style={{
                    padding: "32px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
                    paddingRight: i < 2 ? "24px" : "0",
                    paddingLeft: i > 0 ? "24px" : "0",
                  }}>
                    <div style={{
                      fontFamily: "'Inria Serif', serif",
                      fontSize: "clamp(28px, 5vw, 48px)",
                      fontWeight: 300,
                      color: "#fafafa",
                      lineHeight: 1,
                    }}>
                      {stat.num}<em style={{ fontStyle: "normal", color: "rgb(255,166,0)" }}>{stat.suffix}</em>
                    </div>
                    <div style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.25)",
                      marginTop: "6px",
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MARQUEE 2 */}
        <div className="abt-marquee-wrap">
          <div className="abt-marquee-track" style={{ animationDirection: "reverse" }}>
            {[...Array(2)].map((_, i) =>
              ["Stockholm", "Sverige", "Skandinavisk Design", "Modern Webb", "Kreativt Studio"].map((item) => (
                <div key={`${i}-${item}`} className="abt-marquee-item">
                  {item}<span className="abt-marquee-dot" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* PROJEKT */}
        <div style={{ padding: "100px 0" }}>
          <div className="abt-inner">
            <div ref={projectsRef}>
              <p style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgb(255,166,0)",
                margin: "0 0 20px",
                opacity: projectsVisible ? 1 : 0,
                transform: projectsVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}>
                — Utvalda projekt
              </p>
              <h2 style={{
                fontFamily: "'Inria Serif', serif",
                fontSize: "clamp(32px, 6vw, 72px)",
                fontWeight: 300,
                color: "#fafafa",
                lineHeight: 0.95,
                margin: "0 0 48px",
                opacity: projectsVisible ? 1 : 0,
                transform: projectsVisible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
              }}>
                Arbete vi är<br />
                <em style={{ fontStyle: "italic", color: "rgb(255,166,0)" }}>stolta</em> över
              </h2>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              {projects.map((p, i) => (
                <ProjectCard key={p.number} project={p} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* VALUES */}
        <div style={{ padding: "0 0 100px" }}>
          <div className="abt-inner">
            <div ref={valuesRef}>
              <p style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgb(255,166,0)",
                margin: "0 0 20px",
                opacity: valuesVisible ? 1 : 0,
                transform: valuesVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}>
                — Våra värderingar
              </p>
              <h2 style={{
                fontFamily: "'Inria Serif', serif",
                fontSize: "clamp(32px, 6vw, 72px)",
                fontWeight: 300,
                color: "#fafafa",
                lineHeight: 0.95,
                margin: "0 0 48px",
                opacity: valuesVisible ? 1 : 0,
                transform: valuesVisible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
              }}>
                Det vi tror på
              </h2>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              {values.map((v, i) => (
                <ValueRow key={v.number} item={v} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* TEAM */}
        <div style={{ padding: "0 0 120px" }}>
          <div className="abt-inner">
            <div ref={teamRef}>
              <p style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgb(255,166,0)",
                margin: "0 0 20px",
                opacity: teamVisible ? 1 : 0,
                transform: teamVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}>
                — Teamet
              </p>
              <h2 style={{
                fontFamily: "'Inria Serif', serif",
                fontSize: "clamp(32px, 6vw, 72px)",
                fontWeight: 300,
                color: "#fafafa",
                lineHeight: 0.95,
                margin: "0 0 40px",
                opacity: teamVisible ? 1 : 0,
                transform: teamVisible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
              }}>
                Människorna<br />
                <em style={{ fontStyle: "italic", color: "rgb(255,166,0)" }}>bakom</em> Simple
              </h2>
              <div style={{
                opacity: teamVisible ? 1 : 0,
                transform: teamVisible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
              }}>
                {team.map((member) => (
                  <div key={member.name} className="abt-team-card">
                    <div style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "rgba(255,166,0,0.1)",
                      border: "1px solid rgba(255,166,0,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Inria Serif', serif",
                      fontSize: "22px",
                      fontWeight: 300,
                      color: "rgb(255,166,0)",
                      flexShrink: 0,
                    }}>
                      {member.letter}
                    </div>
                    <div>
                      <div style={{
                        fontFamily: "'Inria Serif', serif",
                        fontSize: "22px",
                        fontWeight: 300,
                        color: "#fafafa",
                        lineHeight: 1,
                      }}>
                        {member.name}
                      </div>
                      <div style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "10px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.25)",
                        marginTop: "6px",
                      }}>
                        {member.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}