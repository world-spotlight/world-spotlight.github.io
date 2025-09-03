document.addEventListener("DOMContentLoaded", () => {
  // 랜덤 숫자
  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  // 부드러운 핑크 계열 팔레트
  const softPinks = [
    "#ffe4ec", "#ffd6e8", "#ffc1d9", "#ffb6d0", "#ffa6c9"
  ];

  function getRandomPink() {
    return softPinks[Math.floor(Math.random() * softPinks.length)];
  }

  // 별 생성 함수
  function createPetals(x, y) {
    const count = Math.floor(getRandom(5, 13));
    
    // SVG defs를 미리 body 최상단에 삽입해야 함
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
      petal.style.left = `${x - size / 2}px`;
      petal.style.top = `${y - size / 2}px`;

      // 이동 및 회전
      const dx = getRandom(-80, 80) + 'px';
      const dy = getRandom(-100, 100) + 'px';
      const rotate = getRandom(-720, 720) + 'deg';
      petal.style.setProperty('--dx', dx);
      petal.style.setProperty('--dy', dy);
      petal.style.setProperty('--rotate', rotate);

      // 랜덤 부드러운 분홍색 그라데이션
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

      // 애니메이션 끝나면 제거 + 그라데이션도 제거
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
