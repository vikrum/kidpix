KiddoPaint.Builders.Prints = function(color1, print, angle) {
    color1 = color1 || 'black';
    angle = angle || 0;

    var canvasBrush = document.createElement('canvas');
    canvasBrush.width = 150 * KiddoPaint.Current.scaling;
    canvasBrush.height = 150 * KiddoPaint.Current.scaling;
    var contextBrush = canvasBrush.getContext('2d');

    contextBrush.save();
    contextBrush.translate(50 * KiddoPaint.Current.scaling, 50 * KiddoPaint.Current.scaling);
    contextBrush.rotate(angle);
    contextBrush.translate(-25 * KiddoPaint.Current.scaling, 0);
    contextBrush.font = (36 * KiddoPaint.Current.scaling) + 'px sans-serif';
    contextBrush.textBaseline = 'middle';
    contextBrush.textAlign = 'center';
    contextBrush.fillText(print, 0, 0);
    contextBrush.restore();

    // we need to do this for the paw/footprints because you can't change the color of an emoji font any more :(
    contextBrush.globalCompositeOperation = 'source-atop';
    contextBrush.fillStyle = color1;
    contextBrush.fillRect(0, 0, canvasBrush.width, canvasBrush.height);

    return {
        brush: trimCanvas3(canvasBrush),
        offset: 0
    };
}