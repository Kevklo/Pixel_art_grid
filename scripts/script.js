//Depending on the mode, paints the pixels one way or another//
function rgbToHex(color) {
  color = color.slice(4, -1);
  colorArray = color.split(',');
  r = Number(colorArray[0]).toString(16).padStart(2, '0');;
  g = Number(colorArray[1]).toString(16).padStart(2, '0');
  b = Number(colorArray[2]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`
}


function doModeAction(pixel) {
  if(eraser.classList.contains(`active`)){
    setPixelColor(pixel, WHITE);
  } else if (rainbow.classList.contains(`active`)){
    setPixelColorRandom(pixel);
  } else if (picker.classList.contains(`active`)){
    if(pixel.style.backgroundColor == ''){
      color_selector.value = `#ffffff`;
    } else {
      color_selector.value = rgbToHex(pixel.style.backgroundColor);
    }
  } else {
    setPixelColor(pixel, color_selector.value);
  }
}


function mouseEventHandler(e, pixel){
  e.preventDefault();
  if(e.type === "mousedown" || (e.type === "mouseover" && e.buttons != 0)){
    e.preventDefault();
    doModeAction(pixel);
  }
}


//Selects a random rgb color and sets it as background//
function setPixelColorRandom(pixel){
  let r = Math.floor(Math.random() * 255);
  r = r.toString();
  if(r.length < 3){
    r = r.padStart(3, '0');
  }
  let g = Math.floor(Math.random() * 255);
  g = g.toString();
  if(g.length < 3){
    g = g.padStart(3, '0');
  }
  let b = Math.floor(Math.random() * 255);
  b = b.toString();
  if(b.length < 3){
    b = b.padStart(3, '0');
  }
  pixel.setAttribute(`style`, `background-color: rgb(${r},${g},${b})`)
}


//Given a pixel and a color, sets the color as background of the pixel//
function setPixelColor(pixel, color){
  pixel.setAttribute(`style`, `background-color: ${color}`);
}


//Adds an event listener to every pixel//
//The function will change depending on the mode//
function addPixelListener(pixel){
  pixel.addEventListener(`drag`, (e) =>{
    e.preventDefault();
  })
  pixel.addEventListener(`mousedown`, (e) =>{
    mouseEventHandler(e, pixel);
  });
  pixel.addEventListener(`mouseover`, (e) => {
    mouseEventHandler(e, pixel);
  });
}


//Toggles the outline of the pixels//
function gridToggle(){
  const pixels = Array.from(document.querySelectorAll(`.pixel`));
  pixels.forEach((pixel) => {
    pixel.classList.toggle(`pixel_outline`)
  })
}

//Removes the previus grid and builds a new one//
function createGrid(size){
  while(grid.firstChild){
    grid.removeChild(grid.firstChild);
  }
  for(let i = 0; i < size; i++){
    const column = document.createElement(`div`);
    column.setAttribute(`class`,`column`);
    grid.appendChild(column);
      for(let j = 0; j < size; j++){
        const pixel = document.createElement(`div`);
        pixel.setAttribute(`class`,`pixel pixel_outline`);
        addPixelListener(pixel);
        column.appendChild(pixel);
      }
  }
  if(grid_toggle.classList.contains(`active`)){
    gridToggle();
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


//Clears every pixel of the grid//
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
      setPixelColor(pixels[i], WHITE);
    } else {
      setPixelColor(pixels[i], `#83FFFd`);
    }
  }
}


grid_toggle.addEventListener(`click`, () => {
  gridToggle();
  grid_toggle.classList.toggle(`active`);
})


clear_grid.addEventListener(`click`, clearGrid);


color_selector.addEventListener(`click`, () => {
  if(eraser.classList.contains(`active`)){
    eraser.classList.toggle(`active`);
  }
  if(rainbow.classList.contains(`active`)){
    rainbow.classList.toggle(`active`);
  }
  if(picker.classList.contains(`active`)){
    picker.classList.toggle(`active`)
  }
})


//Both rainbow and eraser listeners, toggle an active class//
//to identify the mode//

rainbow.addEventListener(`click`, () => {
  rainbow.classList.toggle(`active`);
  if(eraser.classList.contains(`active`)){
    eraser.classList.toggle(`active`);
  }
  if(picker.classList.contains(`active`)){
    picker.classList.toggle(`active`)
  }
})

eraser.addEventListener(`click`, () => {
  eraser.classList.toggle(`active`);
  if(rainbow.classList.contains(`active`)){
    rainbow.classList.toggle(`active`);
  }
  if(picker.classList.contains(`active`)){
    picker.classList.toggle(`active`)
  }
})

picker.addEventListener(`click`, () => {
  picker.classList.toggle(`active`);
  if(rainbow.classList.contains(`active`)){
    rainbow.classList.toggle(`active`);
  }
  if(eraser.classList.contains(`active`)){
    eraser.classList.toggle(`active`)
  }
})


defaultDraw();