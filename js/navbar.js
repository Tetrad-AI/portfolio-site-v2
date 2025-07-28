import { LitElement, html } from "https://esm.run/lit";

class Navbar extends LitElement {
  static get properties() {
    return {
      isMenuOpen: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.isMenuOpen = false;
  }

  createRenderRoot() {
    return this;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  render() {
    return html`
      <nav class="navbar">
        <div class="nav-container">
          <div class="nav-logo">
            <img src="/images/logo.png" alt="Tetrad AI" class="logo" />
          </div>

          <div class="nav-menu ${this.isMenuOpen ? "active" : ""}">
            <a href="#solutions" class="nav-link" @click="${this.closeMenu}"
              >Solutions</a
            >
            <a href="#team" class="nav-link" @click="${this.closeMenu}">Team</a>
            <a href="#portfolio" class="nav-link" @click="${this.closeMenu}"
              >Portfolio</a
            >
            <a href="#contact" class="nav-link" @click="${this.closeMenu}"
              >Contact</a
            >
          </div>

          <div
            class="hamburger ${this.isMenuOpen ? "active" : ""}"
            @click="${this.toggleMenu}"
          >
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
        </div>
      </nav>

      <style>
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          background: rgba(0, 1, 26, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 212, 255, 0.1);
          z-index: 1000;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.8rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }

        .nav-logo .logo {
          height: 24px;
          width: auto;
          max-width: 200px;
          object-fit: contain;
        }

        .nav-menu {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          color: #ffffff;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link:hover {
          color: #00d4ff;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #00d4ff, #1500ff);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          cursor: pointer;
          gap: 4px;
        }

        .hamburger .bar {
          width: 25px;
          height: 3px;
          background: #ffffff;
          transition: all 0.3s ease;
          border-radius: 2px;
        }

        .hamburger.active .bar:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .hamburger.active .bar:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active .bar:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .nav-container {
            padding: 0.6rem 1rem;
          }

          .nav-logo .logo {
            height: 20px;
            max-width: 160px;
          }

          .hamburger {
            display: flex;
          }

          .nav-menu {
            position: fixed;
            top: 100%;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(0, 1, 26, 0.98);
            backdrop-filter: blur(15px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 3rem;
            gap: 2rem;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }

          .nav-menu.active {
            transform: translateX(0);
          }

          .nav-link {
            font-size: 1.2rem;
            font-weight: 600;
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: 1px;
            padding: 1rem 2rem;
            border-bottom: 1px solid rgba(0, 212, 255, 0.1);
            width: 100%;
            text-align: center;
            transition: all 0.3s ease;
          }

          .nav-link:hover {
            background: rgba(0, 212, 255, 0.1);
            color: #00d4ff;
          }

          .nav-link::after {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .nav-container {
            padding: 0.6rem 1rem;
          }

          .nav-logo .logo {
            height: 18px;
            max-width: 140px;
          }

          .hamburger .bar {
            width: 22px;
            height: 2px;
          }

          .nav-link {
            font-size: 1.1rem;
            padding: 0.8rem 1.5rem;
          }
        }

        /* Large screens */
        @media (min-width: 1200px) {
          .nav-menu {
            gap: 2.5rem;
          }

          .nav-link {
            font-size: 1rem;
          }

          .nav-logo .logo {
            height: 28px;
            max-width: 220px;
          }
        }

        /* Extra small screens */
        @media (max-width: 360px) {
          .nav-container {
            padding: 0.5rem 0.8rem;
          }

          .nav-logo .logo {
            height: 16px;
            max-width: 120px;
          }

          .hamburger .bar {
            width: 20px;
          }
        }
      </style>
    `;
  }
}

customElements.define("navbar-component", Navbar);
