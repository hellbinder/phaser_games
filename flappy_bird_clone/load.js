/// <reference path="phaser.js" />

var load_state = {
  preload: function () {
    //Load background
    game.stage.backgroundColor = '#71c5cf';

    //load assets
    //images
    game.load.image('bird', 'assets/bird.png');
    game.load.image('pipe', 'assets/pipe.png');
    //sound
    game.load.audio('jump', 'assets/jump.wav');
    game.load.audio('impact', 'assets/impact.mp3');
  },
  create: function () {
    //go to menu state one all assets loaded
    game.state.start("menu");
  }
};