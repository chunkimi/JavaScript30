
// DOM
const player = document.querySelector('.player')
const viewer = player.querySelector('.viewer')
const toggleBtn = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');


// Methods
function togglePlay() {
    const method = viewer.paused ? 'play' : 'pause'
    viewer[method]()
}

function updateButton() {
    const videoIcon = this.paused ? '►' : '❚ ❚';
    toggleBtn.textContent = videoIcon
}

function skip() {
    const skipTime = parseFloat(this.dataset.skip)
    viewer.currentTime += skipTime
}

function handleRange() {
    viewer[this.name] = this.value
}
function updateProgressBar() {
    const percent = Math.floor((viewer.currentTime / viewer.duration) * 100)
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * viewer.duration;
    viewer.currentTime = scrubTime;
}


// EventListener
viewer.addEventListener('click', togglePlay);
toggleBtn.addEventListener('click', togglePlay);

viewer.addEventListener('play', updateButton)
viewer.addEventListener('pause', updateButton)

skipButtons.forEach((skipBtn) => skipBtn.addEventListener('click', skip))
ranges.forEach((rangeItem) => rangeItem.addEventListener('change', handleRange))
ranges.forEach((rangeItem) => rangeItem.addEventListener('mousemove', handleRange))

progress.addEventListener('click', scrub)
viewer.addEventListener('timeupdate', updateProgressBar)

let scrubMouseDown = false
progress.addEventListener('mousedown', () => scrubMouseDown = true)
progress.addEventListener('mouseup', () => scrubMouseDown = false)
progress.addEventListener('mousemove', (e) => {
    if (scrubMouseDown) {
        scrub(e)
    }
})



