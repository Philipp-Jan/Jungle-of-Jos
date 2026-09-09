(function () {
  var isTourPage = window.location.pathname.includes('/tours/');
  var rootPrefix = isTourPage ? '../' : '';
  var isHomePage = !isTourPage && (
    window.location.pathname.endsWith('/') ||
    window.location.pathname.endsWith('/index.html')
  );
  var homePath = isHomePage ? '' : rootPrefix + 'index.html';

  document.querySelectorAll('.nav-mount').forEach(function (placeholder) {
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
    // Replace the placeholder itself (not just its contents) so it doesn't
    // linger in the DOM as an empty wrapper div once the header is inserted.
    placeholder.replaceWith(wrapper.firstElementChild);
  });

  // Auto-hide header: visible at first, but hides itself after a few
  // seconds of no scrolling, hides immediately on scroll-down (leaving with
  // the rest of the page), and reappears - floating over the page content -
  // on any scroll-up, wherever on the page that happens.
  document.querySelectorAll('.site-header').forEach(function (header) {
    var HIDE_AFTER_IDLE_MS = 2500;
    var SCROLL_THRESHOLD = 4; // ignores sub-pixel/trackpad jitter
    var TOP_ZONE = 10; // while this close to the very top, behave like a normal (non-hiding) header
    var idleTimer = null;
    var lastScrollY = window.scrollY;

    document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
    window.addEventListener('resize', function () {
      document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
    });

    function menuIsOpen() {
      var links = header.querySelector('.nav-links');
      return links && links.classList.contains('is-open');
    }

    function isAtTop() {
      return window.scrollY <= TOP_ZONE;
    }

    function armIdleHide() {
      clearTimeout(idleTimer);
      if (menuIsOpen() || isAtTop()) return; // stay visible at the top, and don't fight an open mobile menu
      idleTimer = setTimeout(function () {
        header.classList.add('is-hidden');
      }, HIDE_AFTER_IDLE_MS);
    }

    window.addEventListener('scroll', function () {
      if (menuIsOpen()) return;
      var currentScrollY = window.scrollY;

      if (isAtTop()) {
        header.classList.remove('is-hidden');
        lastScrollY = currentScrollY;
        clearTimeout(idleTimer); // no idle auto-hide while at the very top
        return;
      }

      var delta = currentScrollY - lastScrollY;
      if (Math.abs(delta) > SCROLL_THRESHOLD) {
        header.classList.toggle('is-hidden', delta > 0);
        lastScrollY = currentScrollY;
        armIdleHide();
      }
    }, { passive: true });

    armIdleHide();
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
