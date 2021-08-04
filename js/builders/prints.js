KiddoPaint.Builders.Prints = function(color1, print, angle) {
    color1 = color1 || 'black';
    angle = angle || 0;

    var canvasBrush = document.createElement('canvas');
    canvasBrush.width = 100;
    canvasBrush.height = 100;
    var contextBrush = canvasBrush.getContext('2d');

    contextBrush.save();
    contextBrush.translate(50, 50);
    contextBrush.rotate(angle);
    contextBrush.translate(-25, 0);
    contextBrush.font = '36px sans-serif';
    contextBrush.fillText(print, 0, 0);
    contextBrush.restore();

    contextBrush.globalCompositeOperation = 'source-atop';
    contextBrush.fillStyle = color1;
    contextBrush.fillRect(0, 0, canvasBrush.width, canvasBrush.height);

    return trimCanvas(canvasBrush);
}