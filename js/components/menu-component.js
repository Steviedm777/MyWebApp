class MenuComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    // Wait for slotted content to be ready before setting up listeners
    const slot = this.shadowRoot.querySelector('slot');
    if (slot) {
      slot.addEventListener('slotchange', () => {
        this.setupEventListeners();
      }, { once: true });
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --sidebar-bg: #ff69b4;
          --sidebar-text: #ecf0f1;
          --sidebar-accent: #3498db;
          --sidebar-border: #e75480;
          display: block;
          position: relative;
        }

        .menu-toggle {
          position: fixed;
          top: 20px;
          left: 20px;
          background: var(--sidebar-bg);
          border: none;
          width: 50px;
          height: 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          border-radius: 5px;
          z-index: 999;
          transition: all 0.3s ease;
        }

        .menu-toggle:hover {
          background: var(--sidebar-border);
        }

        .menu-toggle span {
          width: 25px;
          height: 3px;
          background: var(--sidebar-text);
          display: block;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .menu-toggle.active span:nth-child(1) {
          transform: rotate(45deg) translate(10px, 10px);
        }

        .menu-toggle.active span:nth-child(2) {
          opacity: 0;
        }

        .menu-toggle.active span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -7px);
        }

        .sidebar {
          position: fixed;
          left: 0;
          top: 0;
          width: 280px;
          height: 100vh;
          background: var(--sidebar-bg);
          color: var(--sidebar-text);
          padding: 20px;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          z-index: 1000;
          overflow-y: auto;
          box-shadow: none;
        }

        .sidebar.active {
          transform: translateX(0);
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
        }

        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          border-bottom: 2px solid var(--sidebar-border);
          padding-bottom: 15px;
        }

        .sidebar-header h2 {
          margin: 0;
          font-size: 1.5rem;
        }

        .close-btn {
          display: none;
          background: none;
          border: none;
          color: var(--sidebar-text);
          font-size: 2rem;
          cursor: pointer;
          padding: 0;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
        }

        ::slotted(a) {
          display: block;
          padding: 12px 0;
          color: var(--sidebar-text);
          text-decoration: none;
          border-left: 3px solid transparent;
          padding-left: 12px;
          transition: all 0.3s ease;
          font-size: 1.1rem;
          cursor: pointer;
        }

        ::slotted(a:hover),
        ::slotted(a.active) {
          border-left-color: var(--sidebar-accent);
          color: var(--sidebar-accent);
          padding-left: 20px;
        }

        .sidebar-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        .sidebar-overlay.active {
          display: block;
        }

        @media (max-width: 768px) {
          .close-btn {
            display: block;
          }

          .sidebar {
            width: 250px;
          }
        }
      </style>

      <button class="menu-toggle" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="sidebar">
        <div class="sidebar-header">
          <h2>Menu</h2>
          <button class="close-btn" aria-label="Close menu">&times;</button>
        </div>
        <nav class="sidebar-nav">
          <slot></slot>
        </nav>
      </div>

      <div class="sidebar-overlay"></div>
    `;
  }

  setupEventListeners() {
    const menuToggle = this.shadowRoot.querySelector('.menu-toggle');
    const sidebar = this.shadowRoot.querySelector('.sidebar');
    const closeBtn = this.shadowRoot.querySelector('.close-btn');
    const overlay = this.shadowRoot.querySelector('.sidebar-overlay');
    const navLinks = this.querySelectorAll('a');

    // Toggle menu
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      menuToggle.classList.toggle('active');
      overlay.classList.toggle('active');
    });

    // Close menu with close button
    closeBtn.addEventListener('click', () => {
      this.closeMenu();
    });

    // Close menu when clicking on overlay
    overlay.addEventListener('click', () => {
      this.closeMenu();
    });

    // Close menu and dispatch event when clicking on a nav link
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Get the page ID from the link
        const pageId = link.getAttribute('href').substring(1);

        // Dispatch custom event for navigation
        this.dispatchEvent(new CustomEvent('navigate', { detail: { pageId } }));

        // Also call showPage directly to ensure navigation happens
        if (typeof window.showPage === 'function') {
          window.showPage(pageId);
        }

        // Close sidebar on mobile
        if (window.innerWidth <= 768) {
          this.closeMenu();
        }
      });
    });
  }

  closeMenu() {
    const sidebar = this.shadowRoot.querySelector('.sidebar');
    const menuToggle = this.shadowRoot.querySelector('.menu-toggle');
    const overlay = this.shadowRoot.querySelector('.sidebar-overlay');

    sidebar.classList.remove('active');
    menuToggle.classList.remove('active');
    overlay.classList.remove('active');
  }
}

customElements.define('menu-component', MenuComponent);
