document.addEventListener('DOMContentLoaded', () => {
  let popupOpen = false;

  const disableScroll = e => e.preventDefault();

  const openPopup = text => {
    if (popupOpen) return;
    popupOpen = true;

    // 팝업/오버레이 생성
    const overlay = document.createElement('div');
    overlay.className = 'footnote-overlay';
    overlay.addEventListener('click', closePopup);
    overlay.addEventListener('touchmove', disableScroll, { passive: false });

    const popup = document.createElement('div');
    popup.className = 'footnote-popup';
    popup.textContent = text;
    popup.addEventListener('click', e => e.stopPropagation());

    document.body.append(overlay, popup);

    // 스크롤 이벤트 차단
    document.body.addEventListener('wheel', disableScroll, { passive: false });
    document.addEventListener('keydown', escHandler);
  };

  const closePopup = () => {
    document.querySelectorAll('.footnote-popup,.footnote-overlay').forEach(el => el.remove());
    document.body.removeEventListener('wheel', disableScroll, { passive: false });
    document.removeEventListener('keydown', escHandler);
    popupOpen = false;
  };

  const escHandler = e => { if(e.key==='Escape') closePopup(); };

  document.querySelectorAll('.footnote-link').forEach(link =>
    link.addEventListener('click', e => {
      e.preventDefault();
      openPopup(link.dataset.note || '');
    })
  );
});
