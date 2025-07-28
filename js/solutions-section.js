import { LitElement, html } from "https://esm.run/lit";

class SolutionsSection extends LitElement {
  static get properties() {
    return {
      solutionsData: { type: Object },
    };
  }

  constructor() {
    super();
    this.solutionsData = {};
  }

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadSolutionsData();
  }

  async loadSolutionsData() {
    try {
      const response = await fetch("/contents/solutions.json");
      this.solutionsData = await response.json();
    } catch (error) {
      console.error("Error loading solutions data:", error);
    }
  }

  render() {
    return html`
      <section class="solutions" id="solutions">
        <div class="solutions-container">
          <div class="solutions-header">
            <h2 class="solutions-title">
              ${this.solutionsData.title || "Our Solutions"}
            </h2>
            <p class="solutions-description">
              ${this.solutionsData.description ||
              "Transform your data landscape with our comprehensive suite of AI-powered solutions."}
            </p>
          </div>

          <div class="solutions-grid">
            ${this.solutionsData.solutions?.map(
              (solution) => html`
                <div class="solution-card">
                  <div class="solution-icon">
                    <i class="${solution.icon}"></i>
                  </div>

                  <div class="solution-content">
                    <h3 class="solution-title">${solution.title}</h3>
                    <p class="solution-subtitle">${solution.subtitle}</p>

                    <div class="solution-services">
                      <h4>Services:</h4>
                      <ul class="services-list">
                        ${solution.services?.map(
                          (service) => html`
                            <li>
                              <strong>${service.name}</strong> -
                              ${service.description}
                            </li>
                          `
                        )}
                      </ul>
                    </div>

                    <div class="solution-technologies">
                      <h4>Technologies:</h4>
                      <div class="tech-tags">
                        ${solution.technologies?.map(
                          (tech) => html`<span class="tech-tag">${tech}</span>`
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              `
            )}
          </div>
        </div>
      </section>

      <style>
        .solutions {
          padding: 6rem 0;
          background: linear-gradient(
            180deg,
            rgba(0, 1, 26, 0.9) 0%,
            rgba(0, 1, 26, 0.95) 50%,
            rgba(0, 1, 26, 0.9) 100%
          );
          position: relative;
        }

        .solutions::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(
              circle at 20% 50%,
              rgba(0, 212, 255, 0.03) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 20%,
              rgba(21, 0, 255, 0.03) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 40% 80%,
              rgba(0, 212, 255, 0.02) 0%,
              transparent 50%
            );
          pointer-events: none;
        }

        .solutions-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 2;
        }

        .solutions-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .solutions-title {
          font-family: "Orbitron", monospace;
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
          color: #ffffff;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
          letter-spacing: 2px;
        }

        .solutions-description {
          font-family: "Inter", sans-serif;
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .solutions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .solution-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(0, 212, 255, 0.1);
          border-radius: 0;
          padding: 2.5rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .solution-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #00d4ff, #1500ff);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .solution-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0, 212, 255, 0.3);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 10px 40px rgba(0, 212, 255, 0.1);
        }

        .solution-card:hover::before {
          transform: scaleX(1);
        }

        .solution-icon {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .solution-icon i {
          font-size: 3rem;
          color: #00d4ff;
          text-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
        }

        .solution-title {
          font-family: "Rajdhani", sans-serif;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #ffffff;
          letter-spacing: 1px;
        }

        .solution-subtitle {
          font-family: "Inter", sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #00d4ff;
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .solution-services,
        .solution-technologies {
          margin-bottom: 1.5rem;
        }

        .solution-services h4,
        .solution-technologies h4 {
          font-family: "Rajdhani", sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.8rem;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .services-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .services-list li {
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 0.8rem;
          padding-left: 1rem;
          position: relative;
          line-height: 1.5;
        }

        .services-list li::before {
          content: "▶";
          position: absolute;
          left: 0;
          color: #00d4ff;
          font-size: 0.7rem;
        }

        .services-list li strong {
          color: #ffffff;
          font-weight: 600;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-tag {
          font-family: "Inter", sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          background: rgba(0, 212, 255, 0.1);
          color: #00d4ff;
          padding: 0.3rem 0.8rem;
          border: 1px solid rgba(0, 212, 255, 0.2);
          border-radius: 0;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
        }

        .tech-tag:hover {
          background: rgba(0, 212, 255, 0.2);
          border-color: rgba(0, 212, 255, 0.4);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .solutions {
            padding: 4rem 0;
          }

          .solutions-container {
            padding: 0 1rem;
          }

          .solutions-title {
            font-size: 2.5rem;
            letter-spacing: 1px;
          }

          .solutions-description {
            font-size: 1rem;
            padding: 0 1rem;
          }

          .solutions-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            margin-top: 2rem;
          }

          .solution-card {
            padding: 2rem;
          }

          .solution-icon i {
            font-size: 2.5rem;
          }

          .solution-title {
            font-size: 1.5rem;
          }

          .solution-subtitle {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .solutions {
            padding: 3rem 0;
          }

          .solutions-container {
            padding: 0 1rem;
          }

          .solutions-title {
            font-size: 2rem;
          }

          .solutions-description {
            font-size: 0.95rem;
          }

          .solution-card {
            padding: 1.5rem;
          }

          .solution-icon i {
            font-size: 2rem;
          }

          .solution-title {
            font-size: 1.3rem;
          }

          .tech-tags {
            gap: 0.3rem;
          }

          .tech-tag {
            font-size: 0.75rem;
            padding: 0.2rem 0.6rem;
          }
        }

        /* Large Desktop */
        @media (min-width: 1400px) {
          .solutions-title {
            font-size: 4rem;
            letter-spacing: 3px;
          }

          .solutions-description {
            font-size: 1.3rem;
          }

          .solutions-grid {
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 2.5rem;
          }
        }
      </style>
    `;
  }
}

customElements.define("solutions-section", SolutionsSection);
