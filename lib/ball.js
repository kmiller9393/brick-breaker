export default class Ball {
  constructor() {
    this.image = document.getElementById('brick-ball');
  }

  draw(ctx) {
    ctx.drawImage(this.image, 10, 10, 20, 20);
  }

  update() {}
}
