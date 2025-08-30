document.addEventListener('DOMContentLoaded', () => {
  let scrollPos = 0;

  const lockScroll = () => {
    scrollPos = window.scrollY || document.documentElement.scrollTop;
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.position = 'relative';
    document.documentElement.style.top = `-${scrollPos}px`;
  };

  const unlockScroll = () => {
    document.documentElement.style.overflow = '';
    document.documentElement.style.position = '';
    document.documentElement.style.top = '';
    window.scrollTo(0, scrollPos);
  };

  const closePopup = () => {
    document.querySelectorAll('.footnote-popup,.footnote-overlay').forEach(el => el.remove());
    unlockScroll();
    document.removeEventListener('keydown', escHandler);
  };

  const escHandler = e => { if(e.key==='Escape') closePopup(); };

  const openPopup = text => {
    closePopup();
    lockScroll();

    const overlay = document.createElement('div');
    overlay.className = 'footnote-overlay';
    overlay.onclick = closePopup;
    overlay.addEventListener('touchmove', e => e.preventDefault(), {passive:false});

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
