/**
 This file is part of Foobar.

    WordFury is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    WordFury is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
    */
WordFury.Preloader = function(game){
	WordFury.GAME_WIDTH = 640;
	WordFury.GAME_HEIGHT = 960;
};
WordFury.Preloader.prototype = {
	preload: function(){
		// create a boolean to prevent us from going to the main menu too soon
		this.ready = false;
		// set background and add a loading bar and text
		this.stage.backgroundColor = '#7F8C8D';
		this.preloadText = this.add.sprite(WordFury.GAME_WIDTH/2, WordFury.GAME_HEIGHT/2.5, 'preloaderText');
		this.preloadText.anchor.setTo(0.5, 0.5);
		this.preloadBar = this.add.sprite(WordFury.GAME_WIDTH/2, WordFury.GAME_HEIGHT/2, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);
	    this.load.setPreloadSprite(this.preloadBar);
		// load audio
		this.load.audio('titleMusic', ['sounds/Revving_Eight_Bit_Engines.ogg', 'sounds/Revving_Eight_Bit_Engines.mp3']);
		// load images
		this.load.image('playButton', 'images/playbutton.png');
		this.load.image('muteButton', 'images/muteButton.png');
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
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			// transition to the MainMenu state
			this.state.start('MainMenu');
		}
	}
};