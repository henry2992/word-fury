WordFury.Game = function(game){
    // define variables just for WordFury.Game   
    this._entry = null;
    this._spawnWordTimer = 0;
    this._wordGroup = null;
    // define variables that can be in WordFury.item
    WordFury._scoreText = null;
    WordFury._score = 0;
    WordFury._wordList = null;
    WordFury._fontStyle = null;
};
WordFury.Game.prototype = {
    create: function(){
        // start the physics engine
        this.physics.startSystem(Phaser.Physics.ARCADE);
        //this.physics.arcade.gravity.y = 1;
        // set background
        var background = this.add.sprite(0, 0, 'preloaderBackground');
        background = this.add.tileSprite(0, 0, 640, 960, 'preloaderBackground');
        background.autoScroll(-200, 0);
        // load the wordList
        WordFury._wordList = this.cache.getJSON('wordList');
        // create the textBox
        var textInputCanvas = document.getElementById('canvas');
        // textInputCanvas.style.top = this.world.botY + 100 + 'px';
        // textInputCanvas.style.left = this.stage.offset.x * 1.5 - 150 + 'px';
        textInputCanvas.style.top = 90 + "%";
        textInputCanvas.style.left = 40 + "%";
        textInputCanvas.style.width = 40 + "%";
        textInputCanvas.style.height = 15 + "%";
        
        this._entry = new CanvasInput({
            canvas: document.getElementById('canvas'),
            fontSize: 18,
            fontFamily: 'Arial',
            fontColor: '#212121',
            fontWeight: 'bold',
            width: this.width / window.innerWidth,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 3,
            boxShadow: '1px 1px 0px #fff',
            innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            placeHolder: 'Enter word here...'
        });
        this._entry.focus();
        var that = this;
        this._entry.onsubmit(
            function() {
                that.wordSubmit(that);
            }
        );
        // set font style
        WordFury._fontStyle = { font: "32px Arial", fill: "#ff0044", align: "center" };
        // initialize spawn timer
        this._spawnWordTimer = 0;
        // initialize score text with value 0
        WordFury._scoreText = this.add.text(this.world.leftX, 700, 'Score: 0', WordFury._fontStyle);            
        // create new group for words
        this._wordGroup = this.add.group();
        // spawn first word
        WordFury.item.spawnWord(this);
    },
    wordSubmit: function(game){
        this.checkValue(game);
    },
    checkValue: function(game){
        var enteredWord = this._entry.value();
        this._entry.value("");

        this._wordGroup.forEach(function(wordSprite){
            var word = wordSprite.getChildAt(0);
            if(enteredWord.trim() == word.text.trim()) {
                game.removeWord(word.text)
                game.updateScore();
                wordSprite.destroy(true);
            }
        });
    },
    removeWord: function(word){
        var index = WordFury._wordList.indexOf(word);
        if(index > -1) {
            WordFury._wordList.splice(index, 1);
        }
    },
    updateScore: function() {
        WordFury._score += 10;
        WordFury._scoreText.text = 'Score: ' + WordFury._score;
    },
    update: function(){
        // update the timer
        this._spawnWordTimer += this.time.elapsed;
        // check to see if we should spawn another word
        if(this._spawnWordTimer > 1000) {
            // reset the timer
            this._spawnWordTimer = 0;
            // spawn a word
            WordFury.item.spawnWord(this);
        }
    },
    quitGame: function (pointer) {
        WordFury.MUSIC.stop();
        WordFury._score = 0;
        // need to figure out how to hide textbox again.
        this.state.start('MainMenu');
    }
};

WordFury.item = {
    spawnWord: function(game){
        var word = game.add.text(0, 0, game.rnd.pick(WordFury._wordList), WordFury._fontStyle);
        word.anchor.setTo(0.5);        
        var wordSprite = game.add.sprite(game.rnd.realInRange(100, WordFury.GAME_WIDTH-100), game.world.topY, null);
        wordSprite.addChild(word);

        game.physics.enable(wordSprite);
        wordSprite.anchor.setTo(0.5, 0.5);
        wordSprite.body.velocity.setTo(0, 100);
        var rand = game.rnd.realInRange(0, 100);
        if(rand > 50) {
            wordSprite.body.angularVelocity = 50;
        }
        else {
            wordSprite.body.angularVelocity = -50;
        }
        wordSprite.checkWorldBounds = true;
        //wordSprite.events.onOutOfBounds.add(this.loseLife, this);
        game._wordGroup.add(wordSprite);
    },
};