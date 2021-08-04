KiddoPaint.Tools.Toolbox.Spiral = function() {
    var tool = this;
    this.isDown = false;

    this.mousedown = function(ev) {
        tool.isDown = true;
        drawSpiral(ev._x, ev._y)
        processMainCanvas();
    };

    this.mousemove = function(ev) {};

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
        }
    };
};
KiddoPaint.Tools.Spiral = new KiddoPaint.Tools.Toolbox.Spiral();

KiddoPaint.Current.kdspiral = {};

function drawSpiral(cx, cy) {
    var width = 5000;
    var height = 5000;

    var phi = (Math.sqrt(5) + 1) / 2 - 1;
    var golden_angle = phi * 2 * Math.PI;

    var lg_area = width * height;

    var points = [];

    var sm_area = golden_angle * 3;
    var nbr_circles = lg_area / sm_area;

    for (var i = 1; i <= nbr_circles; ++i) {
        var angle = i * golden_angle;
        var cum_area = i * sm_area;
        var spiral_rad = Math.sqrt(cum_area / Math.PI);
        var x = cx + Math.cos(angle) * spiral_rad;
        var y = cy + Math.sin(angle) * spiral_rad;
        points.push({
            x: x,
            y: y
        });
        //KiddoPaint.Display.context.fillRect(Math.round(x), Math.round(y), 1, 1);
    }

    var distance = function(a, b) {
        return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
    }
    KiddoPaint.Current.kdspiral = new kdTree(points, distance, ["x", "y"]);
}

function processMainCanvas() {
    var w = KiddoPaint.Display.main_canvas.width;
    var h = KiddoPaint.Display.main_canvas.height;

    var pixels = KiddoPaint.Display.main_context.getImageData(0, 0, w, h);

    function isBlack(n) {
        return pixels.data[n] == 0 &&
            pixels.data[n + 1] == 0 &&
            pixels.data[n + 2] == 0 &&
            pixels.data[n + 3] == 255;
    }

    function isTransparent(n) {
        return pixels.data[n + 3] == 0;
    }

    function isWhite(n) {
        return pixels.data[n] == 255 &&
            pixels.data[n + 1] == 255 &&
            pixels.data[n + 2] == 255 &&
            pixels.data[n + 3] == 255;
    }

    function isAlone(x, y) {
        var above = (((y - 1) * w + x) * 4);
        var abover = (((y - 1) * w + (x + 1)) * 4);
        var abovel = (((y - 1) * w + (x - 1)) * 4);

        var below = (((y + 1) * w + x) * 4);
        var belowr = (((y + 1) * w + (x + 1)) * 4);
        var belowl = (((y + 1) * w + (x - 1)) * 4);

        var left = ((y * w + (x - 1)) * 4);
        var right = ((y * w + (x + 1)) * 4);

        return isBlack(above) &&
            isBlack(below) &&
            isBlack(right) &&
            isBlack(left) &&
            isBlack(abover) &&
            isBlack(abovel) &&
            isBlack(belowr) &&
            isBlack(belowl);
    }

    var snaptospiral = [];
    for (i = 1; i < w - 1; i++) {
        for (j = 1; j < h - 1; j++) {
            var linear_cords = 4 * (j * w + i);

            if (isWhite(linear_cords) && isAlone(i, j)) {
                // turn off
                pixels.data[linear_cords + 0] = 0;
                pixels.data[linear_cords + 1] = 0;
                pixels.data[linear_cords + 2] = 0;
                pixels.data[linear_cords + 3] = 255;

                // look for closes
                var nearest = KiddoPaint.Current.kdspiral.nearest({
                    x: i,
                    y: j
                }, 1);
                snaptospiral.push(nearest[0][0]);
            }
        }
    }
    KiddoPaint.Display.clearMain();
    KiddoPaint.Display.main_context.putImageData(pixels, 0, 0);
    KiddoPaint.Display.context.fillStyle = 'white';
    //    console.log(snaptospiral.length);
    snaptospiral.forEach(element => KiddoPaint.Display.context.fillRect(Math.round(element.x), Math.round(element.y), 1, 1));
}