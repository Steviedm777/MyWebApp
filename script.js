// Listen for navigation events from menu component
const menuComponent = document.querySelector('menu-component');
menuComponent.addEventListener('navigate', function (e) {
  const pageId = e.detail.pageId;
  showPage(pageId);
});

// Original greeting click functionality
document.getElementById('greeting').addEventListener('click', function () {
  this.textContent = this.textContent === 'Hello, World!'
    ? 'Hello again!'
    : 'Hello, World!';
});

// Page navigation function
function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }
}

// Counter functionality
let counter = 0;

const addBtn = document.getElementById('addBtn');
const subtractBtn = document.getElementById('subtractBtn');
const counterValue = document.getElementById('counterValue');

function updateCounterDisplay() {
  counterValue.textContent = counter;
}

addBtn.addEventListener('click', function () {
  counter++;
  updateCounterDisplay();
});

subtractBtn.addEventListener('click', function () {
  counter--;
  updateCounterDisplay();
});
