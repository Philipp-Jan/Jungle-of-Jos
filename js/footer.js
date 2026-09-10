(function () {
  document.querySelectorAll('.footer-mount').forEach(function (mount) {
    var footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML =
      '<p>&copy; <span id="current-year">' + new Date().getFullYear() +
      '</span> Jungle of Jos. All rights reserved.</p>' +
      '<p class="site-footer-note">Voluntarily created by Philipp. Feel free to ' +
      '<a href="https://github.com/Philipp-Jan/jungle-of-jos" target="_blank" rel="noopener noreferrer">&rarr; contribute.</a></p>';
    mount.replaceWith(footer);
  });
}());
