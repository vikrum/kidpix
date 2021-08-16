KiddoPaint.Tools.Toolbox.ThreeDBrush = function() {
    var tool = this;
    this.isDown = false;
    this.size = function() {
        return 16 * KiddoPaint.Current.scaling;
    }
    this.previousEv = null;
    this.spacing = 3;
    this.texture = function() {
        let shadecolor = colorNearWhite(color2json(KiddoPaint.Current.color)) ? 'black' : 'white';
        if (KiddoPaint.Current.modifiedAlt) {
            return KiddoPaint.Textures.Bubbles(shadecolor);

        } else if (KiddoPaint.Current.modifiedCtrl) {
            return KiddoPaint.Textures.Speckles(shadecolor);

        } else if (KiddoPaint.Current.modifiedMeta) {
            return KiddoPaint.Textures.Sand(shadecolor);

        } else {
            return KiddoPaint.Textures.Partial1(shadecolor);
        }
    };

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.mousemove(ev);
        tool.previousEv = ev;
    };

    this.mousemove = function(ev) {
        if (tool.isDown) {
            if (KiddoPaint.Current.modifiedToggle) {
                ev._x = ev._x - (ev._x % (tool.size()));
                ev._y = ev._y - (ev._y % (tool.size()));
            }
            if (tool.previousEv == null || distanceBetween(tool.previousEv, ev) < tool.spacing) {
                KiddoPaint.Display.context.fillStyle = KiddoPaint.Current.color;
                KiddoPaint.Display.context.fillRect(Math.round(ev._x), Math.round(ev._y), tool.size(), tool.size());

                KiddoPaint.Display.context.fillStyle = tool.texture();
                KiddoPaint.Display.context.fillRect(Math.round(ev._x), Math.round(ev._y), tool.size() / 2, tool.size() / 2);
            } else {
                bresenham(tool.previousEv._x, tool.previousEv._y, ev._x, ev._y, function(lx, ly) {
                    KiddoPaint.Display.context.fillStyle = KiddoPaint.Current.color;
                    KiddoPaint.Display.context.fillRect(lx, ly, tool.size(), tool.size());

                    KiddoPaint.Display.context.fillStyle = tool.texture();
                    KiddoPaint.Display.context.fillRect(lx, ly, tool.size() / 2, tool.size() / 2);
                });
            }
            tool.previousEv = ev;
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
KiddoPaint.Tools.ThreeDBrush = new KiddoPaint.Tools.Toolbox.ThreeDBrush();