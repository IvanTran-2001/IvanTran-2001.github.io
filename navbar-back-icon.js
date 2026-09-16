class SiteNavbarBack extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered === 'true') return;

    var href = this.getAttribute('href') || '#';
    var label = this.getAttribute('label') || 'Back';
    var title = this.getAttribute('title') || label;

    var link = document.createElement('a');
    link.href = href;
    link.className = 'navbar-back-icon';
    link.setAttribute('aria-label', label);
    link.setAttribute('title', title);

    var icon = document.createElement('i');
    icon.className = 'fas fa-arrow-left';
    icon.setAttribute('aria-hidden', 'true');

    link.appendChild(icon);
    this.replaceChildren(link);
    this.dataset.rendered = 'true';
  }
}

if (!customElements.get('site-navbar-back')) {
  customElements.define('site-navbar-back', SiteNavbarBack);
}
