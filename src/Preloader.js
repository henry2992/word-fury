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
	WordFury._language="english";
};
WordFury.Preloader.prototype = {
	preload: function(){
		// create a boolean to prevent us from going to the main menu too soon

		// set background and add a loading bar and text
		this.stage.backgroundColor = '#7F8C8D';
		this.preloadText = this.add.sprite(WordFury.GAME_WIDTH/2, 750, 'preloaderText');
		this.preloadText.anchor.setTo(0.5, 0.5);
		///this.preloadBar = this.add.sprite(WordFury.GAME_WIDTH/2, WordFury.GAME_HEIGHT/2, 'preloaderBar');
		///this.preloadBar.anchor.setTo(0.5, 0.5);
	    ///this.load.setPreloadSprite(this.preloadBar);

		//icon buttons for language selection
		this.add.text(WordFury.GAME_WIDTH/2-100, 150, "Select a language:", WordFury._fontStyle);
		var englishButton = this.add.button(WordFury.GAME_WIDTH/2-200, 250, 'englishButtonSelected', this.english, this, 'buttonOver', 'buttonOut', 'buttonOver');
		englishButton.anchor.setTo(0.5, 0.5);
		var swahiliButton= this.add.button(WordFury.GAME_WIDTH/2, 250, 'swahiliButton', this.swahili, this, 'buttonOver', 'buttonOut', 'buttonOver');
		swahiliButton.anchor.setTo(0.5, 0.5);		
		var spanishButton= this.add.button(WordFury.GAME_WIDTH/2+200, 250, 'spanishButton', this.spanish, this, 'buttonOver', 'buttonOut', 'buttonOver');
		spanishButton.anchor.setTo(0.5, 0.5);	
			    
	    //instructions for the game
	    this.add.text(this.world.leftX, 350, "Welcome to WordFury!", WordFury._fontStyle);  
        this.add.text(this.world.leftX, 400, "This is a fast paced typing game.", WordFury._fontStyle);  
        this.add.text(this.world.leftX, 450, "Words fall from the top of the screen.", WordFury._fontStyle);  
        this.add.text(this.world.leftX, 500, "Score 10 points by successfully typing the word.", WordFury._fontStyle);
		this.add.text(this.world.leftX, 550, "Lose 5 points if you type a word incorrectly. ", WordFury._fontStyle); 
		this.add.text(this.world.leftX, 600, "Lose 10 points if a word reaches the bottom. ", WordFury._fontStyle);
	    this.add.text(this.world.leftX, 650, "Keep the score above 0 the whole time to win! ", WordFury._fontStyle);

		// load audio
		this.load.audio('titleMusic', ['sounds/Revving_Eight_Bit_Engines.ogg', 'sounds/Revving_Eight_Bit_Engines.mp3']);
		this.load.audio('countryMusic',['sounds/countrymusic.ogg','sounds/countrymusic.mp3']);
		this.load.audio('jungleMusic',['sounds/jungle.ogg','sounds/jungle.mp3']);
		this.load.audio('cityMusic',['sounds/city.ogg','sounds/city.mp3']);
		this.load.audio('flowersMusic',['sounds/flowers.ogg','sounds/flowers.mp3']);
		this.load.audio('beachMusic',['sounds/beach.ogg','sounds/beach.mp3']);
		this.load.audio('mountainsMusic',['sounds/mountains.ogg','sounds/mountains.mp3']);
		this.load.audio('oceanMusic',['sounds/ocean.ogg','sounds/ocean.mp3']);

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
		this.load.image('mountainsButton','images/mountainsbutton.png');
		this.load.image('oceanButton','images/oceanbutton.png');
		// load mute button
		this.load.image('muteButton','images/muteButton.png');
		this.load.image('easyButton','images/easyButton.png')
		this.load.image('mediumButton','images/mediumButton.png');
		this.load.image('hardButton','images/hardButton.png');
		this.load.image('easyButtonSelected','images/easyButtonSelected.png')
		this.load.image('mediumButtonSelected','images/mediumButtonSelected.png');
		this.load.image('hardButtonSelected','images/hardButtonSelected.png');

		// load fonts
		this.load.bitmapFont('stack', 'fonts/shortStack.png', 'fonts/shortStack.xml');
		// load json files
		this.load.json('englishWords','wordList/englishWords.json');
		this.load.json('swahiliWords','wordList/swahiliWords.json');
		this.load.json('spanishWords','wordList/spanishWords.json');
	},
	create: function(){
		// disable the crop so it doesn't keep going as the music decodes
		this.preloadBar.cropEnabled = false;
	},
	update: function(){
	// wait on this screen until the music is ready to go
		if (this.cache.isSoundDecoded('titleMusic')) 
		{
			this.add.text(WordFury.GAME_WIDTH-450, 770, "Click button to continue:", WordFury._fontStyle);
			var startButton= this.add.button(WordFury.GAME_WIDTH-60, 770, 'startButton', this.advance, this, 'buttonOver', 'buttonOut', 'buttonOver');
			startButton.anchor.setTo(0.5, 0.5);
			this.preloadText.destroy();

		}
		// transition to the MainMenu state
		// this.state.start('MainMenu');
	},
	advance: function(){
		this.state.start('MainMenu');
	},
	//functions to assign language name to the Wordfury._language
	english: function () {	
		var spanishButton= this.add.button(WordFury.GAME_WIDTH/2+200, 250, 'spanishButton', this.spanish, this, 'buttonOver', 'buttonOut', 'buttonOver');
		spanishButton.anchor.setTo(0.5, 0.5);
		var swahiliButton= this.add.button(WordFury.GAME_WIDTH/2, 250, 'swahiliButton', this.swahili, this, 'buttonOver', 'buttonOut', 'buttonOver');
		swahiliButton.anchor.setTo(0.5, 0.5);
		var englishButton= this.add.button(WordFury.GAME_WIDTH/2-200, 250, 'englishButtonSelected', this.english, this, 'buttonOver', 'buttonOut', 'buttonOver');
		englishButton.anchor.setTo(0.5, 0.5);
		WordFury._language = "english";

	},
	swahili: function () {
		var spanishButton= this.add.button(WordFury.GAME_WIDTH/2+200, 250, 'spanishButton', this.spanish, this, 'buttonOver', 'buttonOut', 'buttonOver');
		spanishButton.anchor.setTo(0.5, 0.5);
		var swahiliButton= this.add.button(WordFury.GAME_WIDTH/2, 250, 'swahiliButtonSelected', this.swahili, this, 'buttonOver', 'buttonOut', 'buttonOver');
		swahiliButton.anchor.setTo(0.5, 0.5);
		var englishButton= this.add.button(WordFury.GAME_WIDTH/2-200, 250, 'englishButton', this.english, this, 'buttonOver', 'buttonOut', 'buttonOver');
		englishButton.anchor.setTo(0.5, 0.5);
		WordFury._language = "swahili";

	},
	spanish: function () {
		var spanishButton= this.add.button(WordFury.GAME_WIDTH/2+200, 250, 'spanishButtonSelected', this.spanish, this, 'buttonOver', 'buttonOut', 'buttonOver');
		spanishButton.anchor.setTo(0.5, 0.5);
		var swahiliButton= this.add.button(WordFury.GAME_WIDTH/2, 250, 'swahiliButton', this.swahili, this, 'buttonOver', 'buttonOut', 'buttonOver');
		swahiliButton.anchor.setTo(0.5, 0.5);
		var englishButton= this.add.button(WordFury.GAME_WIDTH/2-200, 250, 'englishButton', this.english, this, 'buttonOver', 'buttonOut', 'buttonOver');
		englishButton.anchor.setTo(0.5, 0.5);
		WordFury._language = "spanish";
	}
	
};
