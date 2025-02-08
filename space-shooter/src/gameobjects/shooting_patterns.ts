import Shot from "./shot";
import { GameScene } from '../types';

interface ShootingMethods {
  [key: string]: (x: number, y: number, powerUp: string) => void;
}

export default class ShootingPatterns {
  private scene: GameScene;
  private name: string;
  private shootingMethods: ShootingMethods;

  constructor(scene: GameScene, name: string) {
    this.scene = scene;
    this.name = name;
    this.shootingMethods = {
      water: this.single.bind(this),
      fruit: this.tri.bind(this),
      vanila: this.quintus.bind(this),
      chocolate: this.massacre.bind(this),
    };
  }

  /*
    These are the different functions we will use to shoot. Each one will shoot a different number of shots, with different angles and speeds.
    The patterns are applied depending on the current power-up.
    */
  public shoot(x: number, y: number, powerUp: string): void {
    this.shootingMethods[powerUp](x, y, powerUp);
  }

  private single(x: number, y: number, powerUp: string): void {
    this.scene.shots.add(new Shot(this.scene, x, y, powerUp, this.name));
  }

  private tri(x: number, y: number, powerUp: string): void {
    this.scene.shots.add(new Shot(this.scene, x, y, powerUp, this.name, -60));
    this.scene.shots.add(new Shot(this.scene, x, y, powerUp, this.name));
    this.scene.shots.add(new Shot(this.scene, x, y, powerUp, this.name, 60));
  }

  private quintus(x: number, y: number, powerUp: string): void {
    this.scene.shots.add(new Shot(this.scene, x, y, powerUp, this.name, -300));
    this.scene.shots.add(new Shot(this.scene, x, y, powerUp, this.name, 300));
    this.scene.shots.add(
      new Shot(this.scene, x, y, powerUp, this.name, -300, 500)
    );
    this.scene.shots.add(
      new Shot(this.scene, x, y, powerUp, this.name, 300, 500)
    );
  }

  private massacre(x: number, y: number, powerUp: string): void {
    this.scene.shots.add(
      new Shot(this.scene, x, y, powerUp, this.name, 300, 0)
    );
    this.scene.shots.add(
      new Shot(this.scene, x, y, powerUp, this.name, -300, 0)
    );
    this.scene.shots.add(
      new Shot(this.scene, x, y, powerUp, this.name, 0, 500)
    );
    this.scene.shots.add(new Shot(this.scene, x, y, powerUp, this.name, 30));
    this.scene.shots.add(new Shot(this.scene, x, y, powerUp, this.name, 60));
  }
}
