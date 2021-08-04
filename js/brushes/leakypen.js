KiddoPaint.Brushes.LeakyPen = function() {
    var prevSize = 3;
    var baseSize = 3;
    var maxSize = Math.PI * baseSize * Math.E;

    return function(color1, distPrev) {
        color1 = color1 || 'black';
        if (distPrev < 2) {
            if (prevSize < maxSize) {
                prevSize += 0.095;
            }
        } else {
            prevSize = baseSize;
        }

        let size = prevSize * KiddoPaint.Current.scaling;

        var canvasBrush = document.createElement('canvas');
        canvasBrush.width = size * 4.5;
        canvasBrush.height = size * 4.5;
        var contextBrush = canvasBrush.getContext('2d');

        contextBrush.beginPath();
        contextBrush.ellipse(size * 1.5, size * 1.5, size, size, Math.PI / 4, 0, 2 * Math.PI);
        contextBrush.fillStyle = color1;
        contextBrush.fill();
        contextBrush.closePath();

        return {
            brush: canvasBrush,
            offset: canvasBrush.width / 2
        };
    }
}();