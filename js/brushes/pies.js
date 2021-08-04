KiddoPaint.Brushes.Pies = function(color1) {
    color1 = color1 || 'black';

    var canvasBrush = document.createElement('canvas');
    var size = 20 * KiddoPaint.Current.scaling;
    canvasBrush.width = size * 2;
    canvasBrush.height = size * 2;
    var contextBrush = canvasBrush.getContext('2d');

    contextBrush.beginPath();
    contextBrush.arc(size, size, size, 0, Math.PI * 2);
    contextBrush.fillStyle = color1;
    if (KiddoPaint.Current.modifiedMeta) {
        contextBrush.stroke();
    } else {
        contextBrush.fill();
    }
    contextBrush.closePath();

    contextBrush.globalCompositeOperation = 'destination-out';
    contextBrush.beginPath();
    contextBrush.fillStyle = color1;
    offset = Math.random() * 2 * Math.PI;
    contextBrush.arc(size, size, size + 2, 0 + offset, ((0.5 + Math.random() - 0.5) * Math.PI) + offset);
    contextBrush.lineTo(size, size);
    contextBrush.fill();

    return {
        brush: canvasBrush,
        offset: size
    };
}