document.addEventListener('click', function(e) {
  const link = e.target.closest('.footnote-link');
  if (!link) return;

  // 기존 팝업 제거
  document.querySelectorAll('.footnote-popup, .footnote-overlay').forEach(el => el.remove());

  // 스크롤 잠금
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollTop}px`;
  document.body.dataset.scrollTop = scrollTop;

  // 오버레이 생성
  const overlay = document.createElement('div');
  overlay.className = 'footnote-overlay';
  document.body.appendChild(overlay);

  // 팝업 생성
  const popup = document.createElement('div');
  popup.className = 'footnote-popup';
  popup.textContent = link.getAttribute('data-note') || '';
  document.body.appendChild(popup);

  // 닫기 함수
  const closePopup = () => {
    popup.remove();
    overlay.remove();
    const savedScroll = parseInt(document.body.dataset.scrollTop || '0');
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, savedScroll);
  };

  overlay.addEventListener('click', closePopup);
});
