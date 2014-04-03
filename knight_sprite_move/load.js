/// <reference path="phaser.js" />
/// <reference path="game.js" />

var load_state = {
  preload: function () {
    //Load background
    game.stage.backgroundColor = '#71c5cf';

    //load assets
    //images
    //game.load.spritesheet("paladin", "assets/paladin_sprite.png", 120, 100,22,-1);
    game.load.atlas("paladin", "/assets/paladin.png", "assets/paladin_sprite.json");
    //game.load.atlas("paladin", "/assets/running_bot.png", "assets/running_bot.json");

    //sound
  },
  create: function () {
    //go to menu state one all assets loaded
    game.state.start("play");    
  }
};

