KiddoPaint.Tools.Toolbox.Pencil = function() {
    var tool = this;
    this.isDown = false;
    this.lastX = 0;
    this.lastY = 0;
    this.size = 7;

    this.texture = function(color) {
        return KiddoPaint.Textures.Solid(color);
    };

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.lastX = ev._x;
        tool.lastY = ev._y;
    };

    this.mousemove = function(ev) {
        if (tool.isDown) {
            KiddoPaint.Sounds.pencil();
            KiddoPaint.Display.context.beginPath();
            KiddoPaint.Display.context.strokeStyle = tool.texture(KiddoPaint.Current.color);
            KiddoPaint.Display.context.lineWidth = tool.size * KiddoPaint.Current.scaling;
            KiddoPaint.Display.context.lineCap = 'round';
            KiddoPaint.Display.context.lineJoin = 'round';
            KiddoPaint.Display.context.moveTo(tool.lastX, tool.lastY);
            KiddoPaint.Display.context.lineTo(ev._x, ev._y);
            KiddoPaint.Display.context.stroke();
            tool.lastX = ev._x;
            tool.lastY = ev._y;
        }
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.mousemove(ev);
            KiddoPaint.Display.context.closePath();
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
        }
    };
};
KiddoPaint.Tools.Pencil = new KiddoPaint.Tools.Toolbox.Pencil();