const grid = document.querySelector(`.grid`);
const builder = document.querySelector(`.grid_builder`);
let color_selector = document.querySelector(`.color_selector`);
const grid_toggle = document.querySelector(`.grid_toggle`);
const clear_grid = document.querySelector(`.clear_grid`)

function setPixelColor(pixel, color){
  pixel.setAttribute(`style`, `background-color: ${color}`);
}

function addPixelListener(pixel){
  pixel.addEventListener(`mousedown`, () => {
    setPixelColor(pixel, color_selector.value);
  })
  pixel.addEventListener(`mouseover`, (e) => {
    if(e.buttons == 1 || e.buttons == 3){
      setPixelColor(pixel, color_selector.value);
    }
  })
  pixel.addEventListener(`drag`, (e) =>{
    e.preventDefault();
  })
}

function createGrid(size){
  while(grid.firstChild){
    grid.removeChild(grid.firstChild);
  }
  for(let i = 0; i < size; i++){
    const column = document.createElement(`div`);
    column.setAttribute(`class`,`column`);
    grid.appendChild(column);
      for(let j = 0; j < size; j++){
        const pixel = document.createElement('div');
        pixel.setAttribute(`class`,`pixel pixel_outline`);
        addPixelListener(pixel);
        column.appendChild(pixel);
      }
  }
}

function clearGrid(){
  //Because the createGrid deletes the grid and creates a new one,
  //We only need to get the size of the grid for this function to work
  const columns = Array.from(document.querySelectorAll(`.column`));
  createGrid(columns.length);
}

function defaultDraw(){
  //Draws a simple default pixel-art of a heart//
  createGrid(5);
  pixels = Array.from(document.querySelectorAll(`.pixel`))
  setPixelColor(pixels[0], `#F7FF83`)
  for(let i = 1; i < 25; i++){
    if((i+1) % 5 == 0){
      setPixelColor(pixels[i], `#B3FFC6`)
    } else if(i == 11 || i == 16 || i == 21){
      setPixelColor(pixels[i], `#FFFFFF`);
    } else {
      setPixelColor(pixels[i], `#83FFFd`);
    }
  }
}

builder.addEventListener(`click`, () => {
  //The size in an integer number
  let size = prompt(`Introduce grid size, ie: 2`);
  while(isNaN(size) || size > 100 || size.length == 0 || size < 1){
    if(size > 100){
      size = prompt(`Introduce a grid size lower than 100`);
    } else {
      size = prompt(`Introduce a valid Number`)
    }
  }
  createGrid(size);
})

grid_toggle.addEventListener(`click`, () => {
  const pixels = Array.from(document.querySelectorAll(`.pixel`));
  for(let i = 0; i < pixels.length; i++){
    pixels[i].classList.toggle(`pixel_outline`);
  }
  grid_toggle.classList.toggle(`active`);
})

clear_grid.addEventListener(`click`, clearGrid);

defaultDraw();