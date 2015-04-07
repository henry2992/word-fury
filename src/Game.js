BasicGame.Game = function (game) {  
    this.word2 = null;
    this.wordList;
    this.entry = null;
};

BasicGame.Game.prototype = {

    create: function () {
        this.wordList = ['car', 'steve', 'ban', 'oats'];
        this.entry = this.add.text(this.world.centerX, 700, '', {
            font: "32px Arial",
            fill: "#ff0044",
            align: "center"
        });

        this.word2 = this.add.text(this.world.centerX, this.world.topY, 'apple', {
            font: "32px Arial",
            fill: "#ff0044",
            align: "center"
        });

        this.word2.anchor.setTo(0.5, 0.5);

        this.input.keyboard.addCallbacks(this, null, this.keyPress, null);
    },

    keyPress: function (char) {
        if(char.key == "Backspace"){
            this.entry.setText('')
            return;
        }
        if(char.key == "Enter"){
            this.checkValue();
            this.entry.setText('');
            return;
        }
        this.entry.setText(this.entry.text + char.key);
    },

    checkValue: function() {
        if(this.entry.text.trim() == this.word2.text.trim()) {
            this.word2.destroy();
            this.word2 = this.add.text(this.rnd.realInRange(0, this.world.width-100), this.world.topY, this.rnd.pick(this.wordList), {
            font: "32px Arial",
            fill: "#ff0044",
            align: "center"
        });
        }
    },

    update: function () {
        this.word2.y += 1;
        
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};

