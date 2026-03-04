class TitleBarComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isMenuOpen = false;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --title-bar-bg: #2c3e50;
          --title-bar-text: #ecf0f1;
          --title-bar-hover: #34495e;
          --title-bar-height: 70px;
        }

        * {
          box-sizing: border-box;
        }

        .title-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--title-bar-height);
          background-color: var(--title-bar-bg);
          color: var(--title-bar-text);
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 998;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .title-bar-left {
          flex: 0 0 70px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hamburger-btn {
          width: 50px;
          height: 50px;
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 6px;
          padding: 0;
          border-radius: 4px;
          transition: background-color 0.3s ease;
        }

        .hamburger-btn:hover {
          background-color: var(--title-bar-hover);
        }

        .hamburger-btn span {
          width: 26px;
          height: 3px;
          background-color: var(--title-bar-text);
          border-radius: 2px;
          transition: all 0.3s ease;
          display: block;
        }

        .hamburger-btn.active span:nth-child(1) {
          transform: rotate(45deg) translate(10px, 10px);
        }

        .hamburger-btn.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger-btn.active span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -7px);
        }

        .title-bar-center {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
          color: var(--title-bar-text);
          letter-spacing: 0.5px;
        }

        .title-bar-right {
          flex: 0 0 70px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      </style>

      <div class="title-bar">
        <div class="title-bar-left">
          <button class="hamburger-btn" aria-label="Toggle navigation menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div class="title-bar-center">
          <h1>MyWebApp</h1>
        </div>
        <div class="title-bar-right"></div>
      </div>
    `;
  }

  setupEventListeners() {
    const button = this.shadowRoot.querySelector('.hamburger-btn');

    button.addEventListener('click', () => {
      const menuComponent = document.querySelector('menu-component');
      if (menuComponent) {
        menuComponent.toggleSidebar();
      }
    });

    // Listen for menu state changes from menu-component
    this.addEventListener('menu-toggled', (e) => {
      this.updateButtonState(e.detail.isOpen);
    });
  }

  updateButtonState(isOpen) {
    const button = this.shadowRoot.querySelector('.hamburger-btn');
    this.isMenuOpen = isOpen;

    if (isOpen) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  }

  // Public method to toggle menu state
  toggleMenuButton() {
    this.isMenuOpen = !this.isMenuOpen;
    this.updateButtonState(this.isMenuOpen);
  }
}

customElements.define('title-bar-component', TitleBarComponent);
