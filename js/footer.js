(function () {
  document.querySelectorAll('.footer-placeholder').forEach(function (placeholder) {
    var footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML =
      '<p>&copy; <span id="current-year">' + new Date().getFullYear() +
      '</span> Jungle of Jos. All rights reserved.</p>';
    placeholder.replaceWith(footer);
  });
}());
