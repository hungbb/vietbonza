// Initialize Phaser, and creates a 400x490px game
var game_width = 400;
var game_height = 600;
var tile_width = 50;
var game = new Phaser.Game(game_width, game_height, Phaser.CANVAS, 'game_div');
var game_state = {};
game_state.score = -1;
// Creates a new 'main' state that wil contain the game
var result = 'Drag a sprite';
game_state.main = function() {};
game_state.main.prototype = {
    preload: function() {
        game.load.image("atari", "assets/play.png");

    },
    create: function() {
        // Fuction called after 'preload' to setup the game

        var graphics = game.add.graphics(0, 0);
        var color = 0xD5EDF5;
        //render carreaux board
        for (j = 0; j <= game_height; j++)
            for (i = 0; i <= game_width; i++) {
                if (i % tile_width == 0 && j % tile_width == 0) {

                    if (((i / tile_width) + (j / tile_width)) % 2 == 1) {
                        color = 0xD5EDF5;
                    } else {
                        color = 0xB8E4F2;
                    }
                    graphics.beginFill(color);
                    graphics.drawRect(i, j, tile_width, tile_width);
                    graphics.endFill();
                }
            }
        window.graphics = graphics;


        var atari = game.add.sprite(32, 100, 'atari');
        atari.scale.setTo(0.5, 0.5);
        //  //  Enable input and allow for dragging
        atari.inputEnabled = true;
        atari.input.enableDrag();
        atari.events.onDragStart.add(this.onDragStart, this);
        atari.events.onDragStop.add(this.onDragStop, this);


    },
    onDragStart: function(sprite, pointer) {
        result = "Dragging " + sprite.key;
    },
    onDragStop: function(sprite, pointer) {
        //result = sprite.key + " dropped at x:" + sprite.x + " y: " + sprite.y;
        sprite.x=Math.min(Math.max(sprite.x,0),game_width-tile_width);
        sprite.y=Math.min(Math.max(sprite.y,0),game_height-tile_width);

        var m=parseInt(sprite.x/tile_width)*tile_width;
        var n=parseInt(sprite.y/tile_width)*tile_width;
        var k=tile_width/2;
        result=sprite.x+":"+m+ " - "+ n + " = " +k;
        if(sprite.x>=m && sprite.x<=m+k) 
            sprite.x=m;
        else
            sprite.x=m+tile_width;
        if(sprite.y>=n && sprite.y<=n+k) 
            sprite.y=n;
        else
            sprite.y=n+tile_width;
    },
    render: function() {
        game.debug.text(result, 10, 20);
    }
};

// Add and start the 'main' state to start the game

game.state.add('main', game_state.main);
game.state.start('main');