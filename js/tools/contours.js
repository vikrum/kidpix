KiddoPaint.Tools.Toolbox.Contours = function() {
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
            KiddoPaint.Sounds.brushnorthern();
            KiddoPaint.Display.context.beginPath();
            KiddoPaint.Display.context.strokeStyle = tool.stroke();
            KiddoPaint.Display.context.lineWidth = tool.size;
            KiddoPaint.Current.modifiedAlt ? KiddoPaint.Display.context.moveTo(tool.x, ev._y) : KiddoPaint.Display.context.moveTo(ev._x, tool.y);
            KiddoPaint.Display.context.lineTo(ev._x, ev._y);
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
KiddoPaint.Tools.Contours = new KiddoPaint.Tools.Toolbox.Contours();