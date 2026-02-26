document.getElementById('greeting').addEventListener('click', function () {
  this.textContent = this.textContent === 'Hello, World!'
    ? 'Hello again!'
    : 'Hello, World!';
});
