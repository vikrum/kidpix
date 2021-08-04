KiddoPaint.Brushes.Raindrops = function(color1) {
    color1 = color1 || 'black';
    let size = (5 + (100 * Math.random())) * KiddoPaint.Current.scaling;

    var canvasBrush = document.createElement('canvas');
    canvasBrush.width = size * 2;
    canvasBrush.height = size * 2;
    var contextBrush = canvasBrush.getContext('2d');

    contextBrush.beginPath();
    contextBrush.arc(size, size, size / 2, 0, 2 * Math.PI);
    contextBrush.fillStyle = color1;
    contextBrush.fill();
    //contextBrush.lineWidth = 2;
    //contextBrush.strokeStyle = color2;
    //contextBrush.stroke();
    contextBrush.closePath();

    return {
        brush: canvasBrush,
        abspos: {
            x: getRandomFloat(-5, KiddoPaint.Display.canvas.width + 5),
            y: getRandomFloat(-5, KiddoPaint.Display.canvas.width + 5)
        }
    };
}