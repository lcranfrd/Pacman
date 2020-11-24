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

/***** Add PacMan to new location while transform look direction in travel */
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
    this.inGhostLair = true;
    this.X = 0;
    this.Y = 0;
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
  const newDirection = () => directions[Math.floor(Math.random() * directions.length)];
  let direction = newDirection();

  function goGhost() {
    const getCoOrds= (pos) => [pos % gridWidth, Math.floor(pos / gridHeight)];
    // [ghost.X, ghost.Y] = getCoOrds(ghost.currentIndex);
    // const [newGhostX, newGhostY] = getCoOrds(ghost.currentIndex + direction);
    // const [pacX, pacY] = getCoOrds(pacManCurrentIndex);
    // const isXCloser = () => Math.abs((newGhostX - pacX)) < Math.abs((ghost.X - pacX))? true:false;
    // const isYCloser = () => Math.abs((newGhostY - pacY)) < Math.abs((ghost.Y - pacY))? true:false; 

    // const isGhostObsticle = 
    //   squares[ghost.currentIndex + direction].classList.contains('wall') ||
    //   squares[ghost.currentIndex + direction].classList.contains('ghost') ||
    //   (!ghost.inGhostLair && squares[ghost.currentIndex + direction].classList.contains('ghost-lair'));



/***Replace Test */
const isGhostObsticleTest = (v) => 
  squares[ghost.currentIndex + v].classList.contains('wall') ||
  squares[ghost.currentIndex + v].classList.contains('ghost') ||
  (!ghost.inGhostLair && squares[ghost.currentIndex + v].classList.contains('ghost-lair'));

const nonObstDir = directions.filter((v) => isGhostObsticleTest(v) === false);
const nonObstPos = nonObstDir.map((v) => v + ghost.currentIndex);
const chaseVector = nonObstPos.map((v) => 
  [v, Math.sqrt((Math.abs(getCoOrds(v)[0] - getCoOrds(pacManCurrentIndex)[0])**2)
     + Math.abs((getCoOrds(v)[1] - getCoOrds(pacManCurrentIndex)[1])**2))
  ]).sort((a,b)=> a[1]-b[1]);
const randomVector = () => chaseVector[Math.floor(Math.random() * chaseVector.length)];
/*****Replace Test */
squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
ghost.currentIndex = (ghost.inGhostLair)? randomVector()[0]: chaseVector[0][0];
  squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');




      // if(isGhostObsticle) {
      //   direction = newDirection();
      // } else {
      //   squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
      //   if(ghost.inGhostLair) {
      //     ghost.currentIndex = randomVector()[0];
      //     squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
      //   } else
      //     if((isXCloser() || isYCloser())) {
      //       ghost.currentIndex = chaseVector[0][0];
      //       squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
      //     } else {
      //         squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
      //         direction = newDirection();
      //     }
      //   }
/***** If Ghost is in Ghost Lair it will randomly generate next move util out of Ghost Lair */
ghost.inGhostLair = (!squares[ghost.currentIndex].classList.contains('ghost-lair'))?false: true;
/***** If outside of Ghost Lair it will chase PacMan */
      
 // Scarred Ghost // 
      if(ghost.isScared) {
        squares[ghost.currentIndex].classList.add('scared-ghost');
      }
    
      if(ghost.isScared && (pacManCurrentIndex === ghost.currentIndex)) {
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
        ghost.currentIndex = ghost.startIndex;
        ghost.inGhostLair = true;
        totalScore += ghostScore;
        squares[ghost.currentIndex].classList.add(ghost.classname, 'ghost')
      }
      gameLooseCheck();
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
  document.removeEventListener('keyup', control);
  score.innerText = note;
}
//End PacMan