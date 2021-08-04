KiddoPaint.Brushes.Triangles = function() {
    let size = 35 * KiddoPaint.Current.scaling;

    var canvasBrush = document.createElement('canvas');
    canvasBrush.width = size * 2;
    canvasBrush.height = size * 2;
    var contextBrush = canvasBrush.getContext('2d');

    for (let i = 0; i < (1 + getRandomInt(1, 3)); i++) {
        contextBrush.beginPath();
        contextBrush.moveTo(getRandomFloat(0, size), getRandomFloat(0, size));
        contextBrush.lineTo(getRandomFloat(0, size), getRandomFloat(0, size));
        contextBrush.lineTo(getRandomFloat(0, size), getRandomFloat(0, size));
        contextBrush.closePath();
        contextBrush.fillStyle = KiddoPaint.Colors.randomAllColor();
        contextBrush.fill();
    }

    return {
        brush: canvasBrush,
        offset: size / 2.0,
    };
}