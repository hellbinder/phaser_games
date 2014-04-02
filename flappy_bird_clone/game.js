/// <reference path="phaser.js" />

//initialize phase
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

//score
var score = 0; //make it global

//define all states of the game
game.state.add('load', load_state);
game.state.add('menu', menu_state);
game.state.add('play', play_state);


//Start with load state

game.state.start('load');
