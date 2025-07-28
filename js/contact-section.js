import { LitElement, html } from "https://esm.run/lit";

class ContactSection extends LitElement {
  static get properties() {
    return {
      // We only need contactData (for the email) and formData now
      contactData: { type: Object },
      formData: { type: Object },
    };
  }

  constructor() {
    super();
    this.contactData = {};
    this.formData = {
      name: "",
      email: "",
      company: "",
      message: "",
    };
  }

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadContactData();
  }

  async loadContactData() {
    try {
      const response = await fetch("/contents/contact.json");
      this.contactData = await response.json();
    } catch (error) {
      console.error("Error loading contact data:", error);
    }
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.formData = { ...this.formData, [name]: value };
  }

  // UPDATED: Replaced API call with mailto link generation
  handleSubmit(e) {
    e.preventDefault();

    const recipientEmail = this.contactData.email || "hello@tetradai.com";
    const subject = encodeURIComponent(
      `Contact Inquiry from ${this.formData.name}`
    );

    const body = encodeURIComponent(
      `You have a new message from your website contact form:
---
Name: ${this.formData.name}
Email: ${this.formData.email}
Company: ${this.formData.company || "N/A"}

Message:
${this.formData.message}
---
`
    );

    // This opens the user's default email client
    window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
  }

  render() {
    return html`
      <section class="contact" id="contact">
        <div class="contact-container">
          <div class="contact-header">
            <h2 class="contact-title">
              ${this.contactData.title || "Connect With Us"}
            </h2>
            <p class="contact-description">
              ${this.contactData.description ||
              "Ready to transform your data universe? Let's discuss how Tetrad AI can propel your organization into the future of data-driven success."}
            </p>
          </div>

          <div class="contact-content">
            <div class="contact-info">
              <div class="info-card">
                <div class="info-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="info-details">
                  <h4 class="info-label">Email Us Directly</h4>
                  <a
                    href="mailto:${this.contactData.email ||
                    "hello@tetradai.com"}"
                    class="info-value email-link"
                  >
                    ${this.contactData.email || "hello@tetradai.com"}
                  </a>
                  <p class="info-description">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>

              <div class="contact-features">
                <h4 class="features-title">What to Expect</h4>
                <ul class="features-list">
                  <li><i class="fas fa-check"></i> Free consultation call</li>
                  <li>
                    <i class="fas fa-check"></i> Tailored solution proposal
                  </li>
                  <li><i class="fas fa-check"></i> No obligation assessment</li>
                  <li>
                    <i class="fas fa-check"></i> Expert technical guidance
                  </li>
                </ul>
              </div>
            </div>

            <div class="contact-form-section">
              <form
                class="contact-form"
                action="https://formspree.io/f/mqalbbek"
                method="POST"
              >
                <div class="form-group">
                  <label for="name" class="form-label">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    class="form-input"
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div class="form-group">
                  <label for="email" class="form-label">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    class="form-input"
                    required
                    placeholder="your.email@company.com"
                  />
                </div>

                <div class="form-group">
                  <label for="company" class="form-label">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    class="form-input"
                    placeholder="Your company name"
                  />
                </div>

                <div class="form-group">
                  <label for="message" class="form-label">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    class="form-textarea"
                    required
                    placeholder="Tell us about your project, challenges, or questions..."
                    rows="5"
                  ></textarea>
                </div>

                <button type="submit" class="form-submit">
                  Send Message <i class="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <style>
        /* All your styles remain here... */
        .contact {
          padding: 6rem 0;
          background: linear-gradient(
            180deg,
            rgba(0, 1, 26, 0.98) 0%,
            rgba(0, 1, 26, 1) 50%,
            rgba(0, 1, 26, 0.95) 100%
          );
          position: relative;
        }

        .contact::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(
              circle at 25% 25%,
              rgba(0, 212, 255, 0.03) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 75% 75%,
              rgba(21, 0, 255, 0.03) 0%,
              transparent 50%
            );
          pointer-events: none;
        }

        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 2;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .contact-title {
          font-family: "Orbitron", monospace;
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
          color: #ffffff;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
          letter-spacing: 2px;
        }

        .contact-description {
          font-family: "Inter", sans-serif;
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 4rem;
          align-items: start;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .info-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(0, 212, 255, 0.1);
          padding: 2rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
        }

        .info-card:hover {
          border-color: rgba(0, 212, 255, 0.3);
          background: rgba(255, 255, 255, 0.04);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 212, 255, 0.1);
        }

        .info-icon {
          width: 50px;
          height: 50px;
          background: rgba(0, 212, 255, 0.1);
          border: 1px solid rgba(0, 212, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-icon i {
          font-size: 1.5rem;
          color: #00d4ff;
        }

        .info-details {
          flex: 1;
        }

        .info-label {
          font-family: "Rajdhani", sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #ffffff;
          letter-spacing: 1px;
        }

        .info-value {
          font-family: "Inter", sans-serif;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.5;
          margin: 0 0 0.5rem 0;
        }

        .email-link {
          color: #00d4ff;
          text-decoration: none;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .email-link:hover {
          color: #ffffff;
          text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
        }

        .info-description {
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        .contact-features {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(0, 212, 255, 0.1);
          padding: 2rem;
        }

        .features-title {
          font-family: "Rajdhani", sans-serif;
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #00d4ff;
          letter-spacing: 1px;
        }

        .features-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .features-list li {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1rem;
          font-family: "Inter", sans-serif;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
        }

        .features-list li i {
          color: #00d4ff;
          font-size: 0.9rem;
        }

        .contact-form-section {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(0, 212, 255, 0.1);
          padding: 2.5rem;
          transition: all 0.3s ease;
        }

        .contact-form-section:hover {
          border-color: rgba(0, 212, 255, 0.2);
          background: rgba(255, 255, 255, 0.03);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-family: "Rajdhani", sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #00d4ff;
          letter-spacing: 0.5px;
        }

        .form-input,
        .form-textarea {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(0, 212, 255, 0.2);
          border-radius: 0;
          padding: 1rem;
          color: #ffffff;
          font-family: "Inter", sans-serif;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: rgba(0, 212, 255, 0.5);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.2);
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1.2rem 2rem;
          background: linear-gradient(135deg, #1500ff 0%, #00d4ff 100%);
          border: none;
          color: white;
          font-family: "Rajdhani", sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(21, 0, 255, 0.3);
          margin-top: 1rem;
        }

        .form-submit:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(21, 0, 255, 0.4);
        }

        .form-submit i {
          font-size: 1rem;
          transition: transform 0.3s ease;
        }

        .form-submit:hover:not(:disabled) i:not(.fa-spin) {
          transform: translateX(3px);
        }

        @media (max-width: 768px) {
          .contact {
            padding: 4rem 0;
          }

          .contact-container {
            padding: 0 1rem;
          }

          .contact-title {
            font-size: 2.5rem;
            letter-spacing: 1px;
          }

          .contact-description {
            font-size: 1rem;
          }

          .contact-content {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .info-card {
            padding: 1.5rem;
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .contact-features {
            padding: 1.5rem;
          }

          .contact-form-section {
            padding: 2rem;
          }

          .form-input,
          .form-textarea {
            padding: 0.8rem;
          }

          .form-submit {
            padding: 1rem 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .contact {
            padding: 3rem 0;
          }

          .contact-title {
            font-size: 2rem;
          }

          .contact-description {
            font-size: 0.95rem;
          }

          .info-card {
            padding: 1.2rem;
          }

          .contact-features {
            padding: 1.2rem;
          }

          .contact-form-section {
            padding: 1.5rem;
          }

          .form-submit {
            padding: 0.8rem 1.2rem;
            font-size: 1rem;
          }
        }

        @media (min-width: 1400px) {
          .contact-title {
            font-size: 4rem;
            letter-spacing: 3px;
          }

          .contact-description {
            font-size: 1.3rem;
          }

          .contact-content {
            gap: 5rem;
          }

          .contact-form-section {
            padding: 3rem;
          }
        }
      </style>
    `;
  }
}

customElements.define("contact-section", ContactSection);
