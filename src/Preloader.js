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