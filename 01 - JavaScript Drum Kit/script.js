console.clear()

function playKeyboard(e) {
  const keycode = e.keyCode;
  const specifyAudio = document.querySelector(`audio[data-key="${keycode}"]`);
  if (!specifyAudio) return;
  const specifyKeyboard = document.querySelector(`div[data-key="${keycode}"]`);
  specifyKeyboard.classList.add("playing");
  specifyAudio.currentTime = 0;
  specifyAudio.play();
}

function removeTransform(e) {
    if (e.propertyName !== "transform") return;
    e.target.classList.remove("playing");
}

const allKeys =  Array.from(document.querySelectorAll(".key"))
allKeys.forEach((item) => {
  item.addEventListener("transitionend", removeTransform);
});

window.addEventListener("keydown", playKeyboard);
