const bingoItems = [
    "Metzen on stage",
    "Avaloren",
    "Anyone on stage gets the crowd to shout \"For the horde\"",
    "Cataclysm Classic announced",
    "Classic+ announced",
    "New support spec",
    "Dragonflying everywhere",
    "Prepurchase 11.0",
    "Old world revamp",
    "New rows on talent trees",
    "Cinematic Reveal",
    "10.3 Spoilers",
    "New race",
    "New class",
    "Dwarves, but not dwarves",
    "Khaz Algar",
    "No borrowed power",
    "8 dungeons, 1 raid at launch",
    "PVP isn't mentioned once",
    "Void stuff",
    "Alleria and/or Turalyon",
    "Thrall",
    "Sargeras' Sword",
    "Iridikron",
    "New system",
    "New type of content",
    "Revamp of raiding or M+",
    "Old gods",
    "Vyranoth",
    "Xal'atath",
    "More customizations",
    "Something gets boo-ed",
    "Elemental planes",
    "Anyone on stage mentions some sort of record broken by Dragonflight",
    "Falstad",
    "Any of the Bronzebeards",
    "Season of Mastery 2",
    "Game announcement that isn't WoW/Hearthstone/D4/Overwatch/Rumble",
    "Streaming service tie-in",
    "Xbox Game Pass",
    "New specs for old classes",
    "Controller support",
    "Khadgar",
    "Agg'ora",
    "\"We're staying home!\"",
    "Player housing",
    "Profession updates"
  ]

  class SeededRNG {
    constructor(seed) {
        this.modulus = 2147483648; // 2^31
        this.multiplier = 48271;
        this.defaultSeed = 123456789;
        this.state = (seed || this.defaultSeed) % this.modulus;
    }

    next() {
        this.state = (this.multiplier * this.state) % this.modulus;
        return this.state / this.modulus;
    }
}

function nameToSeed(name) {
  if (typeof name !== 'string') {
    console.error('nameToSeed was passed a non-string value');
    return 0; // or some other fallback seed
  }
  return [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
}


function seededShuffle(array, seed) {
  const rng = new SeededRNG(seed);
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(rng.next() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function generateBingoBoard(userName) {
  const seed = nameToSeed(userName);
  const shuffledItems = seededShuffle(bingoItems, seed).slice(0, 25);
  const bingoGrid = document.querySelector(".bingo-grid");

  bingoGrid.innerHTML = '';
  const fragment = document.createDocumentFragment();

  shuffledItems.forEach(item => {
    const bingoTile = document.createElement("div");
    bingoTile.classList.add("bingo-tile");
    bingoTile.setAttribute('role', 'button');
    bingoTile.setAttribute('tabindex', '0'); // Make it focusable
    

    const bingoText = document.createElement("span");
    bingoText.classList.add("bingo-text");
    bingoText.textContent = item;

    const glowOverlay = document.createElement("div");
    glowOverlay.classList.add("glow-overlay");

    bingoTile.appendChild(glowOverlay);
    bingoTile.appendChild(bingoText);
    fragment.appendChild(bingoTile);

    bingoTile.addEventListener('click', function() {
      bingoTile.classList.toggle('active');
      checkBingo();
    });

    // Optionally, handle keydown for accessibility
    bingoTile.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        bingoTile.classList.toggle('active');
        event.preventDefault(); // Prevent scroll on spacebar press
      }
    });
  });

  bingoGrid.appendChild(fragment);
}

document.addEventListener("DOMContentLoaded", function() {
  const userName = localStorage.getItem('userName');
  generateBingoBoard(userName);
});

let previousBingoActive = false;

function checkBingo() {
  const grid = document.querySelectorAll('.bingo-grid .bingo-tile');
  const rows = 5;
  const cols = 5;

  let bingoDetected = false;

  // Check rows for bingo
  for (let i = 0; i < rows; i++) {
    let rowBingo = true;
    for (let j = 0; j < cols; j++) {
      if (!grid[i * cols + j].classList.contains('active')) {
        rowBingo = false;
        break;
      }
    }
    if (rowBingo) {
      bingoDetected = true;
      flashBingoLine('row', i);
    }
  }

  // Check columns for bingo
  for (let j = 0; j < cols; j++) {
    let colBingo = true;
    for (let i = 0; i < rows; i++) {
      if (!grid[i * cols + j].classList.contains('active')) {
        colBingo = false;
        break;
      }
    }
    if (colBingo) {
      bingoDetected = true;
      flashBingoLine('column', j);
    }
  }

  // Check diagonals for bingo
  let leftDiagonalBingo = true;
  let rightDiagonalBingo = true;
  for (let i = 0; i < rows; i++) {
    if (!grid[i * cols + i].classList.contains('active')) {
      leftDiagonalBingo = false;
    }
    if (!grid[(i + 1) * cols - (i + 1)].classList.contains('active')) {
      rightDiagonalBingo = false;
    }
  }
  if (leftDiagonalBingo) {
    bingoDetected = true;
    flashBingoLine('diagonal', 0);
  }
  if (rightDiagonalBingo) {
    bingoDetected = true;
    flashBingoLine('diagonal', 1);
  }

  if (bingoDetected && previousBingoActive == false) {
    displayBingoMessage();
  }

  previousBingoActive = bingoDetected;
}

function flashBingoLine(type, index) {
  // Implement the visual effect for the bingo line
  // Add the necessary styling or animations to highlight the bingo line
}

function displayBingoMessage() {
    const messageContainer = document.createElement('div');
    messageContainer.style.position = 'fixed';
    messageContainer.style.top = '50%';
    messageContainer.style.left = '50%';
    messageContainer.style.transform = 'translate(-50%, -50%)';
    messageContainer.style.zIndex = '1000';
    messageContainer.style.fontSize = '3rem';
    messageContainer.style.color = 'yellow';
    messageContainer.style.textShadow = '0 0 10px yellow';
    messageContainer.style.padding = '20px';
    messageContainer.style.border = '3px solid yellow';
    messageContainer.style.backgroundColor = 'black';
    messageContainer.style.borderRadius = '10px';
    messageContainer.style.opacity = '0';
    messageContainer.style.transition = 'opacity 1s ease';
    messageContainer.innerText = 'BINGO!';

    document.body.appendChild(messageContainer);

    // Trigger the opacity transition after a short delay to ensure it runs
    setTimeout(() => {
      messageContainer.style.opacity = '1';
    }, 100);

    // Remove the message after 3 seconds
    setTimeout(() => {
      document.body.removeChild(messageContainer);
    }, 3000);
}
