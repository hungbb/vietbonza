// Initialize Phaser, and creates a 400x490px game

var game_height = 600;//window.innerHeight;
var game_width = 400;//window.innerWidth;
var tile_width = 50;
var game = new Phaser.Game(game_width, game_height, Phaser.CANVAS, 'game_div');
var game_state = {};
game_state.score = -1;
// Creates a new 'main' state that wil contain the game
var result = 'Drag a sprite';
game_state.mainmenu = function() {

};
game_state.mainmenu.prototype = {
    preload: function() {
        this.game.stage.backgroundColor = "#71c5cf";
        game.load.image("atari", "assets/pile.jpg");
        game_state.score = -1;

    },
    create: function() {
        var style = {
            font: "bold 40pt Arial",
            fill: "#ffffff",
            align: "center",
            stroke: "#258acc",
            strokeThickness: 8
        };
        this.label_score = this.game.add.text(50, 150, "Bonza", style);
        this.button = this.game.add.button(150, 300, 'atari', this.click, this);
    },
    click: function() {
        game.state.start('main');
    },
    update: function() {}
};
game_state.main = function() {};
game_state.main.prototype = {
    preload: function() {
        game.load.image("atari", "assets/pile.jpg");
    },
    listobj: [],
    allObj: [],
    numOfSolved: 0,
    quizanswer: [],
    addTextTile: function(x, y, text) {
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
    create: function() { // Fuction called after 'preload' to setup the game
        var graphics = game.add.graphics(0, 0);
        var color = 0xD5EDF5;
        for (j = 0; j <= game_height; j++) //render carreaux board
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
        this.allObj = [];
        this.listobj = [];
        this.quizanswer = [];
        this.numOfSolved = 0;
        for (var i in level1.obj) {
            this.allObj.push({
                "top": null,
                "left": null,
                "right": null,
                "bottom": null,
                "idx": level1.obj[i].idx,
                "value": level1.obj[i].value,
                isVisit: false,
                sprite: null,
                parent: null,
                "initX": level1.obj[i].initX,
                "initY": level1.obj[i].initY,
            });
        }
        for (var i in level1.answer) {
            this.quizanswer.push({
                "isSolved": false,
                "value": level1.answer[i].value
            });
        }
        for (var i in this.allObj) {
            if (level1.obj[i].top >= 0) this.allObj[i].top = this.allObj[level1.obj[i].top];
            if (level1.obj[i].left >= 0) this.allObj[i].left = this.allObj[level1.obj[i].left];
            if (level1.obj[i].right >= 0) this.allObj[i].right = this.allObj[level1.obj[i].right];
            if (level1.obj[i].bottom >= 0) this.allObj[i].bottom = this.allObj[level1.obj[i].bottom];
        }
        for (var i in this.allObj) {
            if (!this.allObj[i].isVisit) {
                this.listobj.push(this.allObj[i]);
                this.renderTile(this.allObj[i], this.allObj[i], this.allObj[i].initX, this.allObj[i].initY);
            }

        }
    },
    renderTile: function(p, i, x, y) { //Render a tile. p: parent, i: item to render, x,y: position.
        i.isVisit = true;
        i.parent = p;
        var spr = this.addTextTile(x, y, i.value);
        i.sprite = spr;
        i.sprite.cx = 0;
        i.sprite.cy = 0;
        spr.pointobj = i;
        if (i.top != null) this.renderTile(p, i.top, x, y - 50);
        if (i.bottom != null) this.renderTile(p, i.bottom, x, y + 50);
        if (i.left != null) this.renderTile(p, i.left, x - 50, y);
        if (i.right != null) this.renderTile(p, i.right, x + 50, y);
    },
    updateTilePosition: function(s, i, x, y) {
        if (i.sprite != s) {
            i.sprite.x += x;
            i.sprite.y += y;
        }
        if (i.top != null) this.updateTilePosition(s, i.top, x, y);
        if (i.bottom != null) this.updateTilePosition(s, i.bottom, x, y);
        if (i.left != null) this.updateTilePosition(s, i.left, x, y);
        if (i.right != null) this.updateTilePosition(s, i.right, x, y);
    },
    isCollapse: function(obj, x, y) {
        for (var i in this.allObj) {
            if (this.allObj[i].parent != obj.parent) {
                if (this.allObj[i].sprite.x == obj.sprite.x && this.allObj[i].sprite.y == obj.sprite.y)
                    return true;
            }
        }
        return false;
    },
    findItemByIndex: function(idx) {
        for (var i in this.allObj) {
            if (this.allObj[i].idx == idx) {
                return this.allObj[i];
            }
        }
        return null;
    },
    isExistIn: function(x, y) {
        for (var i in this.allObj) {
            if (this.allObj[i].sprite.x == x && this.allObj[i].sprite.y == y)
                return this.allObj[i];
        }
        return null;
    },
    isPieceCollapse: function(obj) {
        var result = this.isCollapse(obj, obj.sprite.x, obj.sprite.y)
        result = result || (obj.top != null ? this.isPieceCollapse(obj.top) : false);
        result = result || (obj.bottom != null ? this.isPieceCollapse(obj.bottom) : false);
        result = result || (obj.left != null ? this.isPieceCollapse(obj.left) : false);
        result = result || (obj.right != null ? this.isPieceCollapse(obj.right) : false);
        return result;
    },
    checkAnswerRight: function(start, answer) {
        for (i = 1; i <= answer.length - 1; i++) {
            var k = this.isExistIn(start.sprite.x + i * 50, start.sprite.y);
            if (k == null)
                return false;
            else
            if (k.idx != answer[i])
                return false;
        }
        return true;
    },
    checkAnswerDown: function(start, answer) {
        for (i = 1; i <= answer.length - 1; i++) {
            var k = this.isExistIn(start.sprite.x, start.sprite.y + i * 50);
            if (k == null)
                return false;
            else
            if (k.idx != answer[i])
                return false;
        }
        return true;
    },
    assignParent: function(parent, obj, tint) {
        obj.parent = parent;
        //obj.sprite.tint=tint;
        if (obj.top != null) this.assignParent(parent, obj.top);
        if (obj.bottom != null) this.assignParent(parent, obj.bottom);
        if (obj.left != null) this.assignParent(parent, obj.left);
        if (obj.right != null) this.assignParent(parent, obj.right);
    },
    combineAnswerRight: function(start, answer) {
        var newcolor = 0x71c5cf; //Math.random()*0xff0fff;
        start.sprite.tint = newcolor;
        for (i = 1; i <= answer.length - 1; i++) {
            var k = this.allObj[answer[i]];
            k.sprite.tint = newcolor;
            if (this.allObj[answer[i - 1]].right == null)
                this.allObj[answer[i - 1]].right = k;
            //k.parent=start;
            //if(k.parent!=start)
            ///assignParent(start,k);
        }
        this.assignParent(start.parent, start.parent, newcolor);
    },
    combineAnswerDown: function(start, answer) {
        var newcolor = 0x71c5cf; //Math.random()*0xff0fff;
        start.sprite.tint = newcolor;
        for (i = 1; i <= answer.length - 1; i++) {
            var k = this.allObj[answer[i]];
            k.sprite.tint = newcolor;
            if (this.allObj[answer[i - 1]].bottom == null)
                this.allObj[answer[i - 1]].bottom = k;
        }
        this.assignParent(start.parent, start.parent, newcolor);
    },
    onDragStart: function(sprite, pointer) {},
    onTap: function(sprite, pointer) {

        sprite.beforeMoveX = sprite.x;
        sprite.beforeMoveY = sprite.y;
        result = "tap " + sprite.x + " " + sprite.y;
        sprite.cx = sprite.x;
        sprite.cy = sprite.y;
    },
    onDragUpdate: function(sprite, pointer, dragX, dragY, snapPoint) {
        this.updateTilePosition(sprite, sprite.pointobj.parent, parseInt(sprite.x - sprite.cx), parseInt(sprite.y - sprite.cy));
        sprite.cx = sprite.x;
        sprite.cy = sprite.y;
    },
    onDragStop: function(sprite, pointer) { //Reposition to right place.
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
        this.updateTilePosition(sprite, sprite.pointobj.parent, parseInt(sprite.x - sprite.cx), parseInt(sprite.y - sprite.cy));
        sprite.cx = sprite.x;
        sprite.cy = sprite.y;
        if (this.isPieceCollapse(sprite.pointobj.parent)) { //Check collapse
            sprite.x = sprite.beforeMoveX;
            sprite.y = sprite.beforeMoveY;
            this.updateTilePosition(sprite, sprite.pointobj.parent, parseInt(sprite.x - sprite.cx), parseInt(sprite.y - sprite.cy));
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
        if (this.numOfSolved >= this.quizanswer.length)
            setTimeout(function() {
                game.state.start('mainmenu');
            }, 1000);

    },
    render: function() {
        game.debug.text(result, 10, 20);
    }
};
// Add and start the 'main' state to start the game
game.state.add('main', game_state.main);
game.state.add('mainmenu', game_state.mainmenu);
game.state.start('main');