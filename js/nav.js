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
          '<ul class="nav-links">' +
            '<li><a href="' + (isHomePage ? '#about' : homePath + '#about') + '">About</a></li>' +
            '<li><a href="' + rootPrefix + '/tours/all-tours.html">Tours</a></li>' +
            '<li><a href="' + (isHomePage ? '#gallery' : homePath + '#gallery') + '">Gallery</a></li>' +
            '<li><a href="' + rootPrefix + 'faq.html">FAQ</a></li>' +
            '<li><a href="' + (isHomePage ? '#contact' : homePath + '#contact') + '">Contact</a></li>' +
          '</ul>' +
        '</nav>' +
      '</header>';
  });
}());
