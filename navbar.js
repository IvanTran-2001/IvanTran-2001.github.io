/* Shared smooth in-page anchor scrolling — reused by every page instead of per-page duplicates */
function openSectionByHash(hash) {
  if (!hash || hash === '#') return;
  var target;
  try { target = document.querySelector(hash); } catch (err) { return; }
  if (!target) return;
  var details = target.closest('details');
  if (details) details.open = true;
  requestAnimationFrame(function () {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var hash = this.getAttribute('href');
      if (!hash || hash === '#' || !document.querySelector(hash)) return;
      e.preventDefault();
      openSectionByHash(hash);
      history.pushState(null, '', hash);
    });
  });

  if (window.location.hash && !document.body.hasAttribute('data-manual-hash-scroll')) {
    openSectionByHash(window.location.hash);
  }
})();

/* Navbar scroll-hide behaviour — mobile only */
(function () {
  var lastY = window.scrollY;
  var navbar = document.querySelector('.navbar');
  var ticking = false;

  function update() {
    var currentY = window.scrollY;
    if (navbar) {
      navbar.classList.toggle('navbar--scrolled', currentY > 4);
      if (window.innerWidth <= 768) {
        if (currentY > lastY && currentY > 80) {
          navbar.classList.add('navbar--hidden');
        } else {
          navbar.classList.remove('navbar--hidden');
        }
      } else {
        navbar.classList.remove('navbar--hidden');
      }
    }
    lastY = currentY;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && navbar) {
      navbar.classList.remove('navbar--hidden');
    }
  });

  // Always reset collapsible sections to closed on page show (handles bfcache restore)
  window.addEventListener('pageshow', function () {
    if (document.body.hasAttribute('data-manual-hash-scroll')) return;
    document.querySelectorAll('details').forEach(function (d) {
      d.removeAttribute('open');
    });
    if (typeof openSectionByHash === 'function' && window.location.hash) {
      openSectionByHash(window.location.hash);
    }
  });
})();

/* Active-section highlight for navbar links (scrollspy) */
(function () {
  var navLinks = document.querySelectorAll('.navbar-links a[href^="#"], .navbar-sections a[href^="#"], .navbar-more a[href^="#"]');
  if (!navLinks.length) return;

  // Dedupe by id (the same anchor can appear in .navbar-links, .navbar-more, and the mobile .navbar-sections
  // menu), then sort by actual position in the page — nav link order doesn't always match document order.
  var seen = {};
  var sections = [];
  navLinks.forEach(function (link) {
    var section = document.getElementById(link.getAttribute('href').slice(1));
    if (section && !seen[section.id]) {
      seen[section.id] = true;
      sections.push({ id: section.id, section: section });
    }
  });
  if (!sections.length) return;

  sections.sort(function (a, b) {
    var position = a.section.compareDocumentPosition(b.section);
    if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
    if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
    return 0;
  });

  var dropdownSummaries = document.querySelectorAll('.navbar-more > summary');

  function setActive(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + id);
    });
    dropdownSummaries.forEach(function (summary) {
      var hasActiveChild = summary.parentElement.querySelector('a.active');
      summary.classList.toggle('active', !!hasActiveChild);
    });
  }

  function getTriggerLine() {
    return Math.min(window.innerHeight * 0.3, 240);
  }

  function updateActive() {
    var triggerLine = getTriggerLine();
    var currentId = sections[0].id;

    for (var i = 0; i < sections.length; i += 1) {
      var rect = sections[i].section.getBoundingClientRect();
      if (rect.top <= triggerLine) {
        currentId = sections[i].id;
      } else {
        break;
      }
    }

    setActive(currentId);
  }

  var ticking = false;
  function scheduleUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      updateActive();
      ticking = false;
    });
  }

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('hashchange', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate);
  updateActive();
})();

/* Close the "Sections"/"More" overflow menus after choosing a link or tapping outside */
(function () {
  var menus = document.querySelectorAll('.navbar-sections, .navbar-more');
  if (!menus.length) return;
  var supportsHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (supportsHover) {
    menus.forEach(function (menu) {
      if (!menu.classList.contains('navbar-more')) return;

      var summary = menu.querySelector('summary');
      var closeTimer = null;

      function openMenu() {
        menu.setAttribute('open', '');
      }

      function cancelCloseTimer() {
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }
      }

      function scheduleClose() {
        cancelCloseTimer();
        closeTimer = setTimeout(function () {
          menu.removeAttribute('open');
        }, 90);
      }

      summary.addEventListener('mouseenter', function () {
        cancelCloseTimer();
        openMenu();
      });

      menu.addEventListener('mouseenter', function () {
        cancelCloseTimer();
        openMenu();
      });

      menu.addEventListener('mouseleave', scheduleClose);

      summary.addEventListener('focus', openMenu);
      menu.addEventListener('focusin', function () {
        cancelCloseTimer();
        openMenu();
      });

      menu.addEventListener('focusout', function () {
        window.setTimeout(function () {
          if (!menu.contains(document.activeElement)) {
            menu.removeAttribute('open');
          }
        }, 0);
      });
    });
  }

  menus.forEach(function (menu) {
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) menu.removeAttribute('open');
    });
  });

  document.addEventListener('click', function (e) {
    menus.forEach(function (menu) {
      if (menu.hasAttribute('open') && !menu.contains(e.target)) {
        menu.removeAttribute('open');
      }
    });
  });
})();
