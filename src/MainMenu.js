
BasicGame.MainMenu = function (game) {
	this.titleText = null;
	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.background = this.game.add.sprite(0, 0, 'preloaderBackground');
		this.background = this.game.add.tileSprite(0, 0, 1046, 768, 'preloaderBackground');
		this.background.autoScroll(-200, 0);
		
		this.titleText = this.game.add.bitmapText(this.game.width/2, 150, 'stack', 'WordFury', 100);
		this.titleText.updateText();
		this.titleText.x = this.game.world.centerX - (this.titleText.textWidth * 0.5);
		
		this.music = this.game.add.audio('titleMusic', 1, true);
		this.music.play();

		//this.add.sprite(0, 0, 'titlepage');

		this.playButton = this.game.add.button(this.game.width/2, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');
		this.playButton.anchor.setTo(0.5, 0.5);

	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}

};
