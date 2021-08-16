KiddoPaint.Tools.Toolbox.Astroid = function() {
    var tool = this;
    this.size = 1;
    this.stroke = function() {
        return KiddoPaint.Current.color;
    };
    this.points = [];

    // http://mathworld.wolfram.com/Astroid.html
    this.drawAstroid = function(pt1, pt2, pt3) {
        var interval = 37 * KiddoPaint.Current.scaling;

        seg1deltax = (pt2.x - pt1.x) / interval;
        seg1deltay = (pt2.y - pt1.y) / interval;

        seg2deltax = (pt3.x - pt2.x) / interval;
        seg2deltay = (pt3.y - pt2.y) / interval;

        for (var i = 0; i <= interval; i++) {
            var a1 = {
                x: pt1.x + (seg1deltax * i),
                y: pt1.y + (seg1deltay * i)
            };
            var a2 = {
                x: pt2.x + (seg2deltax * i),
                y: pt2.y + (seg2deltay * i)
            };
            KiddoPaint.Display.context.beginPath();
            KiddoPaint.Display.context.lineWidth = tool.size;
            KiddoPaint.Display.context.moveTo(Math.round(a1.x), Math.round(a1.y));
            KiddoPaint.Display.context.lineTo(Math.round(a2.x), Math.round(a2.y));
            if (KiddoPaint.Current.modifiedMeta) {
                KiddoPaint.Display.context.strokeStyle = KiddoPaint.Colors.randomColor();
            } else if (KiddoPaint.Current.modifiedCtrl) {
                KiddoPaint.Display.context.strokeStyle = ((i % 2) ? KiddoPaint.Current.color : KiddoPaint.Current.altColor);
            } else {
                KiddoPaint.Display.context.strokeStyle = KiddoPaint.Current.color;
            }
            KiddoPaint.Display.context.stroke();
            KiddoPaint.Display.context.closePath();
        }
    }

    this.mousedown = function(ev) {
        KiddoPaint.Sounds.xyStart();
        tool.points.push({
            x: ev._x,
            y: ev._y
        });
    };

    this.mousemove = function(ev) {
        KiddoPaint.Display.clearTmp();
        if (tool.points.length == 1) {
            KiddoPaint.Sounds.xyDuring();
            KiddoPaint.Display.context.beginPath();
            KiddoPaint.Display.context.moveTo(Math.round(tool.points[0].x), Math.round(tool.points[0].y));
            KiddoPaint.Display.context.lineTo(ev._x, ev._y);
            KiddoPaint.Display.context.strokeStyle = tool.stroke();
            KiddoPaint.Display.context.lineWidth = tool.size;
            KiddoPaint.Display.context.stroke();
            KiddoPaint.Display.context.closePath();
        } else if (tool.points.length == 2) {
            KiddoPaint.Sounds.xyDuring();
            tool.drawAstroid(tool.points[0], tool.points[1], {
                x: ev._x,
                y: ev._y
            });
        }
    };

    this.mouseup = function(ev) {
        if (tool.points.length == 3) {
            KiddoPaint.Sounds.xyEnd();
            KiddoPaint.Display.clearTmp();
            tool.drawAstroid(tool.points[0], tool.points[1], {
                x: ev._x,
                y: ev._y
            });
            tool.points = [];
            KiddoPaint.Display.saveMain();
        }
    };
};
KiddoPaint.Tools.Astroid = new KiddoPaint.Tools.Toolbox.Astroid();