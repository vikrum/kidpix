KiddoPaint.Brushes.Rose = function(color1, step) {
    color1 = color1 || 'black';
    var interval = 257;
    var fraction = interval / 7;
    var k = 5;
    step = step % interval / interval;

    var canvasBrush = document.createElement('canvas');
    var size = 50 * KiddoPaint.Current.scaling;
    canvasBrush.width = size * 2;
    canvasBrush.height = size * 2;
    var contextBrush = canvasBrush.getContext('2d');
    contextBrush.fillStyle = color1;
    contextBrush.strokeStyle = color1;

    for (var i = 0, s = step; i < 6; i++, s += fraction / interval) {
        x = size + (size * Math.cos(k * 2 * Math.PI * s) * Math.cos(2 * Math.PI * s));
        y = size + (size * Math.cos(k * 2 * Math.PI * s) * Math.sin(2 * Math.PI * s));
        //		contextBrush.fillRect(Math.round(x), Math.round(y), 3, 3);
        contextBrush.lineTo(x, y);
    }
    contextBrush.stroke();

    return {
        brush: canvasBrush,
        offset: size,
        inplace: true
    };
}