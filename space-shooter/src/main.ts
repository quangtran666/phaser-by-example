//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
import Bootloader from "./scenes/bootloader.ts";
import Splash from "./scenes/splash.ts";
import Transition from "./scenes/transition.ts";
import Outro from "./scenes/outro.ts";
import { Game as GameScene } from "./scenes/game.ts"

import { Game } from "phaser";
import GameConfig = Phaser.Types.Core.GameConfig;

const config: GameConfig = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    autoRound: false,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
        }
    },
    scene: [Bootloader, Splash, Transition, GameScene, Outro]
};

export default new Game(config);
