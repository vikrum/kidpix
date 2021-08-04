// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing/Example#Compositing_example

var lightMix = function() {
    var canvas2 = document.createElement("canvas");
    canvas2.width = 360;
    canvas2.height = 360;
    var ctx = canvas2.getContext("2d");
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.beginPath();
    ctx.fillStyle = KiddoPaint.Current.color;
    ctx.arc(100, 200, 100, Math.PI * 2, 0, false);
    ctx.fill()
    ctx.beginPath();
    ctx.fillStyle = KiddoPaint.Current.altColor;
    ctx.arc(220, 200, 100, Math.PI * 2, 0, false);
    ctx.fill()
    ctx.beginPath();
    ctx.fillStyle = KiddoPaint.Current.terColor;
    ctx.arc(160, 100, 100, Math.PI * 2, 0, false);
    ctx.fill();
    ctx.restore();
    return ctx.canvas;
};

var colorSphere = function() {
    var canvas1 = document.createElement("canvas");
    canvas1.width = 360;
    canvas1.height = 360;
    var ctx = canvas1.getContext("2d");
    var width = 360;
    var halfWidth = width / 2;
    var rotate = (1 / 360) * Math.PI * 2; // per degree
    var oleft = -20;
    var otop = -20;
    for (var n = 0; n <= 359; n++) {
        var gradient = ctx.createLinearGradient(oleft + halfWidth, otop, oleft + halfWidth, otop + halfWidth);
        var color = Color.HSV_RGB({
            H: (n + 300) % 360,
            S: 100,
            V: 100
        });
        gradient.addColorStop(0, KiddoPaint.Current.modifiedToggle ? "rgba(255, 255, 255, 0)" : "rgba(0, 0, 0, 0)");
        //gradient.addColorStop(0, color2cssWithAlpha(KiddoPaint.Current.terColor, '0'));
        gradient.addColorStop(0.7, "rgba(" + color.R + "," + color.G + "," + color.B + ",1)");
        gradient.addColorStop(1, "rgba(255,255,255,1)");
        //gradient.addColorStop(0, color2cssWithAlpha(KiddoPaint.Current.altColor, '1'));
        ctx.beginPath();
        ctx.moveTo(oleft + halfWidth, otop);
        ctx.lineTo(oleft + halfWidth, otop + halfWidth);
        ctx.lineTo(oleft + halfWidth + 6, otop);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.translate(oleft + halfWidth, otop + halfWidth);
        ctx.rotate(rotate);
        ctx.translate(-(oleft + halfWidth), -(otop + halfWidth));
    }
    return ctx.canvas;
};


// HSV (1978) = H: Hue / S: Saturation / V: Value
Color = {};
Color.HSV_RGB = function(o) {
    var H = o.H / 360,
        S = o.S / 100,
        V = o.V / 100,
        R, G, B;
    var A, B, C, D;
    if (S == 0) {
        R = G = B = Math.round(V * 255);
    } else {
        if (H >= 1) H = 0;
        H = 6 * H;
        D = H - Math.floor(H);
        A = Math.round(255 * V * (1 - S));
        B = Math.round(255 * V * (1 - (S * D)));
        C = Math.round(255 * V * (1 - (S * (1 - D))));
        V = Math.round(255 * V);
        switch (Math.floor(H)) {
            case 0:
                R = V;
                G = C;
                B = A;
                break;
            case 1:
                R = B;
                G = V;
                B = A;
                break;
            case 2:
                R = A;
                G = V;
                B = C;
                break;
            case 3:
                R = A;
                G = B;
                B = V;
                break;
            case 4:
                R = C;
                G = A;
                B = V;
                break;
            case 5:
                R = V;
                G = A;
                B = B;
                break;
        }
    }
    return {
        R: R,
        G: G,
        B: B
    };
};

function makeComposite(gco) {
    var dest = document.createElement("canvas");
    dest.width = 360;
    dest.height = 360;
    var ctx = dest.getContext('2d');
    ctx.drawImage(colorSphere(), 0, 0);
    ctx.globalCompositeOperation = gco;
    ctx.drawImage(lightMix(), 0, 0);
    return dest;
}