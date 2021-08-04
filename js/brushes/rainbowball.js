KiddoPaint.Brushes.RainbowBall = function(step) { // https://stackoverflow.com/questions/22223950/angle-gradient-in-canvas
    var canvas = document.createElement('canvas');
    var size = 100 * KiddoPaint.Current.scaling;
    canvas.width = size * 2;
    canvas.height = size * 2;
    var ctx = canvas.getContext('2d');

    var g1 = ctx.createRadialGradient(45, 45, 10, 52, 50, 30);
    g1.addColorStop(0, '#A7D30C');
    g1.addColorStop(0.9, '#019F62');
    g1.addColorStop(1, 'rgba(1,159,98,0)');
    var g2 = ctx.createRadialGradient(125, 45, 20, 132, 50, 30);
    g2.addColorStop(0, '#FF5F98');
    g2.addColorStop(0.75, '#FF0188');
    g2.addColorStop(1, 'rgba(255,1,136,0)');
    // draw shapes
    ctx.fillStyle = g1;
    //ctx.fillStyle = g2;

    ctx.fillRect(0, 0, size, size);

    return {
        brush: canvas,
        offset: size / 2.0
    };
}