KiddoPaint.Tools.Toolbox.Kaleidoscope = function() {
    // bug: undo does one quadrant
    var tool = this;
    this.isDown = false;
    this.size = 2;
    this.origin = {};
    this.texture = function() {
        return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
    };

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.previousEv = {
            x: 0,
            y: 0
        };
        tool.origin = ev;
        KiddoPaint.Display.context.strokeStyle = tool.texture();
        KiddoPaint.Display.context.lineWidth = tool.size;
        KiddoPaint.Display.context.beginPath();
        KiddoPaint.Display.context.save();
        KiddoPaint.Display.context.lineJoin = KiddoPaint.Display.context.lineCap = 'round';
        KiddoPaint.Display.context.translate(ev._x + 0.1, ev._y + 0.1);
        KiddoPaint.Display.context.moveTo(0, 0);
    };

    this.mousemove = function(ev) {
        if (tool.isDown) {
            KiddoPaint.Sounds.brushkaliediscope();
            var x = tool.origin._x - ev._x;
            var y = tool.origin._y - ev._y;

            if (KiddoPaint.Current.modifiedAlt) {
                KiddoPaint.Display.context.moveTo(tool.previousEv.x, tool.previousEv.y);
                KiddoPaint.Display.context.lineTo(x, y);

                KiddoPaint.Display.context.moveTo(tool.previousEv.y, tool.previousEv.x);
                KiddoPaint.Display.context.lineTo(y, x);

                KiddoPaint.Display.context.moveTo(-tool.previousEv.x, -tool.previousEv.y);
                KiddoPaint.Display.context.lineTo(-x, -y);

                KiddoPaint.Display.context.moveTo(-tool.previousEv.y, -tool.previousEv.x);
                KiddoPaint.Display.context.lineTo(-y, -x);
            } else {
                KiddoPaint.Display.context.moveTo(tool.previousEv.x, tool.previousEv.y);
                KiddoPaint.Display.context.lineTo(x, y);

                KiddoPaint.Display.context.moveTo(-tool.previousEv.x, tool.previousEv.y);
                KiddoPaint.Display.context.lineTo(-x, y);

                KiddoPaint.Display.context.moveTo(tool.previousEv.x, -tool.previousEv.y);
                KiddoPaint.Display.context.lineTo(x, -y);

                KiddoPaint.Display.context.moveTo(-tool.previousEv.x, -tool.previousEv.y);
                KiddoPaint.Display.context.lineTo(-x, -y);
            }

            KiddoPaint.Display.context.stroke();
            tool.previousEv = {
                x: x,
                y: y
            };
        }
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            KiddoPaint.Display.context.restore();
            KiddoPaint.Display.context.closePath();
            tool.previousEv = {
                x: 0,
                y: 0
            };
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
        }
    };
};
KiddoPaint.Tools.Kaleidoscope = new KiddoPaint.Tools.Toolbox.Kaleidoscope();