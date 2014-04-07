/// <reference path="phaser.js" />
/// <reference path="game.js" />

var play_state = {
  paladin: null,
  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();


    platforms = game.add.group();
    platforms.enableBody = true;

    tiles = game.add.group();
    // Here we create the ground.
    var ground;//= platforms.create(0, game.world.height - 64, 'floortiles', 6);
    CreateTiles(platforms, 0, 2, 'floortiles', 10);
    //CreateTiles(platforms, 3, 0, 'floortiles', 3);
    CreateTiles(tiles, 3, 6, 'floortiles', 3, false);
    CreateTiles(tiles, 4, 6, 'floortiles', 3, false);

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'floortiles', 3);
    //ledge.body.immovable = true;

    paladin = game.add.sprite(100, 100, 'paladin');
    game.physics.arcade.enable(paladin);
    paladin.body.gravity.y = 300;
    paladin.body.collideWorldBounds = true;
    paladin.anchor.setTo(0.5, 0.5); //so the texture of the sprite is centered

    paladin.animations.add('stand',game.math.numberArray(0,10), 7);
    paladin.animations.add('walk',game.math.numberArray(11,18), 7);
    paladin.animations.play('stand',7, true);

  },
  update: function () {
    //collide palading with platforms
    game.physics.arcade.collide(paladin, platforms);

    paladin.body.velocity.x = 0;//reset

    if (cursors.right.isDown) {
      if(paladin.scale.x < 0) paladin.scale.x *= -1
      paladin.animations.play('walk')
      paladin.body.velocity.x = 100;
    }
    else if(cursors.left.isDown){
      if(paladin.scale.x > 0) paladin.scale.x *= -1
      paladin.animations.play('walk');
      paladin.body.velocity.x = -100;
    }
    else
      paladin.animations.play('stand');
  },

  render: function () {
    game.debug.canvas;
  }

};

function CreateTiles(platformToUse, startrow, rowcount, tilename, tileindex, immovable) {
  //TESTING SOMETHING OUT
  loopAmount = 30;// game.world.width / 20; // world width / tile width.
  this.immovable = immovable || true;
  debugger;
  for (var i = 0; i < loopAmount; i++) {
    for (var j = startrow; j <= (rowcount + startrow); j++) {
      ground = platformToUse.create(i * 20, game.world.height - (j * 20), 'floortiles', tileindex);
      ground.scale.setTo(1, 1);
      if (ground.body) {
        ground.body.immovable = true;
      }
    }
  }
}
