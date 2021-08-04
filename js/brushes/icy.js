KiddoPaint.Brushes.Icy = function(color1) {
    color1 = color1 || 'black';

    var radius = 32 * KiddoPaint.Current.scaling * KiddoPaint.Current.multiplier;
    var density = clamp(0, 2000, 600 * KiddoPaint.Current.scaling * KiddoPaint.Current.multiplier);

    var canvasBrush = document.createElement('canvas');
    canvasBrush.width = 32;
    canvasBrush.height = 400;
    var contextBrush = canvasBrush.getContext('2d');
    contextBrush.fillStyle = color1;

    function delicatespray() {
        var px = 0.4 * ((KiddoPaint.Current.multiplier < 6) ? 1 : 2);
        var x = randn_bm(-5, 5, 1);
        var y = randn_bm(-radius, radius, 5);
        contextBrush.fillRect(x, radius + y, px, px)
    }

    for (var i = 0; i < density; i++) {
        contextBrush.globalAlpha = Math.random() / 2;
        delicatespray();
    }

    return {
        brush: canvasBrush,
        offset: 0
    };
}