(function(){
  // =======================
  // 전역 설정값 (CONFIG)
  // =======================
  const CONFIG = {
    minSize: 15,      // 최소 잎 크기(px)
    maxSize: 20,      // 최대 잎 크기(px)
    minCount: 15,      // 최소 생성 개수
    maxCount: 20,     // 최대 생성 개수
    minDistance: 25,  // 최소 확산 거리(px)
    maxDistance: 50,  // 최대 확산 거리(px)
    minDuration: 500, // 최소 애니메이션 시간(ms)
    maxDuration: 1000, // 최대 애니메이션 시간(ms)
    staggerMs: 0,     // 연속 생성 시 지연(ms)
    removeMargin: 150 // 애니메이션 후 잔여 제거 시간(ms)
  };

  // =======================
  // 유틸 함수
  // =======================
  const rnd = (a,b) => Math.random()*(b-a)+a;       // 범위 내 실수 랜덤
  const rndInt = (a,b) => Math.floor(rnd(a,b+1));   // 범위 내 정수 랜덤

  // 클릭 애니메이션을 무시할 요소 선택자
  const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, [data-no-sakura], .no-sakura';

  // =======================
  // 벚꽃잎 하나 생성
  // =======================
  function createPetal(x, y) {
    const el = document.createElement('div');
    el.className = 'sakura-petal';

    // 크기 랜덤 설정
    const size = rnd(CONFIG.minSize, CONFIG.maxSize);
    el.style.width = size + 'px';
    el.style.height = size + 'px';

    // 시작 위치 (마우스 좌표 기준)
    const startX = x - size/2;
    const startY = y - size/2;
    el.style.transform = `translate3d(${startX}px, ${startY}px, 0) rotate(${rnd(0,360)}deg) scale(1)`;
    el.style.opacity = 1;

    // DOM에 추가
    document.body.appendChild(el);

    // 확산 방향 (랜덤 각도 + 거리)
    const angle = rnd(0, Math.PI*2);
    const distance = rnd(CONFIG.minDistance, CONFIG.maxDistance);
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    // 3D 회전 효과
    const rotateZ = rnd(180, 720);   // 평면 회전
    const rotateY = rnd(-540, 540);  // 좌우 뒤집힘 효과
    const scale = rnd(0.6, 1.3);     // 크기 변화

    const duration = rnd(CONFIG.minDuration, CONFIG.maxDuration);

    // 애니메이션 시작
    requestAnimationFrame(()=>{
      el.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
      el.style.transform = `
        translate3d(${startX+dx}px, ${startY+dy}px, 0)
        rotate(${rotateZ}deg)
        rotateY(${rotateY}deg)
        scale(${scale})
      `;
      el.style.opacity = 0; // 서서히 사라짐
    });

    // 애니메이션 종료 후 DOM에서 제거
    setTimeout(()=>el.remove(), duration + CONFIG.removeMargin);
  }

  // =======================
  // 여러 개 잎 생성
  // =======================
  function spawnPetalsAt(x,y){
    const count = rndInt(CONFIG.minCount, CONFIG.maxCount);
    for(let i=0;i<count;i++){
      setTimeout(()=>createPetal(x,y), i*CONFIG.staggerMs);
    }
  }

  // =======================
  // 포인터 클릭 이벤트 핸들러
  // =======================
  function onPointerDown(e){
    if(!e.isPrimary) return;                    // 멀티터치 시 보조 포인터 무시
    if(e.pointerType==='mouse' && e.button!==0) return; // 마우스 왼쪽 버튼만 허용
    if(e.target.closest(INTERACTIVE_SELECTOR)) return;  // 링크/버튼 등 인터랙티브 요소는 무시

    spawnPetalsAt(e.clientX, e.clientY);
  }

  // =======================
  // 이벤트 바인딩
  // =======================
  window.addEventListener('pointerdown', onPointerDown, {passive:true});
})();
