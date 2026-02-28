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

// DEBUG: Monitor button clicks and menu state
if (menuComponent && titleBar) {
  const debugDiv = document.getElementById('debug-info');
  if (debugDiv) {
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

        debugDiv.textContent = `Menu open: ${hasActive}\nOverlay active: ${overlayActive}\nBtn active: ${btnActive}\nMenuComponent: ${menuComponent ? 'found' : 'NOT FOUND'}\nTitleBar: ${titleBar ? 'found' : 'NOT FOUND'}`;
      }
    }, 100);
  }
}
