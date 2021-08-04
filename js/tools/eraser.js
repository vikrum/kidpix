KiddoPaint.Tools.Toolbox.Eraser = function() {
    var tool = this;
    this.isDown = false;
    this.size = 10;
    this.isSquareEraser = true;
    this.texture = function() {
        return KiddoPaint.Textures.Solid('rgb(255, 2, 0)');
    };

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.mousemove(ev);
    };

    this.mousemove = function(ev) {
        let currentSize = tool.size * KiddoPaint.Current.scaling;
        var ctx = tool.isDown ? KiddoPaint.Display.context : KiddoPaint.Display.previewContext;
        ctx.fillStyle = tool.texture();
        if (tool.isSquareEraser) {
            ctx.fillRect(Math.round(ev._x) - (currentSize / 2.0), Math.round(ev._y) - (currentSize / 2.0), currentSize, currentSize);
        } else {
            ctx.beginPath();
            ctx.arc(ev._x, ev._y, currentSize, 0, 2 * Math.PI);
            ctx.fill();
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
KiddoPaint.Tools.Eraser = new KiddoPaint.Tools.Toolbox.Eraser();