KiddoPaint.Tools.Toolbox.Fuzzer = function() {
    var tool = this;
    this.isDown = false;
    this.size = function() {
        return 13 * KiddoPaint.Current.scaling
    };
    this.timeout = null;
    this.currentEv = null;

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.currentEv = ev;

        let interval = 37;
        tool.timeout = setTimeout(function draw() {
            tool.toolDraw();
            if (!tool.timeout) return;
            tool.timeout = setTimeout(draw, interval);
        }, interval);
    };

    this.mousemove = function(ev) {
        tool.currentEv = ev;
        // just preview
        if (!tool.isDown) {
            tool.toolDraw();
        }
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
            if (tool.timeout) {
                clearTimeout(tool.timeout);
                tool.timeout = null;
            }
        }
    };

    // kidpix implements this as a circle tool not rect
    this.toolDraw = function() {
        var target = KiddoPaint.Display.main_context.getImageData(tool.currentEv._x - tool.size(), tool.currentEv._y - tool.size(), 2 * tool.size(), 2 * tool.size());
        var ctx = tool.isDown ? KiddoPaint.Display.context : KiddoPaint.Display.previewContext;
        let jitterx = getRandomFloat(-7, 7);
        let jittery = getRandomFloat(-7, 7);

        // XXX TODO FIXME this ought to delete the underlying main_context too... it's duping and w/ alpha looks wrong
        /* ought to clear-rect the underlying pixels to better handle transparency
	        ctx.strokeStyle = 'transparent';
	        ctx.fillStyle = 'white';
		        ctx.fillRect((ev._x - tool.size()) + jitterx, (ev._y - tool.size()) + jittery, 2 * tool.size() - 1, 2 * tool.size() - 1);
		*/
        if (tool.isDown) KiddoPaint.Sounds.brushfuzzer();
        ctx.putImageData(target, (tool.currentEv._x - tool.size()) + jitterx, (tool.currentEv._y - tool.size()) + jittery);
    }
};
KiddoPaint.Tools.Fuzzer = new KiddoPaint.Tools.Toolbox.Fuzzer();