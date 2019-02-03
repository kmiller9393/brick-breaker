import Paddle from './Paddle';
import InputHandler from './InputHandler';
import Ball from './Ball';
import { buildLevel, level1, level2 } from './Levels';

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.lives = 3;
    this.gameObjects = [];
    this.bricks = [];
    this.levels = [level1, level2];
    this.currentLevel = 0;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    new InputHandler(this.paddle, this);
  }

  start() {
    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL
    )
      return;

    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.ball.reset();
    this.gameObjects = [this.ball, this.paddle];

    this.gamestate = GAMESTATE.RUNNING;
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }

  update(dt) {
    if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;

    if (this.bricks.length === 0) {
      this.currentLevel++;
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.start();
    }

    [...this.gameObjects, ...this.bricks].forEach(object => object.update(dt));

    this.bricks = this.bricks.filter(object => !object.markedForDeletion);
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach(brick => brick.draw(ctx));

    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fill();

      ctx.font = '30px Arial';
      ctx.fillStyle = '#f7f7f7';
      ctx.textAlign = 'center';
      ctx.fillText('Paused', this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fill();

      ctx.font = '30px Arial';
      ctx.fillStyle = '#f7f7f7';
      ctx.textAlign = 'center';
      ctx.fillText(
        'Press ENTER to Start',
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fill();

      ctx.font = '30px Arial';
      ctx.fillStyle = '#f7f7f7';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', this.gameWidth / 2, this.gameHeight / 2);
    }
  }
}
