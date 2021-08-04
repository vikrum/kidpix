KiddoPaint.Brushes.Splatters = function() {
    let size = 27 * KiddoPaint.Current.scaling;

    var canvasBrush = document.createElement('canvas');
    canvasBrush.width = size * 2;
    canvasBrush.height = size * 2;
    var contextBrush = canvasBrush.getContext('2d');

    for (let i = 0; i < (2 + getRandomInt(1, 3)); i++) {
        let csize = getRandomFloat(1, 7);
        contextBrush.beginPath();
        contextBrush.arc(size + getRandomFloat(-size / 2.0, size / 2.0), size + getRandomFloat(-size / 2.0, size / 2.0), csize, 0, 2 * Math.PI);
        contextBrush.fillStyle = KiddoPaint.Colors.randomAllColor();
        contextBrush.fill();
        //contextBrush.lineWidth = 2;
        //contextBrush.strokeStyle = color2;
        //contextBrush.stroke();
        contextBrush.closePath();

    }

    return {
        brush: canvasBrush,
        offset: size / 2.0,
    };
}