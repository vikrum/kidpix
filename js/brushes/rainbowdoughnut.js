KiddoPaint.Brushes.RainbowDoughnut = function(step) { // https://stackoverflow.com/questions/22223950/angle-gradient-in-canvas
    var canvas = document.createElement('canvas');
    var size = 32 * KiddoPaint.Current.scaling;
    canvas.width = size * 2;
    canvas.height = size * 2;
    var ctx = canvas.getContext('2d');

    function drawMultiRadiantCircle(xc, yc, r, radientColors) {
        var partLength = (2 * Math.PI) / radientColors.length;
        var start = 0;
        var gradient = null;
        var startColor = null,
            endColor = null;

        for (var i = 0; i < radientColors.length; i++) {
            startColor = radientColors[i];
            endColor = radientColors[(i + 1) % radientColors.length];

            // x start / end of the next arc to draw
            var xStart = xc + Math.cos(start) * r;
            var xEnd = xc + Math.cos(start + partLength) * r;
            // y start / end of the next arc to draw
            var yStart = yc + Math.sin(start) * r;
            var yEnd = yc + Math.sin(start + partLength) * r;

            ctx.beginPath();

            gradient = ctx.createLinearGradient(xStart, yStart, xEnd, yEnd);
            gradient.addColorStop(0, startColor);
            gradient.addColorStop(1.0, endColor);

            ctx.strokeStyle = gradient;
            ctx.arc(xc, yc, r, start, start + partLength);
            ctx.lineWidth = size / 4;
            ctx.stroke();
            ctx.closePath();

            start += partLength;
        }
    }

    var someColors = [];
    someColors.push('#0F0');
    someColors.push('#0FF');
    someColors.push('#F00');
    someColors.push('#FF0');
    someColors.push('#F0F');

    drawMultiRadiantCircle(size / 2, size / 2, size / 3, someColors);

    return {
        brush: canvas,
        offset: size / 2.0
    };
}