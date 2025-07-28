import { LitElement, html } from "https://esm.run/lit";

class BlogSection extends LitElement {
  static get properties() {
    return {
      blogData: { type: Object },
    };
  }

  constructor() {
    super();
    this.blogData = {};
  }

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadBlogData();
  }

  async loadBlogData() {
    try {
      const response = await fetch("/contents/blog.json");
      this.blogData = await response.json();
    } catch (error) {
      console.error("Error loading blog data:", error);
    }
  }

  render() {
    return html`
      <section class="blog" id="blog">
        <div class="blog-container">
          <div class="blog-content">
            <h2 class="blog-title">${this.blogData.title || "Our Blog"}</h2>
            <h3 class="blog-subtitle">
              ${this.blogData.subtitle || "Exploring the Data Cosmos"}
            </h3>
            <p class="blog-description">
              ${this.blogData.description ||
              "Currently preparing stellar content for our community..."}
            </p>
            <p class="blog-stay-tuned">
              ${this.blogData.stayTuned ||
              "Stay tuned for insights, tutorials, and thought leadership from the Tetrad AI team."}
            </p>
            <div class="coming-soon-badge">
              <i class="fas fa-rocket"></i>
              <span>Coming Soon</span>
            </div>
          </div>
        </div>
      </section>

      <style>
        .blog {
          padding: 6rem 0;
          background: linear-gradient(
            180deg,
            rgba(0, 1, 26, 0.95) 0%,
            rgba(0, 1, 26, 1) 50%,
            rgba(0, 1, 26, 0.98) 100%
          );
          position: relative;
        }

        .blog::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(
              circle at 30% 20%,
              rgba(21, 0, 255, 0.03) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 70% 80%,
              rgba(0, 212, 255, 0.03) 0%,
              transparent 50%
            );
          pointer-events: none;
        }

        .blog-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 2;
        }

        .blog-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .blog-title {
          font-family: "Orbitron", monospace;
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 1rem;
          color: #ffffff;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
          letter-spacing: 2px;
        }

        .blog-subtitle {
          font-family: "Rajdhani", sans-serif;
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: #00d4ff;
          letter-spacing: 1px;
        }

        .blog-description {
          font-family: "Inter", sans-serif;
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1rem;
          font-style: italic;
        }

        .blog-stay-tuned {
          font-family: "Inter", sans-serif;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin-bottom: 3rem;
        }

        .coming-soon-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          padding: 1.5rem 3rem;
          background: rgba(0, 212, 255, 0.1);
          border: 2px solid rgba(0, 212, 255, 0.3);
          color: #00d4ff;
          font-family: "Rajdhani", sans-serif;
          font-weight: 700;
          font-size: 1.3rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 212, 255, 0.1);
          animation: badgePulse 3s ease-in-out infinite;
        }

        .coming-soon-badge:hover {
          background: rgba(0, 212, 255, 0.15);
          border-color: rgba(0, 212, 255, 0.5);
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 212, 255, 0.2);
        }

        .coming-soon-badge i {
          font-size: 1.2rem;
          animation: rocketFloat 2s ease-in-out infinite alternate;
        }

        @keyframes badgePulse {
          0%,
          100% {
            box-shadow: 0 10px 30px rgba(0, 212, 255, 0.1);
          }
          50% {
            box-shadow: 0 10px 30px rgba(0, 212, 255, 0.2);
          }
        }

        @keyframes rocketFloat {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-3px);
          }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .blog {
            padding: 4rem 0;
          }

          .blog-container {
            padding: 0 1rem;
          }

          .blog-title {
            font-size: 2.5rem;
            letter-spacing: 1px;
          }

          .blog-subtitle {
            font-size: 1.6rem;
          }

          .blog-description {
            font-size: 1rem;
          }

          .blog-stay-tuned {
            font-size: 1rem;
            margin-bottom: 2rem;
          }

          .coming-soon-badge {
            padding: 1.2rem 2rem;
            font-size: 1.1rem;
          }

          .coming-soon-badge i {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .blog {
            padding: 3rem 0;
          }

          .blog-title {
            font-size: 2rem;
          }

          .blog-subtitle {
            font-size: 1.4rem;
          }

          .blog-description {
            font-size: 0.95rem;
          }

          .blog-stay-tuned {
            font-size: 0.95rem;
          }

          .coming-soon-badge {
            padding: 1rem 1.5rem;
            font-size: 1rem;
            flex-direction: column;
            gap: 0.5rem;
          }

          .coming-soon-badge i {
            font-size: 1.2rem;
          }
        }

        /* Large Desktop */
        @media (min-width: 1400px) {
          .blog-title {
            font-size: 4rem;
            letter-spacing: 3px;
          }

          .blog-subtitle {
            font-size: 2.3rem;
          }

          .blog-description {
            font-size: 1.3rem;
          }

          .blog-stay-tuned {
            font-size: 1.2rem;
            margin-bottom: 4rem;
          }

          .coming-soon-badge {
            padding: 2rem 4rem;
            font-size: 1.4rem;
          }

          .coming-soon-badge i {
            font-size: 1.4rem;
          }
        }
      </style>
    `;
  }
}

customElements.define("blog-section", BlogSection);
