import { useState, useEffect, useRef } from "react";
import heroImage from "../assets/Hero.webp";

export default function Header() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); 

  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        const heroHeight = heroRef.current.clientHeight;
        const scrollPosition = window.scrollY;
        const scrollPercentage = (scrollPosition / heroHeight) * 100;
        setScrollPercent(scrollPercentage);
      });
    };

    window.addEventListener("scroll", handleScroll);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"; 
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const logoVerticalPosition = (scrollPercent / 100) * 50;
  const logoHorizontalPosition = (scrollPercent / 100) * 50;

  let topPosition, leftPosition, logoFontSize;

   if (screenWidth > 1600) {
    topPosition = Math.max(3, 45 - logoVerticalPosition); 
    leftPosition = Math.max(6, 50 - logoHorizontalPosition); 
    logoFontSize = Math.max(160 - (scrollPercent / 100) * (160 - 48), 48);  
  } 
  else if (screenWidth > 1200) {
    topPosition = Math.max(7, 45 - logoVerticalPosition); 
    leftPosition = Math.max(7, 50 - logoHorizontalPosition); 
    logoFontSize = Math.max(140 - (scrollPercent / 100) * (140 - 48), 48);  
  } else if (screenWidth > 768) {
    topPosition = Math.max(5, 45 - logoVerticalPosition); 
    leftPosition = Math.max(10, 50 - logoHorizontalPosition); 
    logoFontSize = Math.max(100 - (scrollPercent / 100) * (100 - 40), 40);  
  } else {
    topPosition = Math.max(7, 45 - logoVerticalPosition); 
    leftPosition = Math.max(15, 50 - logoHorizontalPosition); 
    logoFontSize = Math.max(80 - (scrollPercent / 100) * (80 - 20), 26);  
  }

  const webStudioFontSize = Math.max(24 - (scrollPercent / 100) * (24 - 6), 8);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div
        className="hero-section"
        ref={heroRef}
        style={{
          height: "100vh", 
        }}
      > <img className="hero-image" src={heroImage} alt="" /></div>
     

      <header>
        <div
          className="Logo"
          style={{
            top: `${topPosition}vh`, 
            left: `${leftPosition}vw`, 
            display: isMenuOpen ? "none" : "block",
            fontSize: `${logoFontSize}px`, // Dynamisk storlek för logotypen beroende på scroll och skärmstorlek
          }}
        >
          <div style={{ fontSize: `${logoFontSize}px` }}>Simple</div>
          <span style={{ fontSize: `${webStudioFontSize}px` }}>
            WEB STUDIO
          </span>
        </div>

        <div
          className={`Menu ${isMenuOpen ? "open" : ""}`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
        >
          <div className={`Menu-line ${isMenuOpen ? "rotate1" : ""}`}></div>
          <div className={`Menu-line ${isMenuOpen ? "hidden" : ""}`}></div>
          <div className={`Menu-line ${isMenuOpen ? "rotate2" : ""}`}></div>
        </div>
      </header>

      <div className={`fullscreen-menu ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </div>
    </div>
  );
}
