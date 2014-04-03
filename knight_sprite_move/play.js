/// <reference path="phaser.js" />
/// <reference path="game.js" />

var play_state = {
  paladin: null,
  create: function () {
    paladin = game.add.sprite(100, 200, 'paladin');
    game.physics.arcade.enable(paladin);
    paladin.body.gravity.y = 300;
    paladin.body.collideWorldBounds = true;

    paladin.animations.add('stand', ['stand00.png', 'stand01.png']);
    paladin.animations.play('stand', 1, true);

  },
  update: function () {
    //if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    //  paladin.animations.play('move', 11);
    //}
    //else
    //  paladin.animations.play('stand', 11);
  },

};
