KiddoPaint.Builders.Road = function(color1, color2, angle) {
    color1 = color1 || 'black';
    color2 = (color2 === color1) ? 'yellow' : color2;
    angle = angle || 0;

    var canvasBrush = document.createElement('canvas');
    canvasBrush.width = 43;
    canvasBrush.height = 43;
    var contextBrush = canvasBrush.getContext('2d');

    contextBrush.beginPath();

    contextBrush.translate(21, 21);
    contextBrush.rotate(angle);
    contextBrush.translate(-15.5, -15.5);

    contextBrush.fillStyle = color1;
    contextBrush.fillRect(0, 0, 30, 40);

    contextBrush.fillStyle = color2;
    contextBrush.fillRect(13.5, 7.5, 3, 23);

    return canvasBrush;
}