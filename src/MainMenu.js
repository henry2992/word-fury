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
WordFury.MainMenu = function(game){
	WordFury.MUSIC = null;
	WordFury.Gunshot = null;
	WordFury._background;
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
		var descriptionText = this.add.bitmapText(WordFury.GAME_WIDTH/2, 425, 'stack', 'Select a theme:', 50);
		descriptionText.updateText();
		descriptionText.x = WordFury.GAME_WIDTH/2 - (descriptionText.textWidth * 0.5);
		// add and play the music
		WordFury.MUSIC = this.add.audio('titleMusic', 1, true);

		WordFury.MUSIC.loop = true;
		WordFury.MUSIC.play();
		WordFury.Gunshot = this.add.audio('lazer',3,false);
		// add the play button
		var playButton = this.add.button(WordFury.GAME_WIDTH/3, 600, 'spaceButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');
		playButton.anchor.setTo(0.5, 0.5);
		var playButton = this.add.button(WordFury.GAME_WIDTH/3*2, 600, 'westButton', this.startGame2, this, 'buttonOver', 'buttonOut', 'buttonOver');
		playButton.anchor.setTo(0.5, 0.5);
		var muteButton = this.add.button(WordFury.GAME_WIDTH-60, 50, 'muteButton', this.muteMusic, this, 'buttonOver', 'buttonOut', 'buttonOver');
		muteButton.anchor.setTo(0.5, 0.5);
	},
	startGame: function(){
		// transition to the Game state 
		WordFury.MUSIC.stop();
		WordFury._background = 1;
		this.state.start('Game');
	},
	startGame2: function(){
		WordFury.MUSIC.stop();
		WordFury.MUSIC= this.add.audio('countryMusic', 1, true);
		WordFury.Gunshot = this.add.audio('gunshot',1,false);
		WordFury._background = 2;
		this.state.start('Game');
	},
	muteMusic: function(){
		// if the music is muted, unmute it
		if(WordFury.MUSIC.mute){
			WordFury.MUSIC.mute = false;
		}
		// if the music isn't muted, mute it
		else {
			WordFury.MUSIC.mute = true;
		}
	}
};
