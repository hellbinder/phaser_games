
// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

// Creates a new 'main' state that wil contain the game
var main_state = {

    preload: function() { 
    // Function called first to load all the assets

    //Load background
      game.stage.backgroundColor = '#71c5cf';

      //load assets
      game.load.image('bird','assets/bird.png');
      game.load.image('pipe','assets/pipe.png');
    },

    create: function() { 

      pipes = game.add.group();
      pipes.createMultiple(31, 'pipe');

      //create timer
      game.time.events.loop(500, this.add_row_of_pipes, this);
      //bind space_key)

    },
    
    update: function() {

    },

    log_stuff: function(){
      console.log("hi");
    },

    add_one_pipe: function(x,y) {

      var pipe = pipes.getFirstDead(); //get first pipe
      game.physics.arcade.enable(pipe)
      pipe.reset(x,y); //set position
      pipe.body.velocity.x = -200; //add velocity to make it move left
      pipe.outOfBoundsKill = true; //kill when out of boundd

    },

    add_row_of_pipes: function(){

      //add row of pipes with space in the middle
      //sets where the hole is made from 8 blocks on the screen.
      var hole = Math.floor(Math.random() * 5) + 1;
      // debugger;
      for(var i = 0; i < 8 ; i++){
        if (i != hole && i != hole + 1) {
          this.add_one_pipe(400, i * 60 + 10) //normal x, random height
        };
      }
    }

  };

  // Add and start the 'main' state to start the game
game.state.add('main', main_state);  
game.state.start('main'); 