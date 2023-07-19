const anchorSection = document.querySelector('.anchorSection');
const allTitle = document.getElementsByClassName('title');
let viewportDetectors = new Array(allTitle.length);
let visibleTitles = [];
const clearAllAnchor = (amount) => {
  for (let i = 0; i < amount; i++) {
    $(`.anchor__word--${i + 1}`).css('font-weight', 'normal');
    $(`.anchor__line--${i + 1}`).css('width', '0%');
  }
};

const elVisibilityDetector = function (el, visibility) {
  const num = el.className.split('--')[1];
  const fromTheBottom = el.getBoundingClientRect().top > 0;
  if (visibility && !visibleTitles.includes(num) && fromTheBottom) {
    visibleTitles.push(num);
    clearAllAnchor(viewportDetectors.length);

    $(`.anchor__word--${visibleTitles[visibleTitles.length - 1]}`).css(
      'font-weight',
      'bold'
    );
    $(`.anchor__line--${visibleTitles[visibleTitles.length - 1]}`).css(
      'width',
      '100%'
    );
  } else if (fromTheBottom) {
    if (visibleTitles.length !== 1) {
      visibleTitles.splice(visibleTitles.indexOf(num), 1);
    }
    clearAllAnchor(viewportDetectors.length);
    $(`.anchor__word--${visibleTitles[visibleTitles.length - 1]}`).css(
      'font-weight',
      'bold'
    );
    $(`.anchor__line--${visibleTitles[visibleTitles.length - 1]}`).css(
      'width',
      '100%'
    );
  }
};

for (let i = 0; i < allTitle.length; i++) {
  let anchor = document.createElement('div');
  let title = document.createElement('h4');
  let line = document.createElement('div');
  anchor.className = 'anchor';
  title.className = `anchor__word anchor__word--${i + 1}`;
  line.className = `anchor__line anchor__line--${i + 1}`;
  title.innerText = allTitle[i].innerText;
  anchor.appendChild(title);
  anchor.appendChild(line);
  anchorSection.appendChild(anchor);

  viewportDetectors[i] = new ViewportDetector(
    `.title--${i + 1}`,
    elVisibilityDetector
  );
}

$('.anchor__word').on('click', (e) => {
  const targetTitle = e.target.className.split(' ')[1].split('--')[1];
  const linkScroll = $(`.title--${targetTitle}`).offset().top;

  let scrollMarginTop = 48;
  console.log(parseFloat($('.anchorSection').css('height')));
  if ($(window).width() <= 600) {
    scrollMarginTop = parseFloat($('.anchorSection').css('height')) + 24;
  }
  $('html')
    .stop()
    .animate(
      {
        scrollTop: linkScroll - scrollMarginTop,
      },
      0
    );
});
