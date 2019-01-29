document
  .querySelector(".main-container")
  .addEventListener("click", function(event) {
    insertText(event.target);
  });

function insertText(value) {
  console.dir(value);
  if (value.className === "text-container throw") {
    fetch("/complement")
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        let complementText = data.complement;
        value.innerText = complementText;
      })
  } else if (value.className === "text-container box") {
    fetch("/randomword")
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        let randomText = data.randomword;
        value.innerText = randomText;
      })
  }
}

// Popmotion
const { styler, spring, listen, pointer, value } = window.popmotion;

const ball = document.querySelector(".throw");
const divStyler = styler(ball);
const ballXY = value({ x: 0, y: 0 }, divStyler.set);

listen(ball, "mousedown touchstart").start(e => {
  e.preventDefault();
  pointer(ballXY.get()).start(ballXY);
});

listen(document, "mouseup touchend").start(() => {
  spring({
    from: ballXY.get(),
    velocity: ballXY.getVelocity(),
    to: { x: 0, y: 0 },
    stiffness: 200
    // mass: 1,
    // damping: 10
  }).start(ballXY);
});

const { easing, tween, styleer } = window.popmotion;

const divStyleer = styler(document.querySelector(".box"));

tween({
  from: 0,
  to: { x: 300, rotate: 180 },
  duration: 1000,
  ease: easing.backOut,
  flip: Infinity
  // elapsed: 500,
  // loop: 5,
  // yoyo: 5
}).start(divStyleer.set);
