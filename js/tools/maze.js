KiddoPaint.Tools.Toolbox.Maze = function() {
    var tool = this;
    this.isDown = false;

    this.texture = function() {
        return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
    };

    this.mousedown = function(ev) {
        tool.isDown = true;
        var maze = makeMaze();
        KiddoPaint.Display.context.drawImage(maze, ev._x, ev._y);
    };

    this.mousemove = function(ev) {};
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
        }
    };
};
KiddoPaint.Tools.Maze = new KiddoPaint.Tools.Toolbox.Maze();

function makeMaze() {
    // https://codepen.io/GabbeV/pen/viAec
    var canvasBrush = document.createElement('canvas');
    var contextBrush = canvasBrush.getContext('2d');

    pathWidth = 20 //Width of the Maze Path
    wall = 5 //Width of the Walls between Paths
    outerWall = 5 //Width of the Outer most wall
    width = 25 * KiddoPaint.Current.scaling //Number paths fitted horisontally
    height = 25 * KiddoPaint.Current.scaling //Number paths fitted vertically
    delay = 1 //Delay between algorithm cycles
    x = width / 2 | 0 //Horisontal starting position
    y = height / 2 | 0 //Vertical starting position
    seed = Math.random() * 100000 | 0 //Seed for random numbers
    wallColor = KiddoPaint.Current.color;
    pathColor = KiddoPaint.Current.altColor;

    randomGen = function(seed) {
        if (seed === undefined) var seed = performance.now()
        return function() {
            seed = (seed * 9301 + 49297) % 233280
            return seed / 233280
        }
    }

    init = function() {
        offset = pathWidth / 2 + outerWall
        map = []
        mazeWidth = outerWall * 2 + width * (pathWidth + wall) - wall
        mazeHeight = outerWall * 2 + height * (pathWidth + wall) - wall
        canvasBrush.width = mazeWidth;
        canvasBrush.height = mazeHeight;
        contextBrush.globalCompositeOperation = 'source-over';
        contextBrush.fillStyle = wallColor
        contextBrush.fillRect(0, 0, mazeWidth, mazeHeight)
        random = randomGen(seed)
        contextBrush.strokeStyle = pathColor
        contextBrush.globalCompositeOperation = 'destination-out';
        contextBrush.lineCap = 'square'
        contextBrush.lineWidth = pathWidth
        contextBrush.beginPath()
        for (var i = 0; i < height * 2; i++) {
            map[i] = []
            for (var j = 0; j < width * 2; j++) {
                map[i][j] = false
            }
        }
        map[y * 2][x * 2] = true
        route = [
            [x, y]
        ]
        contextBrush.moveTo(x * (pathWidth + wall) + offset,
            y * (pathWidth + wall) + offset)
    }
    init();

    loop = function() {
        x = route[route.length - 1][0] | 0
        y = route[route.length - 1][1] | 0

        var directions = [
                [1, 0],
                [-1, 0],
                [0, 1],
                [0, -1]
            ],
            alternatives = []

        for (var i = 0; i < directions.length; i++) {
            if (map[(directions[i][1] + y) * 2] != undefined &&
                map[(directions[i][1] + y) * 2][(directions[i][0] + x) * 2] === false) {
                alternatives.push(directions[i])
            }
        }

        if (alternatives.length === 0) {
            route.pop()
            if (route.length > 0) {
                contextBrush.moveTo(route[route.length - 1][0] * (pathWidth + wall) + offset,
                    route[route.length - 1][1] * (pathWidth + wall) + offset)
                loop();
                //timer = setTimeout(loop, delay)
            }
            return;
        }
        direction = alternatives[random() * alternatives.length | 0]
        route.push([direction[0] + x, direction[1] + y])
        contextBrush.lineTo((direction[0] + x) * (pathWidth + wall) + offset,
            (direction[1] + y) * (pathWidth + wall) + offset)
        map[(direction[1] + y) * 2][(direction[0] + x) * 2] = true
        map[direction[1] + y * 2][direction[0] + x * 2] = true
        contextBrush.stroke();
        //timer = setTimeout(loop, delay)
        loop();
    }
    loop();
    contextBrush.closePath();
    return canvasBrush;
}