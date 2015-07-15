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
WordFury.Preloader = function(game){
	WordFury.GAME_WIDTH = 640;
	WordFury.GAME_HEIGHT = 960;
};
WordFury.Preloader.prototype = {
	preload: function(){
		// create a boolean to prevent us from going to the main menu too soon

		// set background and add a loading bar and text
		this.stage.backgroundColor = '#7F8C8D';
		this.preloadText = this.add.sprite(WordFury.GAME_WIDTH/2, WordFury.GAME_HEIGHT/2.5, 'preloaderText');
		this.preloadText.anchor.setTo(0.5, 0.5);
		///this.preloadBar = this.add.sprite(WordFury.GAME_WIDTH/2, WordFury.GAME_HEIGHT/2, 'preloaderBar');
		///this.preloadBar.anchor.setTo(0.5, 0.5);
	    ///this.load.setPreloadSprite(this.preloadBar);

	    //instructions for the game
	    this.add.text(this.world.leftX, 450, "Welcome to WordFury!", WordFury._fontStyle);  
        this.add.text(this.world.leftX, 500, "This is a fast paced typing game.", WordFury._fontStyle);  
        this.add.text(this.world.leftX, 550, "Words fall from the top of the screen.", WordFury._fontStyle);  
        this.add.text(this.world.leftX, 600, "Score points by successfully typing the word", WordFury._fontStyle);
		this.add.text(this.world.leftX, 650, "Lose points when words reach the bottom.", WordFury._fontStyle); 
		// load tracks
		this.load.audio('titleMusic', ['sounds/Revving_Eight_Bit_Engines.ogg', 'sounds/Revving_Eight_Bit_Engines.mp3']);
		this.load.audio('countryMusic',['sounds/countrymusic.ogg','sounds/countrymusic.mp3']);
		this.load.audio('jungleMusic',['sounds/jungle.ogg','sounds/jungle.mp3']);

		//load sound effects
		this.load.audio('gunshot',['sounds/gunshot.ogg','sound/gunshot.mp3']);
		this.load.audio('lazer',['sounds/lazer.ogg','sound/lazer.mp3']);
		// load Buttons
		this.load.image('westButton', 'images/westbutton.png');
		this.load.image('spaceButton', 'images/spacebutton.png');
		this.load.image('beachButton','images/beachbutton.png');
		this.load.image('cityButton','images/citybutton.png');
		this.load.image('flowersButton','images/flowersbutton.png');
		this.load.image('jungleButton','images/junglebutton.png');
		this.load.image('mountainsButton','images/mountainsButton.png');
		this.load.image('oceanButton','images/oceanbutton.png');
		// load mute button
		this.load.image('muteButton','images/muteButton.png');
		// load fonts
		this.load.bitmapFont('stack', 'fonts/shortStack.png', 'fonts/shortStack.xml');
		// load json files
		this.load.json('wordList','wordList/easyWords.json');
	},
	create: function(){
		// disable the crop so it doesn't keep going as the music decodes
		this.preloadBar.cropEnabled = false;
	},
	update: function(){
	// wait on this screen until the music is ready to go
		if (this.cache.isSoundDecoded('titleMusic')) 
		{
			this.add.text(this.world.leftX, 750, "Click Main Menu to Continue", WordFury._fontStyle);
			var startButton= this.add.button(WordFury.GAME_WIDTH-60, 750, 'startButton', this.state.start('MainMenu'), this, 'buttonOver', 'buttonOut', 'buttonOver');
			startButton.anchor.setTo(0.5, 0.5);  
		}
		// transition to the MainMenu state
		//this.state.start('MainMenu');
	}
	
};