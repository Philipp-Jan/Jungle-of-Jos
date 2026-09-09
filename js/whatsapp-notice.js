(function () {
  var FADE_OUT_MS = 800;
  var VISIBLE_MS = 5000;
  var toast = null;
  var hideTimer = null;
  var removeTimer = null;

  function getToast() {
    if (toast) return toast;
    toast = document.createElement('div');
    toast.className = 'whatsapp-coming-soon-toast';
    toast.setAttribute('role', 'status');
    toast.innerHTML =
      '<svg class="whatsapp-coming-soon-toast-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="9.25" stroke="currentColor" stroke-width="1.6" />' +
      '<line x1="12" y1="11" x2="12" y2="16.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />' +
      '<circle cx="12" cy="7.5" r="1.15" fill="currentColor" />' +
      '</svg>' +
      '<span>This feature is coming soon. Thanks for your patience!</span>';
    document.body.appendChild(toast);
    return toast;
  }

  function showToast(button) {
    var el = getToast();
    clearTimeout(hideTimer);
    clearTimeout(removeTimer);
    el.classList.remove('is-visible');

    el.style.display = 'flex';

    var buttonRect = button.getBoundingClientRect();
    var toastRect = el.getBoundingClientRect();
    var margin = 12;
    var left = buttonRect.left + buttonRect.width / 2 - toastRect.width / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - toastRect.width - margin));
    var top = buttonRect.top - toastRect.height - 10;

    el.style.left = left + 'px';
    el.style.top = top + 'px';

    // Force a reflow so the opacity transition below actually runs instead
    // of the browser coalescing it with the styles set just above.
    void el.offsetWidth;
    el.classList.add('is-visible');

    hideTimer = setTimeout(function () {
      el.classList.remove('is-visible');
      removeTimer = setTimeout(function () {
        el.style.display = 'none';
      }, FADE_OUT_MS);
    }, VISIBLE_MS);
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest('.btn-whatsapp');
    if (!button) return;
    event.preventDefault();
    showToast(button);
  });
}());
