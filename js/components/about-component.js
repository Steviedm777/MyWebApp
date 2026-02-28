class AboutComponent extends HTMLElement {
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

        .about-container {
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

        .about-content {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #555;
        }

        .about-content p {
          margin-bottom: 20px;
        }

        .about-content strong {
          color: #333;
        }

        .highlights {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }

        .highlight-card {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #007bff;
        }

        .highlight-card h3 {
          margin-top: 0;
          color: #007bff;
        }

        @media (max-width: 768px) {
          .about-container {
            padding: 20px;
          }

          h1 {
            font-size: 1.8rem;
          }
        }
      </style>

      <div class="about-container">
        <h1>About Us</h1>
        <div class="about-content">
          <p>Welcome to <strong>MyWebApp</strong>, a modern single-page application built with pure HTML, JavaScript, and CSS. We believe in keeping things simple and elegant, without unnecessary complexity.</p>

          <p>Founded in 2024, our mission is to demonstrate that powerful web applications can be built without frameworks or build tools. We're passionate about clean code, performance, and user experience.</p>

          <p>Our team of dedicated developers works tirelessly to create intuitive interfaces and robust functionality. We focus on what matters most: delivering value to our users through cutting-edge web technologies.</p>

          <div class="highlights">
            <div class="highlight-card">
              <h3>🎯 Pure Web Standards</h3>
              <p>Built entirely with vanilla HTML, CSS, and JavaScript—no dependencies or frameworks.</p>
            </div>
            <div class="highlight-card">
              <h3>⚡ High Performance</h3>
              <p>Lightning-fast load times and smooth interactions with zero overhead.</p>
            </div>
            <div class="highlight-card">
              <h3>🛡️ Maintainable Code</h3>
              <p>Clean, readable code that's easy to understand and modify for future developers.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('about-component', AboutComponent);
