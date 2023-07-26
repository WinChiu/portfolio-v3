const worksCount = document.getElementsByClassName('work').length;
const url = window.location.pathname.split('/');
if (url[url.length - 1] === '') $('body').css('cursor', 'none');

// LocomotiveScroll Setting
const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  inertia: 0.8,
  getDirection: true,
  //smartphone: { smooth: false, inertia: 0.1 },
});

new ResizeObserver(() => scroll.update()).observe(
  document.querySelector('[data-scroll-container]')
);

// Intro Background
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= (window.innerHeight * 3) / 6;
}
scroll.on('scroll', () => {
  if (isInViewport(document.querySelector('.infoSection'))) {
    $('.intro_bg').css('opacity', '100%');
    $('.animationCanvas').css('opacity', '0%');
  } else {
    $('.intro_bg').css('opacity', '0%');
    $('.animationCanvas').css('opacity', '100%');
  }
});
$(window).resize(function () {
  scroll.update();
  for (let i = 1; i <= worksCount; i++) {
    let status = $(`.work--${i}`).attr('status');
    if (status === 'closed') {
      $(`.work--${i}`).css('transition-duration', '0s');
      $(`.work--${i}`).css(
        'max-height',
        `${parseInt($(`.work__header--${i}`).css('height')) + 32}px`
      );
      setTimeout(() => {
        $(`.work--${i}`).css('transition-duration', '0.5s');
      }, 100);
    } else {
      $(`.work--${i}`).css('transition-duration', '0s');
      $(`.work--${i}`).css(
        'max-height',
        `${parseInt($(`.work--${i}`).css('height')) + 32}px`
      );
      setTimeout(() => {
        $(`.work--${i}`).css('transition-duration', '0.5s');
      }, 100);
    }
  }
});

// Set works button system
for (let i = 1; i <= worksCount; i++) {
  $(`.work__header--${i}`).on('click', function () {
    let status = $(`.work--${i}`).attr('status');
    if (status === 'closed') {
      $(`.work--${i}`).css(
        'max-height',
        `${
          parseInt($(`.work__header--${i}`).css('height')) +
          parseInt($(`.work__content--${i}`).css('height')) +
          64
        }px`
      );
      $(`.work--${i}`).attr('status', 'open');
      $(`.plusButton--${i}`).css('transform', `rotate(45deg)`);
    } else {
      $(`.work--${i}`).css(
        'max-height',
        `${parseInt($(`.work__header--${i}`).css('height')) + 28}px`
      );
      $(`.work--${i}`).attr('status', 'closed');
      $(`.plusButton--${i}`).css('transform', `rotate(0deg)`);
    }
  });
}

// Close all works
$('.work').css(
  'max-height',
  `${parseInt($('.work__header').css('height')) + 28}px`
);

// Title draw animation
var titleNameL = document.querySelector('.titleNameL');
var titleNameS = document.querySelector('.titleNameS');
function draw() {
  scroll.update();
  titleNameL.classList.add('active');
  titleNameS.classList.add('active');
}
setTimeout(draw, 300);

// Word Type
setTimeout(() => {
  $('.line1').css('width', '100%');
}, 3000);
setTimeout(() => {
  $('.line2').css('width', '100%');
}, 3400);
setTimeout(() => {
  var typed1 = new Typed('#jobTitle', {
    strings: ['UX Design <br/> Frontend Development'],
    typeSpeed: 40,
    startDelay: 0,
  });
}, 4200);
setTimeout(() => {
  var typed2 = new Typed('#introContent', {
    strings: [
      `我是邱威辰，國立台灣大學經濟學系畢業、創意創業學程 13th<span class="dot">。</span><br class="tittleContentBr"/>喜歡在生活與學習之中，挑戰各種不同的領域與新事物<span class="dot">。</span><br class="tittleContentBr"/>期許自己能為使用者創造良好的產品使用體驗<span class="dot">。</span>`,
    ],
    typeSpeed: 20,
    startDelay: 0,
  });
}, 4400);

// Cursor setting
if (!/Android|iPhone/i.test(navigator.userAgent)) {
  const cursor = curDot({
    zIndex: 2,
    diameter: 40,
    borderWidth: 1,
    borderColor: '#fff',
    easing: 4,
  });

  cursor.over('.work__header', {
    scale: 2,
    background: '#fff',
  });
  cursor.over('.infoLink', {
    scale: 2,
    background: '#fff',
  });
  cursor.over('.content__contentGroup--link', {
    scale: 2,
    background: '#fff',
  });
}
