KiddoPaint.Tools.Toolbox.Tnt = function() {
    var tool = this;
    this.isDown = false;

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.animate(ev);
    };

    this.mousemove = function(ev) {};

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
        }
    };

    this.animate = function(ev) {
        KiddoPaint.Display.saveUndo();
        KiddoPaint.Display.pauseUndo();

        var iter = 1;
        var intervalID = setInterval(drawBomb, 175); // Will alert every second.
        KiddoPaint.Sounds.explosion();
        drawBomb();

        function drawBomb() {
            var ctx = KiddoPaint.Display.context;
            ctx.beginPath();
            ctx.fillStyle = 'rgb(0, 255, 0)';
            ctx.arc(ev._x, ev._y, 50 * iter, 0, 2 * Math.PI);
            ctx.fill();
            KiddoPaint.Display.saveMainGcoSkipUndo('difference'); // exclusion difference
            iter++;
            if (iter > 15) {
                clearInterval(intervalID); // Will clear the timer.
                KiddoPaint.Display.clearAll();
                KiddoPaint.Display.resumeUndo();
            } else if (KiddoPaint.Current.modifiedMeta) { // hidden feature to block completion
                clearInterval(intervalID); // Will clear the timer.
                KiddoPaint.Display.resumeUndo(); // Already saved to main above in previous frames, so no need here
            }
        }
    };
};
KiddoPaint.Tools.Tnt = new KiddoPaint.Tools.Toolbox.Tnt();