// Page navigation function - make it global so menu component can access it
window.showPage = function(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }
};

// Listen for navigation events from menu component
const menuComponent = document.querySelector('menu-component');
if (menuComponent) {
  menuComponent.addEventListener('navigate', function (e) {
    const pageId = e.detail.pageId;
    window.showPage(pageId);
  });
}

// Wire up title-bar and menu-component communication
const titleBar = document.querySelector('title-bar-component');
if (titleBar && menuComponent) {
  // Menu state changes update title bar button
  menuComponent.addEventListener('menu-toggled', (e) => {
    titleBar.updateButtonState(e.detail.isOpen);
  });
}

// DEBUG: Capture console and monitor state
let navClickCount = 0;
let navigateEventCount = 0;
let consoleLogs = [];

// Override console.log to capture output
const originalLog = console.log;
console.log = function(...args) {
  originalLog.apply(console, args);
  const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
  consoleLogs.push(msg);
  if (consoleLogs.length > 20) consoleLogs.shift(); // Keep only last 20 logs
};

if (menuComponent && titleBar) {
  const debugDiv = document.getElementById('debug-info');
  if (debugDiv) {
    // Monitor nav link clicks in light DOM
    const navLinks = menuComponent.querySelectorAll('a');
    console.log('Found nav links:', navLinks.length);
    navLinks.forEach((link, idx) => {
      link.addEventListener('click', (e) => {
        navClickCount++;
        console.log(`Nav link ${idx} clicked:`, link.getAttribute('href'));
      });
    });

    // Monitor navigate events
    menuComponent.addEventListener('navigate', (e) => {
      navigateEventCount++;
      console.log('Navigate event fired:', e.detail);
    });

    setInterval(() => {
      const shadowRoot = menuComponent.shadowRoot;
      if (shadowRoot) {
        const sidebar = shadowRoot.querySelector('.sidebar');
        const overlay = shadowRoot.querySelector('.sidebar-overlay');
        const hasActive = sidebar?.classList.contains('active') ?? false;
        const overlayActive = overlay?.classList.contains('active') ?? false;

        const titleShadow = titleBar.shadowRoot;
        const btn = titleShadow?.querySelector('.hamburger-btn');
        const btnActive = btn?.classList.contains('active') ?? false;

        const pages = document.querySelectorAll('.page');
        let activePageId = 'none';
        pages.forEach(p => {
          if (p.classList.contains('active')) activePageId = p.id;
        });

        const logDisplay = consoleLogs.slice(-5).join('\n');
        debugDiv.textContent = `Menu: ${hasActive ? 'OPEN' : 'closed'}\nPage: ${activePageId}\nLinks: ${menuComponent.querySelectorAll('a').length}\nClicks: ${navClickCount}\n\nLogs:\n${logDisplay}`;
      }
    }, 100);
  }
}
