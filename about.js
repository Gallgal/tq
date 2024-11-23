
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



// ---------------- drag poster ----------------
document.addEventListener('DOMContentLoaded', (event) => {
  const posters = document.querySelectorAll('.poster');
  let isDragging = false; // 드래그 상태를 추적할 변수

  // 각 포스터의 초기 transform 값을 저장
  const initialTransforms = {};
  posters.forEach(poster => {
    initialTransforms[poster.id] = poster.style.transform;
  });

  posters.forEach(poster => {
    poster.onmousedown = function(event) {
      // 스크롤 위치가 0일 때만 드래그 이벤트를 처리하도록 조건 추가
      if (window.scrollY !== 0) {
        return;
      }

      isDragging = true; // 드래그 시작
      let shiftX = event.clientX - poster.getBoundingClientRect().left;
      let shiftY = event.clientY - poster.getBoundingClientRect().top;

      // movetool 요소를 찾음
      const movetool = document.querySelector('.movetool');

      if (movetool) {
        movetool.appendChild(poster);
        poster.style.position = 'absolute';
        poster.style.zIndex = '1';
        poster.style.left = (event.clientX - shiftX - movetool.getBoundingClientRect().left) + 'px';
        poster.style.top = (event.clientY - shiftY - movetool.getBoundingClientRect().top) + 'px';
      } else {
        poster.style.position = 'fixed';
        document.body.append(poster);
      }

      function moveAt(pageX, pageY) {
        if (movetool) {
          poster.style.left = (pageX - shiftX - movetool.getBoundingClientRect().left) + 'px';
          poster.style.top = (pageY - shiftY - movetool.getBoundingClientRect().top) + 'px';
        } else {
          poster.style.left = pageX - shiftX + 'px';
          poster.style.top = pageY - shiftY + 'px';
        }
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }

      function onMouseUp() {
        isDragging = false; // 드래그 종료
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        poster.onmouseup = null;
      }

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      poster.ondragstart = function() {
        return false;
      };
    };
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
});







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




