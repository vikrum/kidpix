KiddoPaint.Tools.Toolbox.Guilloche = function() {
    var tool = this;
    this.isDown = false;
    this.minDistance = 50;
    this.previousEv = null;
    this.randomSettings = {};
    this.texture = function() {
        // XXX TODO FIXME add double click menu to select texture - it looks super cool
        //        return KiddoPaint.Textures.Sand(KiddoPaint.Current.color);
        return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
    };

    this.mousedown = function(ev) {
        tool.randomSettings = {
            outradius: (41 + 64 * Math.random()) * KiddoPaint.Current.scaling,
            inradius: (21 + 42 * Math.random()) * KiddoPaint.Current.scaling,
            r: -5 * Math.random(),
            Q: 7 * Math.random(),
            m: 5 * Math.random(),
            n: 10 * Math.random()
        };

        tool.isDown = true;
        tool.mousemove(ev);
    };

    this.mousemove = function(ev) {

        if (!tool.isDown) return;

        if (tool.previousEv == null || distanceBetween(tool.previousEv, ev) > tool.minDistance) {

            KiddoPaint.Sounds.brushguil();
            KiddoPaint.Display.context.beginPath();

            KiddoPaint.Display.context.lineWidth = 0.5;
            KiddoPaint.Display.context.strokeStyle = tool.texture();
            KiddoPaint.Display.context.fillStyle = tool.texture();

            for (var i = 0; i < Math.PI * 4; i += 0.007) {
                var coord = guil(tool.randomSettings.outradius, tool.randomSettings.r, tool.randomSettings.m, i, tool.randomSettings.inradius, tool.randomSettings.Q, tool.randomSettings.m, tool.randomSettings.n);
                if (KiddoPaint.Current.modifiedMeta) {
                    KiddoPaint.Display.context.fillRect(Math.round(ev._x + coord.x), Math.round(ev._y + coord.y), 1, 1);
                } else {
                    KiddoPaint.Display.context.lineTo(Math.round(ev._x + coord.x), Math.round(ev._y + coord.y));
                }
            }
            KiddoPaint.Display.context.stroke();
            KiddoPaint.Display.context.closePath();
            tool.previousEv = ev;
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            tool.previousEv = null;
            tool.randomSettings = {};
            KiddoPaint.Display.saveMain();
        }
    };
};
KiddoPaint.Tools.Guilloche = new KiddoPaint.Tools.Toolbox.Guilloche();