KiddoPaint.Tools.Toolbox.BezFollow = function() {
    var tool = this;
    this.isDown = false;
    this.previousEv = null;
    this.spacing = 25;
    this.synthtool = {};
    this.ylimit = {
        min: 5000,
        max: -1
    };
    this.points = [];

    this.size = function() {
        return KiddoPaint.Tools.Pencil.size;
    }

    this.texture = function() {
        return KiddoPaint.Tools.Pencil.texture();
    };

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.points = [];
        tool.mousemove(ev);
        tool.previousEv = ev;
    };

    this.mousemove = function(ev) {
        if (tool.isDown) {
            if (ev._y < tool.ylimit.min) {
                tool.ylimit.min = ev._y;
            }
            if (ev._y > tool.ylimit.max) {
                tool.ylimit.max = ev._y;
            }

            if (tool.previousEv == null || distanceBetween(tool.previousEv, ev) > tool.spacing) {
                tool.points.push([ev._x, ev._y]);
                tool.previousEv = ev;
            }
            tool.points.forEach(pt => {
                KiddoPaint.Display.previewContext.fillStyle = '#0f0';
                KiddoPaint.Display.previewContext.fillRect(pt[0], pt[1], 5, 5);
            })
        }
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            tool.points.push([ev._x, ev._y]);
            KiddoPaint.Display.clearPreview();

            // calling synthetic tools have their own propagation to main, so pause undo state capture
            KiddoPaint.Display.pauseUndo();
            bumpLimits(); // pad sizing and alpha a bit
            renderFitLine(KiddoPaint.Display.context);
            KiddoPaint.Display.resumeUndo();

            KiddoPaint.Display.saveMain();
            tool.ylimit = {
                min: 5000,
                max: -1
            };
        }
    };

    function bumpLimits() {
        tool.ylimit.min -= 15;
        tool.ylimit.max += 15;
    }

    function offsetPoints(bezPoints, offsetAmount) {
        var startPt = bezPoints[0];
        var ctrl1 = bezPoints[1];
        var ctrl2 = bezPoints[2];
        var stopPt = bezPoints[3];

        return [
            [startPt[0] + offsetAmount, startPt[1] + offsetAmount],
            [ctrl1[0] + offsetAmount, ctrl1[1] + offsetAmount],
            [ctrl2[0] + offsetAmount, ctrl2[1] + offsetAmount],
            [stopPt[0] + offsetAmount, stopPt[1] + offsetAmount],
        ];
    }

    function calculateInterval(startPt, ctrl1, ctrl2, stopPt) {
        var approxDistance = bezierLength(startPt, ctrl1, ctrl2, stopPt);
        return Math.round(approxDistance / 3.5);
    }

    function renderFitLine(ctx) {
        var fitted = fitCurve(tool.points, 25);
        if (fitted) {
            var oldMultiplier = KiddoPaint.Current.scaling;
            var oldAlpha = KiddoPaint.Display.context.globalAlpha;
            var lastSegmentEv = null;
            var startScaling = 5; // top heavy when start > end
            var endScaling = 1;
            var startAlpha = 0;
            var endAlpha = oldAlpha;

            fitted.forEach(element => {
                for (var i = 0; i < 1; i++) {
                    var offsetElement = offsetPoints(element, 11 * i);

                    var startPt = offsetElement[0];
                    var ctrl1 = offsetElement[1];
                    var ctrl2 = offsetElement[2];
                    var stopPt = offsetElement[3];

                    var fakeEv = getCubicBezierXYatPercent(startPt, ctrl1, ctrl2, stopPt, 0);
                    KiddoPaint.Current.scaling = remap(tool.ylimit.min, tool.ylimit.max, startScaling, endScaling, fakeEv._y);
                    KiddoPaint.Display.context.globalAlpha = remap(tool.ylimit.min, tool.ylimit.max, startAlpha, endAlpha, fakeEv._y);

                    if (!lastSegmentEv) {
                        tool.synthtool.mousedown(fakeEv);
                    } else {
                        tool.synthtool.mousemove(lastSegmentEv);
                    }

                    var interval = calculateInterval(startPt, ctrl1, ctrl2, stopPt);

                    for (var n = 0; n <= interval; n++) {
                        fakeEv = getCubicBezierXYatPercent(startPt, ctrl1, ctrl2, stopPt, n / (interval * 1.0));
                        KiddoPaint.Current.scaling = remap(tool.ylimit.min, tool.ylimit.max, startScaling, endScaling, fakeEv._y);
                        KiddoPaint.Display.context.globalAlpha = remap(tool.ylimit.min, tool.ylimit.max, startAlpha, endAlpha, fakeEv._y);

                        tool.synthtool.mousemove(fakeEv);
                        //KiddoPaint.Current.scaling *= 1.002;
                    }
                    fakeEv = getCubicBezierXYatPercent(startPt, ctrl1, ctrl2, stopPt, 1);
                    KiddoPaint.Current.scaling = remap(tool.ylimit.min, tool.ylimit.max, startScaling, endScaling, fakeEv._y);
                    KiddoPaint.Display.context.globalAlpha = remap(tool.ylimit.min, tool.ylimit.max, startAlpha, endAlpha, fakeEv._y);
                    tool.synthtool.mousemove(fakeEv);
                    lastSegmentEv = fakeEv;
                }
            });
            KiddoPaint.Current.scaling = remap(tool.ylimit.min, tool.ylimit.max, startScaling, endScaling, lastSegmentEv._y);
            tool.synthtool.mouseup(lastSegmentEv);

            // reset any changed values
            KiddoPaint.Current.scaling = oldMultiplier;
            KiddoPaint.Display.context.globalAlpha = oldAlpha;
        }
    }
};
KiddoPaint.Tools.BezFollow = new KiddoPaint.Tools.Toolbox.BezFollow();