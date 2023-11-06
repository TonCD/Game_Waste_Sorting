import { bucketsTypes } from './buckets.js'
import startTimer from './timer.js'

const rightCounter = document.querySelector('.answer__counter_right')
const wrongCounter = document.querySelector('.answer__counter_wrong')
const garbage = document.querySelector('.timer__garbage')
const garbageShadow = document.querySelector('.timer__garbage-shadow')
const resultElement = document.querySelector('.timer__result')
const playAgainElement = document.querySelector('.info__play-again')
const timerElement = document.querySelector('.info__timer')
const fieldInfo = document.querySelector('.field__info')
const headerElement = document.querySelector('.field__header')
let garbageCoordX = 0
let garbageCoordY = 0
let buckets = []
let colors = []
let currentColor
let rigthAnswerCounter = 0
let wrongAnswerCounter = 0
let isRightAnswer = true
let isBusy = false
const animationDuration = 700
const delay = 600


export function startGame() {
  colors = Object.values(bucketsTypes).map(type => type.color)

  buckets = document.querySelectorAll('.bucket__container')

  buckets.forEach(bucket => {
    bucket.style.cursor = 'pointer'
    bucket.addEventListener('click', checkSelection)
  })
  playAgainElement.addEventListener('click', startNewGame)

  addGarbage()
  const [ x, y ] = getCoords(garbage)
  garbageCoordX = x
  garbageCoordY = y

  resultElement.classList.remove('hidden')
}

export function stopGame() {
  buckets.forEach(bucket => {
    bucket.style.cursor = 'auto'
    bucket.removeEventListener('click', checkSelection)
  })
  playAgainElement.removeEventListener('click', startGame)

  garbage.classList.add('hidden')
  garbageShadow.classList.add('hidden')
  resultElement.classList.add('hidden')

  fieldInfo.style.justifyContent = 'center'
  timerElement.classList.add('hidden')
  playAgainElement.classList.remove('hidden')

  headerElement.textContent = `Bạn đã đúng ${rigthAnswerCounter} trong ${rigthAnswerCounter + wrongAnswerCounter} câu ~~!`
}

function startNewGame() {
  playAgainElement.classList.add('hidden')
  timerElement.classList.remove('hidden')
  fieldInfo.style.justifyContent = 'space-between'
  rigthAnswerCounter = 0
  wrongAnswerCounter = 0
  rightCounter.textContent = rigthAnswerCounter
  wrongCounter.textContent = wrongAnswerCounter
  headerElement.textContent = 'Hãy phân loại rác nào~~'
  startGame()
  startTimer()
}

function addGarbage() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  const selectedBucketType = bucketsTypes[randomIndex];
  const randomEmojiIndex = Math.floor(Math.random() * selectedBucketType.emojis.length);
  const selectedEmoji = selectedBucketType.emojis[randomEmojiIndex];

  garbage.innerHTML = selectedEmoji;
  garbage.dataset.color = selectedBucketType.color;
  currentColor = selectedBucketType.color;
  garbage.classList.remove('hidden');
}


function checkSelection(e) {
  if (isBusy) {
    return
  }
  resultElement.classList.remove(isRightAnswer ? 'right' : 'wrong')

  isBusy = true
  const bucket = e.target.closest('.bucket__container')
  const bucketTop = bucket.querySelector(`[data-color="${bucket.dataset.color}"`)

  garbageShadow.classList.remove('hidden')
  garbageShadow.style.backgroundColor = bucket.dataset.color
  garbageShadow.classList.remove('hidden')

  if (bucket.dataset.color === currentColor) {
    rigthAnswerCounter += 1
    rightCounter.textContent = rigthAnswerCounter
    isRightAnswer = true
  } else {
    wrongAnswerCounter += 1
    wrongCounter.textContent = wrongAnswerCounter
    isRightAnswer = false
  }
  const [ bucketTopCoordX, bucketTopCoordY ] = getCoords(bucketTop)
  garbage.animate([
    {
      width: '30px',
      height: '30px',
    },
    { 
      transform: `translate(${bucketTopCoordX - garbageCoordX}px , ${bucketTopCoordY - garbageCoordY - 20}px)`,
      width: '20px',
      height: '20px',
    },
  ], {
    duration: animationDuration / 2,
    easing: 'ease-in-out',
  })
  bucketTop.animate([
    { top: '5px' },
    { top: '-45px' },
    { top: '5px' },
  ], {
    duration: animationDuration,
    easing: 'ease-in-out',
  })
  garbageShadow.animate([
    {
      opacity: 1,
    },
    { 
      transform: `translate(${bucketTopCoordX - garbageCoordX}px , ${bucketTopCoordY - garbageCoordY - 20}px)`,
      width: '20px',
      height: '20px',
    },
  ], {
    duration: animationDuration / 2,
    easing: 'ease-in',
  })
  
  setTimeout(() => {
    resultElement.classList.add(isRightAnswer ? 'right' : 'wrong')
    garbage.classList.add('hidden')
    garbageShadow.classList.add('hidden')
  }, animationDuration / 2.1)

  setTimeout(() => {
    isBusy = false
  }, animationDuration + delay)

  setTimeout(() => {
    addGarbage()
  }, animationDuration / 2 + delay)
}

function getCoords(elem) {
  const { x, y, height, width } = elem.getBoundingClientRect()
  const centerX = (x + width / 2).toFixed(0)
  const centerY = (y + height / 2).toFixed(0)
  return [centerX, centerY]
}