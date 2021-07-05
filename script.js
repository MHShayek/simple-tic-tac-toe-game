const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_SUMMATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningGreetingsElement = document.getElementById('winningGreetings')
const restartButton = document.getElementById('restartButton')
const winningGreetingsTextElement = document.querySelector('[data-winning-greetings]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setGridContainerHoverClass()
    winningGreetingsElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
            // console.log(endGame)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setGridContainerHoverClass()
    }

}

function endGame(draw) {
    if (draw) {
        winningGreetingsTextElement.innerText = 'Draw!'
    } else {
        winningGreetingsTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningGreetingsElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setGridContainerHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }

}

function checkWin(currentClass) {
    return WINNING_SUMMATION.some(summation => {
        return summation.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}