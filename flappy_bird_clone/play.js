﻿/// <reference path="phaser.js" />
/// <reference path="main.js" />

var play_state = {
  //no preload needed

  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    style = { font: "30px Arial", fill: "#ffffff" };
    score = 0;
    label_score = this.game.add.text(20, 20, "0", style);

    // Fuction called after 'preload' to setup the game  
    //display bird on screen
    bird = game.add.sprite(100, 245, 'bird');

    //change anchor of bird
    bird.anchor.setTo(-0.2, 0.5);

    //enable physics
    game.physics.arcade.enable(bird);

    //add gravity to bird
    bird.body.gravity.y = 1000;

    //pipe group
    //Way to add kill when out of bounds.
    //This way when getFirstDead() is called, it will never be 0;
    pipes = game.add.group();
    pipes.enableBody = true;
    pipes.physicsBodyType = Phaser.Physics.ARCADE;
    pipes.createMultiple(20, 'pipe');
    pipes.setAll('checkWorldBounds', true);
    pipes.setAll('outOfBoundsKill', true);

    //create timer
    timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);
    //bind space_key
    var space_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    space_key.onDown.add(this.jump)

    //load sound in game
    jump_sound = game.add.audio('jump');
    impact_sound = game.add.audio('impact');
  },

  update: function () {
    // Function called 60 times per second
    if (bird.inWorld == false) {
      this.restart_game();
    }

    //if bird collides with wall, restart
    game.physics.arcade.overlap(bird, pipes, this.hit_pipe)

    //change angle of bird
    if (bird.angle < 20)
      bird.angle += 1;
  },

  hit_pipe: function () {
    if (!bird.alive)
      return;
    bird.alive = false;
    impact_sound.play();
    //remove timer to prevent pipes
    game.time.events.remove(timer);

    //stop pipes from moving
    pipes.forEachAlive(function (p) {
      p.body.velocity.x = 0;
    }, this);

  },

  jump: function () {
    if (!bird.alive)
      return;

    // create an animation on the bird
    var animation = game.add.tween(bird);
    animation.to({ angle: -20 }, 100); // Set the animation to change the angle of the sprite to -20° in 100 milliseconds
    animation.start(); // And start the animation
    bird.body.velocity.y = -350; //add vert velocity to bird.

    jump_sound.play();

  },

  restart_game: function () {
    game.time.events.remove(timer); //reset timer
    game.state.start('menu'); //changing to main state(restart)
  },

  add_one_pipe: function (x, y) {

    var pipe = pipes.getFirstDead();
    pipe.reset(x, y); //set position
    pipe.body.velocity.x = -200; //add velocity to make it move left
  },

  add_row_of_pipes: function () {

    //add row of pipes with space in the middle
    //sets where the hole is made from 8 blocks on the screen.
    var hole = Math.floor(Math.random() * 5) + 1;
    // debugger;
    for (var i = 0; i < 8 ; i++) {
      if (i != hole && i != hole + 1) {
        this.add_one_pipe(400, i * 60 + 10) //normal x, random height
      };
    }
    score += 1;
    label_score.text = score;

    console.log("created pipes")
  }
};