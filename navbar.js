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
  var navLinks = document.querySelectorAll('.navbar-links a[href^="#"], .navbar-sections a[href^="#"]');
  if (!navLinks.length) return;

  var sections = [];
  navLinks.forEach(function (link) {
    var section = document.getElementById(link.getAttribute('href').slice(1));
    if (section) sections.push({ id: section.id, section: section });
  });
  if (!sections.length) return;

  function setActive(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + id);
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

/* Close the mobile "Sections" menu after choosing a link or tapping outside */
(function () {
  var sectionsMenu = document.querySelector('.navbar-sections');
  if (!sectionsMenu) return;

  sectionsMenu.addEventListener('click', function (e) {
    if (e.target.closest('a')) sectionsMenu.removeAttribute('open');
  });

  document.addEventListener('click', function (e) {
    if (sectionsMenu.hasAttribute('open') && !sectionsMenu.contains(e.target)) {
      sectionsMenu.removeAttribute('open');
    }
  });
})();
