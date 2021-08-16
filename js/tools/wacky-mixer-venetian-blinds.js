KiddoPaint.Tools.Toolbox.WackyMixerVenetianBlinds = function() {
    var tool = this;
    this.isDown = false;
    this.animInterval = 100;
    this.timeout = null;
    this.currentEv = null;

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.currentEv = ev;
        KiddoPaint.Display.context.save();
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add('cursor-guy-wow');
        let interval = tool.animInterval;
        tool.timeout = setTimeout(function draw() {
            tool.toolDraw();
            if (!tool.timeout) return;
            tool.timeout = setTimeout(draw, interval);
        }, interval);
        tool.toolDraw();
    };

    this.mousemove = function(ev) {
        tool.currentEv = ev;
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            KiddoPaint.Display.context.restore();
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-guy-smile');
            if (tool.timeout) {
                clearTimeout(tool.timeout);
                tool.timeout = null;
            }
            KiddoPaint.Display.clearAnim();
            KiddoPaint.Display.clearBeforeSaveMain();
        }
    };

    this.toolDraw = function() {
        if (tool.isDown) {
            KiddoPaint.Sounds.mixervenetian();
            // alpha hide hack
            KiddoPaint.Display.animContext.fillStyle = 'white';
            KiddoPaint.Display.animContext.fillRect(0, 0, KiddoPaint.Display.main_canvas.width, KiddoPaint.Display.main_canvas.height);

            let rwidth = KiddoPaint.Display.canvas.width;
            let rheight = KiddoPaint.Display.canvas.height / 10;

            let blinds = [];
            for (let i = 0; i < 10; i++) {
                var sourceImage = KiddoPaint.Display.main_context.getImageData(0, rheight * i, rwidth, rheight);
                blinds[i] = sourceImage;
            }

            fisherYatesArrayShuffle(blinds);

            for (let i = 0; i < 10; i++) {
                KiddoPaint.Display.context.putImageData(blinds[i], 0, rheight * i);
            }

        }
    };
};
KiddoPaint.Tools.WackyMixerVenetianBlinds = new KiddoPaint.Tools.Toolbox.WackyMixerVenetianBlinds();