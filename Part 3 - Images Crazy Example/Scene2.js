class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {

    this.iter = 0; // used for itarations

    // add the background in the center of the scene
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0.5, 0.5);
    this.background.x = config.width / 2;
    this.background.y = config.height / 2;

    // Zoow in and out the background
    this.tweens.add({
      targets: this.background,
      duration: 2000,
      scaleX: 2,
      scaleY: 2,
      ease: 'Sine.easeInOut',
      repeat: -1,
      yoyo: true
    });

    // make a group of ships
    this.shipGroup = this.make.group({
      key: "ship",
      frameQuantity: 56,
      max: 56
    });

    // align the group of ships in a grid
    Phaser.Actions.GridAlign(this.shipGroup.getChildren(), {
      width: 7,
      height: 9,
      cellWidth: 32,
      cellHeight: 32,
      x: 48,
      y: 32
    });

    // add the color circles
    this.colors = this.add.image(config.width / 2, config.height / 2, "colors").setScale(3);
    this.colors.alpha = 1;
    this.colors.blendMode = 1;

    // Put 3 ships on the
    this.ship1 = this.add.image(config.width / 2 - 50, config.height / 2, "ship");
    this.ship2 = this.add.image(config.width / 2, config.height / 2, "ship2").setScale(3);;
    this.ship3 = this.add.image(config.width / 2 + 50, config.height / 2, "ship3").setScale(3);;
    this.ship2.y -= 100;
  }


  update() {


    // rotate the color cicles
    this.colors.angle += 5;

    // fade in / out the circles
    this.colors.alpha = Math.sin(this.iter * 3);

    // rotate the ships
    var children = this.shipGroup.getChildren();
    for (var i = 0; i < children.length; i++) {
      children[i].rotation += 0.1;
    }

    // animate the 3 big ships
    this.ship1.rotation = this.iter;
    this.ship2.x = 90 + Math.sin(this.iter * 10) * 100;

    this.ship1.scaleX = Math.sin(this.iter * 10) * 5;
    this.ship1.scaleY = Math.cos(this.iter * 10) * 5;

    this.ship3.rotation = this.iter * 11;
    this.ship3.y = 140 + Math.sin(this.iter * 10) * 100;

    // increment the iteration
    this.iter += 0.01;

  }
}
