/* ============================================================
   Shared Lightbox / Expandable Media \u2014 Ivan Tran Portfolio
   Reusable across all portfolio pages. Any <img class="expandable">
   becomes click/tap/keyboard expandable into a centered overlay.
   Optional caption via data-lightbox-caption="...".
   ============================================================ */
(function () {
  var dialogEl = null;
  var innerEl = null;
  var mediaEl = null;
  var captionEl = null;
  var lastTrigger = null;
  var closeTimer = null;
  var TRANSITION_MS = 200;

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function buildDialog() {
    if (dialogEl) return dialogEl;

    dialogEl = document.createElement('dialog');
    dialogEl.className = 'lightbox';
    dialogEl.setAttribute('aria-label', 'Expanded image');

    innerEl = document.createElement('div');
    innerEl.className = 'lightbox-inner';

    var closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'lightbox-close';
    closeBtn.setAttribute('aria-label', 'Close expanded image');
    closeBtn.innerHTML = '&times;';

    mediaEl = document.createElement('img');
    mediaEl.className = 'lightbox-media';

    captionEl = document.createElement('p');
    captionEl.className = 'lightbox-caption';

    innerEl.appendChild(closeBtn);
    innerEl.appendChild(mediaEl);
    innerEl.appendChild(captionEl);
    dialogEl.appendChild(innerEl);
    document.body.appendChild(dialogEl);

    // Any click inside the dialog (backdrop, media, caption, or the close
    // button) closes it \u2014 keeps the interaction simple and matches the
    // "click outside or click the media to close" requirement.
    dialogEl.addEventListener('click', requestClose);

    // Intercept Escape/native cancel so the exit transition still plays.
    dialogEl.addEventListener('cancel', function (event) {
      event.preventDefault();
      requestClose();
    });

    dialogEl.addEventListener('close', function () {
      lockScroll(false);
      if (lastTrigger) {
        lastTrigger.focus();
        lastTrigger = null;
      }
    });

    return dialogEl;
  }

  function lockScroll(lock) {
    var html = document.documentElement;
    if (lock) {
      var scrollbarWidth = window.innerWidth - html.clientWidth;
      html.classList.add('lightbox-lock');
      if (scrollbarWidth > 0) html.style.paddingRight = scrollbarWidth + 'px';
    } else {
      html.classList.remove('lightbox-lock');
      html.style.paddingRight = '';
    }
  }

  function open(trigger) {
    buildDialog();
    clearTimeout(closeTimer);

    var src = trigger.currentSrc || trigger.getAttribute('src');
    mediaEl.src = src;
    mediaEl.alt = trigger.getAttribute('alt') || '';

    var caption = trigger.getAttribute('data-lightbox-caption') || '';
    captionEl.textContent = caption;

    lastTrigger = trigger;
    lockScroll(true);

    if (typeof dialogEl.showModal === 'function') {
      dialogEl.showModal();
    } else {
      dialogEl.setAttribute('open', '');
    }

    if (prefersReducedMotion()) {
      innerEl.classList.add('is-visible');
    } else {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          innerEl.classList.add('is-visible');
        });
      });
    }
  }

  function requestClose() {
    if (!dialogEl || !dialogEl.open) return;
    innerEl.classList.remove('is-visible');
    var delay = prefersReducedMotion() ? 0 : TRANSITION_MS;
    clearTimeout(closeTimer);
    closeTimer = setTimeout(function () {
      dialogEl.close();
    }, delay);
  }

  function onTriggerActivate(event) {
    event.preventDefault();
    open(event.currentTarget);
  }

  function onTriggerKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open(event.currentTarget);
    }
  }

  function init() {
    var triggers = document.querySelectorAll('img.expandable');
    triggers.forEach(function (img) {
      if (img.dataset.lightboxBound) return;
      img.dataset.lightboxBound = 'true';
      img.setAttribute('role', 'button');
      img.setAttribute('tabindex', '0');
      if (!img.hasAttribute('aria-label')) {
        var alt = img.getAttribute('alt');
        img.setAttribute('aria-label', alt ? 'Expand image: ' + alt : 'Expand image');
      }
      img.addEventListener('click', onTriggerActivate);
      img.addEventListener('keydown', onTriggerKeydown);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
