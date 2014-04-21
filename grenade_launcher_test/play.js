/// <reference path="phaser.js" />
/// <reference path="game.js" />
var paladin, layer, gl;
var fireRate = 100, nextFire = 0;
var play_state = {
  create: function () {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    //add tilemap
    map = game.add.tilemap('map');

    //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
    //  The second parameter maps this name to the Phaser.Cache key 'tiles'
    map.addTilesetImage('floor-tiles-20x20', 'tiles');

    map.setCollision([235, 193]);

    main_layer = map.createLayer('Main Layer');
    main_layer.resizeWorld();

    //add gun to game
    gl = game.add.sprite(100, 250, 'grenade-launcher');
    game.physics.arcade.enable(gl);
    gl.scale.x = -.5;
    gl.scale.y = .5;
    gl.anchor.setTo(0.5, 0.5);

    //Add bullets as a group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

    game.camera.follow(paladin);

  },
  update: function () {
    gl.rotation = game.physics.arcade.angleToPointer(gl);
    if (gl.angle < -90 || gl.angle > 90)
      gl.scale.y = -.5;
    else
      gl.scale.y = .5;

    if (game.input.activePointer.isDown) {
      fire();
    }
  },

  render: function () {
    // game.debug.body(floorTile3);
    game.debug.spriteInfo(gl, 32, 32);
  }

};

function fire() {
  game.physics.arcade.collide(bullets, map);

  y_component = (gl.x / Math.tan(gl.angle) * (Math.PI * 2));
  if (game.time.now > nextFire && bullets.countDead() > 0) {
    nextFire = game.time.now + fireRate;
    console.log(gl.y);
    var bullet = bullets.getFirstDead();
    bullet.body.gravity.setTo(0, 220);

    bullet.reset(gl.x + 35, y_component);
    game.physics.arcade.moveToObject(bullet, 300);
  }
}

function HitWall(paladin) {
  console.log("WALL HIT");

}