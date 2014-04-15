/// <reference path="phaser.js" />
/// <reference path="game.js" />
var world_tiles;

var load_state = {
  preload: function () {
    //Load background
    game.stage.backgroundColor = '#71c5cf';


    //load assets
    game.load.atlasJSONHash("paladin", "/assets/paladin_sprite.png", "assets/paladin_sprite.json");
    //map
    game.load.tilemap('castle', '/assets/castle.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image("tiles", '/assets/floor-tiles-20x20.png');
    //sound
  },
  create: function () {
    //go to menu state one all assets loaded
    game.state.start("play");
  }
};

