import { LitElement, html } from "https://esm.run/lit";

class CultureSection extends LitElement {
  static get properties() {
    return {
      cultureData: { type: Object },
    };
  }

  constructor() {
    super();
    this.cultureData = {};
  }

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadCultureData();
  }

  async loadCultureData() {
    try {
      const response = await fetch("/contents/culture.json");
      this.cultureData = await response.json();
    } catch (error) {
      console.error("Error loading culture data:", error);
    }
  }

  render() {
    return html`
      <section class="culture" id="culture">
        <div class="culture-container">
          <div class="section-header">
            <h2 class="culture-title">
              ${this.cultureData.title || "Tetrad Family Culture"}
            </h2>
            <h3 class="culture-subtitle">
              ${this.cultureData.subtitle || "Our Constellation of Values"}
            </h3>
            <p class="culture-description">
              ${this.cultureData.description ||
              "At Tetrad AI, we believe in the power of collaboration, innovation, and continuous learning."}
            </p>
          </div>

          <div class="culture-content">
            <div class="team-showcase">
              <div class="team-image-container">
                <img
                  src="${this.cultureData.teamPhoto || "/images/team/team.jpg"}"
                  alt="Tetrad AI Team"
                  class="team-image"
                />
                <div class="image-border"></div>
              </div>
              <div class="team-info">
                <h4 class="team-heading">The Tetrad Constellation</h4>
                <p class="team-text">
                  Four dimensions of expertise working in perfect harmony to
                  deliver exceptional AI and data solutions.
                </p>
              </div>
            </div>

            <div class="values-section">
              <div class="values-grid">
                ${this.cultureData.values?.map(
                  (value) => html`
                    <div class="value-item">
                      <div class="value-header">
                        <div class="value-icon">
                          <i class="${value.icon}"></i>
                        </div>
                        <h5 class="value-name">${value.title}</h5>
                      </div>
                      <p class="value-text">${value.description}</p>
                    </div>
                  `
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>
        .culture {
          padding: 6rem 0;
          background: linear-gradient(
            180deg,
            rgba(0, 1, 26, 1) 0%,
            rgba(0, 1, 26, 0.98) 50%,
            rgba(0, 1, 26, 1) 100%
          );
          position: relative;
        }

        .culture::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(
              circle at 20% 30%,
              rgba(0, 212, 255, 0.02) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 70%,
              rgba(21, 0, 255, 0.02) 0%,
              transparent 50%
            );
          pointer-events: none;
        }

        .culture-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 2;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .culture-title {
          font-family: "Orbitron", monospace;
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 1rem;
          color: #ffffff;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
          letter-spacing: 2px;
        }

        .culture-subtitle {
          font-family: "Rajdhani", sans-serif;
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 2rem;
          color: #00d4ff;
          letter-spacing: 1px;
        }

        .culture-description {
          font-family: "Inter", sans-serif;
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .culture-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .team-showcase {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(0, 212, 255, 0.1);
          padding: 2.5rem;
          transition: all 0.3s ease;
        }

        .team-showcase:hover {
          border-color: rgba(0, 212, 255, 0.3);
          background: rgba(255, 255, 255, 0.04);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 212, 255, 0.1);
        }

        .team-image-container {
          position: relative;
          margin-bottom: 2rem;
          aspect-ratio: 16/9;
          overflow: hidden;
        }

        .team-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.3s ease;
        }

        .team-showcase:hover .team-image {
          transform: scale(1.02);
        }

        .image-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 2px solid transparent;
          background: linear-gradient(45deg, #00d4ff, transparent, #1500ff)
            border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: subtract;
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          mask-composite: subtract;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .team-showcase:hover .image-border {
          opacity: 1;
        }

        .team-heading {
          font-family: "Rajdhani", sans-serif;
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #00d4ff;
          letter-spacing: 1px;
        }

        .team-text {
          font-family: "Inter", sans-serif;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin: 0;
        }

        .values-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .values-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .value-item {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(0, 212, 255, 0.1);
          padding: 2rem;
          transition: all 0.3s ease;
          position: relative;
        }

        .value-item::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(180deg, #00d4ff, #1500ff);
          transform: scaleY(0);
          transition: transform 0.3s ease;
        }

        .value-item:hover {
          border-color: rgba(0, 212, 255, 0.3);
          background: rgba(255, 255, 255, 0.04);
          transform: translateX(5px);
        }

        .value-item:hover::before {
          transform: scaleY(1);
        }

        .value-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .value-icon {
          width: 50px;
          height: 50px;
          background: rgba(0, 212, 255, 0.1);
          border: 1px solid rgba(0, 212, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .value-icon i {
          font-size: 1.5rem;
          color: #00d4ff;
        }

        .value-name {
          font-family: "Rajdhani", sans-serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          letter-spacing: 1px;
        }

        .value-text {
          font-family: "Inter", sans-serif;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin: 0;
          padding-left: 3.5rem;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .culture {
            padding: 4rem 0;
          }

          .culture-container {
            padding: 0 1rem;
          }

          .culture-title {
            font-size: 2.5rem;
            letter-spacing: 1px;
          }

          .culture-subtitle {
            font-size: 1.6rem;
          }

          .culture-description {
            font-size: 1rem;
          }

          .culture-content {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .team-showcase {
            padding: 2rem;
          }

          .team-heading {
            font-size: 1.4rem;
          }

          .team-text {
            font-size: 0.95rem;
          }

          .values-grid {
            gap: 1.5rem;
          }

          .value-item {
            padding: 1.5rem;
          }

          .value-header {
            gap: 0.8rem;
          }

          .value-icon {
            width: 40px;
            height: 40px;
          }

          .value-icon i {
            font-size: 1.2rem;
          }

          .value-name {
            font-size: 1.2rem;
          }

          .value-text {
            font-size: 0.9rem;
            padding-left: 3rem;
          }
        }

        @media (max-width: 480px) {
          .culture {
            padding: 3rem 0;
          }

          .culture-title {
            font-size: 2rem;
          }

          .culture-subtitle {
            font-size: 1.4rem;
          }

          .culture-description {
            font-size: 0.95rem;
          }

          .team-showcase {
            padding: 1.5rem;
          }

          .value-item {
            padding: 1.2rem;
          }

          .value-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .value-text {
            padding-left: 0;
          }
        }

        /* Large Desktop */
        @media (min-width: 1400px) {
          .culture-title {
            font-size: 4rem;
            letter-spacing: 3px;
          }

          .culture-subtitle {
            font-size: 2.3rem;
          }

          .culture-description {
            font-size: 1.3rem;
          }

          .culture-content {
            gap: 5rem;
          }
        }
      </style>
    `;
  }
}

customElements.define("culture-section", CultureSection);
