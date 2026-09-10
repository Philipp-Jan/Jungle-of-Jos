(function () {
  var defaultTitle = 'Ready for the trek?';

  function renderCta(mount) {
    var title = mount.dataset.title || defaultTitle;
    var section = document.createElement('section');
    section.className = 'tour-cta';

    var heading = document.createElement('h2');
    heading.textContent = title;

    var buttons = document.createElement('div');
    buttons.className = 'contact-buttons';
    buttons.innerHTML =
      '<a href="#" class="btn btn-whatsapp btn-large">Message on WhatsApp</a>' +
      '<a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/jungle_of_jos/" class="btn btn-instagram btn-large">Follow on Instagram</a>';

    section.appendChild(heading);
    section.appendChild(buttons);
    mount.replaceWith(section);
  }

  document.querySelectorAll('.cta-mount').forEach(renderCta);
}());
