const colorChangeInterval = 80;
const animationDelayTime = 1800;
const colorTransitionDelay = 0.3;

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
    if (i >= 0 && i <= colors.length - 1) {
      $(`${target}`).css({
        'background-color': colors[i],
        transition: `background-color ${colorTransitionDelay}s ease`,
        boxShadow: `${
          i === 6 || i === 0
            ? '0 0 0 0 transparent'
            : '0 0 20px 0 rgba(255,255,255,.55)'
        }`,
      });
    }
    if (i < colors.length - 1) {
      i++;
    } else {
      setTimeout(() => {
        i = 0;
      }, animationDelayTime);
    }
  }, colorChangeInterval);

  window.addEventListener('resize', function () {
    clearInterval(start);
  });
};

const setRow = (row, column) => {
  for (let j = 0; j < column; j++) {
    setTimeout(() => {
      colorCycle(`.box${j + 1 + column * (row - 1)}`, row, column);
    }, colorChangeInterval * j);
  }
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
    setRow(i + 1, boxColumn);
  }
};

setBoxes(
  Math.ceil(document.documentElement.clientHeight / 58),
  Math.ceil(document.documentElement.clientWidth / 58)
);

window.addEventListener('resize', function () {
  let animateCanvas = document.getElementById('animationContainer');
  while (animateCanvas.hasChildNodes()) {
    animateCanvas.firstChild.remove();
  }

  clearTimeout(window.resizedFinished);
  window.resizedFinished = setTimeout(function () {
    console.log('Resized finished.');
    setTimeout(
      setBoxes(
        Math.ceil(document.documentElement.clientHeight / 58),
        Math.ceil(document.documentElement.clientWidth / 58)
      )
    );
  }, 1800);
});
