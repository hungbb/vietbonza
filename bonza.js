// Initialize Phaser, and creates a 400x490px game
var boardSizeWidth = 8, boardSizeheight= 13;
var game_height = window.innerHeight;//parseInt(window.innerHeight/50)*50;
var game_width =  window.innerWidth;//parseInt(window.innerWidth/50)*50;//window.innerWidth;
var tile_width = 30;//game_width/boardSizeWidth;
var game = new Phaser.Game(game_width, game_height, Phaser.CANVAS, 'game_div');
var game_state = {};
game_state.score = 0;
// Creates a new 'main' state that wil contain the game
var result = 'Clue:'; //- Width:' + game_width+ ' , Height:'+ game_height +' , Tile: ' + tile_width;
game_state.mainmenu = function () {

}
;
game_state.mainmenu.prototype = {
    preload: function () {
        this.game.stage.backgroundColor = "#71c5cf";
        game.load.image("atari", "assets/pile.jpg");
        game.load.image("playbtn", "assets/play.png");
        game.load.image("infobtn", "assets/info.png");
        game.load.image("block", "assets/pipe.png");
        game_state.score = 0;
    },
    drawTextByTile:function(x,y,size,text){
        var temps = game.add.sprite(x, y, 'atari');
        temps.scale.setTo(size/50, size/50);
        var t = game.add.text(14, 9, text, {
            font: "24px Comic Sans MS",
            fill: "#ffffff"
        });
        temps.addChild(t);
        return temps
    },
    renderBoard:function(size){
        var graphics = game.add.graphics(0, 0);
        var color = 0xD5EDF5;
        for (j = 0; j <= parseInt(game_height/size) * size; j++) //render carreaux board
            for (i = 0; i <= parseInt(game_width/size) * size; i++) {
                //for (j = 0; j <= game_height; j++) //render carreaux board
                //  for (i = 0; i <= game_width; i++) {
                if (i % size == 0 && j % size == 0) {

                    if (((i / size) + (j / size)) % 2 == 1) {
                        color = 0xD5EDF0;
                    } else {
                        color = 0xB8E4F0;
                    }
                    graphics.beginFill(color);
                    graphics.drawRect(i, j, size, size);
                    graphics.endFill();
                }
            }
        window.graphics = graphics;
    },
    create: function () {
        var style = {
            font: "bold 40pt Arial",
            fill: "#ffffff",
            align: "center",
            stroke: "#258acc",
            strokeThickness: 8
        };
        var size=40;
        this.renderBoard(40);
        //this.label_score = this.game.add.text(50, 150, "Bonza", style);
        var title1="PUZ";
        var title2="ZAA";
        for(var i in title1){
            this.drawTextByTile(40+(size+1)*i,size*2,size,title1[i]);
        }
        for(var i in title2){
            this.drawTextByTile(40+size*2+(size+1)*i,size*3+1,size,title2[i]);
        }
        this.button = this.game.add.button(size, size*7, 'playbtn', this.click, this);
        this.infobutton = this.game.add.button(size*4, size*7, 'infobtn', this.click, this);
    },
    click: function () {
        game.state.start('main');
    },
    update: function () {
    }
};
game_state.main = function () {
};
game_state.main.prototype = {
    preload: function () {
        this.game.stage.backgroundColor = "#71c5cf";
        game.load.image("atari", "assets/pile.jpg");
    },
    listobj: [],
    allObj: [],
    numOfSolved: 0,
    quizanswer: [],
    addTextTile: function (x, y, text) {
        var temps = game.add.sprite(x, y, 'atari');
        temps.scale.setTo(tile_width/50, tile_width/50);
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
    create: function () { // Fuction called after 'preload' to setup the game
        var graphics = game.add.graphics(0, 0);
        var color = 0xD5EDF5;
        for (j = 0; j <= parseInt(game_height/tile_width-1) * tile_width; j++) //render carreaux board
            for (i = 0; i <= parseInt(game_width/tile_width-1) * tile_width; i++) {
        //for (j = 0; j <= game_height; j++) //render carreaux board
          //  for (i = 0; i <= game_width; i++) {
                if (i % tile_width == 0 && j % tile_width == 0) {

                    if (((i / tile_width) + (j / tile_width)) % 2 == 1) {
                        color = 0xD5EDF0;
                    } else {
                        color = 0xB8E4F0;
                    }
                    graphics.beginFill(color);
                    graphics.drawRect(i, j, tile_width, tile_width);
                    graphics.endFill();
                }
            }
        window.graphics = graphics;
        //var obj = [];
        this.allObj = [];
        this.listobj = [];
        this.quizanswer = [];
        this.numOfSolved = 0;

        var level=alllevel[game_state.score];
        result='Clue: '+level.clue;
        for (var i in level.obj) {
            this.allObj.push({
                "top": null,
                "left": null,
                "right": null,
                "bottom": null,
                "idx": level.obj[i].idx,
                "value": level.obj[i].value,
                isVisit: false,
                sprite: null,
                parent: null,
                "initX": level.obj[i].initX*tile_width/50,
                "initY": level.obj[i].initY*tile_width/50
            });
        }
        for (var i in level.answer) {
            this.quizanswer.push({
                "isSolved": false,
                "value": level.answer[i].value
            });
        }
        for (var i in this.allObj) {
            if (level.obj[i].top >= 0) this.allObj[i].top = this.allObj[level.obj[i].top];
            if (level.obj[i].left >= 0) this.allObj[i].left = this.allObj[level.obj[i].left];
            if (level.obj[i].right >= 0) this.allObj[i].right = this.allObj[level.obj[i].right];
            if (level.obj[i].bottom >= 0) this.allObj[i].bottom = this.allObj[level.obj[i].bottom];
        }
        for (var i in this.allObj) {
            if (!this.allObj[i].isVisit) {
                this.listobj.push(this.allObj[i]);
                this.renderTile(this.allObj[i], this.allObj[i], this.allObj[i].initX, this.allObj[i].initY);
            }

        }
    },
    renderTile: function (p, i, x, y) { //Render a tile. p: parent, i: item to render, x,y: position.
        i.isVisit = true;
        i.parent = p;
        var spr = this.addTextTile(x, y, i.value);
        i.sprite = spr;
        i.sprite.cx = 0;
        i.sprite.cy = 0;
        spr.pointobj = i;
        if (i.top != null) this.renderTile(p, i.top, x, y - tile_width);
        if (i.bottom != null) this.renderTile(p, i.bottom, x, y + tile_width);
        if (i.left != null) this.renderTile(p, i.left, x - tile_width, y);
        if (i.right != null) this.renderTile(p, i.right, x + tile_width, y);
    },
    updateTilePositionTest: function (i, x, y) {
        i.sprite.x = x;
        i.sprite.y = y;

        if (i.top != null) this.updateTilePositionTest( i.top, x, y-tile_width);
        if (i.bottom != null) this.updateTilePositionTest(i.bottom, x, y+tile_width);
        if (i.left != null) this.updateTilePositionTest(i.left, x-tile_width, y);
        if (i.right != null) this.updateTilePositionTest( i.right, x+tile_width, y);
    },
    updateTilePosition: function (s, i, x, y) {
        if (i.sprite != s) {
            i.sprite.x += x;
            i.sprite.y += y;
        }
        else console.log(x+ " " +y);
        if (i.top != null) this.updateTilePosition(s, i.top, x, y);
        if (i.bottom != null) this.updateTilePosition(s, i.bottom, x, y);
        if (i.left != null) this.updateTilePosition(s, i.left, x, y);
        if (i.right != null) this.updateTilePosition(s, i.right, x, y);
    },
    isCollapse: function (obj, x, y) {
        for (var i in this.allObj) {
            if (this.allObj[i].parent != obj.parent) {
                if (this.allObj[i].sprite.x == obj.sprite.x && this.allObj[i].sprite.y == obj.sprite.y)
                    return true;
            }
        }
        return false;
    },
    findItemByIndex: function (idx) {
        for (var i in this.allObj) {
            if (this.allObj[i].idx == idx) {
                return this.allObj[i];
            }
        }
        return null;
    },
    isExistIn: function (x, y) {
        for (var i in this.allObj) {
            if (this.allObj[i].sprite.x == x && this.allObj[i].sprite.y == y)
                return this.allObj[i];
        }
        return null;
    },
    isPieceCollapse: function (obj) {
        var result = this.isCollapse(obj, obj.sprite.x, obj.sprite.y)
        result = result || (obj.top != null ? this.isPieceCollapse(obj.top) : false);
        result = result || (obj.bottom != null ? this.isPieceCollapse(obj.bottom) : false);
        result = result || (obj.left != null ? this.isPieceCollapse(obj.left) : false);
        result = result || (obj.right != null ? this.isPieceCollapse(obj.right) : false);
        return result;
    },
    checkAnswerRight: function (start, answer) {
        for (i = 1; i <= answer.length - 1; i++) {
            var k = this.isExistIn(start.sprite.x + i * tile_width, start.sprite.y);
            if (k == null)
                return false;
            else if (k.idx != answer[i])
                return false;
        }
        return true;
    },
    checkAnswerDown: function (start, answer) {
        for (i = 1; i <= answer.length - 1; i++) {
            var k = this.isExistIn(start.sprite.x, start.sprite.y + i * tile_width);
            if (k == null)
                return false;
            else if (k.idx != answer[i])
                return false;
        }
        return true;
    },
    reverseRoute: function (i, dest) {
        if (i != dest) {
            if (i.top != null && (!this.isReach)) {
                this.reverseRoute(i.top, dest);
                if (this.isReach) {
                    i.top.bottom = i;
                    i.top = null;
                }

            }
            if (i.bottom != null && (!this.isReach)) {
                this.reverseRoute(i.bottom, dest);
                if (this.isReach) {
                    i.bottom.top = i;
                    i.bottom = null;
                    //dest=i;
                }
            }
            if (i.right != null && (!this.isReach)) {
                this.reverseRoute(i.right, dest);
                if (this.isReach) {
                    i.right.left = i;
                    i.right = null;

                }
            }
            if (i.left != null && (!this.isReach)) {
                this.reverseRoute(i.left, dest);
                if (this.isReach) {
                    i.left.right = i;
                    i.left = null;
                    //dest=i;
                }
            }
        }
        else
            this.isReach = true;
    },
    isReach: false,
    changeTreeParent: function (parent, dest) {
        this.isReach = false;
        this.reverseRoute(parent, dest, this.isReach);
        this.assignParent(dest, dest, null);
    },
    assignParent: function (parent, obj, tint) {
        obj.parent = parent;
        //obj.sprite.tint=tint;
        if (obj.top != null) this.assignParent(parent, obj.top);
        if (obj.bottom != null) this.assignParent(parent, obj.bottom);
        if (obj.left != null) this.assignParent(parent, obj.left);
        if (obj.right != null) this.assignParent(parent, obj.right);
    },
    combineAnswerRight: function (start, answer) {
        var newcolor = 0x71c5cf; //Math.random()*0xff0fff;
        start.sprite.tint = newcolor;
        for (i = 1; i <= answer.length - 1; i++) {
            var k = this.allObj[answer[i]];

            k.sprite.tint = newcolor;
            if (this.allObj[answer[i - 1]].right == null && k.left != this.allObj[answer[i - 1]]) {
                this.allObj[answer[i - 1]].right = k;
                if (k != k.parent)
                    this.changeTreeParent(k.parent, k, null);
            }
            //k.parent=start;
            //if(k.parent!=start)
            ///assignParent(start,k);
        }

        this.assignParent(start.parent, start.parent, newcolor);
        console.log(this.allObj[8]);
    },
    combineAnswerDown: function (start, answer) {
        var newcolor = 0x71c5cf; //Math.random()*0xff0fff;
        start.sprite.tint = newcolor;
        for (i = 1; i <= answer.length - 1; i++) {
            var k = this.allObj[answer[i]];
            k.sprite.tint = newcolor;
            if (this.allObj[answer[i - 1]].bottom == null && k.top != this.allObj[answer[i - 1]]) {
                this.allObj[answer[i - 1]].bottom = k;
                if (k != k.parent)
                    this.changeTreeParent(k.parent, k, null);
            }

        }
        this.assignParent(start.parent, start.parent, newcolor);
    },
    onDragStart: function (sprite, pointer) {
    },
    onTap: function (sprite, pointer) {

        sprite.beforeMoveX = sprite.x;
        sprite.beforeMoveY = sprite.y;
        //result = "tap " + sprite.x + " " + sprite.y;
        sprite.cx = sprite.x;
        sprite.cy = sprite.y;
        //console.log(this.allObj);
        //console.log(this.allObj[7]);
    },
    onDragUpdate: function (sprite, pointer, dragX, dragY, snapPoint) {
        //result=parseInt(sprite.x - sprite.cx) + " " + parseInt(sprite.y - sprite.cy);
        //this.updateTilePosition(sprite, sprite.pointobj.parent, parseInt(sprite.x - sprite.cx), parseInt(sprite.y - sprite.cy));
        this.changeTreeParent(sprite.pointobj.parent,sprite.pointobj);
        this.updateTilePositionTest(sprite.pointobj, sprite.x, sprite.y);
        sprite.cx = sprite.x;
        sprite.cy = sprite.y;
    },
    onDragStop: function (sprite, pointer) { //Reposition to right place.
        sprite.cx = sprite.x;
        sprite.cy = sprite.y;
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
        //this.updateTilePosition(sprite, sprite.pointobj.parent, parseInt(sprite.x - sprite.cx), parseInt(sprite.y - sprite.cy));
        this.changeTreeParent(sprite.pointobj.parent,sprite.pointobj);
        this.updateTilePositionTest(sprite.pointobj, sprite.x, sprite.y);
        sprite.cx = sprite.x;
        sprite.cy = sprite.y;
        if (this.isPieceCollapse(sprite.pointobj.parent)) { //Check collapse
            sprite.x = sprite.beforeMoveX;
            sprite.y = sprite.beforeMoveY;
            this.changeTreeParent(sprite.pointobj.parent,sprite.pointobj);
            this.updateTilePositionTest(sprite.pointobj, sprite.x, sprite.y);
            //this.updateTilePosition(sprite, sprite.pointobj.parent, parseInt(sprite.x - sprite.cx), parseInt(sprite.y - sprite.cy));
        }


        for (var i in this.quizanswer) {
            if (!this.quizanswer[i].isSolved) {
                var _1stitem = this.allObj[this.quizanswer[i].value[0]];
                if (this.checkAnswerRight(_1stitem, this.quizanswer[i].value)) {
                    this.quizanswer[i].isSolved = true;
                    this.combineAnswerRight(_1stitem, this.quizanswer[i].value);
                }
                if (this.checkAnswerDown(_1stitem, this.quizanswer[i].value)) {
                    this.quizanswer[i].isSolved = true;
                    this.combineAnswerDown(_1stitem, this.quizanswer[i].value);
                }
                if (this.quizanswer[i].isSolved)
                    this.numOfSolved++;
            }

        }

        if (this.numOfSolved >= this.quizanswer.length) {
            result = "Success";
            game_state.score++;
            setTimeout(function () {
                if (game_state.score >= alllevel.length){
                    game.state.start('mainmenu');
                }
                else
                    game.state.start('main');
            }, 1000);
        }

    },
    render: function () {
        game.debug.text(result, 10, 20);
    }
};
// Add and start the 'main' state to start the game
game.state.add('main', game_state.main);
game.state.add('mainmenu', game_state.mainmenu);
game.state.start('mainmenu');