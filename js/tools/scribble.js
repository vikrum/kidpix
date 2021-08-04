KiddoPaint.Tools.Toolbox.Scribble = function() {
    var tool = this;
    this.isDown = false;
    this.previousEv = null;
    this.texture = function() {
        return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
    };
    this.spacing = 5;
    this.size = 1;
    this.jitter = function() {
        let baseJitter = KiddoPaint.Current.modifiedMeta ? 25 : 10;
        return baseJitter + (Math.random() * baseJitter);
    };

    this.mousedown = function(ev) {
        KiddoPaint.Sounds.brushzigzag();
        tool.isDown = true;
        KiddoPaint.Display.context.beginPath();
        KiddoPaint.Display.context.moveTo(ev._x, ev._y);
        tool.previousEv = ev;
    };

    this.mousemove = function(ev) {
        if (tool.isDown) {
            if (tool.previousEv == null || distanceBetween(tool.previousEv, ev) > tool.spacing) {
                KiddoPaint.Sounds.brushzigzag();
                jitterx = tool.jitter();
                jittery = tool.jitter();
                KiddoPaint.Display.context.lineTo(ev._x + (Math.random() * jitterx - jitterx / 2), ev._y + (Math.random() * jittery - jittery / 2));
                KiddoPaint.Display.context.strokeStyle = tool.texture();
                KiddoPaint.Display.context.lineWidth = tool.size;
                KiddoPaint.Display.context.stroke();
                tool.previousEv = ev;
            }
        }
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.mousemove(ev);
            tool.isDown = false;
            tool.previousEv = null;
            KiddoPaint.Display.context.closePath();
            KiddoPaint.Display.saveMain();
        }
    };
};
KiddoPaint.Tools.Scribble = new KiddoPaint.Tools.Toolbox.Scribble();