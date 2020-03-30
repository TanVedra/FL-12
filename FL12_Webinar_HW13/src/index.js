import './scss/board.scss'
import './scss/message.scss'

const root = document.getElementById('root');
root.innerHTML = `
<div id="score">
  <div class="player1">
    <span id="player1-name"></span>
    <span id="player1-score">0</span>
  </div>
  <div class="player2">
    <span id="player2-name"></span>
    <span id="player2-score">0</span>
  </div>
</div>

  <div class="buttons">
    <button id="new-game">New Game</button>
    <button id="reset-game">Reset</button>
  </div>

  <div class="board" id="board">
    <div class="cell" data-cell></div>
    <div class="cell" data-cell></div>
    <div class="cell" data-cell></div>
    <div class="cell" data-cell></div>
    <div class="cell" data-cell></div>
    <div class="cell" data-cell></div>
    <div class="cell" data-cell></div>
    <div class="cell" data-cell></div>
    <div class="cell" data-cell></div>
  </div>

  <div class="winning-message" id="winningMessage">
    <div data-winning-message-text></div>
    <button id="new">New Game</button>
    <button id="reset">Reset</button>
</div>`

const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const NEW_GAME = document.getElementById('new')
const RESET_GAME = document.getElementById('reset')
const NEW_GAME2 = document.getElementById('new-game')
const RESET_GAME2 = document.getElementById('reset-game')

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')

const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const player1 = document.getElementById('player1-name')
const player2 = document.getElementById('player2-name')
const player1Score = document.getElementById('player1-score')
const player2Score = document.getElementById('player2-score')
let circleTurn

NEW_GAME.addEventListener('click', newGame)
NEW_GAME2.addEventListener('click', newGame)
RESET_GAME.addEventListener('click', resetGame)
RESET_GAME2.addEventListener('click', resetGame)

function resetGame() {
  player1.textContent = ''
  player1Score.textContent = 0
  player2.textContent = ''
  player2Score.textContent = 0

  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
  })
}

function newGame() {
  winningMessageElement.classList.add('hide')
  if (player1.textContent === '' && player2.textContent === '') {
    player1.textContent = prompt('Player1 name?', 'Player1') + ': '
    player2.textContent = prompt('Player2 name?', 'Player2') + ': '
  }
  startGame()
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
    player2Score.textContent = Number(player2Score.textContent) + 1
    player1Score.textContent = Number(player1Score.textContent) + 1
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? player2.textContent : player1.textContent} Wins!`
    circleTurn ? player2Score.textContent = Number(player2Score.textContent) + 1 : player1Score.textContent = Number(player1Score.textContent) + 1
  }
  winningMessageElement.classList.remove('hide')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
}

function swapTurns() {
  circleTurn = !circleTurn
}