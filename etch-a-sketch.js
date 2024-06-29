// variables

let toggle = false;
const DEFAULT_COLOR = '#333333'
const DEFAULT_MODE = 'color'
const DEFAULT_COLUMS = 12
const DEFAULT_ROWS = 24

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE

// UI elements 

const smallGrid = document.getElementById("small")
const mediumGrid = document.getElementById("medium")
const largeGrid = document.getElementById("large")
const colorMode = document.getElementById("default")
const rainbowMode = document.getElementById("rainbow")
const shadingMode = document.getElementById("darkening")
const eraser = document.getElementById("Eraser")
const clear = document.getElementById("Clear")
const togGrid = document.getElementById("gridLines")
const drawingArea = document.getElementsByClassName("drawingArea")

// environment listeners for buttons 

// grid sizes
smallGrid.addEventListener("click", () => gridSize('small'))
mediumGrid.addEventListener("click", () => gridSize('medium'))
largeGrid.addEventListener("click", () => gridSize('large'))

//modes 
colorMode.addEventListener("click", () => setCurrentMode('color'))
rainbowMode.addEventListener("click", () => setCurrentMode('rainbow'))
shadingMode.addEventListener("click", () => setCurrentMode('shading'))
eraser.addEventListener("click", () => setCurrentMode("eraser"))


//add colorpicker later

//clear listener
clear.addEventListener("click", () => eraseOption("clearBoard"))

//grid lines 

togGrid.addEventListener("click", () => toggleGrid('click'));


// tracking mouse clicks 

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

// load this up as default when the program runs 
//FIGURE OUT HOW TO DO THIS TOMORROW 
function defaultEtch() {
        drawingArea.innerHTML = "";
        drawingArea.style.gridTemplateRows = `repeat(12, 1fr)`;
        drawingArea.style.gridTemplateColumns = `repeat(24, 1fr)`;
        for (let i = 0; i < 24 * 12; i++ ) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            drawingArea.appendChild(gridItem);

    }
}

// functions for button logic 

function gridSize(gridSize) {
    const drawingArea = document.getElementById("drawingArea")
    if (gridSize === 'small') {
        drawingArea.innerHTML = "";
        drawingArea.style.gridTemplateRows = `repeat(12, 1fr)`;
        drawingArea.style.gridTemplateColumns = `repeat(24, 1fr)`;
        for (let i = 0; i < 24 * 12; i++ ) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid_item');
            gridItem.style.border = toggle ? '0px' : '1px';
            gridItem.addEventListener('mouseover', changeMode)
            gridItem.addEventListener('mousedown', changeMode)
            drawingArea.appendChild(gridItem);
        }
    } else if (gridSize === 'medium') {
        drawingArea.innerHTML = "";
        drawingArea.style.gridTemplateRows = `repeat(24, 1fr)`;
        drawingArea.style.gridTemplateColumns = `repeat(48, 1fr)`;
        for (let i = 0; i < 48 * 24; i++ ) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid_item');
            gridItem.style.border = toggle ? '0px' : '1px';
            gridItem.addEventListener('mouseover', changeMode)
            gridItem.addEventListener('mousedown', changeMode)
            drawingArea.appendChild(gridItem);

        }
    } else if (gridSize === 'large') {
        drawingArea.innerHTML = "";
        drawingArea.style.gridTemplateRows = `repeat(48, 1fr)`;
        drawingArea.style.gridTemplateColumns = `repeat(96, 1fr)`;
        for (let i = 0; i < 96 * 48; i++ ) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid_item');
            gridItem.style.border = toggle ? '0px' : '1px';
            gridItem.addEventListener('mouseover', changeMode)
            gridItem.addEventListener('mousedown', changeMode)
            drawingArea.appendChild(gridItem);
        }
    }
}


// mode selection function and mode functions 
function activateButton(newMode) {
    if (currentMode === 'rainbow') {
        rainbowMode.classList.remove('active')
      } else if (currentMode === 'color') {
        colorMode.classList.remove('active')
      } else if (currentMode === 'shading') {
        shadingMode.classList.remove('active')
      }
    
      if (newMode === 'rainbow') {
        rainbowMode.classList.add('active')
      } else if (newMode === 'color') {
        colorMode.classList.add('active')
      } else if (newMode === 'shading') {
        shadingMode.classList.add('active')
      }
    }

//set mode
function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
}

// set color
function setCurrentColor(newColor) {

}
function toggleGrid() {
    const gridItem = document.querySelectorAll('.grid_item')
        gridItem.forEach(element => {
            if (toggle) {
                element.style.border = '1px solid  #ccc'; 
            } else {
                element.style.border = '0px';
            }
        });
        toggle = !toggle;
    }
//coloring functions 

function changeMode(e) {
    if (e.type === 'mouseover' &&  !mouseDown ) return 

    if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'rainbow') {
        let r = Math.floor(Math.random() * 256)
        let g = Math.floor(Math.random() * 256)
        let b = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${r} ${g} ${b})`;
    } else if (currentMode === 'shading') {
        let opacity = parseFloat(e.target.getAttribute('data-opacity')) || 0;
        if (opacity < 1) {
            opacity += 0.1;
            if (opacity > 1) opacity = 1;
            e.target.setAttribute('data-opacity', opacity);
            let rgb = getRGB(currentColor);
            e.target.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
        }
    } else if (currentMode === 'eraser')
        e.target.style.backgroundColor = 'white';
}

// hex to rgb 
function getRGB(hexVal) {
    //convert string to an array 
    //extract each r, g, b values sepeartel.
    // while extracting, we need to convert them to hex and then store it inside out output object
    //
    let hexCode = hexVal.split('');
    hexCode.splice(0, 1);
    let red = hexCode.splice(0, 2).join('');
    let green = hexCode.splice(0, 2).join('');
    let blue = hexCode.splice(0, 2).join('');
    return ({
        r: parseInt(`${red}`, 16),
        g: parseInt(`${green}`, 16),
        b: parseInt(`${blue}`, 16)
    })
}   



/* quixk notes 
    MAKE SURE THE DEFAULT VALUES WHEN THE PROGRAM LOADS UP IS GRID SMALL< GRID TOGGLED, AND PEN SELECTED BLACK */