const grid = document.querySelector(`.grid`);
const builder = document.querySelector(`.grid_builder`);


function setPixelColor(pixel){
  pixel.setAttribute(`style`, `background-color: black`);
}

function addPixelListener(pixel){
  pixel.addEventListener(`click`, () => {
    setPixelColor(pixel);
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