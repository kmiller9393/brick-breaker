import Paddle from './Paddle';
import InputHandler from './InputHandler';
import Ball from './Ball';

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  start() {
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.gameObjects = [this.ball, this.paddle];

    new InputHandler(this.paddle);
  }

  update(dt) {
    this.gameObjects.forEach(object => object.update(dt));
  }

  draw(ctx) {
    this.gameObjects.forEach(object => object.draw(ctx));
  }
}
