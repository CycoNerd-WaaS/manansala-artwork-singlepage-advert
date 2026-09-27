/* Vicente Manansala · Still Life, 1981 — small enhancements, no dependencies.
   The page works without this file: links open the full-size images and all text is visible. */
(() => {
  'use strict';

  /* ------------------------------------------------------------------
     INQUIRY EMAIL — the only setting to edit.
     Split into two parts so simple spam bots can't read the address
     from the page source. Leave both empty to show "coming soon".
     Example: { user: 'karl', domain: 'example.com' }
     ------------------------------------------------------------------ */
  const INQUIRY_EMAIL = { user: '', domain: '' };
  const EMAIL_SUBJECT = 'Inquiry: Vicente Manansala, Still Life (1981)';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Email links ---------- */
  if (INQUIRY_EMAIL.user && INQUIRY_EMAIL.domain) {
    const address = `${INQUIRY_EMAIL.user}@${INQUIRY_EMAIL.domain}`;
    const href = `mailto:${address}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`;

    document.querySelectorAll('[data-inquire]').forEach((link) => {
      link.href = href;
      link.hidden = false;
    });
    document.querySelectorAll('[data-inquire-address]').forEach((el) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = address;
      el.replaceChildren(link);
    });
  }

  /* ---------- Header border once the page scrolls ---------- */
  const header = document.querySelector('[data-header]');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Lightbox with click-to-zoom ---------- */
  const dialog = document.getElementById('lightbox');
  if (dialog && typeof dialog.showModal === 'function') {
    const stage = dialog.querySelector('[data-stage]');
    const img = dialog.querySelector('[data-lightbox-img]');
    const webp = dialog.querySelector('[data-lightbox-webp]');
    const caption = dialog.querySelector('[data-lightbox-caption]');
    const zoomBtn = dialog.querySelector('[data-zoom]');
    const zoomLabel = dialog.querySelector('[data-zoom-label]');
    const zoomPlus = dialog.querySelector('[data-zoom-plus]');
    const closeBtn = dialog.querySelector('[data-close]');
    let opener = null;

    const isZoomed = () => stage.classList.contains('is-zoomed');

    // fx / fy: the point (0–1) of the image to keep centred after zooming in
    const setZoom = (on, fx = 0.5, fy = 0.5) => {
      if (on) {
        const fitWidth = img.getBoundingClientRect().width;
        const width = Math.max(img.naturalWidth || 0, fitWidth * 2);
        img.style.width = `${Math.round(width)}px`;
        stage.classList.add('is-zoomed');
        requestAnimationFrame(() => {
          const r = img.getBoundingClientRect();
          stage.scrollLeft = img.offsetLeft + fx * r.width - stage.clientWidth / 2;
          stage.scrollTop = img.offsetTop + fy * r.height - stage.clientHeight / 2;
        });
      } else {
        img.style.width = '';
        stage.classList.remove('is-zoomed');
        stage.scrollTo(0, 0);
      }
      zoomBtn.setAttribute('aria-pressed', String(on));
      zoomLabel.textContent = on ? 'Fit' : 'Zoom';
      if (zoomPlus) zoomPlus.style.display = on ? 'none' : '';
    };

    const open = (link) => {
      opener = link;
      const thumb = link.querySelector('img');
      if (link.dataset.webp) webp.srcset = link.dataset.webp;
      else webp.removeAttribute('srcset');
      img.src = link.href;
      img.alt = thumb ? thumb.alt : '';
      caption.textContent = link.dataset.caption || '';
      setZoom(false);
      dialog.showModal();
      closeBtn.focus();
    };

    document.addEventListener('click', (event) => {
      const link = event.target.closest('a.zoomable');
      if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      open(link);
    });

    img.addEventListener('click', (event) => {
      const r = img.getBoundingClientRect();
      const fx = (event.clientX - r.left) / r.width;
      const fy = (event.clientY - r.top) / r.height;
      setZoom(!isZoomed(), fx, fy);
    });

    zoomBtn.addEventListener('click', () => setZoom(!isZoomed()));
    closeBtn.addEventListener('click', () => dialog.close());

    // Click on the dark area around the image closes the viewer
    stage.addEventListener('click', (event) => {
      if (event.target === stage) dialog.close();
    });

    dialog.addEventListener('close', () => {
      setZoom(false);
      img.removeAttribute('src');
      webp.removeAttribute('srcset');
      if (opener) opener.focus({ preventScroll: true });
    });
  }

  /* ---------- Gentle reveal on scroll ---------- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const items = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });

    items.forEach((el) => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }
})();
