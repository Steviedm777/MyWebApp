class ContactComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: contents;
        }

        .contact-container {
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
        }

        h1 {
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 30px;
          text-align: center;
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .contact-info h2 {
          font-size: 1.5rem;
          color: #333;
          margin-bottom: 20px;
        }

        .info-item {
          margin-bottom: 25px;
        }

        .info-item h3 {
          margin: 0 0 8px 0;
          color: #007bff;
          font-size: 1.1rem;
        }

        .info-item p {
          margin: 0;
          color: #666;
          font-size: 1rem;
        }

        .contact-form h2 {
          font-size: 1.5rem;
          color: #333;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 8px;
          color: #333;
          font-weight: 500;
        }

        input,
        textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-family: inherit;
          font-size: 1rem;
          box-sizing: border-box;
        }

        input:focus,
        textarea:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
        }

        textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          background: #007bff;
          color: white;
          padding: 12px 30px;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s;
          width: 100%;
        }

        .submit-btn:hover {
          background: #0056b3;
        }

        .submit-btn:active {
          transform: scale(0.98);
        }

        @media (max-width: 768px) {
          .contact-container {
            padding: 20px;
          }

          h1 {
            font-size: 1.8rem;
          }

          .contact-content {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      </style>

      <div class="contact-container">
        <h1>Contact Us</h1>
        <div class="contact-content">
          <div class="contact-info">
            <h2>Get In Touch</h2>
            <div class="info-item">
              <h3>📧 Email</h3>
              <p>hello@mywebapp.com</p>
            </div>
            <div class="info-item">
              <h3>📞 Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div class="info-item">
              <h3>📍 Address</h3>
              <p>123 Web Street<br>Tech City, TC 12345<br>United States</p>
            </div>
            <div class="info-item">
              <h3>🕐 Hours</h3>
              <p>Monday - Friday: 9am - 6pm<br>Saturday: 10am - 4pm<br>Sunday: Closed</p>
            </div>
          </div>

          <div class="contact-form">
            <h2>Send us a Message</h2>
            <form>
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
              </div>
              <div class="form-group">
                <label for="subject">Subject</label>
                <input type="text" id="subject" name="subject" required>
              </div>
              <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" required></textarea>
              </div>
              <button type="submit" class="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      this.shadowRoot.querySelector('form').reset();
    });
  }
}

customElements.define('contact-component', ContactComponent);
