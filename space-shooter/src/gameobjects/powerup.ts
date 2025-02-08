import { GameScene } from '../types';

class PowerUp extends Phaser.GameObjects.Sprite {
  public scene: GameScene;
  private shadow: Phaser.GameObjects.Image;
  private power: string;
  private id: number;
  private direction: number;
  public body: Phaser.Physics.Arcade.Body;

  constructor(
    scene: GameScene,
    x: number,
    y: number,
    name: string = "plenny0",
    power: string = "fruit"
  ) {
    super(scene, x, y, name);
    this.scene = scene;
    this.name = name;
    this.power = power;
    this.scene = scene;
    this.id = Math.random();
    this.spawnShadow(x, y);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body = this.body as Phaser.Physics.Arcade.Body;
    this.body.setAllowGravity(false);
    this.body.setCircle(19);
    this.body.setOffset(12, 12);
    this.body.setVelocityX(-100);
    this.init();
  }

  /*
   The power-up also spawns a shadow.
    */
  spawnShadow(x, y) {
    this.shadow = this.scene.add
      .image(x + 20, y + 20, "plenny0")
      .setTint(0x000000)
      .setAlpha(0.4);
    this.scene.physics.add.existing(this.shadow);
    this.shadow.body?.setVelocityX(-100);
  }

  /*
    This sets the animation and movement of the power-up.
    */
  init() {
    this.scene.anims.create({
      key: this.name,
      frames: this.scene.anims.generateFrameNumbers(this.name),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.tweens.add({
      targets: [this],
      duration: 5000,
      x: { from: this.x, to: 0 },
      y: { from: this.y - 10, to: this.y + 10 },
      scale: { from: 0.8, to: 1 },
      repeat: -1,
      yoyo: true,
    });

    this.scene.tweens.add({
      targets: this.shadow,
      duration: 5000,
      x: { from: this.shadow.x, to: 0 },
      y: { from: this.shadow.y - 10, to: this.y + 10 },
      scale: { from: 0.8, to: 1 },
      repeat: -1,
      yoyo: true,
    });

    this.anims.play(this.name, true);
    this.body.setVelocityX(-100);
    this.shadow.body.setVelocityX(-100);
    this.direction = -1;
  }

  /*
    When this element is destroyed, it will also destroy the shadow.
    */
  destroy() {
    this.shadow.destroy();
    super.destroy();
  }
}

export default PowerUp;
