KiddoPaint.Tools.Toolbox.Line = function() {
    var tool = this;
    this.isDown = false;
    this.size = 7;
    this.stomp = true;
    this.texture = function() {
        return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
    };

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.x = ev._x;
        tool.y = ev._y;
        KiddoPaint.Sounds.lineStart();
    };

    this.mousemove = function(ev) {
        if (tool.isDown) {
            if (tool.stomp) {
                KiddoPaint.Display.clearTmp();
            }
            KiddoPaint.Sounds.lineDuring();

            KiddoPaint.Display.context.beginPath();
            KiddoPaint.Display.context.moveTo(Math.round(tool.x), Math.round(tool.y));
            if (KiddoPaint.Current.modified) {
                deltax = Math.abs(ev._x - tool.x);
                deltay = Math.abs(ev._y - tool.y);
                if (deltax < deltay) {
                    KiddoPaint.Display.context.lineTo(tool.x, ev._y);
                } else {
                    KiddoPaint.Display.context.lineTo(ev._x, tool.y);
                }
            } else {
                KiddoPaint.Display.context.lineTo(ev._x, ev._y);
            }
            KiddoPaint.Display.context.strokeStyle = tool.texture();
            KiddoPaint.Display.context.lineWidth = tool.size;
            KiddoPaint.Display.context.stroke();
            KiddoPaint.Display.context.closePath();
        }
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.mousemove(ev);
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
            KiddoPaint.Sounds.lineEnd();
        }
    };
};
KiddoPaint.Tools.Line = new KiddoPaint.Tools.Toolbox.Line();