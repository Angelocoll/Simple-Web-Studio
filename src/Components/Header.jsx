import { useState, useEffect, useRef } from "react";
import heroImage from "../assets/Hero.webp";
import { Link } from "react-router-dom";

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

const PADDING_TOP = 16;
const PADDING_LEFT = 24;

export default function Header() {
  const [t, setT] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    // Trigger fade-in animation vid mount
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const heroHeight = heroRef.current?.clientHeight ?? window.innerHeight;
        const raw = clamp(window.scrollY / heroHeight, 0, 1);
        setT(raw);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const w = window.innerWidth;

  // Fontstorlek för "Simple"
// Fontstorlek för "Simple"
const fontStart = w > 1200 ? 96 : w > 768 ? 72 : 52;  // större i hero
const fontEnd   = w > 768  ? 28 : 20;                   // samma i hörnet

// "WEB STUDIO"
const subStart = fontStart * 0.20;   // samma förhållande i hero
const subEnd   = fontEnd   * 0.20;   // mindre i hörnet (var 0.52)

  const fontSize = lerp(fontStart, fontEnd, t);
  const subSize  = lerp(subStart, subEnd, t);

  // Approximera logotypens storlek för centrering
  // "Simple" i Inria Serif ≈ 0.58× fontSize per tecken, 6 tecken
  const logoW = fontSize * 0.58 * 6;
  const logoH = fontSize + subSize + 6;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const startLeft = centerX - logoW / 2;
  const startTop  = centerY - logoH / 2;

  const left = lerp(startLeft, PADDING_LEFT, t);
  const top  = lerp(startTop, PADDING_TOP, t);

  return (
    <div>
      <div
        className="hero-section"
        ref={heroRef}
        style={{ height: "100vh" }}
      >
        <img className="hero-image" src={heroImage} alt="" />
      </div>

      <header>
        <div
          style={{
            position: "fixed",
            top: `${top}px`,
            left: `${left}px`,
            transform: "none",
            display: isMenuOpen ? "none" : "block",
            // Fade-in vid sidladdning, sedan ingen transition vid scroll
            opacity: loaded ? 1 : 0,
            transition: loaded && t === 0
              ? "opacity 1s ease-in"
              : "none",
            willChange: "top, left",
            fontFamily: '"Inria Serif", serif',
            color: "white",
            lineHeight: 1.1,
          }}
        >
          <div style={{ fontSize: `${fontSize}px`, fontWeight: 400 }}>
            Simple
          </div>
          <span style={{
            fontSize: `${subSize}px`,
            color: "rgb(164, 164, 164)",
            letterSpacing: "0.3em",
            display: "block",
            textAlign: "center",
            marginTop: "6px",
          }}>
            WEB STUDIO
          </span>
        </div>

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
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </div>
    </div>
  );
}