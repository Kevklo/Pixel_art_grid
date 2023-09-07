const grid = document.querySelector(`.grid`);
const builder = document.querySelector(`.grid_builder`);
let color_selector = document.querySelector(`.color_selector`);
const grid_lines = document.querySelector(`.grid_lines`);
let toggle_grid = true;

function setPixelColor(pixel){
  pixel.setAttribute(`style`, `background-color: ${color_selector.value}`);
}

function addPixelListener(pixel){
  pixel.addEventListener(`mousedown`, () => {
    setPixelColor(pixel);
  })
  pixel.addEventListener(`mouseover`, (e) => {
    if(e.buttons == 1 || e.buttons == 3){
      setPixelColor(pixel);
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
        pixel.setAttribute(`class`,`pixel`);
        addPixelListener(pixel);
        column.appendChild(pixel);
      }
  }
}

builder.addEventListener(`click`, () => {
  let size = prompt(`Introduce grid size`);
  while(size > 100){
    size = prompt(`Introduce a grid size lower than 100`); 
  }
  createGrid(size);
})

grid_lines.addEventListener(`click`, () => {
  const pixels = Array.from(document.querySelectorAll(`.pixel`));
  if(toggle_grid == true){
    for(let i = 0; i < pixels.length; i++){
      pixels[i].setAttribute(`style`, `outline: 0`);
    }
  } else {
    for(let i = 0; i < pixels.length; i++){
      pixels[i].setAttribute(`style`, ``);
    }
  }
  toggle_grid = !toggle_grid;
})

createGrid(10);
