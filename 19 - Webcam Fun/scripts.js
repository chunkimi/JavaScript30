const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const filterSelect = document.getElementById('filterSelect');
const rgbControls = document.querySelector('.rgb');

let selectedFilter = 'none';

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((localMediaStream) => {
            video.srcObject = localMediaStream
            video.play()
        }).catch((err) => {
            console.log(`err mes : ${err}`)
        })
}

function renderToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    let pixels = ctx.getImageData(0, 0, width, height);

    return setInterval(() => {
        switch (selectedFilter) {
            case 'redEffect':
                pixels = redEffect(pixels);
                break;
            case 'blueEffect':
                pixels = blueEffect(pixels);
                break;
            case 'greenEffect':
                pixels = greenEffect(pixels);
                break;
            case 'rgbSplit':
                pixels = rgbSplit(pixels);
                break;
            case 'greenScreen':
                pixels = greenScreen(pixels);
                break;
            default:
                break;
        }

        ctx.putImageData(pixels, 0, 0);
    }, 16)
}

function takePhoto() {
    snap.currentTime = 0
    snap.play()

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data
    link.setAttribute('download', 'screen-images')
    link.innerHTML = `<img src="${data}" alt="screen images" />`
    strip.insertBefore(link, strip.firstChild)
}


//  filter

function redEffect(pixels) {
    for (let i = 0; i <= pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 200
        pixels.data[i + 1] = pixels.data[i + 1] - 50
        pixels.data[i + 2] = pixels.data[i + 2] - 50

    }
    return pixels
}

function blueEffect(pixels) {
    for (let i = 0; i <= pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] - 50
        pixels.data[i + 1] = pixels.data[i + 1] + 200
        pixels.data[i + 2] = pixels.data[i + 2] - 50

    }
    return pixels
}

function greenEffect(pixels) {
    for (let i = 0; i <= pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] - 50
        pixels.data[i + 1] = pixels.data[i + 1] - 50
        pixels.data[i + 2] = pixels.data[i + 2] + 200

    }
    return pixels
}



function rgbSplit(pixels, redOffset = -150, greenOffset = 500, blueOffset = -550) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + redOffset] = pixels.data[i + 0];
        pixels.data[i + greenOffset] = pixels.data[i + 1];
        pixels.data[i + blueOffset] = pixels.data[i + 2];
    }
    return pixels;
}

function greenScreen(pixels) {
    const levels = {}

    document.querySelectorAll('.rgb input').forEach((inputItem) => {
        levels[inputItem.name] = input.value
    })

    for (i = 0; i < pixels.data.length; i = i + 4) {

        const red = pixels.data[i + 0]
        const green = pixels.data[i + 1]
        const blue = pixels.data[i + 2]
        const alpha = pixels.data[i + 3]

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            pixels.data[i + 3] = 0;
        }
    }
    return pixels
}


function handleFilterChange(event) {

    selectedFilter = event.target.value

    if (selectedFilter === 'greenScreen') {
        rgbControls.style.display = 'block';

    } else {
        rgbControls.style.display = 'none';
    }
}


getVideo()
video.addEventListener('canplay', renderToCanvas);
filterSelect.addEventListener('change', handleFilterChange);