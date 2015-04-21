WordFury.MainMenu = function(game){
	WordFury.MUSIC = null;
};
WordFury.MainMenu.prototype = {
	create: function(){
		// set the background and have it autoscroll
		var background = this.add.sprite(0, 0, 'preloaderBackground');
		background = this.add.tileSprite(0, 0, 640, 960, 'preloaderBackground');
		background.autoScroll(-200, 0);
		// add the title text
		var titleText = this.add.bitmapText(WordFury.GAME_WIDTH/2, 150, 'stack', 'WordFury', 100);
		titleText.updateText();
		titleText.x = WordFury.GAME_WIDTH/2 - (titleText.textWidth * 0.5);
		// add and play the music
		WordFury.MUSIC = this.add.audio('titleMusic', 1, true);
		WordFury.MUSIC.play();
		// add the play button
		var playButton = this.add.button(WordFury.GAME_WIDTH/2, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');
		playButton.anchor.setTo(0.5, 0.5);
		var muteButton = this.add.button(WordFury.GAME_WIDTH/2, 700, 'muteButton', this.muteMusic, this, 'buttonOver', 'buttonOut', 'buttonOver');
		muteButton.anchor.setTo(0.5, 0.5);
	},
	startGame: function(){
		// transition to the Game state 
		this.state.start('Game');
	},
	muteMusic: function(){
		// if the music is muted, unmute it
		if(WordFury.MUSIC.mute){
			WordFury.MUSIC.mute = false;
		}
		// if the music isn;t muted, mute it
		else{
			WordFury.MUSIC.mute = true;
		}
	}
};
