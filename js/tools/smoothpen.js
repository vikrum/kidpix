KiddoPaint.Tools.Toolbox.SmoothPen = function() {
    var tool = this;
    this.isDown = false;
    this.previousEv = null;
    this.spacing = 25;
    this.points = [];
    this.rainbowMode = false;

    this.size = function() {
        return KiddoPaint.Tools.Pencil.size;
    }

    this.texture = function() {
        tool.rainbowMode = KiddoPaint.Tools.Pencil.texture.toString().includes('RSolid');
        return KiddoPaint.Tools.Pencil.texture();
    };

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.points = [];
    };

    this.mousemove = function(ev) {
        if (tool.isDown) {
            if (tool.previousEv == null || distanceBetween(tool.previousEv, ev) > tool.spacing) {
                tool.points.push([ev._x, ev._y]);
                tool.previousEv = ev;
            }
            renderFitLine(KiddoPaint.Display.previewContext);
        }
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            tool.points.push([ev._x, ev._y]);
            KiddoPaint.Display.clearPreview();
            renderFitLine(KiddoPaint.Display.context);
            KiddoPaint.Display.saveMain();
        }
    };

    function offsetPoints(bezPoints, xoffsetAmount, yoffsetAmount, index) {
        var colors = KiddoPaint.Colors.rainbowPalette();
        var startPt = bezPoints[0];
        var ctrl1 = bezPoints[1];
        var ctrl2 = bezPoints[2];
        var stopPt = bezPoints[3];

        return [
            [startPt[0] + xoffsetAmount, startPt[1] + yoffsetAmount],
            [ctrl1[0] + xoffsetAmount, ctrl1[1] + yoffsetAmount],
            [ctrl2[0] + xoffsetAmount, ctrl2[1] + yoffsetAmount],
            [stopPt[0] + xoffsetAmount, stopPt[1] + yoffsetAmount],
            colors[index]
        ];
    }

    function renderFitLine(ctx) {
        var fitted = fitCurve(tool.points, 75);
        if (fitted) {
            ctx.strokeStyle = tool.texture();
            ctx.lineWidth = tool.size();
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            var lines = tool.rainbowMode ? 7 : 1;

            fitted.forEach(element => {
                for (var i = 0; i < lines; i++) {
                    var offsetElement = offsetPoints(element, 0, 11 * i, i);

                    var startPt = offsetElement[0];
                    var ctrl1 = offsetElement[1];
                    var ctrl2 = offsetElement[2];
                    var stopPt = offsetElement[3];
                    var rainbowColor = tool.rainbowMode ? offsetElement[4] : null;

                    ctx.beginPath();
                    if (rainbowColor) {
                        ctx.strokeStyle = rainbowColor;
                    }
                    ctx.moveTo(startPt[0], startPt[1]);
                    ctx.bezierCurveTo(ctrl1[0], ctrl1[1], ctrl2[0], ctrl2[1], stopPt[0], stopPt[1]);
                    ctx.stroke();
                    ctx.closePath();

                }

            });
        }
    }
};
KiddoPaint.Tools.SmoothPen = new KiddoPaint.Tools.Toolbox.SmoothPen();