KiddoPaint.Tools.Toolbox.Pencil = function() {
    this.size = 7;
    this.spacing = 2;
    this.texture = function() {
        return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
    };

    this.mousedown = function(ev) {
        true ? KiddoPaint.Tools.LinePencil.mousedown(ev) : KiddoPaint.Tools.PixelPencil.mousedown(ev);
    };

    this.mousemove = function(ev) {
        true ? KiddoPaint.Tools.LinePencil.mousemove(ev) : KiddoPaint.Tools.PixelPencil.mousemove(ev);
    };

    this.mouseup = function(ev) {
        true ? KiddoPaint.Tools.LinePencil.mouseup(ev) : KiddoPaint.Tools.PixelPencil.mouseup(ev);
    };
};
KiddoPaint.Tools.Pencil = new KiddoPaint.Tools.Toolbox.Pencil();

KiddoPaint.Tools.Toolbox.PixelPencil = function() {
    var tool = this;
    this.isDown = false;
    this.size = function() {
        return KiddoPaint.Tools.Pencil.size * (1 + KiddoPaint.Current.modifiedRange / 100.0);
    }
    this.previousEv = null;
    this.spacing = 3;
    this.texture = function() {
        return KiddoPaint.Tools.Pencil.texture();
    };

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.mousemove(ev);
        tool.previousEv = ev;
    };

    this.mousemove = function(ev) {
        var ctx = tool.isDown ? KiddoPaint.Display.context : KiddoPaint.Display.previewContext;
        ctx.fillStyle = tool.texture();
        if (KiddoPaint.Current.modifiedAlt) {
            ev._x = ev._x - (ev._x % (tool.size()));
            ev._y = ev._y - (ev._y % (tool.size()));
        }
        if (tool.previousEv == null || distanceBetween(tool.previousEv, ev) < tool.spacing) {
            ctx.fillRect(Math.round(ev._x), Math.round(ev._y), tool.size(), tool.size());
        } else {
            bresenham(tool.previousEv._x, tool.previousEv._y, ev._x, ev._y, function(x, y) {
                ctx.fillRect(Math.round(ev._x), Math.round(ev._y), tool.size(), tool.size());
            });
        }
        tool.previousEv = ev;
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

KiddoPaint.Tools.PixelPencil = new KiddoPaint.Tools.Toolbox.PixelPencil();

KiddoPaint.Tools.Toolbox.LinePencil = function() {
    var tool = this;
    this.isDown = false;
    this.lastX = 0;
    this.lastY = 0;
    this.size = function() {
        return (KiddoPaint.Tools.Pencil.size * (1 + KiddoPaint.Current.modifiedRange / 100.0)) * KiddoPaint.Current.scaling;
    }

    this.texture = function() {
        return KiddoPaint.Tools.Pencil.texture();
    };

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.lastX = ev._x;
        tool.lastY = ev._y;
    };

    this.mousemove = function(ev) {
        if (tool.isDown) {
            KiddoPaint.Sounds.pencil();
            KiddoPaint.Display.context.beginPath();
            KiddoPaint.Display.context.strokeStyle = tool.texture();
            KiddoPaint.Display.context.lineWidth = tool.size();
            KiddoPaint.Display.context.lineCap = 'round';
            KiddoPaint.Display.context.lineJoin = 'round';
            KiddoPaint.Display.context.moveTo(tool.lastX, tool.lastY);
            KiddoPaint.Display.context.lineTo(ev._x, ev._y);
            KiddoPaint.Display.context.stroke();
            tool.lastX = ev._x;
            tool.lastY = ev._y;
        }
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.mousemove(ev);
            KiddoPaint.Display.context.closePath();
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
        }
    };
};
KiddoPaint.Tools.LinePencil = new KiddoPaint.Tools.Toolbox.LinePencil();