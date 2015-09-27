// Initialize Phaser, and creates a 400x490px game

var game = new Phaser.Game(400, 600, Phaser.CANVAS, 'game_div');
var game_state = {};
game_state.score = -1;
// Creates a new 'main' state that wil contain the game
game_state.loading=function(){

};
game_state.loading.prototype={
    preload: function () {       
        

    },
    create: function () {
       
    },
    update: function () {
       
    }
}

game_state.mainmenu=function(){

};
game_state.mainmenu.prototype={
    preload: function () {
        
        
    },
    create: function () {
        
    },
    click: function () {

    },
    update: function () {
    }
};
game_state.main = function () {
};
game_state.main.prototype = {
    preload: function () {
        game.load.image("atari","assets/play.png");

    },
    create: function () {
        // Fuction called after 'preload' to setup the game
         var atari = game.add.sprite(32, 100, 'atari');

        //  Enable input and allow for dragging
        atari.inputEnabled = true;
        atari.input.enableDrag();

    },
    select: function () {

    },
    update: function () {
        

    }
};
game_state.gameover = function () {
};
game_state.gameover.prototype = {
    preload: function () {

       
    },
    create: function () {
       
    },
    click: function () {
    },
    update: function () {
    }
};
// Add and start the 'main' state to start the game
game.state.add('loading', game_state.loading);
game.state.add('mainmenu', game_state.mainmenu);
game.state.add('main', game_state.main);
game.state.add('gover', game_state.gameover);
game.state.start('main');