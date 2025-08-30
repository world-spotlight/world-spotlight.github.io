document.addEventListener('DOMContentLoaded', () => {
  let scrollY = 0;

  function lockScroll() {
    scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
  }

  function unlockScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);
  }

  function closePopup() {
    document.querySelectorAll('.footnote-popup,.footnote-overlay').forEach(el => el.remove());
    unlockScroll();
    document.removeEventListener('keydown', escHandler);
  }

  function escHandler(e) {
    if (e.key === 'Escape') closePopup();
  }

  function openPopup(text) {
    closePopup();
    lockScroll();

    const overlay = document.createElement('div');
    overlay.className = 'footnote-overlay';
    overlay.onclick = closePopup;
    overlay.addEventListener('touchmove', e => e.preventDefault(), { passive: false });

    const popup = document.createElement('div');
    popup.className = 'footnote-popup';
    popup.textContent = text;
    popup.onclick = e => e.stopPropagation();

    document.body.append(overlay, popup);
    document.addEventListener('keydown', escHandler);
  }

  document.querySelectorAll('.footnote-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      openPopup(link.dataset.note || '');
    });
  });
});
