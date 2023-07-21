const colorChangeInterval = 80;
const animationDelayTime = 4000;
const colorTransitionDelay = 0.3;

let intervalList = [];

const colorCycle = (target, i) => {
  i = 1 - i;
  const colors = [
    '#e8e8e8',
    '#E4E4E4',
    '#DEDEDE',
    '#DADADA',
    '#DEDEDE',
    '#E4E4E4',
    '#e8e8e8',
  ];

  const element = document.querySelector(target);
  element.style.transition = `background-color ${colorTransitionDelay}s ease`;

  const start = setInterval(() => {
    if (i >= 0) {
      $(`${target}`).css({
        'background-color': colors[i],
        transition: `background-color ${colorTransitionDelay}s ease`,
        boxShadow: `${
          i === 6 || i === 0
            ? '0 0 0 0 transparent'
            : '0 0 20px 0 rgba(255,255,255,.55)'
        }`,
      });
      if (i > 0 && i < colors.length - 2) {
        $(`${target}`).addClass('animatingBox');
      } else {
        $(`${target}`).removeClass('animatingBox');
      }
    }
    if (i < colors.length - 1) {
      i++;
    } else {
      clearInterval(start);
      intervalList.splice(intervalList.indexOf(start), 1);
    }
  }, colorChangeInterval);
  intervalList.push(start);

  window.addEventListener('resize', function () {
    clearInterval(start);
    clearAllInterval();
    clearAllBoxes();
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(function () {
      setBoxes(
        Math.ceil(document.documentElement.clientHeight / 58),
        Math.ceil(document.documentElement.clientWidth / 58)
      );
    }, 500);
  });

  document.onvisibilitychange = function () {
    if (document.visibilityState == 'visible') {
      setBoxes(
        Math.ceil(document.documentElement.clientHeight / 58),
        Math.ceil(document.documentElement.clientWidth / 58)
      );
    } else {
      clearInterval(start);
      clearAllInterval();
      clearAllBoxes();
    }
  };
};

const setRowColorAnimation = (row, column) => {
  // 先跑一次動畫
  for (let j = 0; j < column; j++) {
    setTimeout(() => {
      colorCycle(`.box${j + 1 + column * (row - 1)}`, row);
    }, colorChangeInterval * j);
  }

  // 再進入延遲器
  const setRowColorAnimationInterval = setInterval(() => {
    for (let j = 0; j < column; j++) {
      setTimeout(() => {
        colorCycle(`.box${j + 1 + column * (row - 1)}`, row);
      }, colorChangeInterval * j);
    }
  }, animationDelayTime);
  intervalList.push(setRowColorAnimationInterval);
};

const setBoxes = (boxRow, boxColumn) => {
  const animationCanvas = document.querySelector('.animationCanvas');
  for (let i = 0; i < boxRow; i++) {
    const boxContainer = document.createElement('div');
    boxContainer.className = `container${i + 1} container`;
    animationCanvas.appendChild(boxContainer);
    for (let j = 0; j < boxColumn; j++) {
      const box = document.createElement('div');
      box.className = `box${j + 1 + boxColumn * i} box`;
      boxContainer.appendChild(box);
    }
    setRowColorAnimation(i + 1, boxColumn);
  }
};

const clearAllBoxes = (interval) => {
  let animateCanvas = document.getElementById('animationContainer');
  while (animateCanvas.hasChildNodes()) {
    clearInterval(interval);
    animateCanvas.firstChild.remove();
  }
};

const clearAllInterval = () => {
  while (intervalList.length !== 0) {
    let target = intervalList[intervalList.length - 1];
    clearInterval(target);
    intervalList.splice(intervalList.indexOf(target), 1);
  }
};

setBoxes(
  Math.ceil(document.documentElement.clientHeight / 58),
  Math.ceil(document.documentElement.clientWidth / 58)
);
