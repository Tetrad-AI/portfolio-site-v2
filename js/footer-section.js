import { LitElement, html } from "https://esm.run/lit";

class FooterSection extends LitElement {
  static get properties() {
    return {
      footerData: { type: Object },
    };
  }

  constructor() {
    super();
    this.footerData = {};
  }

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadFooterData();
  }

  async loadFooterData() {
    try {
      const response = await fetch("/contents/footer.json");
      this.footerData = await response.json();
    } catch (error) {
      console.error("Error loading footer data:", error);
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  render() {
    return html`
      <footer class="footer">
        <div class="footer-container">
          <div class="footer-content">
            <div class="footer-brand">
              <div class="brand-logo">
                <img
                  src="/images/logo.png"
                  alt="Tetrad AI"
                  class="footer-logo"
                />
              </div>
              <p class="brand-tagline">Four Dimensions of Data Excellence</p>
              <p class="brand-description">
                ${this.footerData.description ||
                "Transforming businesses through cutting-edge AI solutions and data engineering excellence."}
              </p>
            </div>

            <div class="footer-links">
              <div class="link-group">
                <h4 class="link-group-title">Solutions</h4>
                <ul class="link-list">
                  <li>
                    <a href="#solutions" class="footer-link"
                      >Artificial Intelligence</a
                    >
                  </li>
                  <li>
                    <a href="#solutions" class="footer-link">Web Development</a>
                  </li>
                  <li>
                    <a href="#solutions" class="footer-link"
                      >Data Engineering</a
                    >
                  </li>
                  <li>
                    <a href="#solutions" class="footer-link">Data Analytics</a>
                  </li>
                  <li>
                    <a href="#solutions" class="footer-link"
                      >Power BI Consulting</a
                    >
                  </li>
                </ul>
              </div>

              <div class="link-group">
                <h4 class="link-group-title">Company</h4>
                <ul class="link-list">
                  <li><a href="#team" class="footer-link">Our Team</a></li>
                  <li>
                    <a href="#portfolio" class="footer-link">Portfolio</a>
                  </li>
                  <li><a href="#culture" class="footer-link">Culture</a></li>
                  <li><a href="#blog" class="footer-link">Blog</a></li>
                </ul>
              </div>

              <div class="link-group">
                <h4 class="link-group-title">Connect</h4>
                <ul class="link-list">
                  <li>
                    <a href="mailto:hello@tetradai.com" class="footer-link"
                      >Email Us</a
                    >
                  </li>
                  <li><a href="#contact" class="footer-link">Contact</a></li>
                  <li><a href="#" class="footer-link">LinkedIn</a></li>
                  <li><a href="#" class="footer-link">GitHub</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <div class="footer-bottom-content">
              <p class="copyright">
                © ${new Date().getFullYear()} Tetrad AI. All rights reserved.
              </p>
              <div class="footer-actions">
                <button @click="${this.scrollToTop}" class="back-to-top">
                  <i class="fas fa-rocket"></i>
                  <span>Back to Top</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style>
        .footer {
          background: linear-gradient(
            180deg,
            rgba(0, 1, 26, 1) 0%,
            rgba(0, 1, 26, 0.98) 50%,
            rgba(0, 0, 10, 1) 100%
          );
          border-top: 1px solid rgba(0, 212, 255, 0.1);
          position: relative;
        }

        .footer::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(
              circle at 25% 25%,
              rgba(0, 212, 255, 0.02) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 75% 75%,
              rgba(21, 0, 255, 0.02) 0%,
              transparent 50%
            );
          pointer-events: none;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem 1rem;
          position: relative;
          z-index: 2;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          margin-bottom: 3rem;
        }

        .footer-brand {
          max-width: 400px;
        }

        .brand-logo {
          margin-bottom: 1.5rem;
        }

        .footer-logo {
          height: 32px;
          width: auto;
          max-width: 250px;
          object-fit: contain;
        }

        .brand-tagline {
          font-family: "Rajdhani", sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: #00d4ff;
          letter-spacing: 0.5px;
        }

        .brand-description {
          font-family: "Inter", sans-serif;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin: 0;
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .link-group-title {
          font-family: "Rajdhani", sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #00d4ff;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .link-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .link-list li {
          margin-bottom: 0.8rem;
        }

        .footer-link {
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
        }

        .footer-link:hover {
          color: #00d4ff;
          transform: translateX(3px);
        }

        .footer-link::before {
          content: "▶";
          position: absolute;
          left: -15px;
          color: #00d4ff;
          font-size: 0.6rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .footer-link:hover::before {
          opacity: 1;
        }

        .footer-bottom {
          border-top: 1px solid rgba(0, 212, 255, 0.1);
          padding-top: 2rem;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .copyright {
          font-family: "Inter", sans-serif;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
        }

        .back-to-top {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0, 212, 255, 0.1);
          border: 1px solid rgba(0, 212, 255, 0.2);
          color: #00d4ff;
          padding: 0.8rem 1.5rem;
          font-family: "Rajdhani", sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
        }

        .back-to-top:hover {
          background: rgba(0, 212, 255, 0.2);
          border-color: rgba(0, 212, 255, 0.4);
          transform: translateY(-2px);
        }

        .back-to-top i {
          font-size: 0.9rem;
          transition: transform 0.3s ease;
        }

        .back-to-top:hover i {
          transform: translateY(-2px);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .footer-container {
            padding: 2rem 1rem 1rem;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            margin-bottom: 2rem;
          }

          .footer-links {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .footer-logo {
            height: 24px;
            max-width: 180px;
          }

          .brand-tagline {
            font-size: 1rem;
          }

          .brand-description {
            font-size: 0.9rem;
          }

          .footer-bottom-content {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .back-to-top {
            padding: 0.6rem 1.2rem;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 480px) {
          .footer-container {
            padding: 1.5rem 1rem 1rem;
          }

          .footer-logo {
            height: 20px;
            max-width: 150px;
          }

          .brand-tagline {
            font-size: 0.9rem;
          }

          .brand-description {
            font-size: 0.85rem;
          }

          .link-group-title {
            font-size: 1.1rem;
          }

          .footer-link {
            font-size: 0.85rem;
          }

          .copyright {
            font-size: 0.8rem;
          }

          .back-to-top {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
          }
        }

        /* Large Desktop */
        @media (min-width: 1400px) {
          .footer-container {
            padding: 4rem 2rem 1.5rem;
          }

          .footer-content {
            gap: 5rem;
            margin-bottom: 4rem;
          }

          .footer-logo {
            height: 40px;
            max-width: 300px;
          }

          .brand-tagline {
            font-size: 1.2rem;
          }

          .brand-description {
            font-size: 1rem;
          }

          .footer-links {
            gap: 2.5rem;
          }
        }
      </style>
    `;
  }
}

customElements.define("footer-section", FooterSection);
