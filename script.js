// Menu toggle functionality
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('closeBtn');
const navLinks = document.querySelectorAll('.nav-link');

// Create overlay element
const overlay = document.createElement('div');
overlay.className = 'sidebar-overlay';
document.body.appendChild(overlay);

// Toggle menu
menuToggle.addEventListener('click', function () {
  sidebar.classList.toggle('active');
  menuToggle.classList.toggle('active');
  overlay.classList.toggle('active');
});

// Close menu with close button
closeBtn.addEventListener('click', function () {
  sidebar.classList.remove('active');
  menuToggle.classList.remove('active');
  overlay.classList.remove('active');
});

// Close menu when clicking on overlay
overlay.addEventListener('click', function () {
  sidebar.classList.remove('active');
  menuToggle.classList.remove('active');
  overlay.classList.remove('active');
});

// Close menu and update active link when clicking on a nav link
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    // Update active link
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');

    // Get the page to navigate to
    const pageId = this.getAttribute('href').substring(1); // Remove '#'
    showPage(pageId);

    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('active');
      menuToggle.classList.remove('active');
      overlay.classList.remove('active');
    }
  });
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
