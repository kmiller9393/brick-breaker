import Paddle from './Paddle';
import InputHandler from './InputHandler';
import Ball from './Ball';
import Brick from './Brick';

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  start() {
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);

    let bricks = [];

    for (let i = 0; i < 10; i++) {
      bricks.push(new Brick(this, { x: i * 52, y: 30 }));
    }

    this.gameObjects = [this.ball, this.paddle, ...bricks];

    new InputHandler(this.paddle);
  }

  update(dt) {
    this.gameObjects.forEach(object => object.update(dt));
  }

  draw(ctx) {
    this.gameObjects.forEach(object => object.draw(ctx));
  }
}
