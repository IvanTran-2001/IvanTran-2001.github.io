/* Navbar scroll-hide behaviour — mobile only */
(function () {
  var lastY = window.scrollY;
  var navbar = document.querySelector('.navbar');
  var ticking = false;

  function update() {
    var currentY = window.scrollY;
    if (navbar) {
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
