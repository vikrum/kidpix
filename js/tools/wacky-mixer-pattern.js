KiddoPaint.Tools.Toolbox.WackyMixerPattern = function() {
    var tool = this;
    this.patternImages = ['img/kidpix-mixer-pattern-206.png', 'img/kidpix-mixer-pattern-207.png', 'img/kidpix-mixer-pattern-208.png', 'img/kidpix-mixer-pattern-209.png', 'img/kidpix-mixer-pattern-210.png', 'img/kidpix-mixer-pattern-211.png', 'img/kidpix-mixer-pattern-212.png', 'img/kidpix-mixer-pattern-213.png', 'img/kidpix-mixer-pattern-214.png', 'img/kidpix-mixer-pattern-215.png', 'img/kidpix-mixer-pattern-216.png', 'img/kidpix-mixer-pattern-217.png', 'img/kidpix-mixer-pattern-218.png', 'img/kidpix-mixer-pattern-219.png', 'img/kidpix-mixer-pattern-220.png', 'img/kidpix-mixer-pattern-221.png', 'img/kidpix-mixer-pattern-222.png', 'img/kidpix-mixer-pattern-223.png', 'img/kidpix-mixer-pattern-224.png', 'img/kidpix-mixer-pattern-225.png', 'img/kidpix-mixer-pattern-226.png', 'img/kidpix-mixer-pattern-227.png', 'img/kidpix-mixer-pattern-228.png', 'img/kidpix-mixer-pattern-229.png', 'img/kidpix-mixer-pattern-230.png'];
    this.mousedown = function(ev) {
        KiddoPaint.Sounds.mixerframe();
        let image = new Image();
        image.src = tool.patternImages.random();
        image.crossOrigin = 'anonymous';
        image.onload = function() {
            var ctx = KiddoPaint.Display.context;
            ctx.imageSmoothingEnabled = false;
            ctx.fillStyle = ctx.createPattern(scaleImageDataCanvasAPIPixelated(image, 4), 'repeat');
            ctx.fillRect(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
            KiddoPaint.Display.saveMain();
        };
    };
    this.mousemove = function(ev) {};
    this.mouseup = function(ev) {};
};
KiddoPaint.Tools.WackyMixerPattern = new KiddoPaint.Tools.Toolbox.WackyMixerPattern();