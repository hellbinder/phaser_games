/// <reference path="phaser.js" />
/// <reference path="game.js" />
var paladin, layer;
var play_state = {
  create: function () {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    //add tilemap
    map = game.add.tilemap('castle');

    //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
    //  The second parameter maps this name to the Phaser.Cache key 'tiles'
    map.addTilesetImage('floor-tiles-20x20', 'tiles');

    map.setCollision([235,193]);

    main_layer = map.createLayer('Main Layer');
    main_layer.resizeWorld();

    paladin = game.add.sprite(100, game.world.height - 140, 'paladin');
    game.physics.arcade.enable(paladin);
    paladin.body.gravity.y = 700;
    paladin.body.collideWorldBounds = true;
    paladin.anchor.setTo(0.5, 0.5); //so the texture of the sprite is centered

    paladin.animations.add('stand', game.math.numberArray(0, 10), 7);
    paladin.animations.add('walk', game.math.numberArray(11, 18), 7);
    paladin.animations.play('stand', 7, true);


    game.camera.follow(paladin);

  },
  update: function () {
    //collide palading with map
    game.physics.arcade.collide(paladin, main_layer);

    paladin.body.velocity.x = 0;//reset
    //SetPlatformProperties([platforms, tiles], ['checkWorldBounds', 'outOfBoundsKill']);

    if (cursors.right.isDown) {
      if (paladin.scale.x < 0) paladin.scale.x *= -1;
      paladin.animations.play('walk');
      paladin.body.velocity.x = 400;

    }
    else if (cursors.left.isDown) {
      if (paladin.scale.x > 0) paladin.scale.x *= -1;
      paladin.animations.play('walk');
       paladin.body.velocity.x = -400;

    }
    else
      paladin.animations.play('stand');

    if (cursors.up.isDown) {
      if (paladin.body.onFloor()) {
        paladin.body.velocity.y = -150;
      }
    }
  },

  render: function () {
    // game.debug.body(floorTile3);
  }

};

function HitWall(paladin) {
  console.log("WALL HIT");

}