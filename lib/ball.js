export default class Ball {
  constructor(game) {
    this.image = document.getElementById('brick-ball');
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.speed = { x: 4, y: 2 };
    this.position = { x: 10, y: 10 };
    this.size = 20;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update() {
    this.position.x += this.speed.x;

    this.position.y += this.speed.y;

    if (this.position.x > this.gameWidth - this.size || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    if (this.position.y > this.gameHeight - this.size || this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    let bottomOfBall = this.position.y + this.size;
    let topOfPaddle = this.game.paddle.position.y;

    if (bottomOfBall >= topOfPaddle) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
