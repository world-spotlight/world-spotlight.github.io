  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.footnote-link').forEach(link => {
      link.addEventListener('click', () => {
        // 기존 팝업 및 오버레이 제거
        document.querySelectorAll('.footnote-popup, .footnote-overlay').forEach(el => el.remove());

        // 스크롤 방지
        document.body.style.overflow = 'hidden';

        // 오버레이 생성
        const overlay = document.createElement('div');
        overlay.className = 'footnote-overlay';
        document.body.appendChild(overlay);

        // 팝업 생성
        const popup = document.createElement('div');
        popup.className = 'footnote-popup';
        popup.textContent = link.getAttribute('data-note');
        document.body.appendChild(popup);

        // 오버레이 클릭 시 팝업 닫기 + 스크롤 복원
        overlay.addEventListener('click', () => {
          popup.remove();
          overlay.remove();
          document.body.style.overflow = '';
        });
      });
    });
  });
