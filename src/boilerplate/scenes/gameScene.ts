import { Board } from "../objects/board"
import { Point } from "../objects/point"
import { ParticleManager } from "../objects/particleManager"
import { Statistics } from "../objects/statistics";

export class GameScene extends Phaser.Scene {
  // field and game setting
  private fieldSize: number
  private gameHeight: number
  private gameWidth: number
  private horizontalBoxes: number
  private verticalBoxes: number

  private stats: Statistics

  private fullBoard: Board
  private validBoard: Board
  private colisionBoard: Board

  private particleManager: ParticleManager

  constructor() {
    super({
      key: "GameScene",
    })
  }

  init(): void {
    this.fieldSize = 40
    this.gameHeight = this.sys.canvas.height
    this.gameWidth = this.sys.canvas.width
    this.stats = new Statistics(this)
    this.horizontalBoxes = 20
    this.verticalBoxes = 20
  }

  create(): void {
    this.stats.displayFPS(true)
    
    this.fullBoard = new Board({
      horizontalBoxes: this.horizontalBoxes,
      verticalBoxes: this.verticalBoxes,
      boxSize: this.fieldSize,
    })

    this.colisionBoard = new Board({
      horizontalBoxes: this.horizontalBoxes,
      verticalBoxes: this.verticalBoxes,
      boxSize: this.fieldSize,
      initAll: false,
      positionsToFill: [
        new Point(10, 0),
        new Point(10, 1),
        new Point(10, 2),
        new Point(10, 3),
        new Point(10, 4),
        new Point(10, 5),
        new Point(10, 6),
        new Point(10, 7),
        new Point(10, 8),
        new Point(10, 9),
        new Point(10, 10),
        new Point(10, 11),
        new Point(10, 12),
        new Point(10, 13),
        new Point(10, 14),
        new Point(10, 15),
        new Point(10, 16),
        new Point(10, 17),

        new Point(13, 2),
        new Point(13, 3),
        new Point(13, 4),
        new Point(13, 5),
        new Point(13, 6),
        new Point(13, 7),
        new Point(13, 8),
        new Point(13, 9),
        new Point(13, 10),
        new Point(13, 11),
        new Point(13, 12),
        new Point(13, 13),
        new Point(13, 14),
        new Point(13, 15),
        new Point(13, 16),
        new Point(13, 17),
        new Point(13, 18),
        new Point(13, 19),

        new Point(16, 3),
        new Point(17, 3),
        new Point(18, 3),
        new Point(19, 3),

        new Point(13, 6),
        new Point(14, 6),
        new Point(15, 6),
        new Point(16, 6),
      ],
    }).render(this.add, { color: { r: 255, a: 1, g: 0, b: 0 } })

    this.validBoard = this.fullBoard.removeFromBoard(this.colisionBoard)

    this.particleManager = new ParticleManager(this, {
      amount: 10,
      initialPosition: new Point(100, 100),
    })
  }

  update(time: number): void {
    this.stats.update(time)
    const { x: mouseX, y: mouseY } = this.input.mousePointer
    const hoverBoxPosition: Point = this.validBoard.getBoxPositionByDimensions(new Point(mouseX, mouseY))
    const boxExist = this.validBoard.exist(hoverBoxPosition)
    if (boxExist && !this.validBoard.goalPosition.equals(hoverBoxPosition)) {
      this.validBoard = this.validBoard
        .calculateBoxesDistance(hoverBoxPosition)
        .render(this.add, { renderDistances: false, renderVectorLines: true, colorByDistance: true })
    }
    this.particleManager.moveByPath(this.validBoard)

  }

  private checkCollision(): void {
    // const { x: headX, y: headY } = this.player.getHead();
    // // player vs. apple collision
    // if (headX === this.apple.x && headY === this.apple.y) {
    //   this.player.growSnake(this);
    //   CONST.SCORE++;
    //   this.scoreText.setText("" + CONST.SCORE);
    //   this.apple.newApplePosition(this.rndXPos(), this.rndYPos());
    // }
    // // border vs. snake collision
    // for (const { x, y } of this.gameBorder) {
    //   if (headX === x && headY === y) {
    //     this.player.setDead(true);
    //   }
    // }
    // // snake vs. snake collision
    // this.player.checkSnakeSnakeCollision();
  }

  // private rndXPos(): number {
  //   return (
  //     Phaser.Math.RND.between(1, this.horizontalBoxes - 1) * this.fieldSize
  //   );
  // }

  // private rndYPos(): number {
  //   return Phaser.Math.RND.between(1, this.verticalBoxes - 1) * this.fieldSize;
  // }
}
