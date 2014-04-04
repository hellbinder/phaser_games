/// <reference path="phaser.js" />
/// <reference path="game.js" />

var play_state = {
  paladin: null,
  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    paladin = game.add.sprite(100, 100, 'paladin');
    game.physics.arcade.enable(paladin);
    paladin.body.gravity.y = 300;
    paladin.body.collideWorldBounds = true;
    paladin.anchor.setTo(0.5, 0.5); //so the texture of the sprite is centered

    paladin.animations.add('stand',game.math.numberArray(0,10), 7);
    paladin.animations.add('walk',game.math.numberArray(11,18), 7);
    paladin.animations.play('stand',7, true);

    platforms = game.add.group();
    platforms.enableBody = true;
    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
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

};
