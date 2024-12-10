// Arrays to keep track of the game's sequence and the user's input sequence
let gameSeq = [];
let userSeq = [];

// Available button colors in the game
let btns = ["yellow", "red", "purple", "green"];

// Game state variables
let started = false; // Indicates whether the game has started
let level = 0; // Tracks the current level

// DOM elements used in the game
let h2 = document.querySelector("h2");

// Event listener for the keyboard press to start the game
document.addEventListener("keypress", () => {
    if (started == false) {
        started = true;
        levelUp(); // Begin the game by moving to the first level
    }
});

// Function to show a flash animation on the game button
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200);
}

// Function to show a flash animation when the user clicks a button
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 200);
}

// Function to advance to the next level
function levelUp() {
    userSeq = []; // Clear the user's sequence for the new level
    level++; // Increment the level
    h2.innerText = `Level - ${level}`; // Update the level display

    // Generate a random color and add it to the game sequence
    let randIdx = Math.floor(Math.random() * 4);
    let ranColor = btns[randIdx];
    let randbtn = document.querySelector(`.${ranColor}`);
    gameSeq.push(ranColor);

    gameFlash(randbtn); // Flash the corresponding button
}

// Function to check the user's input against the game's sequence
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) { // Check if the current input matches
        if (userSeq.length == gameSeq.length) { // Check if the user completed the sequence
            setTimeout(levelUp, 500); // Proceed to the next level after a delay
        }
    } else { // If the user input is incorrect
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red"; // Highlight the error visually
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset(); // Reset the game state
    }
}

// Function to handle button clicks by the user
function btnPress() {
    let btn = this; // The button clicked by the user
    userFlash(btn); // Show a user click animation

    let userColor = btn.getAttribute("id"); // Get the color ID of the button
    userSeq.push(userColor); // Add the color to the user's sequence
    checkAns(userSeq.length - 1); // Check the user's input
}

// Attach click event listeners to all game buttons
allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
        btn.addEventListener("click", btnPress);
    
}

// Function to reset the game after the user loses
function reset() {
    started = false; // Reset the game state
    gameSeq = []; // Clear the game sequence
    userSeq = []; // Clear the user's sequence
    level = 0; // Reset the level
}
