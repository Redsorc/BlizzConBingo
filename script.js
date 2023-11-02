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
  const shuffledItems = seededShuffle(bingoItems, seed).slice(0,25);
  const bingoGrid = document.querySelector(".bingo-grid");

  bingoGrid.innerHTML = '';

  shuffledItems.forEach(item => {
      const bingoTile = document.createElement("div");
      bingoTile.classList.add("bingo-tile");
      const bingoText = document.createElement("span");
      bingoText.classList.add("bingo-text");
      bingoText.textContent = item;
      bingoTile.appendChild(bingoText);

      bingoGrid.appendChild(bingoTile);
  });

  var tiles = document.querySelectorAll('.bingo-tile');

  tiles.forEach(function(tile)
  {
      tile.addEventListener('click', function()
      {
          if (tile.classList.contains('active'))
          {
              tile.classList.remove('active');
          }
          else
          {
              tile.classList.add('active');
          }
      });
  });

}



document.addEventListener("DOMContentLoaded", function() {
  const userName = "fayth";
  generateBingoBoard(userName);
});
