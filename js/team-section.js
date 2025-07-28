import { LitElement, html } from "https://esm.run/lit";

class TeamSection extends LitElement {
  static get properties() {
    return {
      teamData: { type: Object },
    };
  }

  constructor() {
    super();
    this.teamData = {};
  }

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadTeamData();
  }

  async loadTeamData() {
    try {
      const response = await fetch("/contents/team.json");
      this.teamData = await response.json();
    } catch (error) {
      console.error("Error loading team data:", error);
    }
  }

  render() {
    return html`
      <section class="team" id="team">
        <div class="team-container">
          <div class="team-header">
            <h2 class="team-title">${this.teamData.title || "Who We Are"}</h2>
            <p class="team-description">
              ${this.teamData.description ||
              "Meet the expert team driving Tetrad AI's success."}
            </p>
          </div>

          <div class="team-grid">
            ${this.teamData.members?.map(
              (member) => html`
                <div class="team-card">
                  <div class="member-avatar">
                    <img
                      src="${member.avatar ||
                      "/images/team/default-avatar.jpg"}"
                      alt="${member.name}"
                      class="avatar-image"
                    />
                    <div class="avatar-overlay">
                      <div class="avatar-glow"></div>
                    </div>
                  </div>

                  <div class="member-info">
                    <h3 class="member-name">${member.name}</h3>
                    <h4 class="member-position">${member.position}</h4>
                    <p class="member-specialization">
                      ${member.specialization}
                    </p>
                    <p class="member-bio">${member.bio}</p>

                    <div class="member-linkedin">
                      <a
                        href="${member.linkedin}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="linkedin-link"
                      >
                        <i class="fab fa-linkedin"></i>
                        <span>Connect with ${member.name.split(" ")[0]}</span>
                      </a>
                    </div>
                  </div>
                </div>
              `
            )}
          </div>
        </div>
      </section>

      <style>
        .team {
          padding: 6rem 0;
          background: linear-gradient(
            180deg,
            rgba(0, 1, 26, 0.95) 0%,
            rgba(0, 1, 26, 1) 50%,
            rgba(0, 1, 26, 0.95) 100%
          );
          position: relative;
        }

        .team::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(
              circle at 25% 25%,
              rgba(21, 0, 255, 0.05) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 75% 75%,
              rgba(0, 212, 255, 0.05) 0%,
              transparent 50%
            );
          pointer-events: none;
        }

        .team-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 2;
        }

        .team-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .team-title {
          font-family: "Orbitron", monospace;
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
          color: #ffffff;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
          letter-spacing: 2px;
        }

        .team-description {
          font-family: "Inter", sans-serif;
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.5rem;
          margin-top: 3rem;
        }

        .team-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(0, 212, 255, 0.1);
          border-radius: 0;
          padding: 2.5rem;
          text-align: center;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .team-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00d4ff, transparent);
          transition: left 0.4s ease;
        }

        .team-card:hover {
          transform: translateY(-8px);
          border-color: rgba(0, 212, 255, 0.3);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 15px 50px rgba(0, 212, 255, 0.15);
        }

        .team-card:hover::before {
          left: 100%;
        }

        .member-avatar {
          position: relative;
          width: 150px;
          height: 150px;
          margin: 0 auto 2rem;
          border-radius: 50%;
          overflow: hidden;
        }

        .avatar-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .avatar-overlay {
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
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .avatar-glow {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: 50%;
          border: 2px solid transparent;
          background: linear-gradient(45deg, #00d4ff, #1500ff) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: subtract;
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          mask-composite: subtract;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .team-card:hover .avatar-overlay,
        .team-card:hover .avatar-glow {
          opacity: 1;
        }

        .team-card:hover .avatar-image {
          transform: scale(1.05);
        }

        .member-name {
          font-family: "Rajdhani", sans-serif;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #ffffff;
          letter-spacing: 1px;
        }

        .member-position {
          font-family: "Rajdhani", sans-serif;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #00d4ff;
          letter-spacing: 0.5px;
        }

        .member-specialization {
          font-family: "Inter", sans-serif;
          font-size: 1rem;
          font-style: italic;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1.5rem;
          font-weight: 400;
        }

        .member-bio {
          font-family: "Inter", sans-serif;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin-bottom: 2rem;
          text-align: left;
        }

        .member-linkedin {
          margin-top: auto;
        }

        .linkedin-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.5rem;
          background: rgba(0, 119, 181, 0.1);
          border: 1px solid rgba(0, 119, 181, 0.3);
          border-radius: 0;
          color: #0077b5;
          text-decoration: none;
          font-family: "Inter", sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
        }

        .linkedin-link:hover {
          background: rgba(0, 119, 181, 0.2);
          border-color: rgba(0, 119, 181, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 119, 181, 0.2);
        }

        .linkedin-link i {
          font-size: 1.1rem;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .team {
            padding: 4rem 0;
          }

          .team-container {
            padding: 0 1rem;
          }

          .team-title {
            font-size: 2.5rem;
            letter-spacing: 1px;
          }

          .team-description {
            font-size: 1rem;
            padding: 0 1rem;
          }

          .team-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            margin-top: 2rem;
          }

          .team-card {
            padding: 2rem;
          }

          .member-avatar {
            width: 120px;
            height: 120px;
            margin-bottom: 1.5rem;
          }

          .member-name {
            font-size: 1.5rem;
          }

          .member-position {
            font-size: 1.1rem;
          }

          .member-specialization {
            font-size: 0.9rem;
          }

          .member-bio {
            font-size: 0.9rem;
            margin-bottom: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .team {
            padding: 3rem 0;
          }

          .team-title {
            font-size: 2rem;
          }

          .team-description {
            font-size: 0.95rem;
          }

          .team-card {
            padding: 1.5rem;
          }

          .member-avatar {
            width: 100px;
            height: 100px;
          }

          .member-name {
            font-size: 1.3rem;
          }

          .member-position {
            font-size: 1rem;
          }

          .linkedin-link {
            padding: 0.6rem 1.2rem;
            font-size: 0.85rem;
          }
        }

        /* Large Desktop */
        @media (min-width: 1400px) {
          .team-title {
            font-size: 4rem;
            letter-spacing: 3px;
          }

          .team-description {
            font-size: 1.3rem;
          }

          .team-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 3rem;
          }

          .member-avatar {
            width: 180px;
            height: 180px;
          }
        }
      </style>
    `;
  }
}

customElements.define("team-section", TeamSection);
