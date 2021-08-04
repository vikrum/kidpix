KiddoPaint.Tools.Toolbox.EraserHiddenPicture = function() {
    var tool = this;
    this.hiddenPictures = ['img/kp-h-bear.png', 'img/kp-h-bison.png', 'img/kp-h-corn.png', 'img/kp-h-eye.png', 'img/kp-h-fox.png', 'img/kp-h-horse.png', 'img/kp-h-hummingbird.png', 'img/kp-h-ladybug.png', 'img/kp-h-lion.png', 'img/kp-h-magnet.png', 'img/kp-h-moth.png', 'img/kp-h-octopus.png'];
    this.isDown = false;
    this.size = 32;
    this.hiddenPattern = null;

    this.reset = function() {
        let image = new Image();
        image.src = tool.hiddenPictures.random();
        image.crossOrigin = 'anonymous';
        image.onload = function() {
            tool.hiddenPattern = makePatternFromImage(image);
        };
    }

    this.mousedown = function(ev) {
        tool.isDown = true;
    };

    this.mousemove = function(ev) {
        let currentSize = tool.size * KiddoPaint.Current.scaling;
        if (tool.isDown) {
            var ctx = KiddoPaint.Display.context;
            ctx.fillStyle = tool.hiddenPattern;
            ctx.fillRect(Math.round(ev._x) - (currentSize / 2.0), Math.round(ev._y) - (currentSize / 2.0), currentSize, currentSize);
        } else {
            var ctx = KiddoPaint.Display.previewContext;
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.strokeRect(Math.round(ev._x) - (currentSize / 2.0), Math.round(ev._y) - (currentSize / 2.0), currentSize, currentSize);
            ctx.fillRect(Math.round(ev._x) - (currentSize / 2.0), Math.round(ev._y) - (currentSize / 2.0), currentSize, currentSize);
        }
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
        }
    };
};
KiddoPaint.Tools.EraserHiddenPicture = new KiddoPaint.Tools.Toolbox.EraserHiddenPicture();