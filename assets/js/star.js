document.addEventListener("DOMContentLoaded", () => {
  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  // 🎨 부드럽게 톤이 맞는 분홍색 계열 20가지
  const softPinks = [
    "#ffe4ec", "#ffe0ea", "#ffdce8", "#ffd8e6", "#ffd4e4",
    "#ffcfdf", "#ffcadb", "#ffc6d7", "#ffc1d3", "#ffbcd0",
    "#ffb7cc", "#ffb2c8", "#ffadc4", "#ffa8c0", "#ffa3bc",
    "#ff9eb8", "#ff99b4", "#ff94b0", "#ff8fa9", "#ff8aa5"
  ];

  function getRandomPink() {
    return softPinks[Math.floor(Math.random() * softPinks.length)];
  }

  function createPetals(x, y) {
    const count = Math.floor(getRandom(5, 13));

    // defs 생성 (한 번만)
    let defs = document.getElementById("gradients");
    if (!defs) {
      const svgDefs = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svgDefs.setAttribute("width", 0);
      svgDefs.setAttribute("height", 0);
      svgDefs.innerHTML = '<defs id="gradients"></defs>';
      document.body.appendChild(svgDefs);
      defs = document.getElementById("gradients");
    }

    for (let i = 0; i < count; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';

      const size = getRandom(15, 35);
      petal.style.width = `${size}px`;
      petal.style.height = `${size}px`;
      petal.style.opacity = getRandom(0.6, 1);

      // 화면 안쪽 위치 보정
      const petalLeft = Math.min(Math.max(x - size / 2, 0), window.innerWidth - size);
      const petalTop = Math.min(Math.max(y - size / 2, 0), window.innerHeight - size);
      petal.style.left = `${petalLeft}px`;
      petal.style.top = `${petalTop}px`;

      // 이동 범위 제한
      const dx = getRandom(
        -Math.min(80, petalLeft),
        Math.min(80, window.innerWidth - petalLeft - size)
      ) + 'px';

      const dy = getRandom(
        -Math.min(100, petalTop),
        Math.min(100, window.innerHeight - petalTop - size)
      ) + 'px';

      const rotate = getRandom(-720, 720) + 'deg';
      petal.style.setProperty('--dx', dx);
      petal.style.setProperty('--dy', dy);
      petal.style.setProperty('--rotate', rotate);

      // 랜덤 분홍 그라데이션
      const gradId = "grad-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
      const color1 = getRandomPink();
      let color2 = getRandomPink();
      while(color1 === color2) color2 = getRandomPink();

      const gradient = `
        <linearGradient id="${gradId}" gradientTransform="rotate(${getRandom(20,70)})">
          <stop offset="0%" stop-color="${color1}" />
          <stop offset="100%" stop-color="${color2}" />
        </linearGradient>
      `;
      defs.insertAdjacentHTML("beforeend", gradient);

      // 별 SVG
      petal.innerHTML = `
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <polygon fill="url(#${gradId})"
                   points="50,5 61,39 98,39 68,59 
                           79,91 50,70 21,91 32,59 
                           2,39 39,39"/>
        </svg>
      `;

      document.body.appendChild(petal);

      // 애니메이션 끝나면 제거 + 그라데이션 제거
      petal.addEventListener('animationend', () => {
        petal.remove();
        const gradEl = document.getElementById(gradId);
        if (gradEl) gradEl.remove();
      });
    }
  }

  // 클릭/터치 이벤트
  document.addEventListener('click', e => createPetals(e.clientX, e.clientY));
  document.addEventListener('touchstart', e => {
    const touch = e.touches[0];
    createPetals(touch.clientX, touch.clientY);
  });
});
