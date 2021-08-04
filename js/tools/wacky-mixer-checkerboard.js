KiddoPaint.Tools.Toolbox.WackyMixerCheckerboard = function() {
    var tool = this;

    this.mousedown = function(ev) {
        var ctx = KiddoPaint.Display.context;
        ctx.fillStyle = KiddoPaint.Textures.BigGrid();
        ctx.fillRect(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
        KiddoPaint.Display.saveMainGco('difference');
    };

    this.mousemove = function(ev) {};

    this.mouseup = function(ev) {};
};
KiddoPaint.Tools.WackyMixerCheckerboard = new KiddoPaint.Tools.Toolbox.WackyMixerCheckerboard();