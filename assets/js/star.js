document.addEventListener("DOMContentLoaded", () => {
  // ⭐ CSS 동적 삽입
  const style = document.createElement('style');
  style.innerHTML = `
    .petal {
      position: absolute;
      pointer-events: none;
      opacity: 1;
      animation: fly 1.5s forwards;
    }
    .petal svg {
      width: 100%;
      height: 100%;
    }
    @keyframes fly {
      to {
        transform: translate(var(--dx), var(--dy)) rotate(var(--rotate));
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // ⭐ 분홍색 팔레트
  const softPinks = [
    "#ffe4ec","#ffe0ea","#ffdce8","#ffd8e6","#ffd4e4",
    "#ffcfdf","#ffcadb","#ffc6d7","#ffc1d3","#ffbcd0",
    "#ffb7cc","#ffb2c8","#ffadc4","#ffa8c0","#ffa3bc",
    "#ff9eb8","#ff99b4","#ff94b0","#ff8fa9","#ff8aa5"
  ];
  const getRandom = (min, max) => Math.random() * (max - min) + min;
  const getRandomPink = () => softPinks[Math.floor(Math.random() * softPinks.length)];

  // ⭐ container + defs 생성
  let container = document.getElementById('star-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'star-container';
    container.style.position = 'fixed';
    container.style.top = 0;
    container.style.left = 0;
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.overflow = 'hidden';
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);

    const svgDefs = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgDefs.setAttribute("width", 0);
    svgDefs.setAttribute("height", 0);
    svgDefs.innerHTML = '<defs id="gradients"></defs>';
    container.appendChild(svgDefs);
  }
  const defs = document.getElementById("gradients");

  // ⭐ 별 생성 함수 (항상 10개)
  function createPetals(x, y) {
    const count = 10; // 10개 고정
    const containerRect = container.getBoundingClientRect();

    for (let i = 0; i < count; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      const size = getRandom(15, 35);
      petal.style.width = `${size}px`;
      petal.style.height = `${size}px`;
      petal.style.opacity = getRandom(0.6, 1);

      const petalLeft = Math.min(Math.max(x - containerRect.left - size / 2, 0), containerRect.width - size);
      const petalTop = Math.min(Math.max(y - containerRect.top - size / 2, 0), containerRect.height - size);
      petal.style.left = `${petalLeft}px`;
      petal.style.top = `${petalTop}px`;

      const dx = getRandom(-Math.min(80, petalLeft), Math.min(80, containerRect.width - petalLeft - size)) + 'px';
      const dy = getRandom(-Math.min(100, petalTop), Math.min(100, containerRect.height - petalTop - size)) + 'px';
      const rotate = getRandom(-720, 720) + 'deg';
      petal.style.setProperty('--dx', dx);
      petal.style.setProperty('--dy', dy);
      petal.style.setProperty('--rotate', rotate);

      const gradId = "grad-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
      let color1 = getRandomPink();
      let color2 = getRandomPink();
      while(color1 === color2) color2 = getRandomPink();

      const gradient = `
        <linearGradient id="${gradId}" gradientTransform="rotate(${getRandom(20,70)})">
          <stop offset="0%" stop-color="${color1}" />
          <stop offset="100%" stop-color="${color2}" />
        </linearGradient>
      `;
      defs.insertAdjacentHTML("beforeend", gradient);

      petal.innerHTML = `
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <polygon fill="url(#${gradId})"
                   points="50,5 61,39 98,39 68,59 
                           79,91 50,70 21,91 32,59 
                           2,39 39,39"/>
        </svg>
      `;
      container.appendChild(petal);

      petal.addEventListener('animationend', () => {
        petal.remove();
        const gradEl = document.getElementById(gradId);
        if (gradEl) gradEl.remove();
      });
    }
  }

  // ⭐ 터치/클릭 이벤트 처리
  document.addEventListener('touchstart', e => {
    const touch = e.touches[0];
    createPetals(touch.clientX, touch.clientY);
    e.preventDefault(); // 클릭 중복 방지
  });
  document.addEventListener('click', e => {
    createPetals(e.clientX, e.clientY);
  });
});
