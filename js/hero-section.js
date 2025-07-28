import { LitElement, html } from "https://esm.run/lit";

class HeroSection extends LitElement {
  static get properties() {
    return {
      heroData: { type: Object },
    };
  }

  constructor() {
    super();
    this.heroData = {};
  }

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadHeroData();
  }

  async loadHeroData() {
    try {
      const response = await fetch("/contents/hero.json");
      this.heroData = await response.json();
    } catch (error) {
      console.error("Error loading hero data:", error);
    }
  }

  render() {
    return html`
      <section class="hero">
        <div class="hero-background">
          <img
            src="/images/hero.jpg"
            alt="Tetrad AI Background"
            class="hero-bg-image"
          />
          <div class="hero-overlay"></div>
        </div>

        <div class="hero-container">
          <div class="hero-content">
            <div class="hero-logo">
              <img
                src="${this.heroData.logo || "/images/logo.png"}"
                alt="Tetrad AI"
                class="hero-logo-image"
              />
            </div>
            <h2 class="hero-tagline">
              ${this.heroData.tagline || "Four Dimensions of Data Excellence"}
            </h2>
            <p class="hero-description">
              ${this.heroData.description ||
              "Transforming businesses through cutting-edge AI solutions and data engineering excellence."}
            </p>

            ${this.heroData.cta_text
              ? html`<a
                  href="${this.heroData.cta_link || "#solutions"}"
                  class="hero-cta"
                  >${this.heroData.cta_text} <i class="fas fa-rocket"></i
                ></a>`
              : ""}
          </div>
        </div>
      </section>

      <style>
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding-top: 80px;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .hero-bg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.2);
          filter: blur(4px);
          object-position: center;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(0, 1, 26, 0.5) 0%,
            rgba(0, 1, 26, 0.7) 50%,
            rgba(0, 1, 26, 0.5) 100%
          );
        }

        .hero-container {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
        }

        .hero-logo {
          margin-bottom: 2rem;
          animation: logoGlow 3s ease-in-out infinite alternate;
        }

        .hero-logo-image {
          height: 80px;
          width: auto;
          max-width: 600px;
          object-fit: contain;
          filter: drop-shadow(0 0 15px rgba(0, 212, 255, 0.3));
          transition: filter 0.3s ease;
        }

        .hero-tagline {
          font-family: "Rajdhani", sans-serif;
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 2rem;
          color: #00d4ff;
          text-shadow: 0 0 15px rgba(0, 212, 255, 0.4);
          letter-spacing: 1px;
          animation: taglineSlide 1s ease-out;
        }

        .hero-description {
          font-family: "Inter", sans-serif;
          font-size: 1.2rem;
          font-weight: 400;
          margin-bottom: 3rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.8;
          animation: descriptionFade 1.2s ease-out;
        }

        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1.2rem 2.5rem;
          background: rgba(0, 212, 255, 0.1);
          border: 2px solid #00d4ff;
          color: #00d4ff;
          text-decoration: none;
          border-radius: 0;
          font-family: "Rajdhani", sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 212, 255, 0.1);
          animation: ctaPulse 2s ease-in-out infinite;
        }

        .hero-cta:hover {
          background: rgba(0, 212, 255, 0.2);
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 212, 255, 0.3);
        }

        .hero-cta i {
          font-size: 1rem;
          transition: transform 0.3s ease;
        }

        .hero-cta:hover i {
          transform: translateX(5px);
        }

        /* Animations */
        @keyframes logoGlow {
          0% {
            filter: drop-shadow(0 0 15px rgba(0, 212, 255, 0.3));
          }
          100% {
            filter: drop-shadow(0 0 25px rgba(0, 212, 255, 0.4));
          }
        }

        @keyframes taglineSlide {
          0% {
            transform: translateX(-50px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes descriptionFade {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ctaPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .hero {
            padding-top: 70px;
          }

          .hero-container {
            padding: 0 1rem;
          }

          .hero-logo {
            margin-bottom: 1.5rem;
          }

          .hero-logo-image {
            height: 50px;
            max-width: 350px;
          }

          .hero-tagline {
            font-size: 1.3rem;
            margin-bottom: 1.5rem;
          }

          .hero-description {
            font-size: 1rem;
            margin-bottom: 2rem;
            padding: 0 1rem;
          }

          .hero-cta {
            padding: 1rem 2rem;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .hero-logo-image {
            height: 40px;
            max-width: 280px;
          }

          .hero-tagline {
            font-size: 1.1rem;
          }

          .hero-description {
            font-size: 0.95rem;
            padding: 0 0.5rem;
          }
        }

        /* Large Desktop */
        @media (min-width: 1400px) {
          .hero-logo-image {
            height: 100px;
            max-width: 800px;
          }

          .hero-tagline {
            font-size: 2.2rem;
          }

          .hero-description {
            font-size: 1.3rem;
          }
        }
      </style>
    `;
  }
}

customElements.define("hero-section", HeroSection);
