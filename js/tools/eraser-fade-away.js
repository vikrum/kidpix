KiddoPaint.Tools.Toolbox.EraserFadeAway = function() {
    var tool = this;
    this.mousedown = function(ev) {
        var ctx = KiddoPaint.Display.context;
        setTimeout(function() {
            ctx.fillStyle = KiddoPaint.Textures.Screen1();
            ctx.fillRect(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
        }, 500);
        setTimeout(function() {
            ctx.fillStyle = KiddoPaint.Textures.Screen2();
            ctx.fillRect(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
        }, 1000);
        setTimeout(function() {
            ctx.fillStyle = KiddoPaint.Textures.Screen3();
            ctx.fillRect(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
        }, 1800);
        setTimeout(function() {
            ctx.fillStyle = KiddoPaint.Textures.Screen4();
            ctx.fillRect(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
        }, 2500);
        setTimeout(function() {
            KiddoPaint.Display.clearAll();
        }, 3000);
    };
    this.mousemove = function(ev) {};
    this.mouseup = function(ev) {};
};
KiddoPaint.Tools.EraserFadeAway = new KiddoPaint.Tools.Toolbox.EraserFadeAway();