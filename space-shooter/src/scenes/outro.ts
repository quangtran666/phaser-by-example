export default class Outro extends Phaser.Scene {
  private width: number;
  private height: number;
  private center_width: number;
  // @ts-ignore
  private center_height: number;
  private introLayer: Phaser.GameObjects.Layer;
  // @ts-ignore
  private splashLayer: Phaser.GameObjects.Layer;
  private text: string[];
  // @ts-ignore
  private player1: Phaser.GameObjects.Sprite;
  constructor() {
    super({ key: "outro" });
  }

  create() {
    this.width = this.sys.game.config.width as number;
    this.height = this.sys.game.config.height as number;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;
    this.introLayer = this.add.layer();
    this.splashLayer = this.add.layer();
    this.text = [
      "Score: " + this.registry.get("score_player1"),
      "The evil forces among with",
      "their tyrannical leader GUINXU",
      "were finally wiped out.",
      "Thanks to commander Alva",
      "And the powah of the Plenny Shakes",
      " - press enter - ",
    ];
    this.showHistory();
    this.showPlayer();

    this.input.keyboard?.on("keydown-ENTER", this.startSplash, this);
  }

  /*
    These are the functions to show the dramatic story of the game, line by line.
    */
  showHistory() {
    this.text.forEach((line, i) => {
      this.time.delayedCall(
        (i + 1) * 2000,
        () => this.showLine(line, (i + 1) * 60),
        undefined,
        this
      );
    });
    this.time.delayedCall(4000, () => this.showPlayer(), undefined, this);
  }

  /*
    This will just show the "player1" sprite.
    */
  showPlayer() {
    this.player1 = this.add
      .sprite(this.center_width, this.height - 200, "player1")
      .setOrigin(0.5);
  }

  /*
    This will start the splash screen.
    */
  startSplash() {
    this.scene.start("splash");
  }

  private showLine(text: string, y: number) {
    let line = this.introLayer.add(
        this.add
            .bitmapText(this.center_width, y, "wendy", text, 50)
            .setOrigin(0.5)
            .setAlpha(0)
    );
    this.tweens.add({
      targets: line,
      duration: 2000,
      alpha: 1,
    });
  }
}
