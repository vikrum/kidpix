KiddoPaint.Tools.Toolbox.Circle = function() {
    var tool = this;
    this.isDown = false;
    this.size = 1;
    this.stomp = true;
    this.startEv = null;
    this.texture = function() {
        return KiddoPaint.Textures.None();
    };
    this.stroke = function() {
        return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
    };

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.startEv = ev;
    };

    this.mousemove = function(ev) {
        if (tool.isDown) {
            if (tool.stomp) {
                KiddoPaint.Display.clearTmp();
            }
            KiddoPaint.Sounds.circle();
            KiddoPaint.Display.context.beginPath();
            KiddoPaint.Display.context.fillStyle = tool.texture(tool.startEv, ev);
            KiddoPaint.Display.context.strokeStyle = tool.stroke();
            KiddoPaint.Display.context.lineWidth = 1.5;
            if (KiddoPaint.Current.modifiedMeta) {
                KiddoPaint.Display.context.arc(tool.startEv._x, tool.startEv._y, distanceBetween(ev, {
                    _x: tool.startEv._x,
                    _y: tool.startEv._y
                }), 0, 2 * Math.PI);
            } else if (KiddoPaint.Current.modified) {
                let sizex = Math.abs(ev._x - tool.startEv._x);
                let sizey = Math.abs(ev._y - tool.startEv._y);
                KiddoPaint.Display.context.ellipse((ev._x + tool.startEv._x) / 2.0, (ev._y + tool.startEv._y) / 2.0, sizex, sizey, 0, 0, 2 * Math.PI);
            } else {
                KiddoPaint.Display.context.arc((ev._x + tool.startEv._x) / 2.0, (ev._y + tool.startEv._y) / 2.0, 0.5 * distanceBetween(ev, {
                    _x: tool.startEv._x,
                    _y: tool.startEv._y
                }), 0, 2 * Math.PI);
            }
            KiddoPaint.Display.context.fill();
            if (!KiddoPaint.Current.modifiedCtrl) {
                KiddoPaint.Display.context.stroke();
            }
            KiddoPaint.Display.context.closePath();
        }
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.mousemove(ev);
            tool.isDown = false;
            tool.startEv = null;
            KiddoPaint.Display.saveMain();
        }
    };
};
KiddoPaint.Tools.Circle = new KiddoPaint.Tools.Toolbox.Circle();