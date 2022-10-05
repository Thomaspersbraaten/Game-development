// let playerState = "fall";
// const dropDown = document.querySelector(".controls");
// dropDown.addEventListener("change", (e) => {
//   playerState = e.target.value;
// });
// const canvas = document.querySelector("#canvas1");
// const ctx = canvas.getContext("2d");
// const CANVAS_WIDTH = (canvas.width = 600);
// const CANVAS_HEIGHT = (canvas.height = 600);

// const playerImage = new Image();
// playerImage.src = "./img/shadow_dog.png";
// const spriteWidth = 575;
// const spireHeight = 523;

// let gameFrame = 0;
// const staggerFrames = 7;
// const spriteAnimations = [];
// const animationStates = [
//   {
//     name: "idle",
//     frames: 7,
//   },
//   {
//     name: "jump",
//     frames: 7,
//   },
//   {
//     name: "fall",
//     frames: 7,
//   },
//   {
//     name: "run",
//     frames: 9,
//   },
//   {
//     name: "dizzy",
//     frames: 11,
//   },
//   {
//     name: "sit",
//     frames: 5,
//   },
//   {
//     name: "roll",
//     frames: 7,
//   },
//   {
//     name: "bite",
//     frames: 7,
//   },
//   {
//     name: "ko",
//     frames: 12,
//   },
//   {
//     name: "getHit",
//     frames: 4,
//   },
// ];
// animationStates.forEach((state, index) => {
//   let frames = {
//     loc: [],
//   };
//   for (let j = 0; j < state.frames; j++) {
//     let positionX = j * spriteWidth;
//     let positionY = index * spireHeight;
//     frames.loc.push({ x: positionX, y: positionY });
//   }
//   spriteAnimations[state.name] = frames;
// });
// function animate() {
//   ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//   let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
//   let frameX = spriteWidth * position;
//   let frameY = spriteAnimations[playerState].loc[position].y;
//   ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spireHeight, 0, 0, spriteWidth, spireHeight);

//   gameFrame++;
//   requestAnimationFrame(animate);
// }
// animate();

//

const canvasTwo = document.querySelector("#canvas2");
const ctxTWO = canvasTwo.getContext("2d");
const CANVAS_WIDTH_TWO = (canvasTwo.width = 800);
const CANVAS_HEIGHT_TWO = (canvasTwo.height = 700);
let gameSpeed = 2;
// let gameFrame = 0;

const backgroundLayer1 = new Image();
backgroundLayer1.src = `./background/layer-1.png`;
const backgroundLayer2 = new Image();
backgroundLayer2.src = `./background/layer-2.png`;
const backgroundLayer3 = new Image();
backgroundLayer3.src = `./background/layer-3.png`;
const backgroundLayer4 = new Image();
backgroundLayer4.src = `./background/layer-4.png`;
const backgroundLayer5 = new Image();
backgroundLayer5.src = `./background/layer-5.png`;

window.addEventListener("load", (e) => {
  const slider = document.querySelector("#slider");
  slider.value = gameSpeed;

  const showGameSpeed = document.querySelector("#showGameSpeed");
  showGameSpeed.innerHTML = gameSpeed;
  slider.addEventListener("change", (e) => {
    console.log(e.target.value);
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = gameSpeed;
  });

  class Layer {
    constructor(image, speedModifier) {
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 700;
      this.image = image;
      this.speedModifier = speedModifier;
      this.speed = gameSpeed * this.speedModifier;
    }
    uppdate() {
      this.speed = gameSpeed * this.speedModifier;
      if (this.x <= -this.width) {
        this.x = 0;
      }
      this.x = Math.floor(this.x - this.speed);
      // this.x = (gameFrame * this.speed) % this.width;
    }
    draw() {
      ctxTWO.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctxTWO.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
  }
  const layer1 = new Layer(backgroundLayer1, 0.2);
  const layer2 = new Layer(backgroundLayer2, 0.4);
  const layer3 = new Layer(backgroundLayer3, 0.6);
  const layer4 = new Layer(backgroundLayer4, 0.8);
  const layer5 = new Layer(backgroundLayer5, 1);

  const gameObjects = [layer1, layer2, layer3, layer4, layer5];

  function animateBackground() {
    ctxTWO.clearRect(0, 0, CANVAS_WIDTH_TWO, CANVAS_HEIGHT_TWO);
    gameObjects.forEach((layer) => {
      layer.uppdate();
      layer.draw();
    });
    // gameFrame--;
    requestAnimationFrame(animateBackground);
  }
  animateBackground();
});
