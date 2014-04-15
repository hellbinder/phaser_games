/// <reference path="phaser.js" />
/// <reference path="game.js" />
var paladin, floorTile1, floorTile2, floorTile3;
var play_state = {
  create: function () {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();


    platforms = game.add.group();
    tiles = game.add.group();
    sprite_tiles = game.add.group();
    // Here we create the ground.
    var ground;//= platforms.create(0, game.world.height - 64, 'floortiles', 6);

    //floorTile1 = game.add.tileSprite(0, game.world.height - 180, game.world.width, 120, 'floortiles', 3);
    //floorTile2 = game.add.tileSprite(0, game.world.height - 60, game.world.width, 60, 'floortiles', 233);
    //floorTile3 = game.add.tileSprite(0, game.world.height - 20, game.world.width, 20, 'floortiles', 233);

    floorTile1 = AddBackgroundTileSprite(1, 1, 'floortiles', 233, 20);
    floorTile2 = AddBackgroundTileSprite(2, 2, 'floortiles', 233, 20);
    floorTile3 = AddBackgroundTileSprite(4, 10, 'floortiles', 3, 20);
    game.physics.arcade.enable(floorTile1);
    floorTile1.body.immovable = true;
    floorTile1.body.allowGravity = false;

    //CreateTiles(platforms, 1, 2, 'floortiles', 233, true);
    //CreateTiles(platforms, 3, 1, 'floortiles', 233, false);
    //CreateTiles(tiles, 4, 10, 'floortiles', 3, false);

    paladin = game.add.sprite(100, game.world.height - 120, 'paladin');
    game.physics.arcade.enable(paladin);
    paladin.body.gravity.y = 300;
    paladin.body.collideWorldBounds = true;
    paladin.anchor.setTo(0.5, 0.5); //so the texture of the sprite is centered

    paladin.animations.add('stand',game.math.numberArray(0,10), 7);
    paladin.animations.add('walk',game.math.numberArray(11,18), 7);
    paladin.animations.play('stand', 7, true);

    game.camera.follow(paladin);

  },
  update: function () {
    //collide palading with platforms
    game.physics.arcade.collide(paladin, floorTile1);
    //game.physics.arcade.collide(paladin, platforms);
    paladin.body.velocity.x = 0;//reset
    //SetPlatformProperties([platforms, tiles], ['checkWorldBounds', 'outOfBoundsKill']);

    if (cursors.right.isDown) {
      if(paladin.scale.x < 0) paladin.scale.x *= -1
      paladin.animations.play('walk')
      // paladin.body.velocity.x = 100;
      platforms.position.x -= 2;
      tiles.position.x -= 2;
      floorTile1.tilePosition.x -= 2;
      floorTile2.tilePosition.x -= 2;
      floorTile3.tilePosition.x -= 2;

    }
    else if(cursors.left.isDown){
      if(paladin.scale.x > 0) paladin.scale.x *= -1
      paladin.animations.play('walk');
      // paladin.body.velocity.x = -100;
      platforms.position.x += 2;
      tiles.position.x += 2;
      floorTile1.tilePosition.x += 2;
      floorTile2.tilePosition.x += 2;
      floorTile3.tilePosition.x += 2;
    }
    else
      paladin.animations.play('stand');
  },

  render: function () {
    // game.debug.body(floorTile3);
  }

};

function CreateTiles(platformToUse, startrow, rowcount, tilename, tileindex, immovable, width) {
  //TESTING SOMETHING OUT
  if (typeof width === "undefined" || width === null || width == 0) {
    width = 40;
  }
  //game.world.width / 20; // world width / tile width.
  //debugger;
  for (var i = 0; i < width; i++) {
    for (var j = startrow ; j <= (rowcount + startrow - 1); j++) {
      ground = platformToUse.create(i * 20, game.world.height - (j * 20), 'floortiles', tileindex);
      ground.scale.setTo(1, 1);
      ground.events.onKilled.add(function () { console.log("hi") }, this);
      if (immovable) {
        game.physics.arcade.enable(ground);
        ground.body.immovable = true;
      }
    }
  }
}

function SetPlatformProperties(platforms, properties)
{
  for (var i in platforms) {
    for (var j in properties)
    {
      platforms[i].setAll(properties[j], true);
    }
  }
}


function AddBackgroundTileSprite(startrow, rowcount, key, frame, tileWidth)
{
  var gameHeight = game.world.height;
  var gameWidth = game.world.width;
  var startposition = gameHeight - (startrow * tileWidth) - (rowcount * tileWidth) + tileWidth
  //return game.add.tileSprite(0, gameHeight - (startrow * tileWidth), gameWidth, (rowcount * tileWidth), key, frame);
  return game.add.tileSprite(0, startposition, game.world.width, (rowcount * tileWidth), key, frame);

}
