import { GameScene } from "../types";

const TYPES = {
  chocolate: { color: 0xaf8057, radius: 16, intensity: 0.4 },
  vanila: { color: 0xfff6d5, radius: 16, intensity: 0.4 },
  fruit: { color: 0xffffff, radius: 16, intensity: 0.4 },
  water: { color: 0xffffff, radius: 16, intensity: 0.4 },
  foe: { color: 0x00ff00, radius: 16, intensity: 0.4 },
};

class Shot extends Phaser.GameObjects.PointLight {
  // @ts-ignore
  public scene: GameScene;
  private shadow: Phaser.GameObjects.Arc;
  // @ts-ignore
  private playerName: string;
  
  constructor(
    scene: GameScene,
    x: number,
    y: number,
    type: string = "water",
    playerName: string,
    velocityX: number = 0,
    velocityY: number = -500
  ) {
    const { color, radius, intensity } = TYPES[type];
    super(scene, x, y, color, radius, intensity);
    this.scene = scene;
    this.name = "shot";
    this.playerName = playerName;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(false);
    body.setVelocityX(velocityX);
    body.setVelocityY(velocityY);
    body.setCircle(10);
    body.setOffset(6, 9);
    body.setCollideWorldBounds(true);
    body.onWorldBounds = true;
    this.spawnShadow(x, y, velocityX, velocityY);
    this.init();
  }

  /*
   Each shot will have a shadow, which will be a circle with a lower alpha value.
    */
  spawnShadow(x, y, velocityX, velocityY) {
    this.shadow = this.scene.add
      .circle(x + 20, y + 20, 10, 0x000000)
      .setAlpha(0.4);
    this.scene.add.existing(this.shadow);
    this.scene.physics.add.existing(this.shadow);
    const body = this.shadow.body as Phaser.Physics.Arcade.Body;
    body.setVelocityX(velocityX);
    body.setVelocityY(velocityY);
  }

  /*
    We add a tween to the shot to make it grow and fade out, repeatedly.
    */
  init() {
    this.scene.tweens.add({
      targets: this,
      duration: 200,
      intensity: { from: 0.3, to: 0.7 },
      repeat: -1,
    });
  }
}

export default Shot;
