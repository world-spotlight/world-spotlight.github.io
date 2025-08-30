document.addEventListener('DOMContentLoaded', () => {
  let scrollPos = 0;

  function openPopup(text) {
    // 기존 제거
    document.querySelectorAll('.footnote-popup, .footnote-overlay').forEach(el => el.remove());

    // 현재 스크롤 위치 저장
    scrollPos = window.scrollY || document.documentElement.scrollTop || 0;

    // body 고정 (iOS에서 overflow:hidden이 안먹을 때 이 방식이 안전)
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPos}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';

    // 오버레이 생성
    const overlay = document.createElement('div');
    overlay.className = 'footnote-overlay';
    // 오버레이 터치/스크롤 차단 (iOS 바운스 방지)
    overlay.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
    overlay.addEventListener('click', closePopup);
    document.body.appendChild(overlay);

    // 팝업 생성
    const popup = document.createElement('div');
    popup.className = 'footnote-popup';
    popup.textContent = text || '';
    // 팝업 내부 클릭이 오버레이로 전파되는 것 방지
    popup.addEventListener('click', e => e.stopPropagation());
    document.body.appendChild(popup);

    // ESC로 닫기
    document.addEventListener('keydown', escHandler);
  }

  function closePopup() {
    document.querySelectorAll('.footnote-popup, .footnote-overlay').forEach(el => el.remove());
    // body 스타일 복원 및 스크롤 위치 복구
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPos);
    document.removeEventListener('keydown', escHandler);
  }

  function escHandler(e) {
    if (e.key === 'Escape') closePopup();
  }

  // 링크에 연결
  document.querySelectorAll('.footnote-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      openPopup(link.getAttribute('data-note') || '');
    });
  });
});
