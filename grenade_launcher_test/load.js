/// <reference path="phaser.js" />
/// <reference path="game.js" />
var world_tiles;

var load_state = {
  preload: function () {
    //Load background
    game.stage.backgroundColor = '#71c5cf';

    //load assets
    //images
    game.load.tilemap('map', 'assets/particle_collision_map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image("tiles", '/global_images/floor-tiles-20x20.png');
    game.load.image('grenade-launcher', 'assets/multi_grenade_launcher.png')
    game.load.image('bullet', 'assets/bullet.png')
    //sound
  },
  create: function () {
    //go to menu state one all assets loaded
    game.state.start("play");
  }
};

