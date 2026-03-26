import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
      <header style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "10vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        boxSizing: "border-box",
        zIndex: 1000,
        background: scrolled ? "rgba(15,13,13,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease",
      }}>

        <Link to="/" style={{ textDecoration: "none", lineHeight: 1.1 }}>
          <div style={{
            fontFamily: '"Inria Serif", serif',
            fontSize: "28px",
            fontWeight: 400,
            color: "white",
          }}>
            Simple
          </div>
          <span style={{
            fontFamily: '"Inria Serif", serif',
            fontSize: "9px",
            color: "rgb(164, 164, 164)",
            letterSpacing: "0.3em",
            display: "block",
            textAlign: "center",
          }}>
            WEB STUDIO
          </span>
        </Link>

        <div
          className={`Menu ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="Menu-line" />
          <div className="Menu-line" />
          <div className="Menu-line" />
        </div>
      </header>

      <div className={`fullscreen-menu ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link></li>
          <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
          <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link></li>
        </ul>
      </div>
    </>
  );
}