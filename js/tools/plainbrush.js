KiddoPaint.Tools.Toolbox.PlainBrush = function() {
    var tool = this;
    this.isDown = false;
    this.previousEv = null;
    this.texture = function() {};
    this.preprocess = function() {};
    this.postprocess = function() {};
    this.soundduring = function() {};
    this.spacing = 5;
    this.step = 0; // local tool step which resets on mouse up
    this.pstep = 0; // local persistent step which resets when invoker chooses; used in connect the dots
    this.alwaysGapFill = false;

    this.reset = function() {
        tool.isDown = false;
        tool.previousEv = null;
        tool.texture = function() {};
        tool.preprocess = function() {};
        tool.postprocess = function() {};
        tool.soundduring = function() {};
        tool.step = 0;
        tool.pstep = 0;
        tool.alwaysGapFill = false;
    }

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.mousemove(ev);
        tool.previousEv = ev;
        tool.preprocess();
    };

    this.mousemove = function(ev) {
        if (tool.isDown) {
            if (tool.previousEv == null || distanceBetween(tool.previousEv, ev) > tool.spacing) {
                if (KiddoPaint.Current.modifiedTilde) {
                    // alpha decay
                    KiddoPaint.Display.context.globalAlpha *= 0.95;
                    KiddoPaint.Display.previewContext.globalAlpha *= 0.95;
                }
                // gap fill
                if ((KiddoPaint.Current.modifiedAlt || tool.alwaysGapFill) && tool.previousEv != null) {
                    var dist = distanceBetween(tool.previousEv, ev);
                    var angle = angleBetweenRad(tool.previousEv, ev);
                    for (var i = 0; i < dist; i += 5) {
                        var x = tool.previousEv._x + (Math.sin(angle) * i);
                        var y = tool.previousEv._y + (Math.cos(angle) * i);
                        var brushFill = tool.texture(tool.step, tool.pstep);
                        KiddoPaint.Display.context.drawImage(brushFill.brush, Math.round(x - brushFill.offset), Math.round(y - brushFill.offset));
                        tool.step += 1;
                        tool.pstep += 1;
                        if (KiddoPaint.Current.modifiedTilde) {
                            // alpha decay
                            KiddoPaint.Display.context.globalAlpha *= 0.99;
                            KiddoPaint.Display.previewContext.globalAlpha *= 0.99;
                        }
                    }
                }
                var brushFill = tool.texture(tool.step, tool.pstep);
                tool.soundduring();
                KiddoPaint.Display.context.drawImage(brushFill.brush, Math.round(ev._x - brushFill.offset), Math.round(ev._y - brushFill.offset));
                tool.previousEv = ev;
                tool.step += 1;
                tool.pstep += 1;
            }
        }
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.mousemove(ev);
            tool.isDown = false;
            tool.previousEv = null;
            tool.step = 0; // only reset local step, not pstep. caller invokes reset() if need be
            tool.postprocess();
            KiddoPaint.Display.saveMain();
            KiddoPaint.Display.context.globalAlpha = KiddoPaint.Current.globalAlpha;
            KiddoPaint.Display.previewContext.globalAlpha = KiddoPaint.Current.globalAlpha;
        }
    };
};
KiddoPaint.Tools.PlainBrush = new KiddoPaint.Tools.Toolbox.PlainBrush();