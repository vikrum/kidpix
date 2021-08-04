KiddoPaint.Tools.Toolbox.PlainBrush = function() {
    var tool = this;
    this.isDown = false;
    this.previousEv = null;
    this.texture = function() {};
    this.preprocess = function() {};
    this.postprocess = function() {};
    this.spacing = 5;
    this.step = 0;
    this.points = [];

    this.reset = function() {
        tool.isDown = false;
        tool.previousEv = null;
        tool.texture = function() {};
        tool.preprocess = function() {};
        tool.postprocess = function() {};
        tool.step = 0;
        tool.points = [];
    }

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.mousemove(ev);
        tool.previousEv = ev;
        tool.preprocess();
    };

    this.mousemove = function(ev) {
        if (tool.isDown) {
            var point = [ev._x, ev.y];
            tool.points.push(point);
        }
        tool.mousemoveDirect(ev);
    }

    this.mousemoveDirect = function(ev) {
        if (tool.isDown) {
            if (tool.previousEv == null || distanceBetween(tool.previousEv, ev) > tool.spacing) {
                if (KiddoPaint.Current.modifiedTilde) {
                    // alpha decay
                    KiddoPaint.Display.context.globalAlpha *= 0.95;
                    KiddoPaint.Display.previewContext.globalAlpha *= 0.95;
                }
                // gap fill
                if (KiddoPaint.Current.modifiedAlt && tool.previousEv != null) {
                    var dist = distanceBetween(tool.previousEv, ev);
                    var angle = angleBetweenRad(tool.previousEv, ev);
                    for (var i = 0; i < dist; i += 5) {
                        var x = tool.previousEv._x + (Math.sin(angle) * i);
                        var y = tool.previousEv._y + (Math.cos(angle) * i);
                        var brushFill = tool.texture(tool.step);
                        KiddoPaint.Display.context.drawImage(brushFill.brush, Math.round(x - brushFill.offset), Math.round(y - brushFill.offset));
                        tool.step += 1;
                        if (KiddoPaint.Current.modifiedTilde) {
                            // alpha decay
                            KiddoPaint.Display.context.globalAlpha *= 0.99;
                            KiddoPaint.Display.previewContext.globalAlpha *= 0.99;
                        }
                    }
                }
                var brushFill = tool.texture(tool.step);
                KiddoPaint.Display.context.drawImage(brushFill.brush, Math.round(ev._x - brushFill.offset), Math.round(ev._y - brushFill.offset));
                tool.previousEv = ev;
                tool.step += 1;
            }
        } else {
            var brushFill = tool.texture(0);
            KiddoPaint.Display.previewContext.drawImage(brushFill.brush, Math.round(ev._x - brushFill.offset), Math.round(ev._y - brushFill.offset));
        }
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            KiddoPaint.Display.clearTmp();
            var s = Smooth(tool.points, {
                method: Smooth.METHOD_LANCZOS
            });
            for (var i = 0; i < tool.points.length; i++) {
                for (var j = 0; j < 3; j++) {
                    var pt = s(i + (j / 4.0));
                    var ptev = {
                        _x: pt[0],
                        _y: pt[1]
                    };
                    tool.mousemoveDirect(ptev);
                }
            }
            tool.points = [];
            tool.mouseupDirect(ev);
        }
    }

    this.mouseupDirect = function(ev) {
        if (tool.isDown) {
            tool.mousemove(ev);
            tool.isDown = false;
            tool.previousEv = null;
            tool.step = 0;
            tool.postprocess();
            KiddoPaint.Display.saveMain();
            KiddoPaint.Display.context.globalAlpha = KiddoPaint.Current.globalAlpha;
            KiddoPaint.Display.previewContext.globalAlpha = KiddoPaint.Current.globalAlpha;
        }
    };
};
KiddoPaint.Tools.PlainBrush = new KiddoPaint.Tools.Toolbox.PlainBrush();