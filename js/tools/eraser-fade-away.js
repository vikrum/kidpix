KiddoPaint.Tools.Toolbox.EraserFadeAway = function() {
    var tool = this;
    this.mousedown = function(ev) {
        var ctx = KiddoPaint.Display.context;
        setTimeout(function() {
            KiddoPaint.Sounds.eraserfadeb();
            ctx.fillStyle = KiddoPaint.Textures.Screen1();
            ctx.fillRect(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
        }, 500);
        setTimeout(function() {
            KiddoPaint.Sounds.eraserfadea();
            ctx.fillStyle = KiddoPaint.Textures.Screen2();
            ctx.fillRect(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
            ctx.fillStyle = KiddoPaint.Textures.Screen3();
            ctx.fillRect(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
        }, 1200);
        setTimeout(function() {
            KiddoPaint.Sounds.eraserfadeb();
            ctx.fillStyle = KiddoPaint.Textures.Screen4();
            ctx.fillRect(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
        }, 1900);
        setTimeout(function() {
            KiddoPaint.Display.clearAll();
        }, 2000);
    };
    this.mousemove = function(ev) {};
    this.mouseup = function(ev) {};
};
KiddoPaint.Tools.EraserFadeAway = new KiddoPaint.Tools.Toolbox.EraserFadeAway();