let playerState = "fall";
const dropDown = document.querySelector(".controls");
dropDown.addEventListener("change", (e) => {
  playerState = e.target.value;
});
const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = "./img/shadow_dog.png";
const spriteWidth = 575;
const spireHeight = 523;

let gameFrame = 0;
const staggerFrames = 7;
const spriteAnimations = [];
const animationStates = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "getHit",
    frames: 4,
  },
];
animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spireHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;
  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw ,dh)
  ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spireHeight, 0, 0, spriteWidth, spireHeight);
  //   if (gameFrame % staggerFrames == 0) {
  //     if (frameX < 6) frameX++;
  //     else frameX = 0;
  //   }

  gameFrame++;
  requestAnimationFrame(animate);
}
animate();