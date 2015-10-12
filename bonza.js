// Initialize Phaser, and creates a 400x490px game
var game_width = 400;
var game_height = 600;
var tile_width = 50;
var game = new Phaser.Game(game_width, game_height, Phaser.CANVAS, 'game_div');
var game_state = {};
game_state.score = -1;
// Creates a new 'main' state that wil contain the game
var result = 'Drag a sprite';
game_state.main = function () {
};
game_state.main.prototype = {
    preload: function () {
        game.load.image("atari", "assets/pile.jpg");
    },
    listobj: [],
    allObj:[],
    addTextTile: function (x, y, text) {
        var temps = game.add.sprite(x, y, 'atari');
        //atari.scale.setTo(0.5, 0.5);
        //  Enable input and allow for dragging
        temps.inputEnabled = true;
        temps.input.enableDrag();
        temps.events.onDragStart.add(this.onDragStart, this);
        temps.events.onDragUpdate.add(this.onDragUpdate, this);     
        temps.events.onInputDown.add(this.onTap, this); 
        temps.events.onDragStop.add(this.onDragStop, this);
        var t = game.add.text(14, 9, text, {
            font: "24px Comic Sans MS",
            fill: "#ffffff"
        });
        temps.addChild(t);
        return temps
    },
    create: function () {// Fuction called after 'preload' to setup the game
        var graphics = game.add.graphics(0, 0);
        var color = 0xD5EDF5;        
        for (j = 0; j <= game_height; j++)//render carreaux board
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
        //var obj = [];
        for (var i in test1) {
            this.allObj.push({"top": null, "left": null, "right": null, "bottom": null,
                "value": test1[i].value,isVisit:false,sprite:null,parent:null,
                "initX":test1[i].initX,"initY":test1[i].initY,
            });
        }
        for (var i in this.allObj) {
            if (test1[i].top >= 0) this.allObj[i].top = this.allObj[test1[i].top];
            if (test1[i].left >= 0) this.allObj[i].left = this.allObj[test1[i].left];
            if (test1[i].right >= 0) this.allObj[i].right = this.allObj[test1[i].right];
            if (test1[i].bottom >= 0) this.allObj[i].bottom = this.allObj[test1[i].bottom];
        }
        for( var i in this.allObj){
            if(!this.allObj[i].isVisit){
                this.listobj.push(this.allObj[i]);
                this.renderTile(this.allObj[i],this.allObj[i],this.allObj[i].initX,this.allObj[i].initY);
            }

        }
    },
    renderTile: function (p,i, x, y) {//Render a tile. p: parent, i: item to render, x,y: position.
        i.isVisit=true;
        i.parent=p;
        var spr=this.addTextTile(x, y, i.value);
        i.sprite=spr;
        i.sprite.cx=0;
        i.sprite.cy=0;
        spr.pointobj=i;
        if (i.top != null)    this.renderTile(p,i.top, x , y-50);
        if (i.bottom != null) this.renderTile(p,i.bottom, x, y+50);
        if (i.left != null) this.renderTile(p,i.left, x-50, y);
        if (i.right != null) this.renderTile(p,i.right, x+50, y);
    },
    updateTilePosition:function(s,i,x,y){    
        if(i.sprite!=s){
             i.sprite.x += x;
             i.sprite.y += y;
        }      
        if (i.top != null)   this.updateTilePosition(s,i.top,x , y);
        if (i.bottom != null) this.updateTilePosition(s,i.bottom,x, y);
        if (i.left != null) this.updateTilePosition(s,i.left, x, y);
        if (i.right != null) this.updateTilePosition(s,i.right, x, y);
    },
    isCollapse: function(obj,x,y){
        for(var i in this.allObj){
            if(this.allObj[i].parent!=obj.parent){
                if(this.allObj[i].sprite.x==obj.sprite.x && this.allObj[i].sprite.y==obj.sprite.y )
                    return true;
            }
        }
        return false;
    },
    isPieceCollapse:function(obj){
        var result=this.isCollapse(obj,obj.sprite.x,obj.sprite.y) 
        result=result || (obj.top!=null? this.isPieceCollapse(obj.top) : false);
        result=result || (obj.bottom!=null? this.isPieceCollapse(obj.bottom) : false);
        result=result || (obj.left!=null? this.isPieceCollapse(obj.left) : false);
        result=result || (obj.right!=null? this.isPieceCollapse(obj.right) : false);
        return result;
    },
    onDragStart: function (sprite, pointer) {},
    onTap: function (sprite, pointer) {
        
        sprite.beforeMoveX=sprite.x;
        sprite.beforeMoveY=sprite.y;
        result="tap "+ sprite.x + " " +sprite.y;  
        sprite.cx=sprite.x;
        sprite.cy=sprite.y;
    },
    onDragUpdate: function(sprite, pointer, dragX, dragY, snapPoint) {
        this.updateTilePosition(sprite,sprite.pointobj.parent,parseInt(sprite.x-sprite.cx),parseInt(sprite.y-sprite.cy));
        sprite.cx=sprite.x;
        sprite.cy=sprite.y;
    },
    onDragStop: function (sprite, pointer) {
        sprite.cx=sprite.x;
        sprite.cy=sprite.y;       
        sprite.x = Math.min(Math.max(sprite.x, 0), game_width - tile_width);
        sprite.y = Math.min(Math.max(sprite.y, 0), game_height - tile_width);
        var m = parseInt(sprite.x / tile_width) * tile_width;
        var n = parseInt(sprite.y / tile_width) * tile_width;
        var k = tile_width / 2;
        if (sprite.x >= m && sprite.x <= m + k)
            sprite.x = m;
        else
            sprite.x = m + tile_width;
        if (sprite.y >= n && sprite.y <= n + k)
            sprite.y = n;
        else
            sprite.y = n + tile_width;                
        this.updateTilePosition(sprite,sprite.pointobj.parent,parseInt(sprite.x-sprite.cx),parseInt(sprite.y-sprite.cy));
        sprite.cx=sprite.x;
        sprite.cy=sprite.y;  
        if(this.isPieceCollapse(sprite.pointobj.parent)){
            sprite.x=sprite.beforeMoveX;
            sprite.y=sprite.beforeMoveY;
            this.updateTilePosition(sprite,sprite.pointobj.parent,parseInt(sprite.x-sprite.cx),parseInt(sprite.y-sprite.cy));
        }
    },
    render: function () {
        game.debug.text(result, 10, 20);
    }
};
// Add and start the 'main' state to start the game
game.state.add('main', game_state.main);
game.state.start('main');