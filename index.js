"use strict";
const grid = document.querySelector('.grid');
const score = document.querySelector('#score');
const gridWidth = 28;
const gridHeight = 28;
const squares = [];
let totalScore = 0;
const pacDotScore = 1;
const powerPelletScore = 10;
const ghostScore = 100;
const scoreToWin = 1000;
let powerPellet = false;
let pacManCurrentIndex = 490;

const layoutItems = [
  'pac-dot',
  'wall',
  'ghost-lair',
  'power-pellet',
  'emtpy'
];

// 28 * 28 = 784
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

const layout = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
  4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
  1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
  1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
];


function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
    squares.push(square);
    squares[i].setAttribute('id', i);
    squares[i].classList.add(layoutItems[layout[i]]);
  }
}
createBoard();
squares[pacManCurrentIndex].classList.add('pac-man');

/************ */
// 39 is right arrow
// 38 is up arrow
// 37 is left arrow
// 40 is down arrow
/************ */

function updateScore(pacManCurrentIndex) {
  //Hit a pac-dot
  if (squares[pacManCurrentIndex].classList.value.includes('pac-dot')) {
    totalScore  += (powerPellet)? powerPelletScore: pacDotScore;
    score.innerText = totalScore;
    squares[pacManCurrentIndex].classList.remove('pac-dot');
    squares[pacManCurrentIndex].classList.add('empty');
  }
  //Hit a powerPellet
  if (squares[pacManCurrentIndex].classList.value.includes('power-pellet')) {
    squares[pacManCurrentIndex].classList.remove('power-pellet');
    powerPellet = true;
    ghosts.forEach( (ghost) => {
      ghost.isScared = true;
    });
    powerPelletOn();
  }
}

const powerPelletOn = function() {
  setTimeout(() => {
    powerPellet = false;
    ghosts.forEach( (ghost) => {
      ghost.isScared = false;
    });
  }, 10000);
}

const checkPacManMove = (moveToIndex, keyCode) => {  
/*****Definitions to check cross-board move for PacMan**/
  if(moveToIndex === 364) {
    removePacMan();
    pacManCurrentIndex = 392;
    return false;
  } else
  if(moveToIndex === 391) {
    removePacMan();
    pacManCurrentIndex = 363;
    return false;
  }
/******Obsticle definitions (cannot move to)**/
  let obsticle = [
    squares[moveToIndex].classList.contains('wall'),
    squares[moveToIndex].classList.contains('ghost-lair'),
    [moveToIndex % gridWidth === 27 && keyCode === 37],
    [moveToIndex - gridHeight < 0 && keyCode === 38],
    [moveToIndex % gridWidth === 1 && keyCode === 39],
    [moveToIndex + gridHeight >= gridHeight && keyCode === 40]
  ];
  return obsticle.includes(true);
}

/******Remove or Add Pacman*/
function removePacMan() {
  if(pacManCurrentIndex === 392) {
    squares[365].style.removeProperty('transform');
    squares[365].classList.remove('pac-man');
  } else
  if(pacManCurrentIndex === 363) {
    squares[390].style.removeProperty('transform');
    squares[390].classList.remove('pac-man');
  } else 
  squares[pacManCurrentIndex].style.removeProperty('transform');
  squares[pacManCurrentIndex].classList.remove('pac-man');
}

function addPacMan(degs) {
 squares[pacManCurrentIndex].classList.add('pac-man');
 const pacManObj = document.querySelector('.pac-man');
 squares[pacManCurrentIndex].style['transform'] = 'rotate('+degs+'deg)';
}

/*****Section to move PacMan **/
function control(event) {
  switch (event.keyCode) {
    case 39: 
      if(!checkPacManMove(pacManCurrentIndex + 1, event.keyCode)) {
          removePacMan();
          pacManCurrentIndex += 1;
          updateScore(pacManCurrentIndex);
          addPacMan(180);
        }
      break;
    case 38:
      if(!checkPacManMove(pacManCurrentIndex - gridWidth, event.keyCode)) {
        removePacMan();
        pacManCurrentIndex -= gridWidth;
        updateScore(pacManCurrentIndex);
        addPacMan(90);
      }
      break;
    case 37:
      if(!checkPacManMove(pacManCurrentIndex - 1, event.keyCode)) {
        removePacMan();
        pacManCurrentIndex -= 1;
        updateScore(pacManCurrentIndex);
        addPacMan(0);
      }
      break;
    case 40:
      if(!checkPacManMove(pacManCurrentIndex + gridWidth, event.keyCode)) {
        removePacMan();
        pacManCurrentIndex += gridWidth;
        updateScore(pacManCurrentIndex);
        addPacMan(270);
      }
      break;
    default: break;
  }
  gameLooseCheck();
  gameWinCheck();
}

document.addEventListener('keyup', control);

/* Ghosts Section */
class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.isScared = false;
    this.timerId = NaN;
    this.ghostLair = true;
  }
}

const ghosts = [
  new Ghost('blinky',348, 250),
  new Ghost('pinky', 376, 400),
  new Ghost('inky', 351, 300),
  new Ghost('clyde', 379, 500)
]

/*****Create Ghosts */
ghosts.forEach( (ghost) => {
  squares[ghost.startIndex].classList.add(ghost.className);
  squares[ghost.startIndex].classList.add('ghost');
});

/*****Make the Ghosts Move */
ghosts.forEach( (ghost) => moveGhost(ghost));

function moveGhost(ghost) {
  const directions = [-1, +1, -gridHeight, +gridHeight];
  let direction = directions[Math.floor(Math.random() * directions.length)];

  ghost.timerId = setInterval( () => {
    const ghostObsticle = 
      !squares[ghost.currentIndex + direction].classList.contains('wall') &&
      !squares[ghost.currentIndex + direction].classList.contains('ghost') &&
      !(ghost.gostLair && squares[ghost.currentIndex + direction].classList.contains('ghost-lair'));
    
    if(ghostObsticle) {
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
      ghost.currentIndex += direction;
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
    } else {
        direction = directions[Math.floor(Math.random() * directions.length)];
    }
    if(!squares[ghost.currentIndex].classList.contains('ghost-lair')) {
      ghost.ghostLair = false;
    }

    if(ghost.isScared) {
      squares[ghost.currentIndex].classList.add('scared-ghost');
    }
  
    if(ghost.isScared && (pacManCurrentIndex === ghost.currentIndex)) {
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
      ghost.currentIndex = ghost.startIndex;
      totalScore += ghostScore;
      squares[ghost.currentIndex].classList.add(ghost.classname, 'ghost')
    }
    gameLooseCheck();
  }, ghost.speed);
}

function gameLooseCheck() {
  if(
    squares[pacManCurrentIndex].classList.contains('ghost') &&
    !squares[pacManCurrentIndex].classList.contains('scared-ghost')
  ) {
    killGame('loose',`${totalScore} Sorry Game Over`);
  }
}

function gameWinCheck() {
  if(totalScore >= scoreToWin) {
    killGame('win', `${totalScore} YOU WON!`)
  }
}

function killGame(status, note) {
  ghosts.forEach((ghost) => clearInterval(ghost.timerId));
  document.removeEventListener('keyup', control);
  score.innerText = note;
}
//End PacMan
