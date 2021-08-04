KiddoPaint.Tools.Toolbox.Magnify = function() {
    var tool = this;
    this.isDown = false;
    this.size = function() {
        return 36 * KiddoPaint.Current.scaling
    };
    this.scale = 2;

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.mousemove(ev);
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add('cursor-none');
    };

    this.mousemove = function(ev) {
        if (tool.isDown) {
            KiddoPaint.Sounds.brushzoom();
            var target = KiddoPaint.Display.main_context.getImageData(ev._x - tool.size(), ev._y - tool.size(), 2 * tool.size(), 2 * tool.size());
            var ctx = KiddoPaint.Display.previewContext;
            var scaled = scaleImageData(target, tool.scale);
            ctx.putImageData(scaled, ev._x - (tool.scale * tool.size()), ev._y - (tool.scale * tool.size()));
            KiddoPaint.Display.clearAnim();
            KiddoPaint.Display.animContext.fillStyle = 'white';
            KiddoPaint.Display.animContext.fillRect(ev._x - (tool.scale * tool.size()), ev._y - (tool.scale * tool.size()), tool.scale * tool.size() * 2, tool.scale * tool.size() * 2);

        }
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            KiddoPaint.Display.clearAnim();
            KiddoPaint.Display.saveUndo();
            //KiddoPaint.Sounds.brushzoom(); XXX TODO click sound

            var target = KiddoPaint.Display.main_context.getImageData(ev._x - tool.size(), ev._y - tool.size(), 2 * tool.size(), 2 * tool.size());
            var ctx = KiddoPaint.Display.context;
            var scaled = scaleImageData(target, tool.scale);
            ctx.putImageData(scaled, ev._x - (tool.scale * tool.size()), ev._y - (tool.scale * tool.size()));
            KiddoPaint.Display.main_context.clearRect(ev._x - (tool.scale * tool.size()), ev._y - (tool.scale * tool.size()), tool.scale * tool.size() * 2, tool.scale * tool.size() * 2);

            // break abstraction since we're clearing main underneath
            KiddoPaint.Display.main_context.drawImage(KiddoPaint.Display.canvas, 0, 0);
            KiddoPaint.Display.clearTmp();
            KiddoPaint.Display.clearAnim(); // cut preview
            KiddoPaint.Display.saveToLocalStorage();
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
        }
    };
};
KiddoPaint.Tools.Magnify = new KiddoPaint.Tools.Toolbox.Magnify();