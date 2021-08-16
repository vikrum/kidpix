KiddoPaint.Brushes.ConnectTheDots = function(color1, step) {
    color1 = color1 || 'black';

    var canvasBrush = document.createElement('canvas');
    canvasBrush.width = canvasBrush.height = 150;
    var contextBrush = canvasBrush.getContext('2d');

    contextBrush.font = '16px sans-serif';
    contextBrush.textBaseline = 'middle';
    contextBrush.textAlign = 'center';
    contextBrush.fillStyle = color1;
    let dotandnumber = '• ' + step;
    let textsize = contextBrush.measureText(dotandnumber);
    contextBrush.fillText(dotandnumber, 16, 16, canvasBrush.width); // 3rd arg tries to constrain width

    return {
        brush: trimCanvas3(canvasBrush),
        offset: 0
    };
}