document.addEventListener('DOMContentLoaded', () => {
  let popupOpen = false;

  const disableScroll = e => e.preventDefault();

  const openPopup = text => {
    if (popupOpen) return;
    popupOpen = true;

    const overlay = document.createElement('div');
    overlay.className = 'footnote-overlay';
    overlay.addEventListener('click', closePopup);
    overlay.addEventListener('touchmove', disableScroll, { passive: false });

    const popup = document.createElement('div');
    popup.className = 'footnote-popup';
    popup.innerHTML = text.replace(/\n/g, '<br>');
    popup.addEventListener('click', e => e.stopPropagation());

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    document.body.addEventListener('wheel', disableScroll, { passive: false });
    document.addEventListener('keydown', escHandler);
  };

  const closePopup = () => {
    document.querySelectorAll('.footnote-popup,.footnote-overlay').forEach(el => el.remove());
    document.body.removeEventListener('wheel', disableScroll, { passive: false });
    document.removeEventListener('keydown', escHandler);
    popupOpen = false;
  };

  const escHandler = e => { if (e.key === 'Escape') closePopup(); };

  // footnote-link 자동 번호 매기기
  document.querySelectorAll('.footnote-link').forEach((link, index) => {
    link.textContent = `[${index + 1}]`; // [1], [2], [3]...
    link.addEventListener('click', e => {
      e.preventDefault();
      openPopup(link.dataset.note || '');
    });
  });
});
