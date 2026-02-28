class MenuComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isListenersSetup = false;
  }

  connectedCallback() {
    this.render();
    // Defer setup until after DOM is ready and children are added
    setTimeout(() => this.setupEventListeners(), 0);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --sidebar-bg: #2c3e50;
          --sidebar-text: #ecf0f1;
          --sidebar-accent: #3498db;
          --sidebar-border: #34495e;
          display: block;
          position: relative;
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
          pointer-events: none;
        }

        .sidebar-overlay.active {
          display: block;
          pointer-events: auto;
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
    if (this.isListenersSetup) return;
    this.isListenersSetup = true;

    const sidebar = this.shadowRoot.querySelector('.sidebar');
    const closeBtn = this.shadowRoot.querySelector('.close-btn');
    const overlay = this.shadowRoot.querySelector('.sidebar-overlay');
    const navLinks = this.querySelectorAll('a');

    // Close menu with close button
    closeBtn.addEventListener('click', () => {
      this.closeMenu();
    });

    // Close menu when clicking on overlay
    overlay.addEventListener('click', () => {
      this.closeMenu();
    });

    // Close menu and dispatch event when clicking on a nav link
    navLinks.forEach((link) => {
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

        // Always close sidebar after navigation
        this.closeMenu();
      });
    });
  }

  toggleSidebar() {
    const sidebar = this.shadowRoot.querySelector('.sidebar');
    const overlay = this.shadowRoot.querySelector('.sidebar-overlay');
    const isOpen = sidebar.classList.contains('active');

    if (isOpen) {
      this.closeMenu();
    } else {
      sidebar.classList.add('active');
      overlay.classList.add('active');
      this.dispatchEvent(new CustomEvent('menu-toggled', {
        detail: { isOpen: true },
        bubbles: true,
        composed: true
      }));
    }
  }

  closeMenu() {
    const sidebar = this.shadowRoot.querySelector('.sidebar');
    const overlay = this.shadowRoot.querySelector('.sidebar-overlay');

    sidebar.classList.remove('active');
    overlay.classList.remove('active');

    this.dispatchEvent(new CustomEvent('menu-toggled', {
      detail: { isOpen: false },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('menu-component', MenuComponent);
