import React, { useEffect, useRef, useState } from 'react';
import Iphone from '../assets/Iphone.png'
import ImageCarousel from './Album'

const StartPage = () => {
  const [visibility, setVisibility] = useState({
    h2: false,
    p1: false,
    p2: false,
    p3: false,
    p4: false,
    span1: false,
    span2: false,
    span3: false,
    span4: false,
  });

  const textRefs = useRef([]);
  const h2Ref = useRef(null);
  const spanRefs = useRef([]);

  useEffect(() => {
    textRefs.current = textRefs.current.slice(0, 4);
    spanRefs.current = spanRefs.current.slice(0, 4);

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { target } = entry;

        if (target === h2Ref.current) {
          setVisibility((prev) => ({
            ...prev,
            h2: entry.isIntersecting, 
          }));
        }
        if (spanRefs.current.includes(target)) {
          const index = spanRefs.current.indexOf(target);
          setVisibility((prev) => ({
            ...prev,
            [`span${index + 1}`]: entry.isIntersecting, 
          }));
        }

        if (textRefs.current.includes(target)) {
          const index = textRefs.current.indexOf(target);
          setVisibility((prev) => ({
            ...prev,
            [`p${index + 1}`]: entry.isIntersecting,
          }));
        }
      });
    }, options);

    if (h2Ref.current) {
      observer.observe(h2Ref.current);
    }
    textRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    spanRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (h2Ref.current) {
        observer.unobserve(h2Ref.current);
      }
      textRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      spanRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="Home">
      <div className='Service'>
      <div>
        <h2
          ref={h2Ref} 
          className={visibility.h2 ? 'in-view' : 'out-of-view'}
        >
          Simple Web Studio
        </h2>

        <p
          ref={(el) => (textRefs.current[0] = el)} 
          className={visibility.p1 ? 'in-view' : 'out-of-view'}
        >
          We are the obvious choice for those looking for a <span
            ref={(el) => (spanRefs.current[0] = el)} 
            className={visibility.span1 ? 'in-view' : 'out-of-view'}
          >
            simple,
          </span>
        </p>

        <p
          ref={(el) => (textRefs.current[1] = el)} 
          className={visibility.p2 ? 'in-view' : 'out-of-view'}
        >
          sleek, and <span
            ref={(el) => (spanRefs.current[1] = el)} 
            className={visibility.span2 ? 'in-view' : 'out-of-view'}
          >
            affordable
          </span> website.
        </p>

        <p
          ref={(el) => (textRefs.current[2] = el)} 
          className={visibility.p3 ? 'in-view' : 'out-of-view'}
        >
          Our goal is to create <span
            ref={(el) => (spanRefs.current[2] = el)} 
            className={visibility.span3 ? 'in-view' : 'out-of-view'}
          >
            user-friendly
          </span> solutions that fit both your budget and your needs.
        </p>

        <p
          ref={(el) => (textRefs.current[3] = el)} 
          className={visibility.p4 ? 'in-view' : 'out-of-view'}
        >
          Simplicity meets functionality – without compromising on <span
            ref={(el) => (spanRefs.current[3] = el)}
            className={visibility.span4 ? 'in-view' : 'out-of-view'}
          >
            quality.
          </span>
        </p>
      </div>
      <img src={Iphone} alt="" />

      </div>
      <div className='Album'>
      <ImageCarousel/>

      </div>
    </div>
  );
};

export default StartPage;

