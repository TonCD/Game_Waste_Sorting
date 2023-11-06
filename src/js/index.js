import startTimer from './timer.js'
import addBuckets from './buckets.js'

function init() {
  addBuckets()

  const startButton = document.querySelector('.timer__start-button')
  const closeButton = document.querySelector('.game__close')
  
  startButton.addEventListener('click', startTimer)
  closeButton.addEventListener('click', () => {
    console.log('close')
  })
}

init()