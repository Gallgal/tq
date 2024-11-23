
//---------------- nav ----------------
const about = document.getElementById('about');
 const project = document.getElementById('project');
 const designer = document.getElementById('designer');
 const archive = document.getElementById('archive');

 // 마우스를 버튼에 올렸을 때 텍스트 변경
 project.addEventListener('mouseenter', () => {
  project.textContent = 'P?oje?t,';
 });
 designer.addEventListener('mouseenter', () => {
  designer.textContent = 'D?s?gn?r,';
 });
 archive.addEventListener('mouseenter', () => {
  archive.textContent = 'A?chi?e.';
 });

 // 마우스를 버튼에서 뗐을 때 원래 텍스트로 복원
 project.addEventListener('mouseleave', () => {
  project.textContent = 'Project,';
});
designer.addEventListener('mouseleave', () => {
  designer.textContent = 'Designer,';
});
archive.addEventListener('mouseleave', () => {
  archive.textContent = 'Archive.';
});


function updateTextForMobile() {
  // 모바일인지 확인 (화면 너비 기준)
  if (window.innerWidth <= 768) {
    document.getElementById("footer2").innerText = "SEOULTECH VISUAL COMMUNICATION DESIGN 42ST GRADUATION EXHIBITION WEBSTIE ‘FIND ME!’ 2024ⓒSeoul National University of Science and Technology. All Rights Reserved.";
  } else { 
    document.getElementById("footer2").innerText = "SEOULTECH VISUAL COMMUNICATION DESIGN 42ST GRADUATION EXHIBITION WEBSTIE ‘FIND ME!’ \n 2024ⓒSeoul National University of Science and Technology. All Rights Reserved.";
  }
};

// 페이지 로드 시 실행
updateTextForMobile();

// 화면 크기 변경 시에도 실행
window.addEventListener("resize", updateTextForMobile);

// ----------------- back to top -------------------
// Get the button:
let topbtn = document.getElementById("top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;

  // Check if the user has scrolled to the bottom of the page
  const isAtBottom = scrollTop + clientHeight >= scrollHeight;

  if (scrollTop > 20 && !isAtBottom) {
    topbtn.style.bottom = "-210px";
  } else {
    topbtn.style.bottom = "-350px";
  }
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  topbtn.style.bottom = "-350px";
}

topbtn.onmouseover = function() {
  topbtn.style.bottom = "-160px";
};

topbtn.onmouseout = function() {
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

  if (scrollTop > 20) {
      topbtn.style.bottom = "-210px";
  } else {
      topbtn.style.bottom = "-350px";
  }
};


const posters = document.querySelectorAll(".poster");

posters.forEach(poster => {
  let isDragging = false;
  let startX, startY, initialX, initialY;

  // 공통 핸들러: 이벤트 타입에 따라 터치/마우스 구분
  function getEventPosition(e) {
    if (e.touches) {
      const touch = e.touches[0]; // 첫 번째 터치만 사용
      return { x: touch.clientX, y: touch.clientY };
    } else {
      return { x: e.clientX, y: e.clientY };
    }
  }

  // 드래그 시작
  function startDrag(e) {
    isDragging = true;
    const { x, y } = getEventPosition(e);
    startX = x;
    startY = y;
    initialX = poster.offsetLeft;
    initialY = poster.offsetTop;

    // 스크롤 방지 (터치 이벤트에서 중요)
    e.preventDefault();
  }

  // 드래그 중
  function dragging(e) {
    if (!isDragging) return;

    const { x, y } = getEventPosition(e);
    const deltaX = x - startX;
    const deltaY = y - startY;

    // 위치 업데이트
    poster.style.left = `${initialX + deltaX}px`;
    poster.style.top = `${initialY + deltaY}px`;

    e.preventDefault();
  }

  // 드래그 종료
  function endDrag() {
    isDragging = false;
  }

  // 이벤트 리스너 추가
  if ("ontouchstart" in window) {
    // 모바일: 터치 이벤트
    poster.addEventListener("touchstart", startDrag);
    poster.addEventListener("touchmove", dragging);
    poster.addEventListener("touchend", endDrag);
  } else {
    // 데스크톱: 마우스 이벤트
    poster.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", endDrag);
  }
});

  // 흔들기 함수 추가
  function shakePoster() {
    if (!isDragging) { // 드래그가 발생하지 않았다면
      const randomPoster = posters[Math.floor(Math.random() * posters.length)];
      const originalTransform = randomPoster.style.transform;

      randomPoster.style.transition = 'transform 0.3s ease'; // 부드러운 전환
      randomPoster.style.transform = 'rotateZ(-3deg)'; // 왼쪽으로 회전

      setTimeout(() => {
        randomPoster.style.transform = 'rotateZ(3deg)'; // 오른쪽으로 회전
      }, 200);

      setTimeout(() => {
        randomPoster.style.transform = 'rotateZ(-3deg)';
      }, 400);

      setTimeout(() => {
        randomPoster.style.transform = 'rotateZ(3deg)';
      }, 600);

      setTimeout(() => {
        randomPoster.style.transform = originalTransform; // 원래 각도로 복원
      }, 800);
    }
  }

  // 페이지 로드 시 첫 번째 흔들기 시작
  shakePoster();
  
  // 5초마다 계속 흔들리도록 설정
  setInterval(shakePoster, 5000);
;










  // 모바일 화면에서만 동작하도록 조건 추가
  if (window.innerWidth <= 768) {
    let lastScrollY = 0; // 마지막 스크롤 위치

window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  const currentScrollY = window.scrollY; // 현재 스크롤 위치

  if (currentScrollY > lastScrollY) {
    // 아래로 스크롤
    nav.style.transform = "translateY(-200px)";
  } else {
    // 위로 스크롤
    nav.style.transform = "translateY(0)";
  }

  lastScrollY = currentScrollY; // 마지막 위치 업데이트
});
  };




