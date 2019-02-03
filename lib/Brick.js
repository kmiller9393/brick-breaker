import { detectCollision } from './collisionDetection';

export default class Brick {
  constructor(game, position) {
    this.image = document.getElementById('brick');
    this.game = game;
    this.position = position;
    this.width = 80;
    this.height = 36;
    this.markedForDeletion = false;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    if (detectCollision(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;

      this.markedForDeletion = true;
    }
  }
}
