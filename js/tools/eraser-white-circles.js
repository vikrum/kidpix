KiddoPaint.Tools.Toolbox.EraserWhiteCircles = function() {
    var tool = this;
    this.isDown = false;
    this.size = 10;

    this.reset = function() {
        tool.size = 25;
    };

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.mousemove(ev);
    };

    this.mousemove = function(ev) {
        if (tool.isDown) {
            KiddoPaint.Sounds.bubblepops();
            let currentSize = tool.size * KiddoPaint.Current.scaling;
            var ctx = KiddoPaint.Display.context
            ctx.fillStyle = 'white';
            ctx.beginPath();
            let rx = getRandomFloat(0, KiddoPaint.Display.canvas.width);
            let ry = getRandomFloat(0, KiddoPaint.Display.canvas.height);
            ctx.arc(rx, ry, currentSize, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
            if (tool.size < 200)
                tool.size += 1;
        }
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.mousemove(ev);
            tool.isDown = false;
            KiddoPaint.Display.saveMainGco('destination-out');
        }
    };
};
KiddoPaint.Tools.EraserWhiteCircles = new KiddoPaint.Tools.Toolbox.EraserWhiteCircles();