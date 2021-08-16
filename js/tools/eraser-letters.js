KiddoPaint.Tools.Toolbox.EraserLetters = function() {
    var tool = this;
    this.isDown = false;
    this.animInterval = 10;
    this.timeout = null;

    this.mousedown = function(ev) {
        tool.isDown = true;
        let interval = tool.animInterval;
        tool.timeout = setTimeout(function draw() {
            tool.toolDraw();
            if (!tool.timeout) return;
            tool.timeout = setTimeout(draw, interval);
        }, interval);
        tool.toolDraw();
    };

    this.mousemove = function(ev) {};

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            if (tool.timeout) {
                clearTimeout(tool.timeout);
                tool.timeout = null;
            }
            KiddoPaint.Display.clearAnim();
            KiddoPaint.Display.clearAll();
        }
    };

    this.toolDraw = function() {
        if (tool.isDown) {
            KiddoPaint.Sounds.mixershadowbox();
            let rx = getRandomFloat(-10, KiddoPaint.Display.canvas.width);
            let ry = getRandomFloat(-10, KiddoPaint.Display.canvas.height);
            let rs = getRandomInt(24, 500);
            let rl = getRandomLetter();

            KiddoPaint.Display.animContext.fillStyle = 'white';
            KiddoPaint.Display.animContext.fillRect(rx, ry, rs / 2, rs / 2);

            KiddoPaint.Display.animContext.font = rs + 'px serif';
            KiddoPaint.Display.animContext.textBaseline = 'top';
            KiddoPaint.Display.animContext.textAlign = 'center';

            KiddoPaint.Display.animContext.fillStyle = KiddoPaint.Colors.randomAllColor();
            KiddoPaint.Display.animContext.strokeStyle = KiddoPaint.Colors.randomAllColor();
            if (Math.random() > 0.25) {
                KiddoPaint.Display.animContext.fillText(' ' + rl, rx, ry);
            } else {
                KiddoPaint.Display.animContext.strokeText(' ' + rl, rx, ry);
            }
        }
    };
};
KiddoPaint.Tools.EraserLetters = new KiddoPaint.Tools.Toolbox.EraserLetters();