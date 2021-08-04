KiddoPaint.Brushes.Circles = function() {
    var flip = 0;

    return function(color1, color2, alwaysFill) {
        color1 = color1 || 'black';
        color2 = color2 || color1;
        alwaysFill = alwaysFill || false;
        let size = 20 * KiddoPaint.Current.scaling;

        var canvasBrush = document.createElement('canvas');
        canvasBrush.width = size * 2;
        canvasBrush.height = size * 2;
        var contextBrush = canvasBrush.getContext('2d');

        contextBrush.beginPath();
        contextBrush.arc(size, size, size / 2, 0, 2 * Math.PI);
        if (alwaysFill || flip % 2 == 0) {
            contextBrush.fillStyle = color1;
            contextBrush.fill();
        }
        contextBrush.lineWidth = 2;
        contextBrush.strokeStyle = color2;
        contextBrush.stroke();
        contextBrush.closePath();
        flip++;

        return {
            brush: canvasBrush,
            offset: size
        };
    }
}();

KiddoPaint.Brushes.RCircles = function() {
    var color1 = KiddoPaint.Colors.randomColor();
    var color2 = KiddoPaint.Colors.randomColor();
    return KiddoPaint.Brushes.Circles(color1, color2, true);
}