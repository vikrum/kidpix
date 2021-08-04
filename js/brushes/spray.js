KiddoPaint.Brushes.Spray = function(color1, color2) {
    color1 = color1 || 'black';
    color2 = color2 || 'black';

    var radius = 10 * KiddoPaint.Current.scaling * KiddoPaint.Current.multiplier;
    var density = 128 * KiddoPaint.Current.scaling * KiddoPaint.Current.multiplier;

    var canvasBrush = document.createElement('canvas');
    canvasBrush.width = radius * 2;
    canvasBrush.height = radius * 2;
    var contextBrush = canvasBrush.getContext('2d');
    contextBrush.fillStyle = color1;

    function ring() {
        var theta = Math.random() * 2 * Math.PI;
        var r1 = radius;
        var r2 = radius * 0.75;
        var rp = Math.random() + 0.33;

        var dist = Math.sqrt(Math.abs(ziggurat()) * ((r1 * r1) - (r2 * r2)) + (r2 * r2))
        var xr = dist * Math.cos(theta);
        var yr = dist * Math.sin(theta);
        contextBrush.fillRect(radius + xr, radius + yr, rp, rp);
    }

    function disc() {
        // disc
        var rr = ziggurat() * radius * 1.1;
        var ra = Math.random() * 2 * Math.PI;
        var rp = Math.random();
        var x = Math.cos(ra) * rr;
        var y = Math.sin(ra) * rr;
        contextBrush.fillRect(radius + x, radius + y, rp, rp);
    }

    function experiment() {
        var pts = boxmuller();
        contextBrush.fillRect(radius + pts[0] * radius, radius + pts[1] * radius, 0.7, 0.7);
    }

    for (var i = 0; i < density; i++) {
        if (KiddoPaint.Current.modifiedToggle) {
            contextBrush.fillStyle = color1;
            if (KiddoPaint.Current.modifiedMeta) {
                contextBrush.globalAlpha = Math.random() / 4;
            } else {
                contextBrush.globalAlpha = Math.random() / 2;
            }
            ring();
            if (KiddoPaint.Current.modifiedMeta) {
                contextBrush.globalAlpha = Math.random() / 3;
                contextBrush.fillStyle = color2;
                disc();
            }
        } else {
            contextBrush.globalAlpha = Math.random() / 2;
            disc();
        }
    }
    return {
        brush: canvasBrush,
        offset: radius
    };
}