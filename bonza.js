// Initialize Phaser, and creates a 400x490px game
var game_width = 400;
var game_height = 600;
var tile_width = 100;
var game = new Phaser.Game(game_width, game_height, Phaser.CANVAS, 'game_div');
var game_state = {};
game_state.score = -1;
// Creates a new 'main' state that wil contain the game
var floor;
game_state.main = function() {};
game_state.main.prototype = {
    preload: function() {
        game.load.image("atari", "assets/play.png");

    },
    create: function() {
        // Fuction called after 'preload' to setup the game
        var atari = game.add.sprite(32, 100, 'atari');
        //  //  Enable input and allow for dragging
        atari.inputEnabled = true;
        atari.input.enableDrag();

    },
    select: function() {

    },
    render: function() {
        var color = '';
        for (j = 0; j <= game_height; j++)
            for (i = 0; i <= game_width; i++) {
                if (i % tile_width == 0 && j % tile_width == 0) {
                    console.log((i / tile_width) * (j / tile_width));
                    if (((i / tile_width) * (j / tile_width)) % 2 == 1) {
                        color = '#D5EDF5';
                    }
                    else {
                        color = '#B8E4F2';
                    } 
                    floor = new Phaser.Rectangle(i, j, tile_width, tile_width);
                    game.debug.geom(floor, color);
                }
            }

    }
};

// Add and start the 'main' state to start the game

game.state.add('main', game_state.main);
game.state.start('main');