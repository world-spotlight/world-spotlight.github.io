<script>
document.addEventListener('DOMContentLoaded', () => {
  let scrollDisabled = false;

  const disableScroll = () => {
    if (scrollDisabled) return;
    scrollDisabled = true;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    document.body.style.overscrollBehavior = 'none';
  };

  const enableScroll = () => {
    scrollDisabled = false;
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
    document.body.style.overscrollBehavior = '';
  };

  const closePopup = () => {
    document.querySelectorAll('.footnote-popup,.footnote-overlay').forEach(el => el.remove());
    enableScroll();
    document.removeEventListener('keydown', escHandler);
  };

  const escHandler = e => { if(e.key==='Escape') closePopup(); };

  const openPopup = text => {
    closePopup();
    disableScroll();

    const overlay = document.createElement('div');
    overlay.className = 'footnote-overlay';
    overlay.onclick = closePopup;
    overlay.addEventListener('touchmove', e => e.preventDefault(), {passive:false});

    const popup = document.createElement('div');
    popup.className = 'footnote-popup';
    popup.textContent = text;
    popup.onclick = e=>e.stopPropagation();

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
</script>
