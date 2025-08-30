document.addEventListener('DOMContentLoaded', () => {
  let scrollY = 0;

  const lockScroll = () => {
    scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  };

  const unlockScroll = () => {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);
  };

  const closePopup = () => {
    document.querySelectorAll('.footnote-popup,.footnote-overlay').forEach(el => el.remove());
    unlockScroll();
    document.removeEventListener('keydown', escHandler);
  };

  const escHandler = e => { if (e.key === 'Escape') closePopup(); };

  const openPopup = text => {
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
  };

  document.querySelectorAll('.footnote-link').forEach(link =>
    link.addEventListener('click', e => {
      e.preventDefault();
      openPopup(link.dataset.note || '');
    })
  );
});
