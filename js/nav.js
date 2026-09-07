(function () {
  var isTourPage = window.location.pathname.includes('/tours/');
  var rootPrefix = isTourPage ? '../' : '';
  var isHomePage = !isTourPage && (
    window.location.pathname.endsWith('/') ||
    window.location.pathname.endsWith('/index.html')
  );
  var homePath = isHomePage ? '' : rootPrefix + 'index.html';

  document.querySelectorAll('.nav-placeholder').forEach(function (placeholder) {
    placeholder.innerHTML =
      '<header class="site-header">' +
        '<nav class="navbar">' +
          '<a href="' + (isHomePage ? '#hero' : homePath + '#hero') + '" class="nav-logo">Jungle of Jos</a>' +
          '<button type="button" class="nav-toggle" aria-expanded="false" aria-controls="primary-navigation" aria-label="Toggle navigation menu">' +
            '<span class="nav-toggle-bar"></span>' +
            '<span class="nav-toggle-bar"></span>' +
            '<span class="nav-toggle-bar"></span>' +
          '</button>' +
          '<ul class="nav-links" id="primary-navigation">' +
            '<li><a href="' + (isHomePage ? '#about' : homePath + '#about') + '">About</a></li>' +
            '<li><a href="' + rootPrefix + '/tours/all-tours.html">Tours</a></li>' +
            '<li><a href="' + rootPrefix + 'faq.html">FAQ</a></li>' +
            '<li><a href="' + (isHomePage ? '#contact' : homePath + '#contact') + '">Contact</a></li>' +
          '</ul>' +
        '</nav>' +
      '</header>';
  });

  // Hamburger toggle for narrow screens - opens/closes the nav-links dropdown.
  document.querySelectorAll('.nav-toggle').forEach(function (toggle) {
    var links = toggle.closest('.navbar').querySelector('.nav-links');

    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('is-open');
      toggle.classList.toggle('is-active', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close the menu once a link is used, since these are same-page anchors
    // and section links that wouldn't otherwise cause the dropdown to close.
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  });
}());
