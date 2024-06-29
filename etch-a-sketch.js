// global variables
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
const colorPicker = document.getElementById("colorPicker")
const rainbowMode = document.getElementById("rainbow")
const shadingMode = document.getElementById("darkening")
const eraser = document.getElementById("Eraser")
const clear = document.getElementById("Clear")
const togGrid = document.getElementById("gridLines")
const drawingArea = document.getElementById("drawingArea")

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

//colorPicker
colorPicker.oninput = (e) => setCurrentColor(e.target.value)

//clear listener
clear.addEventListener("click", () => clearBoard())

//grid lines 
togGrid.addEventListener("click", () => toggleGrid('click'));

// tracking mouse clicks for toggle
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

//----------------------------------------------------------//
// FUNCTIONS FOR BUTTON LOGIC 

//

function gridSize(gridSize) {
    //this gridSize comes in three different sizes: small, medium, and large and is basically repeat code.
    const drawingArea = document.getElementById("drawingArea")
    if (gridSize === 'small') {
        //clears html and adds the template grid
        drawingArea.innerHTML = "";
        drawingArea.style.gridTemplateRows = `repeat(12, 1fr)`;
        drawingArea.style.gridTemplateColumns = `repeat(24, 1fr)`;
        //add divs to the grid and listners and border toggle so every box can be tracked 
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

//Shows which option you have selected (darkens the background)
function activateButton(newMode) {
    //removes and adds active so the css element that has been created can be turned off and on based on if the active class is there or not
    if (currentMode === 'rainbow') {
        rainbowMode.classList.remove('active')
      } else if (currentMode === 'color') {
        colorMode.classList.remove('active')
      } else if (currentMode === 'shading') {
        shadingMode.classList.remove('active')
      } else if (currentMode === 'eraser') {
        eraser.classList.remove('active')
      }

    if (newMode === 'rainbow') {
        rainbowMode.classList.add('active')
      } else if (newMode === 'color') {
        colorMode.classList.add('active')
      } else if (newMode === 'shading') {
        shadingMode.classList.add('active')
      } else if (newMode === 'eraser') {
        eraser.classList.add('active')
      }
}


//set mode
//changes the global variable
function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
}

// set color
//changes the global variable
function setCurrentColor(newColor) {
    currentColor = newColor
}
//turns the grid on and off based on your click input for each grid_item
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

//clear board 
function clearBoard() {
    drawingArea.innerHTML = "";
    initializesProgram()
}
//coloring functions 
function changeMode(e) {
    //doesnt color unless both conditons are met 
    if (e.type === 'mouseover' &&  !mouseDown ) return 

    //checks for mode and then colors it based of the rgb value you selected from color picker
    if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor
        //randomizes the color ouput for the rgb to get random mess lol 
    } else if (currentMode === 'rainbow') {
        let r = Math.floor(Math.random() * 256)
        let g = Math.floor(Math.random() * 256)
        let b = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${r} ${g} ${b})`;
        //parses for the targets opacity, if none it sets it to 0 after that it checks if the opacity is less than one, if so it incremenets the target by 0.1, 

        //after that it checks if the opacity is over 1, if so, it makes sure it equals 1

        //runs the getRGB function and stylizes based off the rgb, alpha values you selected in the color picker
    } else if (currentMode === 'shading') {
        let opacity = parseFloat(e.target.getAttribute('data-opacity')) || 0;
        if (opacity < 1) {
            opacity += 0.1;
            if (opacity > 1) opacity = 1;
            e.target.setAttribute('data-opacity', opacity);
            let rgb = getRGB(currentColor);
            e.target.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
        }
        // sets your color to white 
    } else if (currentMode === 'eraser')
        e.target.style.backgroundColor = 'white';
}

// hex to rgb 
function getRGB(hexVal) {
   //converts string to areas, splices out the #, and the splice and join every 2 values to get the r, g, b values. after that we parse for an Int and return the output.
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

// initializes program
function initializesProgram() {
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

    setCurrentMode(DEFAULT_MODE)
    }
}

//runs intialize program when the webpage is accessed
window.onload = () => {
    initializesProgram()
    }