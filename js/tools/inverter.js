KiddoPaint.Tools.Toolbox.Inverter = function() {
    var tool = this;
    this.isDown = false;
    this.size = 25;
    this.hiddenPattern = null;

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.hiddenPattern = KiddoPaint.Display.context.createPattern(Filters.gcoInvert(KiddoPaint.Display.main_context.getImageData(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height)), 'no-repeat');
    };

    this.mousemove = function(ev) {
        let currentSize = tool.size * KiddoPaint.Current.scaling;
        if (tool.isDown) {
            KiddoPaint.Sounds.brushinvert();
            var ctx = KiddoPaint.Display.context;
            ctx.fillStyle = tool.hiddenPattern;
            ctx.fillRect(Math.round(ev._x) - (currentSize / 2.0), Math.round(ev._y) - (currentSize / 2.0), currentSize, currentSize);
        }
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            tool.hiddenPattern = null;
            KiddoPaint.Display.saveMain();
        }
    };
};
KiddoPaint.Tools.Inverter = new KiddoPaint.Tools.Toolbox.Inverter();