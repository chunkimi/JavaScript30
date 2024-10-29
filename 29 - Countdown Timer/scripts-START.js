let countdown;

const buttons = document.querySelectorAll('[data-time]');
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');


const customForm = document.querySelector("#custom");

function timer(seconds) {

    clearInterval(countdown)

    const now = Date.now()
    const end = now + seconds * 1000

    displayTimeLeft(seconds)
    displayEndTime(end)

    countdown = setInterval(() => {
        const secondsLeft = Math.floor((end - Date.now()) / 1000)

        if (secondsLeft < 0) {
            clearInterval(countdown)
            return
        }
        displayTimeLeft(secondsLeft)
    }, 1000);

}

function displayTimeLeft(seconds) {
    const minus = Math.floor(seconds / 60)
    const remainderSeconds = seconds % 60

    const displaySeconds = remainderSeconds < 10 ? `0${remainderSeconds}` : `${remainderSeconds}`

    timerDisplay.textContent = `${minus}:${displaySeconds}`

}

function displayEndTime(timeStamp) {
    const originTime = new Date(timeStamp)

    const hour = originTime.getHours()
    const minute = originTime.getMinutes()

    const translateHour = hour > 12 ? hour - 12 : hour
    const translateMinutes = minute < 10 ? `0${minute}` : minute
    endTime.textContent = `Be Back At ${translateHour}:${translateMinutes}`

}

function handleStart() {
    const seconds = parseInt(this.dataset.time)
    timer(seconds)
}

function handleCusTimer(e) {
    e.preventDefault()

    const mins = parseInt(this.minutes.value)
    timer(mins * 60)
    this.reset()
}

buttons.forEach((btn) => btn.addEventListener('click', handleStart))
customForm.addEventListener('submit', handleCusTimer)