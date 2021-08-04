KiddoPaint.Tools.Toolbox.Brush = function() {
    var tool = this;
    this.isDown = false;
    this.didMove = false;
    this.previousEv = null;
    this.minDistance = 0;
    this.texture = function(angle) {};
    this.soundduring = null;

    this.mousedown = function(ev) {
        tool.isDown = true;

        tool.didMove = true; // put first click
        tool.mousemove(ev);
        tool.didMove = false; // clear first click if need be

        tool.previousEv = ev;
    };

    this.reset = function() {
        tool.soundduring = null;
        tool.texture = function(angle) {};
    }

    this.mousemove = function(ev) {
        if (tool.isDown) {
            if (!tool.didMove) {
                // just kidding! we're moving, so clear the first builder mark and ...
                KiddoPaint.Display.clearTmp();
                tool.didMove = true;
                tool.previousEv = ev;
                // ... start drawing the new builder as soon as possible.
                tool.minDistance = 0;
            } else if (tool.previousEv == null || distanceBetween(tool.previousEv, ev) > tool.minDistance) {
                var angle = tool.previousEv == null ? 0 : angleBetween(tool.previousEv, ev) + 0.5 * Math.PI;
                var brushFill = tool.texture(angle);
                if (tool.soundduring) tool.soundduring();
                KiddoPaint.Display.context.drawImage(brushFill, Math.round(ev._x), Math.round(ev._y));
                tool.previousEv = ev;
                // next builder should be spaced out
                tool.minDistance = 25;
            }
        } else {
            var angle = tool.previousEv == null ? 0 : angleBetween(tool.previousEv, ev) + 0.5 * Math.PI;
            var brushFill = tool.texture(angle);
            KiddoPaint.Display.previewContext.drawImage(brushFill, Math.round(ev._x), Math.round(ev._y));
        }
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            tool.previousEv = null;
            tool.minDistance = 0;
            KiddoPaint.Display.saveMain();
        }
    };
};
KiddoPaint.Tools.Brush = new KiddoPaint.Tools.Toolbox.Brush();