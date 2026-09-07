(function () {
  var isTourPage = window.location.pathname.includes('/tours/');
  var rootPrefix = isTourPage ? '../' : '';
  var isHomePage = !isTourPage && (
    window.location.pathname.endsWith('/') ||
    window.location.pathname.endsWith('/index.html')
  );
  var homePath = isHomePage ? '' : rootPrefix + 'index.html';

  document.querySelectorAll('.nav-placeholder').forEach(function (placeholder) {
    var wrapper = document.createElement('div');
    wrapper.innerHTML =
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
    // Replace the placeholder itself (not just its contents) so the sticky
    // header's containing block is <body>, not a same-height wrapper div -
    // a wrapper exactly as tall as the header leaves position: sticky no
    // room to stick, and it silently scrolls away after one header-height.
    placeholder.replaceWith(wrapper.firstElementChild);
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
