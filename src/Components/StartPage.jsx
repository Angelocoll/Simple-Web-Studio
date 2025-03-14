import React, { useEffect, useRef, useState } from 'react';
import Iphone from '../assets/Iphone.png'
import ImageCarousel from './Album'

const StartPage = () => {
  // Create state to track visibility of <h2>, paragraphs, and spans
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

  // Refs for the elements
  const textRefs = useRef([]);
  const h2Ref = useRef(null);
  const spanRefs = useRef([]);

  useEffect(() => {
    // Slice textRefs to keep it to the correct size (4 paragraphs)
    textRefs.current = textRefs.current.slice(0, 4);
    spanRefs.current = spanRefs.current.slice(0, 4);

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Element should be 50% visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { target } = entry;

        // If the target is an <h2> element
        if (target === h2Ref.current) {
          setVisibility((prev) => ({
            ...prev,
            h2: entry.isIntersecting, // Update visibility for <h2>
          }));
        }

        // If the target is a <span>
        if (spanRefs.current.includes(target)) {
          const index = spanRefs.current.indexOf(target);
          setVisibility((prev) => ({
            ...prev,
            [`span${index + 1}`]: entry.isIntersecting, // Update visibility for <span>
          }));
        }

        // If the target is a <p> tag
        if (textRefs.current.includes(target)) {
          const index = textRefs.current.indexOf(target);
          setVisibility((prev) => ({
            ...prev,
            [`p${index + 1}`]: entry.isIntersecting, // Update visibility for <p>
          }));
        }
      });
    }, options);

    // Start observing each element
    if (h2Ref.current) {
      observer.observe(h2Ref.current);
    }
    textRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    spanRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Cleanup on component unmount
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
      <div>
      <div>
        {/* <h2> element */}
        <h2
          ref={h2Ref} // Assign ref to the <h2> element
          className={visibility.h2 ? 'in-view' : 'out-of-view'}
        >
          Simple Web Studio
        </h2>

        {/* Paragraphs with <span> elements */}
        <p
          ref={(el) => (textRefs.current[0] = el)} // Assign ref to the first paragraph
          className={visibility.p1 ? 'in-view' : 'out-of-view'}
        >
          We are the obvious choice for those looking for a <span
            ref={(el) => (spanRefs.current[0] = el)} // Assign ref to the first <span>
            className={visibility.span1 ? 'in-view' : 'out-of-view'}
          >
            simple,
          </span>
        </p>

        <p
          ref={(el) => (textRefs.current[1] = el)} // Assign ref to the second paragraph
          className={visibility.p2 ? 'in-view' : 'out-of-view'}
        >
          sleek, and <span
            ref={(el) => (spanRefs.current[1] = el)} // Assign ref to the second <span>
            className={visibility.span2 ? 'in-view' : 'out-of-view'}
          >
            affordable
          </span> website.
        </p>

        <p
          ref={(el) => (textRefs.current[2] = el)} // Assign ref to the third paragraph
          className={visibility.p3 ? 'in-view' : 'out-of-view'}
        >
          Our goal is to create <span
            ref={(el) => (spanRefs.current[2] = el)} // Assign ref to the third <span>
            className={visibility.span3 ? 'in-view' : 'out-of-view'}
          >
            user-friendly
          </span> solutions that fit both your budget and your needs.
        </p>

        <p
          ref={(el) => (textRefs.current[3] = el)} // Assign ref to the fourth paragraph
          className={visibility.p4 ? 'in-view' : 'out-of-view'}
        >
          Simplicity meets functionality – without compromising on <span
            ref={(el) => (spanRefs.current[3] = el)} // Assign ref to the fourth <span>
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

