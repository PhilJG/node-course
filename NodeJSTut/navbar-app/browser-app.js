const navToggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.links');
window.onload = function () {
  navToggle.addEventListener('click', function () {
    links.classList.toggle('show-links');
  });
};
