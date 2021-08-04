KiddoPaint.Tools.Toolbox.Guilloche = function() {
    var tool = this;
    this.isDown = false;
    this.connected = true;
    this.texture = function() {
        // XXX TODO FIXME add double click menu to select texture - it looks super cool
        //        return KiddoPaint.Textures.Sand(KiddoPaint.Current.color);
        return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
    };

    this.mousedown = function(ev) {
        var outradius = (41 + 64 * Math.random()) * KiddoPaint.Current.scaling;
        var inradius = (21 + 42 * Math.random()) * KiddoPaint.Current.scaling;
        var r = -5 * Math.random(),
            Q = 7 * Math.random(),
            m = 5 * Math.random(),
            n = 10 * Math.random();

        tool.isDown = true;
        KiddoPaint.Sounds.brushguil();
        KiddoPaint.Display.context.beginPath();

        KiddoPaint.Display.context.lineWidth = 0.5;
        KiddoPaint.Display.context.strokeStyle = tool.texture();
        KiddoPaint.Display.context.fillStyle = tool.texture();

        for (var i = 0; i < Math.PI * 4; i += 0.007) {
            var coord = guil(outradius, r, m, i, inradius, Q, m, n);
            if (tool.connected) {
                KiddoPaint.Display.context.lineTo(Math.round(ev._x + coord.x), Math.round(ev._y + coord.y));
            } else {
                KiddoPaint.Display.context.fillRect(Math.round(ev._x + coord.x), Math.round(ev._y + coord.y), 1, 1);
            }
        }
        KiddoPaint.Display.context.stroke();
        KiddoPaint.Display.context.closePath();
    };

    this.mousemove = function(ev) {};
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
        }
    };
};
KiddoPaint.Tools.Guilloche = new KiddoPaint.Tools.Toolbox.Guilloche();