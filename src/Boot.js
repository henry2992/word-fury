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
var WordFury = {};

WordFury.Boot = function(game){};
WordFury.Boot.prototype = {
    preload: function(){
        // loading resources needed for preloader page
        this.load.bitmapFont('stack', 'fonts/shortStack.png', 'fonts/shortStack.xml');
        //Backgrounds
        this.load.image('preloaderBackground', 'images/space.png');
        this.load.image('wildwestBackground','images/wildwest.png');
        this.load.image('1bg','images/1.jpg');
        //Preloader Items
        this.load.image('preloaderBar', 'images/preload.png');
        this.load.image('preloaderText', 'images/loadText.png');
        this.load.image('monitorBackground','images/monitor.png');
    },
    create: function(){
        // setting the scale options
        this.input.maxPointers = 1;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);
        // transition to Preloader state
        this.state.start('Preloader');
    }
};
