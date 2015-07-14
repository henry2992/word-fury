/**
 This file is part of WordFury.

    WordFury is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    WordFury is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with WordFury.  If not, see <http://www.gnu.org/licenses/>.
    */
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
    WordFury._wordCount = 0;
    WordFury._spawnedWordCount = 0;
};
WordFury.Game.prototype = {
    create: function(){
        // start the physics engine
        this.physics.startSystem(Phaser.Physics.ARCADE);
        //this.physics.arcade.gravity.y = 1;
        WordFury.MUSIC.play('', 0, 1, true);

        WordFury.MUSIC.onLoop.add(this.playLevelMusic, this);
        // set background
        var background;
        if (WordFury._background==1){
            background= this.add.sprite(0, 0, '1bg');     
            background = this.add.tileSprite(0, 0, 640, 960, '1bg');
            background.autoScroll(-200, 0);
        } else if (WordFury._background==2){ 
            background= this.add.sprite(0,0,'wildwestBackground');
            background = this.add.tileSprite(0, 0, 640, 960, 'wildwestBackground');
        }
        else if (WordFury._background==3){ 
            background= this.add.sprite(0,0,'1bg');
            background = this.add.tileSprite(0, 0, 640, 960, '1bg');
        }
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

        this._wordGroup.forEachAlive(function(wordSprite){
            var word = wordSprite.getChildAt(0);
            if(enteredWord.trim() == word.text.trim()) {
                WordFury.Gunshot.play();
                WordFury._wordCount ++;
                game.updateScore();
                wordSprite.kill();
                WordFury._spawnedWordCount += 1;
            }
        });
    },
    playLevelMusic:function(){
            WordFury.MUSIC.play('', 0, 1, true);


        },
    
    updateScore: function() {
        WordFury._score += 10;
        WordFury._scoreText.text = 'Score: ' + WordFury._score;

    },
    update: function(){
        // update the timer
        this._spawnWordTimer += this.time.elapsed;
      
        // check to see if we should spawn another word
        if(this._spawnWordTimer > (2000-(WordFury._wordCount*10))) {
            // reset the timer
            this._spawnWordTimer = 0;
            // spawn a word
            WordFury.item.spawnWord(this);
        }

        if (WordFury._spawnedWordCount == 280){//after 280 of the 300 words have spawned call win game
            this.state.states['GameWin']._score=WordFury._score;
                this.state.start('GameWin');
        }

        if (WordFury._score <0){
            this.state.states['GameOver']._score=WordFury._score;
            this.state.start('GameOver' );
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
        this.removeWord(word.text);
        word.anchor.setTo(0.5);        
        var wordSprite = game.add.sprite(game.rnd.realInRange(100, WordFury.GAME_WIDTH-100), game.world.topY, null);
        wordSprite.addChild(word);
        game.physics.enable(wordSprite);
        wordSprite.anchor.setTo(0.5, 0.5);
        //wordSprite.body.velocity.setTo(0, 100+WordFury._wordCount*2);
        wordSprite.body.velocity.setTo(0, 20+WordFury._wordCount*2);
        var rand = game.rnd.realInRange(0, 100);
        if(rand > 50) {
            wordSprite.body.angularVelocity = 50;
        }
        else {
            wordSprite.body.angularVelocity = -50;
        }
        wordSprite.checkWorldBounds = true;
        wordSprite.events.onOutOfBounds.add(this.loseLife,this);
        game._wordGroup.add(wordSprite);
    },
    removeWord: function(word){
        var index = WordFury._wordList.indexOf(word);
        if(index > -1) {
            WordFury._wordList.splice(index, 1);
        }
    },
    loseLife: function(word){
        WordFury._score -=10;
        word.kill();
        WordFury._spawnedWordCount += 1;
        WordFury._scoreText.text = 'Score: ' + WordFury._score;
        
    }
};

 /**
 This file is part of WordFury.

    WordFury is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    WordFury is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with WordFury.  If not, see <http://www.gnu.org/licenses/>.
    */