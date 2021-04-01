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
let pacManCurrentIndex = 490;//490

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
    [moveToIndex % gridWidth === 27 && keyCode === 'ArrowLeft'],
    [moveToIndex - gridHeight < 0 && keyCode === 'ArrowUp'],
    [moveToIndex % gridWidth === 1 && keyCode === 'ArrowRight'],
    [moveToIndex + gridHeight >= gridHeight && keyCode === 'ArrowDown']
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

/***** Add PacMan to new location while transform look direction in travel */
function addPacMan(degs) {
  squares[pacManCurrentIndex].classList.add('pac-man');
  const pacManObj = document.querySelector('.pac-man');
  squares[pacManCurrentIndex].style['transform'] = 'rotate('+degs+'deg)';
}

/*****Section to move PacMan **/
function control(e) {
  const key = (e.target.className.includes('far'))? e.target.id: e.key;
  switch (key) {
    case 'ArrowRight': 
    if(!checkPacManMove(pacManCurrentIndex + 1, key)) {
      removePacMan();
      pacManCurrentIndex += 1;
      updateScore(pacManCurrentIndex);
      addPacMan(0);
    }
    break;
    case 'ArrowUp':
      if(!checkPacManMove(pacManCurrentIndex - gridWidth, key)) {
        removePacMan();
        pacManCurrentIndex -= gridWidth;
        updateScore(pacManCurrentIndex);
        addPacMan(270);
      }
      break;
      case 'ArrowLeft':
        if(!checkPacManMove(pacManCurrentIndex - 1, key)) {
          removePacMan();
          pacManCurrentIndex -= 1;
          updateScore(pacManCurrentIndex);
          addPacMan(180);
        }
        break;
        case 'ArrowDown':
          if(!checkPacManMove(pacManCurrentIndex + gridWidth, key)) {
            removePacMan();
            pacManCurrentIndex += gridWidth;
            updateScore(pacManCurrentIndex);
            addPacMan(90);
          }
          break;
          default: break;
        }
        gameLooseCheck();
        gameWinCheck();
      }

      /************ */
      // 39 is right arrow
      // 38 is up arrow
      // 37 is left arrow
      // 40 is down arrow
      /************ */
      
      document.addEventListener('keydown', control);
      document.querySelector('.btn-holder').addEventListener('mousedown', control);
      
/* Ghosts Section */
class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.isScared = false;
    this.timerId = NaN;
    this.inGhostLair = true;
  }
}

const ghosts = [
  new Ghost('blinky',348, 350),
  new Ghost('pinky', 376, 500),
  new Ghost('inky', 351, 400),
  new Ghost('clyde', 379, 600)
]

/*****Create Ghosts */
ghosts.forEach( (ghost) => {
  squares[ghost.startIndex].classList.add(ghost.className, 'ghost');
});

/*****Make the Ghosts Move */
ghosts.forEach( (ghost) => moveGhost(ghost));

function moveGhost(ghost) {
  function goGhost() {

    /***Ghost Move Engine */
    function ghostBestMove() {
      const directions = [-1, +1, -gridHeight, +gridHeight];
      const getCoOrds= (pos) => [pos % gridWidth, Math.floor(pos / gridHeight)];
      const isGhostObsticle = (v) => 
        squares[ghost.currentIndex + v].classList.contains('wall') ||
        squares[ghost.currentIndex + v].classList.contains('ghost') ||
        (!ghost.inGhostLair && squares[ghost.currentIndex + v].classList.contains('ghost-lair'));
      const clearMoves = directions.filter((v) => isGhostObsticle(v) === false);
      if (clearMoves.length === 0) return ghost.currentIndex;
      const nonObstPos = clearMoves.map((v) => v + ghost.currentIndex);
      const chaseVector = nonObstPos.map((v) => 
        [v, Math.sqrt((Math.abs(getCoOrds(v)[0] - getCoOrds(pacManCurrentIndex)[0])**2)
          + Math.abs((getCoOrds(v)[1] - getCoOrds(pacManCurrentIndex)[1])**2))
        ]).sort((a,b)=> a[1]-b[1]);
      const randomVector = () => chaseVector[Math.floor(Math.random() * chaseVector.length)];
      if (ghost.inGhostLair) return randomVector()[0];
      if (ghost.isScared) return chaseVector[chaseVector.length-1][0];
      else return chaseVector[0][0];
    }
    /*****End Move Ghost Engine */

    checkGhostEaten();
    squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
    ghost.currentIndex = ghostBestMove();
    squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
  /***** If Ghost is in Ghost Lair it will randomly generate next move util out of Ghost Lair */
    ghost.inGhostLair = (!squares[ghost.currentIndex].classList.contains('ghost-lair'))?false: true;
  /***** If outside of Ghost Lair it will chase PacMan */
        
  // Scarred Ghost // 
    if(ghost.isScared) {
      squares[ghost.currentIndex].classList.add('scared-ghost');
    }
    gameLooseCheck();

    function checkGhostEaten() {
      if(
          squares[pacManCurrentIndex].classList.contains('ghost') &&
          squares[pacManCurrentIndex].classList.contains('scared-ghost')
        ) {
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
        ghost.currentIndex = ghost.startIndex;
        ghost.inGhostLair = true;
        totalScore += ghostScore;
        squares[ghost.currentIndex].classList.add(ghost.classname, 'ghost');
        return
      }
    }
  }

  ghost.timerId = setInterval(goGhost , ghost.speed);
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
  document.removeEventListener('keydown', control);
  document.querySelector('.btn-holder').removeEventListener('mousedown', control);
  score.innerText = note;
}
//End PacMan