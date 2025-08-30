(function () {
  function closePopup() {
    document.querySelectorAll('.footnote-popup, .footnote-overlay').forEach(el => el.remove());
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  function init() {
    // 이벤트 위임: 나중에 동적으로 추가된 .footnote-link 도 잡음
    document.addEventListener('click', function (e) {
      const link = e.target.closest('.footnote-link');
      if (!link) return;

      e.preventDefault(); // <a> 태그라면 네비게이션 막기

      // 기존 팝업 닫기
      closePopup();

      // 오버레이
      const overlay = document.createElement('div');
      overlay.className = 'footnote-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      document.body.appendChild(overlay);

      // 팝업
      const popup = document.createElement('div');
      popup.className = 'footnote-popup';
      popup.setAttribute('role', 'dialog');
      popup.setAttribute('aria-modal', 'true');
      popup.textContent = link.dataset.note || link.getAttribute('data-note') || '';
      document.body.appendChild(popup);

      // 스크롤 잠금
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';

      // 닫기
      overlay.addEventListener('click', closePopup);
      function onKey(e) {
        if (e.key === 'Escape') {
          closePopup();
          document.removeEventListener('keydown', onKey);
        }
      }
      document.addEventListener('keydown', onKey);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
