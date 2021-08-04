KiddoPaint.Stamps.stamp = function(stamp, alt, ctrl, size, shiftAmount, color) {
    stamp = stamp || '';
    var canvasBrush = document.createElement('canvas');
    canvasBrush.width = Math.max(size + (size * 0.05), 24);
    canvasBrush.height = Math.max(size + (size * 0.05), 24);
    canvasBrush.height += 0.15 * canvasBrush.height; // prevent clipping on bottom

    var contextBrush = canvasBrush.getContext('2d');
    contextBrush.font = size + 'px ' + KiddoPaint.Stamps.currentFace;
    if (color) { // chrome & safari compat hack
        contextBrush.fillStyle = color;
    }

    contextBrush.save();
    if (ctrl && alt) {
        contextBrush.scale(-1, 1);
        contextBrush.scale(1, -1);
        contextBrush.translate(-size, -size);
        contextBrush.fillText(stamp, 0, size - (0.15 * canvasBrush.height));
    } else if (ctrl) {
        contextBrush.scale(1, -1);
        contextBrush.fillText(stamp, 0, -0.15 * canvasBrush.height);
    } else if (alt) {
        contextBrush.translate(size, size);
        contextBrush.scale(-1, 1);
        contextBrush.fillText(stamp, 0, 0);
    } else {
        contextBrush.fillText(stamp, 0, size);
    }
    contextBrush.restore();

    if (shiftAmount != 0) {
        hueShift(canvasBrush, contextBrush, shiftAmount);
    }

    return canvasBrush;
}

KiddoPaint.Stamps.nextPage = function() {
    KiddoPaint.Stamps.page += 1;
    if (KiddoPaint.Stamps.page > KiddoPaint.Stamps.grouping.pages) {
        KiddoPaint.Stamps.page = 1;
    }
}

KiddoPaint.Stamps.prevPage = function() {
    KiddoPaint.Stamps.page -= 1;
    if (KiddoPaint.Stamps.page < 1) {
        KiddoPaint.Stamps.page = KiddoPaint.Stamps.grouping.pages;
    }
}