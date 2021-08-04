KiddoPaint.Tools.Toolbox.Looper = function() {
    var tool = this;
    this.isDown = false;
    this.size = 2;
    this.stroke = function() {
        return KiddoPaint.Textures.Solid(KiddoPaint.Current.modified ? KiddoPaint.Colors.randomColor() : KiddoPaint.Current.color);
    };

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.x = ev._x;
        tool.y = ev._y;
    };

    this.mousemove = function(ev) {
        if (tool.isDown) {
            KiddoPaint.Display.context.beginPath();
            KiddoPaint.Display.context.strokeStyle = tool.stroke();
            KiddoPaint.Display.context.lineWidth = tool.size;
            KiddoPaint.Display.context.moveTo(tool.x, tool.y);
            KiddoPaint.Display.context.arcTo(ev._x, ev._y, tool.x, tool.y, 100);
            KiddoPaint.Display.context.stroke();
            KiddoPaint.Display.context.closePath();
        }
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.mousemove(ev);
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
        }
    };
};
KiddoPaint.Tools.Looper = new KiddoPaint.Tools.Toolbox.Looper();