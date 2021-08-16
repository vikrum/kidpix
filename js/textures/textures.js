KiddoPaint.Textures.Solid = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 1;
    canvasPattern.height = 1;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.fillRect(0, 0, 1, 1);

    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.Partial1 = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 4;
    canvasPattern.height = 2;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.fillRect(0, 0, 2, 1);
    contextPattern.fillRect(1, 1, 3, 1);
    contextPattern.fillRect(3, 0, 1, 1);

    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.Partial2 = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 2;
    canvasPattern.height = 2;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.fillRect(0, 0, 1, 1);
    contextPattern.fillRect(1, 1, 1, 1);

    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.Partial3 = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 2;
    canvasPattern.height = 2;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.fillRect(0, 0, 1, 1);

    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}


KiddoPaint.Textures.PartialSquares = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 16;
    canvasPattern.height = 16;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.strokeStyle = color1;
    contextPattern.rect(0, 0, 12.5, 12.5);
    contextPattern.stroke();

    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.PartialArtifactAlias = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 4;
    canvasPattern.height = 2;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.strokeStyle = color1;
    contextPattern.rect(0, 0, 4.5, 2.5);
    contextPattern.stroke();

    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.RSolid = function() {
    color1 = KiddoPaint.Colors.randomAllColor();
    //color1 = KiddoPaint.Colors.randomColor();
    return KiddoPaint.Textures.Solid(color1);
}

KiddoPaint.Textures.HueSolid = function(hue) {
    let hsl = `hsl(${hue}, 100%, 55%)`;
    return hsl;
}

KiddoPaint.Textures.None = function() {
    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 1;
    canvasPattern.height = 1;
    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.Stripes = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 4;
    canvasPattern.height = 4;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    if (KiddoPaint.Current.modifiedAlt) {
        contextPattern.fillRect(1, 0, 1, 1);
        contextPattern.fillRect(2, 1, 1, 1);
        contextPattern.fillRect(3, 2, 1, 1);
        contextPattern.fillRect(0, 3, 1, 1);
    } else {
        contextPattern.fillRect(0, 2, 1, 1);
        contextPattern.fillRect(1, 1, 1, 1);
        contextPattern.fillRect(2, 0, 1, 1);
        contextPattern.fillRect(3, 3, 1, 1);
    }
    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.Speckles = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.fillRect(1, 0, 2, 2);
    contextPattern.fillRect(4, 0, 2, 1);
    contextPattern.fillRect(6, 1, 2, 2);
    contextPattern.fillRect(2, 3, 2, 2);
    contextPattern.fillRect(5, 4, 2, 2);
    contextPattern.fillRect(0, 5, 2, 2);
    contextPattern.fillRect(4, 7, 2, 1);

    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.Bubbles = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.rect(2, 0, 5, 1);
    contextPattern.rect(0, 1, 2, 1);
    contextPattern.rect(3, 1, 3, 1);
    contextPattern.rect(7, 1, 1, 1);
    contextPattern.rect(1, 2, 2, 3);
    contextPattern.rect(0, 3, 2, 3);
    contextPattern.rect(6, 2, 1, 3);
    contextPattern.rect(7, 3, 1, 3);
    contextPattern.rect(3, 5, 3, 1);
    contextPattern.rect(2, 6, 1, 2);
    contextPattern.rect(3, 7, 4, 1);
    contextPattern.rect(5, 6, 2, 1);
    contextPattern.fill();
    contextPattern.closePath();

    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.Thatch = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.rect(2, 1, 5, 1);
    contextPattern.rect(4, 0, 1, 4);
    contextPattern.rect(3, 0, 3, 3);
    contextPattern.rect(7, 0, 1, 1);
    contextPattern.rect(7, 0, 1, 1);
    contextPattern.rect(1, 2, 1, 1);
    contextPattern.rect(0, 3, 1, 5);
    contextPattern.rect(1, 4, 1, 3);
    contextPattern.rect(1, 4, 1, 3);
    contextPattern.rect(2, 5, 1, 1);
    contextPattern.rect(3, 6, 1, 1);
    contextPattern.rect(4, 7, 1, 1);
    contextPattern.rect(5, 4, 1, 1);
    contextPattern.rect(6, 5, 1, 1);
    contextPattern.rect(7, 6, 1, 1);
    contextPattern.rect(7, 4, 1, 2);
    contextPattern.fill();
    contextPattern.closePath();

    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.Shingles = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.rect(0, 0, 5, 1);
    contextPattern.rect(2, 1, 1, 2);
    contextPattern.rect(1, 3, 1, 1);
    contextPattern.rect(0, 4, 1, 1);
    contextPattern.rect(3, 3, 1, 1);
    contextPattern.rect(4, 4, 4, 1);
    contextPattern.rect(6, 5, 1, 2);
    contextPattern.rect(5, 7, 1, 1);
    contextPattern.rect(7, 7, 1, 1);

    contextPattern.fill();
    contextPattern.closePath();

    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.Diamond = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    for (var startx = 3, starty = 0; starty < 4; startx -= 1, starty += 1) {
        for (var i = 0; i < 4; i++) {
            contextPattern.rect(startx + i, starty + i, 1, 1);
        }
    }
    contextPattern.fill();
    contextPattern.closePath();

    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.Ribbon = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;

    contextPattern.rect(4, 1, 1, 1);
    contextPattern.rect(3, 2, 1, 1);
    contextPattern.rect(2, 3, 1, 1);
    contextPattern.rect(6, 5, 1, 1);
    contextPattern.rect(7, 6, 1, 1);
    contextPattern.rect(0, 7, 1, 1);

    contextPattern.fill();
    contextPattern.closePath();

    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.Sand = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;

    contextPattern.rect(0, 0, 1, 1);
    contextPattern.rect(5, 1, 1, 1);
    contextPattern.rect(2, 2, 1, 1);
    contextPattern.rect(7, 3, 1, 1);
    contextPattern.rect(3, 4, 1, 1);
    contextPattern.rect(6, 5, 1, 1);
    contextPattern.rect(1, 6, 1, 1);
    contextPattern.rect(4, 7, 1, 1);

    contextPattern.fill();
    contextPattern.closePath();

    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.Brick = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;

    contextPattern.rect(0, 0, 1, 3);
    contextPattern.rect(0, 3, 8, 1);
    contextPattern.rect(4, 4, 1, 3);
    contextPattern.rect(0, 7, 8, 1);

    contextPattern.fill();
    contextPattern.closePath();

    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.Chevron = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 8;
    canvasPattern.height = 5;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;

    contextPattern.rect(0, 0, 1, 1);
    contextPattern.rect(1, 1, 1, 1);
    contextPattern.rect(2, 2, 1, 1);
    contextPattern.rect(3, 3, 1, 1);
    contextPattern.rect(4, 4, 1, 1);
    contextPattern.rect(5, 3, 1, 1);
    contextPattern.rect(6, 2, 1, 1);
    contextPattern.rect(7, 1, 1, 1);

    contextPattern.fill();
    contextPattern.closePath();

    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.Stairs = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;

    contextPattern.rect(0, 0, 5, 1);
    contextPattern.rect(4, 1, 1, 4);
    contextPattern.rect(5, 4, 3, 1);
    contextPattern.rect(0, 4, 1, 4);

    contextPattern.fill();
    contextPattern.closePath();

    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.Cross = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;

    for (var i = 0; i < 8; i++) {
        contextPattern.rect(i, i, 1, 1);
    }

    for (var i = 1; i < 8; i++) {
        contextPattern.rect(i, 8 - i, 1, 1);
    }

    contextPattern.fill();
    contextPattern.closePath();

    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.DiagBrick = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;

    contextPattern.rect(2, 0, 1, 1);
    contextPattern.rect(1, 1, 1, 1);
    contextPattern.rect(0, 2, 1, 2);
    contextPattern.rect(1, 3, 1, 1);
    contextPattern.rect(2, 4, 1, 1);
    contextPattern.rect(3, 5, 3, 1);
    contextPattern.rect(4, 6, 1, 1);
    contextPattern.rect(3, 7, 1, 1);
    contextPattern.rect(6, 4, 1, 1);
    contextPattern.rect(7, 3, 1, 1);

    contextPattern.fill();
    contextPattern.closePath();

    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.CornerStair = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;

    if (KiddoPaint.Current.modifiedCtrl) {
        contextPattern.rect(0, 0, 6, 2);
        contextPattern.rect(0, 2, 4, 2);
        contextPattern.rect(0, 4, 2, 2);
    } else {
        contextPattern.rect(2, 6, 6, 2);
        contextPattern.rect(4, 4, 4, 2);
        contextPattern.rect(6, 2, 2, 2);
    }

    contextPattern.fill();
    contextPattern.closePath();

    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.Houndstooth = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 9;
    canvasPattern.height = 11;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;

    contextPattern.rect(0, 4, 1, 2);
    contextPattern.rect(1, 3, 1, 2);
    contextPattern.rect(6, 0, 1, 1);
    contextPattern.rect(5, 1, 2, 1);
    contextPattern.rect(2, 2, 7, 1);
    contextPattern.rect(2, 3, 6, 1);
    contextPattern.rect(2, 4, 5, 2);
    contextPattern.rect(2, 6, 7, 1);
    contextPattern.rect(8, 5, 1, 1);
    contextPattern.rect(4, 7, 2, 1);
    contextPattern.rect(3, 8, 2, 1);
    contextPattern.rect(2, 9, 2, 1);
    contextPattern.rect(2, 10, 1, 1);

    contextPattern.fill();
    contextPattern.closePath();

    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.Rainbow = function() {

    var patternCanvas = document.createElement('canvas'),
        dotWidth = 20,
        dotDistance = 5,
        ctx = patternCanvas.getContext('2d');

    patternCanvas.width = 35;
    patternCanvas.height = 20;
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 5, 20);
    ctx.fillStyle = 'orange';
    ctx.fillRect(5, 0, 10, 20);
    ctx.fillStyle = 'yellow';
    ctx.fillRect(10, 0, 15, 20);
    ctx.fillStyle = 'green';
    ctx.fillRect(15, 0, 20, 20);
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(20, 0, 25, 20);
    ctx.fillStyle = 'blue';
    ctx.fillRect(25, 0, 30, 20);
    ctx.fillStyle = 'purple';
    ctx.fillRect(30, 0, 35, 20);
    return KiddoPaint.Display.context.createPattern(patternCanvas, 'repeat');
}

KiddoPaint.Textures.RainbowBar = function() {
    var canvas = document.createElement('canvas');
    var size = 50 * KiddoPaint.Current.scaling;
    canvas.width = size * 2;
    canvas.height = size * 2;
    var ctx = canvas.getContext('2d');

    var gradient = ctx.createLinearGradient(10, 0, size * 2, 0);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(1 / 6, 'orange');
    gradient.addColorStop(2 / 6, 'yellow');
    gradient.addColorStop(3 / 6, 'green');
    gradient.addColorStop(4 / 6, 'blue');
    gradient.addColorStop(5 / 6, 'indigo');
    gradient.addColorStop(1, 'violet');
    ctx.fillStyle = gradient;
    ctx.rotate(20 * Math.PI / 180);
    ctx.fillRect(0, 0, size * 2, 16);

    return KiddoPaint.Display.context.createPattern(canvas, 'repeat');
}

KiddoPaint.Textures.RainbowGrad = function(start, end) {
    if (start && end) {
        var grad = KiddoPaint.Display.context.createLinearGradient(start._x, start._y, start._x, end._y);
        grad.addColorStop(0, 'red');
        grad.addColorStop(1 / 6, 'orange');
        grad.addColorStop(2 / 6, 'yellow');
        grad.addColorStop(3 / 6, 'green');
        grad.addColorStop(4 / 6, 'blue');
        grad.addColorStop(5 / 6, 'indigo');
        grad.addColorStop(1, 'violet');
        return grad;
    } else {
        return KiddoPaint.Textures.None();
    }
}

KiddoPaint.Textures.BigGrid = function() {
    let color1 = 'black';
    let color2 = 'white';
    let size = 64;
    let hsize = size / 2.0;

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = size;
    canvasPattern.height = size;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color2;
    contextPattern.fillRect(0, 0, size, size);
    contextPattern.fillStyle = color1;
    contextPattern.fillRect(0, 0, hsize, hsize);
    contextPattern.fillRect(hsize, hsize, size, size);

    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.Screen1 = function() {
    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 2;
    canvasPattern.height = 2;
    var contextPattern = canvasPattern.getContext('2d');
    contextPattern.beginPath();
    contextPattern.fillStyle = 'white';
    contextPattern.fillRect(0, 0, 1, 1);
    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.Screen2 = function() {
    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 2;
    canvasPattern.height = 2;
    var contextPattern = canvasPattern.getContext('2d');
    contextPattern.beginPath();
    contextPattern.fillStyle = 'white';
    contextPattern.fillRect(1, 1, 2, 2);
    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.Screen3 = function() {
    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 2;
    canvasPattern.height = 2;
    var contextPattern = canvasPattern.getContext('2d');
    contextPattern.beginPath();
    contextPattern.fillStyle = 'white';
    contextPattern.fillRect(0, 1, 2, 1);
    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.Screen4 = function() {
    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 2;
    canvasPattern.height = 2;
    var contextPattern = canvasPattern.getContext('2d');
    contextPattern.beginPath();
    contextPattern.fillStyle = 'white';
    contextPattern.fillRect(1, 0, 1, 2);
    return KiddoPaint.Display.context.createPattern(canvasPattern, 'repeat');
}

KiddoPaint.Textures.SprayPaint2 = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 16;
    canvasPattern.height = 16;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.fillRect(7, 0, 1, 1);
    contextPattern.fillRect(11, 1, 1, 1);
    contextPattern.fillRect(2, 2, 1, 1);
    contextPattern.fillRect(8, 2, 1, 1);
    contextPattern.fillRect(5, 3, 1, 1);
    contextPattern.fillRect(10, 4, 1, 1);
    contextPattern.fillRect(14, 4, 1, 1);
    contextPattern.fillRect(0, 5, 1, 1);
    contextPattern.fillRect(6, 5, 1, 1);
    contextPattern.fillRect(3, 6, 1, 1);
    contextPattern.fillRect(9, 6, 1, 1);
    contextPattern.fillRect(12, 6, 1, 1);
    contextPattern.fillRect(7, 7, 1, 1);
    contextPattern.fillRect(15, 7, 1, 1);
    contextPattern.fillRect(5, 8, 1, 1);
    contextPattern.fillRect(9, 8, 1, 1);
    contextPattern.fillRect(0, 9, 1, 1);
    contextPattern.fillRect(3, 9, 1, 1);
    contextPattern.fillRect(12, 9, 1, 1);
    contextPattern.fillRect(6, 10, 1, 1);
    contextPattern.fillRect(10, 10, 1, 1);
    contextPattern.fillRect(14, 10, 1, 1);
    contextPattern.fillRect(4, 11, 1, 1);
    contextPattern.fillRect(1, 12, 1, 1);
    contextPattern.fillRect(7, 12, 1, 1);
    contextPattern.fillRect(10, 12, 1, 1);
    contextPattern.fillRect(13, 13, 1, 1);
    contextPattern.fillRect(4, 14, 1, 1);
    contextPattern.fillRect(8, 15, 1, 1);


    return canvasPattern;
}
KiddoPaint.Textures.SprayPaint3 = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 16;
    canvasPattern.height = 16;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.fillRect(8, 2, 1, 1);
    contextPattern.fillRect(4, 3, 1, 1);
    contextPattern.fillRect(11, 3, 1, 1);
    contextPattern.fillRect(6, 5, 1, 1);
    contextPattern.fillRect(10, 5, 1, 1);
    contextPattern.fillRect(3, 6, 1, 1);
    contextPattern.fillRect(13, 6, 1, 1);
    contextPattern.fillRect(7, 7, 1, 1);
    contextPattern.fillRect(10, 8, 1, 1);
    contextPattern.fillRect(2, 9, 1, 1);
    contextPattern.fillRect(5, 10, 1, 1);
    contextPattern.fillRect(8, 10, 1, 1);
    contextPattern.fillRect(12, 10, 1, 1);
    contextPattern.fillRect(3, 12, 1, 1);
    contextPattern.fillRect(6, 13, 1, 1);
    contextPattern.fillRect(10, 13, 1, 1);


    return canvasPattern;
}
KiddoPaint.Textures.SprayPaint4 = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 16;
    canvasPattern.height = 16;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;

    contextPattern.fillRect(15, 0, 1, 1);
    contextPattern.fillRect(13, 2, 1, 1);
    contextPattern.fillRect(11, 4, 1, 1);
    contextPattern.fillRect(9, 6, 1, 1);
    contextPattern.fillRect(7, 8, 1, 1);
    contextPattern.fillRect(5, 10, 1, 1);
    contextPattern.fillRect(3, 12, 1, 1);
    contextPattern.fillRect(1, 14, 1, 1);
    return canvasPattern;
}
KiddoPaint.Textures.SprayPaint5 = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 16;
    canvasPattern.height = 16;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.fillRect(1, 1, 1, 1);
    contextPattern.fillRect(4, 1, 1, 1);
    contextPattern.fillRect(7, 1, 1, 1);
    contextPattern.fillRect(10, 1, 1, 1);
    contextPattern.fillRect(13, 1, 1, 1);
    contextPattern.fillRect(1, 4, 1, 1);
    contextPattern.fillRect(4, 4, 1, 1);
    contextPattern.fillRect(7, 4, 1, 1);
    contextPattern.fillRect(10, 4, 1, 1);
    contextPattern.fillRect(13, 4, 1, 1);
    contextPattern.fillRect(1, 7, 1, 1);
    contextPattern.fillRect(4, 7, 1, 1);
    contextPattern.fillRect(7, 7, 1, 1);
    contextPattern.fillRect(10, 7, 1, 1);
    contextPattern.fillRect(13, 7, 1, 1);
    contextPattern.fillRect(1, 10, 1, 1);
    contextPattern.fillRect(4, 10, 1, 1);
    contextPattern.fillRect(7, 10, 1, 1);
    contextPattern.fillRect(10, 10, 1, 1);
    contextPattern.fillRect(13, 10, 1, 1);
    contextPattern.fillRect(1, 13, 1, 1);
    contextPattern.fillRect(4, 13, 1, 1);
    contextPattern.fillRect(7, 13, 1, 1);
    contextPattern.fillRect(10, 13, 1, 1);
    contextPattern.fillRect(13, 13, 1, 1);


    return canvasPattern;
}
KiddoPaint.Textures.SprayPaint6 = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 16;
    canvasPattern.height = 16;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.fillRect(7, 1, 1, 1);
    contextPattern.fillRect(4, 4, 1, 1);
    contextPattern.fillRect(10, 4, 1, 1);
    contextPattern.fillRect(1, 7, 1, 1);
    contextPattern.fillRect(7, 7, 1, 1);
    contextPattern.fillRect(13, 7, 1, 1);
    contextPattern.fillRect(4, 10, 1, 1);
    contextPattern.fillRect(10, 10, 1, 1);
    contextPattern.fillRect(7, 13, 1, 1);



    return canvasPattern;
}
KiddoPaint.Textures.SprayPaint7 = function(color1) {
    color1 = color1 || 'black';

    var canvasPattern = document.createElement('canvas');
    canvasPattern.width = 16;
    canvasPattern.height = 16;
    var contextPattern = canvasPattern.getContext('2d');

    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.fillRect(7, 0, 1, 1);
    contextPattern.fillRect(9, 0, 1, 1);
    contextPattern.fillRect(5, 1, 1, 1);
    contextPattern.fillRect(11, 1, 1, 1);
    contextPattern.fillRect(2, 2, 1, 1);
    contextPattern.fillRect(8, 2, 1, 1);
    contextPattern.fillRect(10, 2, 1, 1);
    contextPattern.fillRect(6, 3, 1, 1);
    contextPattern.fillRect(12, 3, 1, 1);
    contextPattern.fillRect(2, 4, 1, 1);
    contextPattern.fillRect(4, 4, 1, 1);
    contextPattern.fillRect(8, 4, 1, 1);
    contextPattern.fillRect(10, 4, 1, 1);
    contextPattern.fillRect(14, 4, 1, 1);
    contextPattern.fillRect(0, 5, 1, 1);
    contextPattern.fillRect(6, 5, 1, 1);
    contextPattern.fillRect(12, 5, 1, 1);
    contextPattern.fillRect(3, 6, 1, 1);
    contextPattern.fillRect(9, 6, 1, 1);
    contextPattern.fillRect(14, 6, 1, 1);
    contextPattern.fillRect(2, 7, 1, 1);
    contextPattern.fillRect(7, 7, 1, 1);
    contextPattern.fillRect(11, 7, 1, 1);
    contextPattern.fillRect(15, 7, 1, 1);
    contextPattern.fillRect(5, 8, 1, 1);
    contextPattern.fillRect(9, 8, 1, 1);
    contextPattern.fillRect(13, 8, 1, 1);
    contextPattern.fillRect(0, 9, 1, 1);
    contextPattern.fillRect(3, 9, 1, 1);
    contextPattern.fillRect(12, 9, 1, 1);
    contextPattern.fillRect(2, 10, 1, 1);
    contextPattern.fillRect(6, 10, 1, 1);
    contextPattern.fillRect(8, 10, 1, 1);
    contextPattern.fillRect(10, 10, 1, 1);
    contextPattern.fillRect(14, 10, 1, 1);
    contextPattern.fillRect(4, 11, 1, 1);
    contextPattern.fillRect(12, 11, 1, 1);
    contextPattern.fillRect(1, 12, 1, 1);
    contextPattern.fillRect(5, 12, 1, 1);
    contextPattern.fillRect(7, 12, 1, 1);
    contextPattern.fillRect(10, 12, 1, 1);
    contextPattern.fillRect(3, 13, 1, 1);
    contextPattern.fillRect(13, 13, 1, 1);
    contextPattern.fillRect(4, 14, 1, 1);
    contextPattern.fillRect(6, 14, 1, 1);
    contextPattern.fillRect(10, 14, 1, 1);
    contextPattern.fillRect(8, 15, 1, 1);


    return canvasPattern;
}