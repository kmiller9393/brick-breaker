import Paddle from './Paddle';
import InputHandler from './InputHandler';
import Ball from './Ball';

let canvas = document.getElementById('gameScreen');

let ctx = canvas.getContext('2d');

const GAME_WIDTH = 800;

const GAME_HEIGHT = 600;

let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
let ball = new Ball();

new InputHandler(paddle);

paddle.draw(ctx);

let lastTime = 0;

function gameLoop(timeStamp) {
  let dt = timeStamp - lastTime;

  lastTime = timeStamp;

  ctx.clearRect(0, 0, 800, 600);

  paddle.update(dt);

  paddle.draw(ctx);

  ball.draw(ctx);

  requestAnimationFrame(gameLoop);
}

gameLoop();
