import { LitElement, html } from "https://esm.run/lit";

class PortfolioSection extends LitElement {
  static get properties() {
    return {
      portfolioData: { type: Object },
    };
  }

  constructor() {
    super();
    this.portfolioData = {};
  }

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadPortfolioData();
  }

  async loadPortfolioData() {
    try {
      const response = await fetch("/contents/portfolio.json");
      this.portfolioData = await response.json();
    } catch (error) {
      console.error("Error loading portfolio data:", error);
    }
  }

  render() {
    return html`
      <section class="portfolio" id="portfolio">
        <div class="portfolio-container">
          <div class="portfolio-header">
            <h2 class="portfolio-title">
              ${this.portfolioData.title || "Our Portfolio"}
            </h2>
            <p class="portfolio-description">
              ${this.portfolioData.description ||
              "Showcasing our expertise through innovative solutions and transformative projects."}
            </p>
          </div>

          <div class="portfolio-grid">
            ${this.portfolioData.categories?.map(
              (category) => html`
                <div class="portfolio-category">
                  <div class="category-header">
                    <div class="category-icon">
                      <i class="${category.icon}"></i>
                    </div>
                    <h3 class="category-title">${category.title}</h3>
                  </div>

                  <div class="projects-list">
                    ${category.projects?.map(
                      (project) => html`
                        <div class="project-card">
                          <div class="project-header">
                            <h4 class="project-name">${project.name}</h4>
                            <p class="project-tagline">${project.tagline}</p>
                          </div>

                          <div class="project-content">
                            <p class="project-description">
                              ${project.description}
                            </p>

                            <div class="project-technologies">
                              <div class="tech-label">Technologies:</div>
                              <div class="tech-tags">
                                ${project.technologies?.map(
                                  (tech) =>
                                    html`<span class="tech-tag">${tech}</span>`
                                )}
                              </div>
                            </div>
                          </div>

                          <div class="project-overlay">
                            <div class="overlay-content">
                              <i class="fas fa-eye"></i>
                              <span>View Details</span>
                            </div>
                          </div>
                        </div>
                      `
                    )}
                  </div>
                </div>
              `
            )}
          </div>
        </div>
      </section>

      <style>
        .portfolio {
          padding: 6rem 0;
          background: linear-gradient(
            180deg,
            rgba(0, 1, 26, 1) 0%,
            rgba(0, 1, 26, 0.98) 50%,
            rgba(0, 1, 26, 1) 100%
          );
          position: relative;
        }

        .portfolio::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(
              circle at 30% 20%,
              rgba(0, 212, 255, 0.04) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 70% 60%,
              rgba(21, 0, 255, 0.04) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 20% 80%,
              rgba(0, 212, 255, 0.03) 0%,
              transparent 50%
            );
          pointer-events: none;
        }

        .portfolio-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 2;
        }

        .portfolio-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .portfolio-title {
          font-family: "Orbitron", monospace;
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
          color: #ffffff;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
          letter-spacing: 2px;
        }

        .portfolio-description {
          font-family: "Inter", sans-serif;
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          margin-top: 3rem;
        }

        .portfolio-category {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(0, 212, 255, 0.1);
          border-radius: 0;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .portfolio-category:hover {
          border-color: rgba(0, 212, 255, 0.2);
          background: rgba(255, 255, 255, 0.03);
        }

        .category-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 2rem 2.5rem 1.5rem;
          border-bottom: 1px solid rgba(0, 212, 255, 0.1);
        }

        .category-icon {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 212, 255, 0.1);
          border: 1px solid rgba(0, 212, 255, 0.2);
        }

        .category-icon i {
          font-size: 1.5rem;
          color: #00d4ff;
        }

        .category-title {
          font-family: "Rajdhani", sans-serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          letter-spacing: 1px;
        }

        .projects-list {
          padding: 2rem 2.5rem;
        }

        .project-card {
          position: relative;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(0, 212, 255, 0.05);
          padding: 2rem;
          margin-bottom: 2rem;
          transition: all 0.4s ease;
          cursor: pointer;
          overflow: hidden;
        }

        .project-card:last-child {
          margin-bottom: 0;
        }

        .project-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #00d4ff, #1500ff);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }

        .project-card:hover {
          transform: translateY(-3px);
          border-color: rgba(0, 212, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 30px rgba(0, 212, 255, 0.1);
        }

        .project-card:hover::before {
          transform: scaleX(1);
        }

        .project-header {
          margin-bottom: 1.5rem;
        }

        .project-name {
          font-family: "Rajdhani", sans-serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
          letter-spacing: 1px;
        }

        .project-tagline {
          font-family: "Rajdhani", sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #00d4ff;
          margin: 0;
          font-style: italic;
        }

        .project-description {
          font-family: "Inter", sans-serif;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .project-technologies {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .tech-label {
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
          font-style: italic;
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

        .project-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(0, 212, 255, 0.1) 0%,
            rgba(21, 0, 255, 0.1) 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-card:hover .project-overlay {
          opacity: 1;
        }

        .overlay-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #00d4ff;
          font-family: "Rajdhani", sans-serif;
          font-weight: 600;
          font-size: 1.1rem;
          letter-spacing: 1px;
        }

        .overlay-content i {
          font-size: 1.2rem;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .portfolio {
            padding: 4rem 0;
          }

          .portfolio-container {
            padding: 0 1rem;
          }

          .portfolio-title {
            font-size: 2.5rem;
            letter-spacing: 1px;
          }

          .portfolio-description {
            font-size: 1rem;
            padding: 0 1rem;
          }

          .portfolio-grid {
            gap: 2rem;
            margin-top: 2rem;
          }

          .category-header {
            padding: 1.5rem 1.5rem 1rem;
            flex-direction: column;
            text-align: center;
            gap: 0.8rem;
          }

          .category-icon {
            width: 40px;
            height: 40px;
          }

          .category-icon i {
            font-size: 1.2rem;
          }

          .category-title {
            font-size: 1.5rem;
          }

          .projects-list {
            padding: 1.5rem;
          }

          .project-card {
            padding: 1.5rem;
            margin-bottom: 1.5rem;
          }

          .project-name {
            font-size: 1.4rem;
          }

          .project-tagline {
            font-size: 1rem;
          }

          .project-description {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 480px) {
          .portfolio {
            padding: 3rem 0;
          }

          .portfolio-title {
            font-size: 2rem;
          }

          .portfolio-description {
            font-size: 0.95rem;
          }

          .category-header {
            padding: 1rem 1rem 0.8rem;
          }

          .projects-list {
            padding: 1rem;
          }

          .project-card {
            padding: 1.2rem;
          }

          .project-name {
            font-size: 1.2rem;
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
          .portfolio-title {
            font-size: 4rem;
            letter-spacing: 3px;
          }

          .portfolio-description {
            font-size: 1.3rem;
          }

          .portfolio-grid {
            gap: 3.5rem;
          }

          .category-header {
            padding: 2.5rem 3rem 2rem;
          }

          .projects-list {
            padding: 2.5rem 3rem;
          }
        }
      </style>
    `;
  }
}

customElements.define("portfolio-section", PortfolioSection);
