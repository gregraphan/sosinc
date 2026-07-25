/* Shared behaviour for every page.
   Previously this was inlined per page, and the reveal half existed only on the
   homepage, which left .reveal content stuck at opacity 0 everywhere else. */

(function () {
  // Mobile navigation toggle.
  var t = document.querySelector('.nav-toggle');
  var n = document.getElementById('nav');
  if (t && n) {
    t.addEventListener('click', function () {
      var open = n.getAttribute('data-open') === 'true';
      n.setAttribute('data-open', String(!open));
      t.setAttribute('aria-expanded', String(!open));
    });
  }

  // Adoptable-cat filtering. No-ops on pages without a filter bar.
  // Filters run over the already-rendered cards, so every cat stays in the
  // markup and remains findable if this script never runs.
  (function () {
    var form = document.getElementById('filters');
    var grid = document.getElementById('grid');
    if (!form || !grid) return;

    var cards   = [].slice.call(grid.querySelectorAll('.cat'));
    var fName   = document.getElementById('f-name');
    var fAge    = document.getElementById('f-age');
    var fSex    = document.getElementById('f-sex');
    var fPair   = document.getElementById('f-pair');
    var fSpec   = document.getElementById('f-special');
    var count   = document.getElementById('count');
    var empty   = document.getElementById('empty');
    var total   = cards.length;

    function apply() {
      var q    = fName && fName.value ? fName.value.trim().toLowerCase() : '';
      var age  = fAge  ? fAge.value : '';
      var sex  = fSex  ? fSex.value : '';
      var pair = fPair ? fPair.checked : false;
      var spec = fSpec ? fSpec.checked : false;
      var shown = 0;

      cards.forEach(function (c) {
        var ok = true;
        if (q    && (c.getAttribute('data-name') || '').toLowerCase().indexOf(q) === -1) ok = false;
        if (age  && c.getAttribute('data-age')     !== age) ok = false;
        if (sex  && c.getAttribute('data-sex')     !== sex) ok = false;
        if (pair && c.getAttribute('data-bonded')  !== 'yes') ok = false;
        if (spec && c.getAttribute('data-special') !== 'yes') ok = false;
        c.hidden = !ok;
        if (ok) shown++;
      });

      var filtering = !!(q || age || sex || pair || spec);
      if (count) {
        count.textContent = !filtering
          ? 'Showing all ' + total + ' cats.'
          : shown === 0
            ? 'No cats match those filters.'
            : 'Showing ' + shown + ' of ' + total + ' cats.';
      }
      if (empty) empty.hidden = shown !== 0;
      grid.hidden = shown === 0;
    }

    function clear() {
      if (fName) fName.value = '';
      if (fAge)  fAge.value  = '';
      if (fSex)  fSex.value  = '';
      if (fPair) fPair.checked = false;
      if (fSpec) fSpec.checked = false;
      apply();
      if (fName) fName.focus();
    }

    form.addEventListener('input', apply);
    form.addEventListener('change', apply);
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    ['clear', 'clear2'].forEach(function (id) {
      var b = document.getElementById(id);
      if (b) b.addEventListener('click', clear);
    });

    apply();
  })();

  // Scroll reveal, progressive enhancement only. Content must be visible if this
  // never runs, so anything that fails falls through to showing everything.
  var els = [].slice.call(document.querySelectorAll('.reveal'));
  if (!els.length) return;

  function showAll() {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    showAll();
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

  els.forEach(function (el) { io.observe(el); });

  // Safety net: if anything above is still unrevealed shortly after load,
  // reveal it rather than leaving content invisible.
  window.setTimeout(function () {
    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && !el.classList.contains('in')) {
        el.classList.add('in');
      }
    });
  }, 1200);
})();
