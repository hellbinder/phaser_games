﻿/// <reference path="../global_scripts/phaser.js" />

//initialize phase
var game = new Phaser.Game(600, 400, Phaser.AUTO, 'game_div') ;

//score

//define all states of the game
game.state.add('load', load_state);
game.state.add('play', play_state);


//Start with load state

game.state.start('load');
