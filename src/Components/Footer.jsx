import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <style>{`
        .footer {
          background: rgb(255, 166, 0);
          border-top: 0.5px solid rgba(0,0,0,0.15);
          font-family: 'DM Mono', monospace;
          padding: 2.5rem 3rem 2rem;
          margin-top: 16px;
        }

        .footer__top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .footer__nav {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .footer__social {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.6rem;
        }

        .footer__link {
          color: rgba(0,0,0,0.55) !important;
          text-decoration: none !important;
          font-size: 12px !important;
          letter-spacing: 0.12em !important;
          text-transform: uppercase !important;
          font-family: 'DM Mono', monospace !important;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .footer__bottom {
          border-top: 0.5px solid rgba(0,0,0,0.15);
          padding-top: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer__brand-name {
          font-size: 11px !important;
          letter-spacing: 0.2em !important;
          text-transform: uppercase !important;
          color: rgba(0,0,0,0.5) !important;
          margin: 0 !important;
          font-family: 'DM Mono', monospace !important;
        }

        .footer__copy {
          font-size: 12px !important;
          color: rgba(0,0,0,0.35) !important;
          margin: 0 !important;
          font-family: 'DM Mono', monospace !important;
        }

        @media (max-width: 768px) {
          .footer {
            padding: 2rem 1.5rem 1.5rem;
          }

          .footer__top {
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
            text-align: center;
          }

          .footer__nav {
            align-items: center;
          }

          .footer__social {
            flex-direction: row !important;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }

          .footer__bottom {
            flex-direction: column;
            align-items: center;
            gap: 0.4rem;
            text-align: center;
          }
        }
      `}</style>

      <footer className="footer">

        <div className="footer__top">
          <nav className="footer__nav">
            <Link to="/" className="footer__link">Home</Link>
            <Link to="/services" className="footer__link">Services</Link>
            <Link to="/about" className="footer__link">About</Link>
            <Link to="/contact" className="footer__link">Contact</Link>
          </nav>

          <div className="footer__social">
            <a href="#" className="footer__link">
              <i className="fa-brands fa-instagram" style={{ fontSize: "14px" }}></i>
              Instagram
            </a>
            <a href="#" className="footer__link">
              <i className="fa-brands fa-tiktok" style={{ fontSize: "14px" }}></i>
              TikTok
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__brand-name">Web Studio</p>
          <p className="footer__copy">© 2025 Simple</p>
        </div>

      </footer>
    </>
  )
}

export default Footer