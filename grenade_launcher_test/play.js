﻿/// <reference path="phaser.js" />
/// <reference path="game.js" />
var bullets, layer, gl;
var block_emitter;
var bullet_emitter;
var bullet_trail;
var fireRate = 100, nextFire = 0;
var grenadeLauncherImage;
var play_state = {
  create: function () {

    game.physics.startSystem(Phaser.Physics.P2);

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    //add tilemap
    map = game.add.tilemap('map');

    //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
    //  The second parameter maps this name to the Phaser.Cache key 'tiles'
    map.addTilesetImage('floor-tiles-20x20', 'tiles');

    map.setCollision([235, 193, 160, 161, 162, 163]);

    main_layer = map.createLayer('Main Layer');
    main_layer.resizeWorld();

    //add gun to game
    gl = game.add.sprite(100, 250, 'grenade-launcher');
    grenadeLauncherImage =  game.cache.getImage('grenade-launcher')
    game.physics.arcade.enable(gl);
    gl.scale.x = .5;
    gl.scale.y = .5;
    gl.anchor.setTo(1, 0.4);

    //Add bullets as a group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, 'space_items', 31);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

    //create block bomb emmiter
    block_emitter = game.add.emitter(game.world.centerX, game.world.centerY, 250);
    block_emitter.physicsBodyType = Phaser.Physics.Arcade;
    block_emitter.enableBody = true;
    block_emitter.makeParticles('tile_ss', 161);
    block_emitter.minParticleSpeed.setTo(-200, -300);
    block_emitter.maxParticleSpeed.setTo(200, -500);
    block_emitter.minParticleScale = .2;
    block_emitter.maxParticleScale = .5;
    block_emitter.gravity = 800;
    block_emitter.bounce.setTo(0.3, 0.3);
    block_emitter.angularDrag = 30;
    block_emitter.particleDrag = .08;

    //create cluster bomb emmiter
    bullet_emitter = game.add.emitter(game.world.centerX, game.world.centerY, 250);
    bullet_emitter.physicsBodyType = Phaser.Physics.Arcade;
    bullet_emitter.makeParticles('space_items',61);
    bullet_emitter.minParticleSpeed.setTo(-200, -300);
    bullet_emitter.maxParticleSpeed.setTo(200, -400);
    bullet_emitter.minParticleScale = .3;
    bullet_emitter.maxParticleScale = .31;
    bullet_emitter.gravity = 500;
    bullet_emitter.bounce.setTo(0.5, 0.5);
    bullet_emitter.angularDrag = 30;
    bullet_emitter.particleDrag = .8;

    //bullet trail
    bullet_trail = game.add.emitter(0, 0,2000);
    bullet_trail.makeParticles('bullet');
    bullet_trail.alpha = .5;
    bullet_trail.minParticleSpeed.setTo(0, 0);
    bullet_trail.maxParticleSpeed.setTo(0, 0);
    bullet_trail.minRotation = 0;
    bullet_trail.maxRotation = 0;
    bullet_trail.gravity = 0;

    
  },
  update: function () {
    game.physics.arcade.collide(bullet_emitter, main_layer, KillEmitter);
    game.physics.arcade.collide(bullets, main_layer, KillBullet);
    game.physics.arcade.collide(block_emitter, main_layer);
    game.physics.arcade.collide(block_emitter, block_emitter);
    gl.rotation = game.physics.arcade.angleToPointer(gl);
    if (gl.angle < -90 || gl.angle > 90)
      gl.scale.y = -.5;
    else
      gl.scale.y = .5;

    if (game.input.activePointer.isDown) {
      fire();
    }

    //manually work with particles to be able to simulate friction.
    //need to find a better way of doing this from the emitter class.
    for (var i = 0; i < block_emitter.total; i++) {
      a = block_emitter.children[i];
      a.body.allowRotation = false;
      if (a.body.onFloor()) //check if touching the ground
      {
        if (a.body.velocity.x > 0) {
          a.body.velocity.x -= 5;
          //if velocity passes from positive to negative when setting new velocity, then set it to 0 so it doesnt change anymore.
          if (a.body.velocity.x < 0)
            a.body.velocity.x = 0;
        }
        else if (a.body.velocity.x < 0) {
          a.body.velocity.x += 5;
          //if velocity passes from negative to positive when setting new velocity, then set it to 0 so it doesnt change anymore.
          if (a.body.velocity.x > 0)
            a.body.velocity.x = 0;
        }
      }
    }
    //bullets.forEachAlive(particleBurst, bullets);

  },

  render: function () {
    game.debug.spriteInfo(gl, 32, 32);
    //debug each emitter particle
    //for (var i = 0; i < block_emitter.total; i++) {
    //  if (block_emitter.children[i].visible) {
    //    game.debug.body(block_emitter.children[i]);
    //  }
    //}
  }
};

function fire() {
  //parameters are assumed to be in radians so do Math.sin(Math.PI * (angle/180));
  var xSize = grenadeLauncherImage.width;
  var ySize = grenadeLauncherImage.height;
  var xComponent = xSize * Math.cos(Math.PI * (gl.angle / 180));
  var yComponent = xSize * Math.sin(Math.PI * (gl.angle / 180));
  //console.log("Angle=" + gl.angle + " : x-component = " + xComponent + " : y-component = " + yComponent);
  //console.log("Angle=" + gl.angle + " : gl-x = " + gl.x + " : gl.y = " + gl.y);

  if (game.time.now > nextFire && bullets.countDead() > 0) {
    nextFire = game.time.now + fireRate;
    var bullet = bullets.getFirstDead();
    bullet.body.gravity.setTo(0, 220);

    bullet.reset(gl.x - 5, gl.y - 5);
    //bullet.reset(xComponent - 5, yComponent + gl.y - 5);
    game.physics.arcade.moveToPointer(bullet, 300);

  }
}

//set trail on bullets
function particleBurst(bullet) {
  bullet_trail.x = bullet.x;
  bullet_trail.y = bullet.y;
  bullet_trail.emitParticle();
}
function KillBullet(bullet,tile) {
  bullet.kill();
  StartEmitter(bullet_emitter, tile.worldX, tile.worldY,4);
  if (IsTileDestroyable(tile.index)) {
    map.removeTile(tile.x, tile.y);
    StartEmitter(block_emitter, tile.worldX, tile.worldY,10);
  }
}

function KillEmitter(emitter, tile) {
  if (IsTileDestroyable(tile.index)) {
    map.removeTile(tile.x, tile.y);
    StartEmitter(block_emitter, tile.worldX, tile.worldY, 10);
  }
  emitter.kill();
}

function StartEmitter(emitter,x,y,amount)
{
  var xMultiplier = 1, yMultiplier = 1;
  //multiplying by the reciprocal for now since I'm scaling the emitter by half.
  //If not done, it will emmit in the wrong location
  if (emitter.scale.x < 1)
    xMultiplier = Math.pow(emitter.scale.x, -1)
  if (emitter.scale.y < 1)
    yMultiplier = Math.pow(emitter.scale.y, -1)
  emitter.x = x * xMultiplier;
  emitter.y = y * yMultiplier;
  emitter.start(true, 4000, 4, amount);
}



function IsTileDestroyable(tile_index) {
  var tileProperties = map.tilesets[0].tileProperties[tile_index];
  if (tileProperties !== undefined)
    return tileProperties.destroyable;
  else
    return false;

}

//SET TILE PROPERTIES TO EACH TILE
//When creating a property using Tiles, the properties are applied to the tilemap -> tilset -> tileproperties object. I need to do this for each tile to check if they are destroyable.