/// <reference path="phaser.js" />
/// <reference path="main.js" />

var menu_state = {
  create: function () {
    //call start when pressin spacebar

    var space_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space_key.onDown.add(this.start, this);

    //variables
    var style = { font: "30px Arial", fill: "#ffffff" };
    var x = game.world.width / 2, y = game.world.height / 2; //to center text

    //centered text
    var text = game.add.text(x, y, "Press space to start", style);
    text.anchor.setTo(0.5, 0.5);


    //Check if user played
    if (score > 0) {
      var score_label = game.add.text(x, y + 50, "score " + score, style);
      score_label.anchor.setTo(0.5, 0.5);
    }
  },

  start: function () {
    console.log(game.state);
    if(game.state.current != 'play') game.state.start('play'); 
    //checking state to make sure it doesnt restart everytime i press spacebar
    //have to find a way to be able to bind the same keys for different states.
    //Could also use another key press. But didn't want to.
  }
};