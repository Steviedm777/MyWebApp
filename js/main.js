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
