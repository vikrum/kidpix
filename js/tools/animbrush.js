KiddoPaint.Tools.Toolbox.AnimBrush = function() {
    var tool = this;
    this.isDown = false;
    this.previousEv = null;
    this.currentEv = null;
    this.distanceFromPrev = null;
    this.texture = function() {};
    this.preprocess = function() {};
    this.postprocess = function() {};
    this.step = 0;
    this.animInterval = 30;
    this.timeout = null;

    this.reset = function() {
        tool.isDown = false;
        tool.currentEv = null;
        tool.previousEv = null;
        tool.distanceFromPrev = null;
        tool.texture = function() {};
        tool.preprocess = function() {};
        tool.postprocess = function() {};
        tool.step = 0;
        tool.animInterval = 30;
        if (tool.timeout) {
            clearTimeout(tool.timeout);
            tool.timeout = null;
        }
    }

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.preprocess();
        tool.currentEv = ev;
        let interval = tool.animInterval;
        tool.timeout = setTimeout(function draw() {
            tool.toolDraw();
            if (!tool.timeout) return;
            tool.timeout = setTimeout(draw, interval);
        }, interval);
        tool.toolDraw();
    };

    this.mousemove = function(ev) {
        if (tool.isDown) {
            tool.distanceFromPrev = tool.previousEv ? distanceBetween(tool.previousEv, ev) : Number.MAX_VALUE;;
            tool.previousEv = tool.currentEv;
            tool.currentEv = ev;
            tool.toolDraw();
        };
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.postprocess();
            tool.isDown = false;
            if (tool.timeout) {
                clearTimeout(tool.timeout);
                tool.timeout = null;
            }
            tool.currentEv = null;
            tool.previousEv = null;
            tool.distanceFromPrev = null;
            tool.step = 0;
            KiddoPaint.Display.saveMain();
        }
    };

    this.toolDraw = function() {
        if (tool.isDown) {
            let ev = tool.currentEv;
            var brushFill = tool.texture(tool.step, tool.distanceFromPrev);
            let lx = ev._x;
            let ly = ev._y;
            if (brushFill.offset) {
                lx = lx - brushFill.offset;
                ly = ly - brushFill.offset;
            } else if (brushFill.abspos) {
                lx = brushFill.abspos.x;
                ly = brushFill.abspos.y;
            }
            KiddoPaint.Display.context.drawImage(brushFill.brush, lx, ly);
            tool.step += 1;
        }
    };
};
KiddoPaint.Tools.AnimBrush = new KiddoPaint.Tools.Toolbox.AnimBrush();