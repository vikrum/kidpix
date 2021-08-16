KiddoPaint.Tools.Toolbox.Looper = function() {
    var tool = this;
    this.isDown = false;
    this.size = 5;
    this.radius = 32;
    this.lstep = 0;
    this.lincr = 0.15;
    this.previousCoord = null;
    this.stroke = function() {
        return KiddoPaint.Textures.Solid(KiddoPaint.Current.modifiedMeta ? KiddoPaint.Colors.randomColor() : KiddoPaint.Current.color);
    };

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.previousCoord = {
            x: ev._x + tool.radius * Math.sin(-tool.lstep),
            y: ev._y + tool.radius * Math.cos(tool.lstep)
        }
    };

    this.mousemove = function(ev) {
        if (tool.isDown) {
            let x = ev._x + tool.radius * Math.sin(-tool.lstep);
            let y = ev._y + tool.radius * Math.cos(tool.lstep);

            KiddoPaint.Display.context.beginPath();
            KiddoPaint.Display.context.strokeStyle = tool.stroke();
            KiddoPaint.Display.context.lineWidth = tool.size;
            KiddoPaint.Display.context.lineCap = 'round';
            KiddoPaint.Display.context.lineJoin = 'round';
            KiddoPaint.Display.context.moveTo(tool.previousCoord.x, tool.previousCoord.y);
            KiddoPaint.Display.context.lineTo(x, y);
            KiddoPaint.Display.context.stroke();
            KiddoPaint.Display.context.closePath();

            tool.lstep += tool.lincr;

            tool.previousCoord = {
                x: x,
                y: y
            };
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