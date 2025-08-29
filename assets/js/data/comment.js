document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.footnote-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.stopPropagation();

      // 기존 팝업 제거
      document.querySelectorAll('.footnote-popup').forEach(p => p.remove());

      // 새 팝업 생성
      const popup = document.createElement('div');
      popup.className = 'footnote-popup';
      popup.textContent = link.getAttribute('data-note');
      document.body.appendChild(popup);

      // 외부 클릭 시 닫기
      setTimeout(() => {
        document.addEventListener('click', function closePopup(ev) {
          if (!popup.contains(ev.target) && ev.target !== link) {
            popup.remove();
            document.removeEventListener('click', closePopup);
          }
        });
      });
    });
  });
});
