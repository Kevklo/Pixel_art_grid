let isTouching = false;
const touchedPixels = new Set();

grid.addEventListener('touchstart', () => {
  isTouching = true;
  touchedPixels.clear();
  event.preventDefault();
});

grid.addEventListener('touchend', () => {
  isTouching = false;
});

grid.addEventListener('touchmove', (event) => {
  if (isTouching) {
    const pixels = document.querySelectorAll('.pixel');

    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;

    event.preventDefault();

    pixels.forEach((pixel) => {
      const pixelRect = pixel.getBoundingClientRect();
      if (
        !touchedPixels.has(pixel) &&
        touchX >= pixelRect.left &&
        touchX <= pixelRect.right &&
        touchY >= pixelRect.top &&
        touchY <= pixelRect.bottom
      ) {
        doModeAction(pixel);
        touchedPixels.add(pixel);
      }
    });
  }
});
