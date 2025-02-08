import { GameScene } from '../types';

export class LightParticle extends Phaser.GameObjects.PointLight {
  // @ts-ignore
  public scene: GameScene;

  constructor(
    scene: GameScene,
    x: number,
    y: number,
    color: number = 0xffffff,
    radius: number = 5,
    intensity: number = 0.5
  ) {
    super(scene, x, y, color, radius, intensity);
    this.scene = scene;
    this.name = "celtic";
    scene.add.existing(this);
    scene.physics.add.existing(this);
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(false);
    body.setVelocityY(300);
    this.init();
  }

  /*
    We add a tween to the particles to make it grow and fade out.
    */
  init() {
    this.scene.tweens.add({
      targets: this,
      duration: Phaser.Math.Between(600, 1000),
      scale: { from: 1, to: 3 },
      alpha: { from: this.alpha, to: 0 },
      onComplete: () => {
        this.destroy();
      },
    });
  }
}
