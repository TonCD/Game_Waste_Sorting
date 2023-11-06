import { startGame, stopGame } from './game.js'

const fullDasharray = 283
const timeLimit = 20
let timePassed = 0
let timeLeft = timeLimit
let timerInterval = null
let isHiddenStartButton = false

export default function startTimer() {
  if (!isHiddenStartButton) {
    const startButton = document.querySelector('.timer__start-button')
    startButton.classList.add('hidden')
  }

  startGame()

  timerInterval = setInterval(() => {
    timePassed = timePassed += 1
    timeLeft = timeLimit - timePassed
    
    setCircleDasharray()

    if (timeLeft === 0) {
      onTimesUp()
      stopGame()
      timePassed = 0
      timeLeft = timeLimit
      setCircleDasharray()
    }
  }, 1000)
}

function onTimesUp() {
  clearInterval(timerInterval)
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * fullDasharray
  ).toFixed(0)} 283`
  document
    .querySelector('.timer__path-remaining')
    .setAttribute('stroke-dasharray', circleDasharray)
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / timeLimit
  return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction)
}
