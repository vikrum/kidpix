KiddoPaint.Tools.Toolbox.Pines = function() {
    var tool = this;
    this.isDown = false;
    this.previousEv = null;
    this.texture = function() {
        return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
    };
    this.spacing = 3;
    this.strokeSize = 1;
    this.boundingBox = 25;
    this.jitter = function() {
        return getRandomFloat(-tool.boundingBox, tool.boundingBox);
    };

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.previousEv = ev;
    };

    this.mousemove = function(ev) {
        if (tool.isDown) {
            if (tool.previousEv == null || distanceBetween(tool.previousEv, ev) > tool.spacing) {
                KiddoPaint.Sounds.brushpines();
                jitterx = tool.jitter();
                jittery = tool.jitter();
                for (let i = 0; i < 7; i++) {
                    KiddoPaint.Display.context.beginPath();
                    KiddoPaint.Display.context.moveTo(ev._x, ev._y);
                    KiddoPaint.Display.context.lineTo(tool.previousEv._x + jitterx, tool.previousEv._y + jittery);
                    KiddoPaint.Display.context.strokeStyle = tool.texture();
                    KiddoPaint.Display.context.lineWidth = tool.strokeSize;
                    KiddoPaint.Display.context.stroke();
                    KiddoPaint.Display.context.closePath();
                }
                tool.previousEv = ev;
            }
        }
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.mousemove(ev);
            tool.isDown = false;
            tool.previousEv = null;
            KiddoPaint.Display.saveMain();
        }
    };
};
KiddoPaint.Tools.Pines = new KiddoPaint.Tools.Toolbox.Pines();