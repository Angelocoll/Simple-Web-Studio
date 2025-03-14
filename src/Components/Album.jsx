import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import img from '../assets/a.webp';
import img1 from '../assets/b.webp';
import img2 from '../assets/c.webp';
import img3 from '../assets/d.webp';
import img4 from '../assets/e.webp';
import img5 from '../assets/aa.webp';
import img6 from '../assets/bb.webp';
import img7 from '../assets/cc.webp';
import img8 from '../assets/dd.webp';
import img9 from '../assets/ee.webp';
import img10 from '../assets/aaa.webp';
import img11 from '../assets/bbb.webp';
import img12 from '../assets/ccc.webp';
import img13 from '../assets/ddd.webp';
import img14 from '../assets/eee.webp';
import img15 from '../assets/aaaa.webp';
import img17 from '../assets/bbbb.webp';
import img18 from '../assets/dddd.webp';
import img19 from '../assets/1.webp';
import img20 from '../assets/2.webp';
import img21 from '../assets/3.webp';
import img22 from '../assets/4.webp';
import img23 from '../assets/5.webp';
import img24 from '../assets/6.webp';
import img25 from '../assets/7.webp';
import img26 from '../assets/8.webp';
import img27 from '../assets/9.webp';
import img28 from '../assets/10.webp';


const images = [
  img,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img19,
  img20,
  img21,
  img22,
  img23,

  img10,
  img11,
  img15,
  img17,
  img9,
  img14,
  img13,
  img12,
  img18,
  img24,
  img25,
  img26,
  img27,
  img28,
];
const images2 = [
  img10,
  img11,
  img15,
  img17,
  img9,
  img14,
  img13,
  img12,
  img18,
  img24,
  img25,
  img26,
  img27,
  img28,

  img,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img19,
  img20,
  img21,
  img22,
  img23,
];

export default function ImageCarousel() {
  const carouselRef1 = useRef(null);
  const carouselRef2 = useRef(null);

  useEffect(() => {
    const scroll = (ref, direction) => {
      if (ref.current) {
        // Första karusellen (scrollar åt höger)
        if (ref.current.scrollLeft >= ref.current.scrollWidth - ref.current.clientWidth) {
          // När vi når slutet av karusellen, hoppa till början
          ref.current.scrollLeft = 0;
        } else {
          ref.current.scrollLeft += direction;
        }
      }
    };

    // Första karusellen (scrollar åt höger)
    const interval1 = setInterval(() => scroll(carouselRef1, 1), 50);

    // Andra karusellen (scrollar åt vänster, starta vid slutet)
    const interval2 = setInterval(() => scroll(carouselRef2, -1), 50);

    // Se till att vi börjar på slutet för den andra karusellen
    if (carouselRef2.current) {
      carouselRef2.current.scrollLeft = carouselRef2.current.scrollWidth;
    }

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", gap: "0px" }}>
      {/* Första Karusellen (går åt höger) */}
      <div className="Carusell" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <motion.div
          ref={carouselRef1}
          style={{
            width: "100%",
            display: "flex",
            overflowX: "scroll",
            whiteSpace: "nowrap",
            gap: "16px",
            padding: "0px",
            scrollBehavior: "smooth",
            flexDirection: "row", // Normalt läge, scrolla åt höger
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none",
          }}
        >
          {[...images, ...images].map((src, index) => (
            <div key={index} style={{ minWidth: "250px", background: "#d1d1d1" }}>
              <img src={src} alt={`Slide ${index}`} style={{ width: "100%" }} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Andra Karusellen (går åt vänster, overflow till vänster) */}
      <div className="Carusell" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <motion.div
          ref={carouselRef2}
          style={{
            width: "100%",
            display: "flex",
            overflowX: "scroll",
            whiteSpace: "nowrap",
            gap: "16px",
            padding: "0px",
            scrollBehavior: "smooth",
            flexDirection: "row-reverse", // Byter riktning så karusellen scrollar åt vänster
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none",
            marginTop:"16px"
          }}
        >
          {[...images2, ...images2].map((src, index) => (
            <div key={index} style={{ minWidth: "250px", background: "#d1d1d1" }}>
              <img src={src} alt={`Slide ${index}`} style={{ width: "100%" }} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
