class HomeComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.greetingText = 'Hello, World!';
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

        .greeting-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          height: 100%;
          width: 100%;
        }

        h1 {
          font-size: 3rem;
          color: #333;
          cursor: pointer;
          transition: color 0.3s;
          text-align: center;
          padding: 20px;
          margin: 0;
        }

        h1:hover {
          color: #007bff;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2rem;
          }
        }
      </style>

      <div class="greeting-container">
        <h1 id="greeting">${this.greetingText}</h1>
      </div>
    `;

    this.shadowRoot.getElementById('greeting').addEventListener('click', () => {
      this.toggleGreeting();
    });
  }

  toggleGreeting() {
    this.greetingText = this.greetingText === 'Hello, World!'
      ? 'Hello again!'
      : 'Hello, World!';
    this.render();
  }
}

customElements.define('home-component', HomeComponent);
