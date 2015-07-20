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
WordFury.GameWin = function(game){
    // define variables just for WordFury.Game   
    this._spawnWordTimer = 0;
};
WordFury.GameWin.prototype = {
  
    create: function(){
        this.physics.startSystem(Phaser.Physics.ARCADE);

        // set background
        var background;
        if (WordFury._background==1){

            background= this.add.sprite(0, 0, 'preloaderBackground');     
            background = this.add.tileSprite(0, 0, 640, 960, 'preloaderBackground');
            background.autoScroll(-200, 0);


        } else if (WordFury._background==2){ 
            background= this.add.sprite(0,0,'wildwestBackground');
            background = this.add.tileSprite(0, 0, 640, 960, 'wildwestBackground');
        }
         else if (WordFury._background==3){ 
            background= this.add.sprite(0,0,'beachBackground');
            background = this.add.tileSprite(0, 0, 640, 960, 'beachBackground');
        }
        else if (WordFury._background==4){ 
            background= this.add.sprite(0,0,'cityBackground');
            background = this.add.tileSprite(0, 0, 640, 960, 'cityBackground');
        }
         else if (WordFury._background==5){ 
            background= this.add.sprite(0,0,'flowersBackground');
            background = this.add.tileSprite(0, 0, 640, 960, 'flowersBackground');
        }
         else if (WordFury._background==6){ 
            background= this.add.sprite(0,0,'jungleBackground');
            background = this.add.tileSprite(0, 0, 640, 960, 'jungleBackground');
        }
         else if (WordFury._background==7){ 
            background= this.add.sprite(0,0,'mountainsBackground');
            background = this.add.tileSprite(0, 0, 640, 960, 'mountainsBackground');
        }
         else if (WordFury._background==8){ 
            background= this.add.sprite(0,0,'oceanBackground');
            background = this.add.tileSprite(0, 0, 640, 960, 'oceanBackground');
        }
        // set font style
        var _fontStyle = { font: "32px Arial", fill: "#ff0044", align: "center" };

         
        this.add.text(this.world.leftX, 700, "You finished with "+ WordFury._score+" points.", WordFury._fontStyle);  
        this.add.text(this.world.leftX, 750, "You win the internet!", WordFury._fontStyle);    
        this.add.text(this.world.leftX, 800, "Refresh your browser to play again", WordFury._fontStyle);        
    },

     update: function(){
        // update the timer
        this._spawnWordTimer += this.time.elapsed;
        // check to see if we should spawn another word
        if(this._spawnWordTimer > (600)) {
            // reset the timer
            this._spawnWordTimer = 0;
            // spawn a word
            WordFury.item3.spawnWord(this);
        }    
     }   
};
    WordFury.item3 = {
       
    spawnWord: function(game){
        var word = game.add.text(0, 0,"YOU WIN!!!!", WordFury._fontStyle);
        word.anchor.setTo(0.5);        
        var wordSprite = game.add.sprite(game.rnd.realInRange(100, WordFury.GAME_WIDTH-100), game.world.topY, null);
        wordSprite.addChild(word);
        game.physics.enable(wordSprite);
        wordSprite.anchor.setTo(0.5, 0.5);
        wordSprite.body.velocity.setTo(0, 100+WordFury._wordCount*2);
        var rand = game.rnd.realInRange(0, 100);
        if(rand > 50) {
            wordSprite.body.angularVelocity = 50;
        }
        else {
            wordSprite.body.angularVelocity = -50;
        }
    }
};
