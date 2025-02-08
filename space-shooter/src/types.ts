import Player from "./gameobjects/player";

export interface GameConfig {
  width: number;
  height: number;
}

export interface FoeType {
  points: number;
  lives: number;
}

export interface LightType {
  color: number;
  radius: number;
  intensity: number;
}

export interface SceneData {
  name: string;
  number: number;
  next: string;
  time?: number;
}

export interface Score {
  scoreText: Phaser.GameObjects.BitmapText;
}

export interface Scores {
  player1: {
    scoreText?: Phaser.GameObjects.BitmapText;
  };
  player2: {
    scoreText?: Phaser.GameObjects.BitmapText;
  };
}

export interface AudioMap {
  [key: string]: Phaser.Sound.BaseSound;
}

export interface GameScene extends Phaser.Scene {
  width: number;
  height: number;
  center_width: number;
  center_height: number;
  player: Player | null;
  shots: Phaser.GameObjects.Group;
  foeGroup: Phaser.GameObjects.Group;
  foeWaveGroup: Phaser.GameObjects.Group;
  foeShots: Phaser.GameObjects.Group;
  trailLayer: Phaser.GameObjects.Layer;
  shotsLayer: Phaser.GameObjects.Layer;
  powerUps: Phaser.GameObjects.Group;
  number: number;
  name: string;
  next: string;
  playAudio: (key: string) => void;
  endScene: () => void;
}

export interface SplashScene extends Phaser.Scene {
  width: number;
  height: number;
  center_width: number;
  center_height: number;
  background: Phaser.GameObjects.TileSprite;
  theme: Phaser.Sound.BaseSound;
  startGame: () => void;
}

export interface TransitionScene extends Phaser.Scene {
  width: number;
  height: number;
  center_width: number;
  center_height: number;
  number: number;
  next: string;
  name: string;
  theme: Phaser.Sound.BaseSound;
}

export type SceneType = GameScene | SplashScene;