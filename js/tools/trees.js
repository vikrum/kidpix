// this & maze can be refactored to a generic tool that takes a lambda
KiddoPaint.Tools.Toolbox.Tree = function() {
    var tool = this;
    this.isDown = false;

    this.mousedown = function(ev) {
        tool.isDown = true;
        KiddoPaint.Sounds.brushtree();
        drawTree(ev._x, ev._y, 32 * KiddoPaint.Current.scaling, -Math.PI / 2, 12, 15)
    };

    this.mousemove = function(ev) {};

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
        }
    };
};
KiddoPaint.Tools.Tree = new KiddoPaint.Tools.Toolbox.Tree();

/*
drawTree(320, 600, 60, -Math.PI / 2, 12, 15);
drawTree(500, 600, 60, -Math.PI / 2, 12, 7);
drawTree(680, 600, 60, -Math.PI / 2, 12, 15);
drawTree(750, 600, 60, -Math.PI / 2, 12, 15);
*/

// https://github.com/PavlyukVadim/amadev/tree/master/RecursiveTree
function drawTree(startX, startY, length, angle, depth, branchWidth) {
    var rand = Math.random;
    var newLength, newAngle, newDepth, maxBranch = 3,
        endX, endY, maxAngle = 2 * Math.PI / 6,
        subBranches;

    KiddoPaint.Display.context.beginPath();
    KiddoPaint.Display.context.moveTo(startX, startY);
    endX = startX + length * Math.cos(angle);
    endY = startY + length * Math.sin(angle);
    KiddoPaint.Display.context.lineCap = 'round';
    KiddoPaint.Display.context.lineWidth = branchWidth;
    KiddoPaint.Display.context.lineTo(endX, endY);

    if (depth <= 2) {
        KiddoPaint.Display.context.strokeStyle = 'rgb(0,' + (((rand() * 64) + 128) >> 0) + ',0)';
    } else {
        KiddoPaint.Display.context.strokeStyle = 'rgb(0,' + (((rand() * 64) + 64) >> 0) + ',20)';
    }
    KiddoPaint.Display.context.stroke();
    newDepth = depth - 1;

    if (!newDepth) {
        return;
    }
    subBranches = (rand() * (maxBranch - 1)) + 1;
    branchWidth *= 0.7;

    for (var i = 0; i < subBranches; i++) {
        newAngle = angle + rand() * maxAngle - maxAngle * 0.5;
        newLength = length * (0.7 + rand() * 0.3);
        drawTree(endX, endY, newLength, newAngle, newDepth, branchWidth);
    }

}