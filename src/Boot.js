var WordFury = {};
WordFury.Boot = function(game){};
WordFury.Boot.prototype = {
    preload: function(){
        // loading resources needed for preloader page
        this.load.bitmapFont('stack', 'fonts/shortStack.png', 'fonts/shortStack.xml');
        this.load.image('preloaderBackground', 'images/space.png');
        this.load.image('preloaderBar', 'images/preload.png');
        this.load.image('preloaderText', 'images/loadText.png');
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
