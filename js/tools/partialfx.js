KiddoPaint.Tools.Toolbox.Ink = function() {
    var tool = this;
    this.isDown = false;
    this.size = 36;
    this.scale = 1;
    this.gfx = fx.canvas();
    this.initialClick = {};

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.initialClick = ev;
        tool.mousemove(ev);
    };

    this.mousemove = function(ev) {
        var target = KiddoPaint.Display.main_context.getImageData(ev._x - tool.size, ev._y - tool.size, 2 * tool.size, 2 * tool.size);
        var ctx = tool.isDown ? KiddoPaint.Display.context : KiddoPaint.Display.previewContext;

        var t = tool.gfx.texture(target);
        // var moo = tool.gfx.draw(t).ink(0.25).update();
        var moo = tool.gfx.draw(t).edgeWork(tool.size / 2).update();
        ctx.drawImage(moo, ev._x - (tool.scale * tool.size), ev._y - (tool.scale * tool.size));
        t.destroy();
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
        }
    };
};
KiddoPaint.Tools.Ink = new KiddoPaint.Tools.Toolbox.Ink();