BasicGame.Game = function (game) {  
    this.word2 = null;
    this.wordSprite = null;
    this.wordList;
    this.entry = null;
};

BasicGame.Game.prototype = {

    create: function () {
        this.wordList = ['St. Peter', 'car', 'steve', 'ban', 'oats', 'brian', 'chris', 'mike', '1234', '#wordFury'];
        var textInputCanvas = document.getElementById('canvas');
        textInputCanvas.style.top = 700 + 'px';
        textInputCanvas.style.left = this.world.centerX - textInputCanvas.width/2 + 'px';

        this.entry = new CanvasInput({
            canvas: document.getElementById('canvas'),
            //canvas: document.getElementById(this.game.canvas.id);
            fontSize: 18,
            fontFamily: 'Arial',
            fontColor: '#212121',
            fontWeight: 'bold',
            width: 300,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 3,
            boxShadow: '1px 1px 0px #fff',
            innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            placeHolder: 'Enter message here...'
        });
        this.entry.focus();

        var that = this;
        this.entry.onsubmit(
            function() {
                that.wordSubmit();
            }
        );
        

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //this.word2 = this.game.add.bitmapText(this.world.centerX, this.world.topY, 'stack', 'apple', 64);        

        this.word2 = this.game.add.text(0, 0, this.rnd.pick(this.wordList), {
            font: "32px Arial",
            fill: "#ff0044",
            align: "center"
        });

        this.word2.anchor.setTo(0.5, 0.5);
        //this.word2.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        this.wordSprite = this.add.sprite(this.world.centerX, this.world.topY, null);
        this.wordSprite.addChild(this.word2);

        this.game.physics.enable(this.wordSprite);
        this.wordSprite.body.velocity.setTo(0, 100);
    },

    wordSubmit: function () {
        this.checkValue();
    },

    checkValue: function() {
        var word = this.entry.value();

        this.entry.value("");
        if(word.trim() == this.word2.text.trim()) {
            this.removeWord(word);
            this.wordSprite.destroy();
            this.word2 = this.game.add.text(0, 0, this.rnd.pick(this.wordList), {
            font: "32px Arial",
            fill: "#ff0044",
            align: "center"
        });
        this.word2.anchor.setTo(0.5);        
        this.wordSprite = this.add.sprite(this.rnd.realInRange(100, this.world.width-100), this.world.topY, null);
        this.wordSprite.addChild(this.word2);

        this.game.physics.enable(this.wordSprite);
        this.wordSprite.anchor.setTo(0.5, 0.5);
        this.wordSprite.body.velocity.setTo(0, 100);
        this.wordSprite.body.angularVelocity = 50;
        }
    },

    removeWord: function(word) {
        var index = this.wordList.indexOf(word);
        if(index > -1) {
            this.wordList.splice(index, 1);
        }
    },

    update: function () {
        
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};

