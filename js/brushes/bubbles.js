KiddoPaint.Brushes.Bubbles = function(color1) {
    color1 = color1 || 'black';

    var canvasBrush = document.createElement('canvas');
    var size = (20 * KiddoPaint.Current.scaling);
    canvasBrush.width = size * 2;
    canvasBrush.height = size * 2;
    var contextBrush = canvasBrush.getContext('2d');


    for (let i = -(size / 2); i < (size / 2); i += 4) {
        for (let j = -(size / 2); j < (size / 2); j += 4) {
            if (Math.random() > 0.5) {
                contextBrush.beginPath();
                contextBrush.arc(size + i, size + j, 4, 0, Math.PI * 2);
                contextBrush.strokeStyle = color1;
                contextBrush.lineWidth = 1;
                contextBrush.stroke();
                if (Math.random() > 0.35) {
                    contextBrush.fillStyle = color1;
                } else {
                    contextBrush.fillStyle = 'white';
                }
                contextBrush.fill();
                contextBrush.closePath();

            }
        }
    }

    return {
        brush: canvasBrush,
        offset: size
    };
}