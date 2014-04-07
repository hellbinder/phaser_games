/// <reference path="phaser.js" />
/// <reference path="game.js" />

var load_state = {
  preload: function () {
    //Load background
    game.stage.backgroundColor = '#71c5cf';

    //load assets
    //images
    game.load.atlasJSONHash("paladin", "/assets/paladin_sprite.png", "assets/paladin_sprite.json");
    game.load.image("ground", '/assets/platform.png');
    game.load.spritesheet('floortiles', "/assets/floor-tiles-20x20.png", 20, 20);
    //sound
  },
  create: function () {
    //go to menu state one all assets loaded
    game.state.start("play");    
  }
};

