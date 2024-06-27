

// UI elements 

const smallGrid = document.getElementById("small")
const mediumGrid = document.getElementById("medium")
const largeGrid = document.getElementById("large")
const colorMode = document.getElementById("default")
const rainbowMode = document.getElementById("rainbow")
const shading = document.getElementById("darkening")
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
colorMode.addEventListener("click", () => modeSelection('pen'))
colorMode.addEventListener("dbclick", () => modeSelection('color'))
rainbowMode.addEventListener("click", () => modeSelection('rainbow'))
shading.addEventListener("click", () => modeSelection('shading'))

//erase and grid selections 

eraser.addEventListener("click", () => eraseOption("eraser"))
clear.addEventListener("click", () => eraseOption("clearBoard"))

// functions for button logic 

function gridSize(gridSize) {
    const drawingArea = document.getElementById("drawingArea")
    if (gridSize === 'small') {
        drawingArea.style.gridTemplateColumns = `repeat(24, 1fr)`;
        drawingArea.style.gridTemplateColumns = 'repeat(12, 1fr)';
        for (let i = 0; i < 24 * 12; i++ ) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            drawingArea.appendChild(gridItem);
        }
    }

}

function modeSelection(mode) {

}

function eraseOption(option) {

}