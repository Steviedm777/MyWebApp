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

    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('active');
      menuToggle.classList.remove('active');
      overlay.classList.remove('active');
    }

    // Navigate to the href (in a real app, you'd use routing)
    console.log('Navigating to:', this.getAttribute('href'));
  });
});

// Original greeting click functionality
document.getElementById('greeting').addEventListener('click', function () {
  this.textContent = this.textContent === 'Hello, World!'
    ? 'Hello again!'
    : 'Hello, World!';
});
