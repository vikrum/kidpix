KiddoPaint.Tools.Toolbox.WackyMixerWallpaper = function() {
    var tool = this;
    this.isDown = false;
    this.animInterval = 50;
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
            KiddoPaint.Sounds.mixerwallpaper();
            // alpha hide hack
            KiddoPaint.Display.animContext.fillStyle = 'white';
            KiddoPaint.Display.animContext.fillRect(0, 0, KiddoPaint.Display.main_canvas.width, KiddoPaint.Display.main_canvas.height);

            // random source
            let rx = tool.currentEv._x;
            let ry = tool.currentEv._y;

            let rwidth = KiddoPaint.Display.canvas.width / 3.0;
            let rheight = KiddoPaint.Display.canvas.height / 3.0;

            var sourceImage = KiddoPaint.Display.main_context.getImageData(rx, ry, rwidth, rheight);

            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    // kidpix has this jitter which decays the edges....
                    KiddoPaint.Display.context.putImageData(sourceImage, (rwidth * i) + getRandomInt(1, 4), (rheight * j) + getRandomInt(1, 4));
                }
            }
        }
    };
};
KiddoPaint.Tools.WackyMixerWallpaper = new KiddoPaint.Tools.Toolbox.WackyMixerWallpaper();