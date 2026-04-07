// Current location from Google Apps Script
(function () {
  var endpoint = 'https://script.google.com/macros/s/AKfycbyx0A3UgAEdSCnkkZjiSBTAGZ_wRU38RVtQfsO0L-RuADoO24DI/exec?func=current';
  var el = document.getElementById('currentLocation');
  if (!el) return;

  // JSONP callback
  var callbackName = '_locationCallback';
  window[callbackName] = function (result) {
    el.textContent = result.content;
    delete window[callbackName];
    var script = document.getElementById('location-jsonp');
    if (script) script.remove();
  };

  var script = document.createElement('script');
  script.id = 'location-jsonp';
  script.src = endpoint + '&callback=' + callbackName;
  document.body.appendChild(script);
})();

// Scroll animations (IntersectionObserver)
(function () {
  var targets = document.querySelectorAll('.fade-in');
  if (!targets.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(function (el) { observer.observe(el); });
})();

// Nav scroll shadow
(function () {
  var nav = document.querySelector('.site-nav');
  if (!nav) return;

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
})();

// Mobile nav toggle
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });

  // Close on link click
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });
})();
