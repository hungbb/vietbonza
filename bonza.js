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
        game.load.image("atari", "assets/pile.jpg");
        

    },
    sprites:[],
    addTextTile:function(x,y,text){
        var temps = game.add.sprite(x, y, 'atari');
        //atari.scale.setTo(0.5, 0.5);
        //  //  Enable input and allow for dragging
        temps.inputEnabled = true;
        temps.input.enableDrag();
        temps.events.onDragStart.add(this.onDragStart, this);
        temps.events.onDragStop.add(this.onDragStop, this);
        var t = game.add.text(14, 9, text, {
            font: "24px Comic Sans MS",
            fill: "#ffffff"
        });
        temps.addChild(t);
        return temps
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

        //this.sprites.push(this.addTextTile(100,100,"H"));
        //this.sprites.push(this.addTextTile(200,200,"X"));
        var obj=[];
        for(var i in test1){
            var j={
                "top":null,"left":null,"right":null,"bottom":null,
                "value":""
            };
            j.value= test1[i].value;
            //console.log(test1[i]);
            obj.push(j);
        }

        for(var i in obj){
            if(test1[i].top>=0) obj[i].top=obj[test1[i].top];
            if(test1[i].left>=0) obj[i].left=obj[test1[i].left];
            if(test1[i].right>=0) obj[i].right=obj[test1[i].right];
            if(test1[i].bottom>=0) obj[i].bottom=obj[test1[i].bottom];
        }
        console.log(obj);

        var i=obj[0];        
        this.renderTile(i,100,100);

    },
    renderTile:function(i,x,y){
        this.sprites.push(this.addTextTile(x,y,i.value));
        
            if(i.top!=null) this.renderTile(i.top,x,y-50);
            if(i.left!=null) this.renderTile(i.left,x-50,y);
            if(i.right!=null) this.renderTile(i.right,x+50,y);
            if(i.bottom!=null) this.renderTile(i.bottom,x,y+50);
        
    },
    onDragStart: function(sprite, pointer) {
        //result = "Dragging " + sprite.key;
    },
    onDragStop: function(sprite, pointer) {
        //result = sprite.key + " dropped at x:" + sprite.x + " y: " + sprite.y;
        sprite.x = Math.min(Math.max(sprite.x, 0), game_width - tile_width);
        sprite.y = Math.min(Math.max(sprite.y, 0), game_height - tile_width);

        var m = parseInt(sprite.x / tile_width) * tile_width;
        var n = parseInt(sprite.y / tile_width) * tile_width;
        var k = tile_width / 2;
        //result=sprite.x+":"+m+ " - "+ n + " = " +k;
        if (sprite.x >= m && sprite.x <= m + k)
            sprite.x = m;
        else
            sprite.x = m + tile_width;
        if (sprite.y >= n && sprite.y <= n + k)
            sprite.y = n;
        else
            sprite.y = n + tile_width;
    },
    render: function() {
        game.debug.text(result, 10, 20);
    }
};

// Add and start the 'main' state to start the game

game.state.add('main', game_state.main);
game.state.start('main');