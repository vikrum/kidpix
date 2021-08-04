KiddoPaint.Tools.Toolbox.ElectricMixerPip = function() {
    var tool = this;
    this.isDown = false;

    this.mousedown = function(ev) {
        tool.isDown = true;
    };

    this.mousemove = function(ev) {};

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            var target = KiddoPaint.Display.main_context.getImageData(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
            KiddoPaint.Tools.Placer.image = KiddoPaint.Display.imageTypeToCanvas(scaleImageData(target, 1.0 / 5.0), false);
            KiddoPaint.Tools.Placer.size = {
                width: KiddoPaint.Display.canvas.width / 5.0,
                height: KiddoPaint.Display.canvas.width / 5.0
            };
            KiddoPaint.Current.tool = KiddoPaint.Tools.Placer;
            KiddoPaint.Tools.Placer.prevTool = KiddoPaint.Tools.ElectricMixerPip;
        }
    };
};
KiddoPaint.Tools.ElectricMixerPip = new KiddoPaint.Tools.Toolbox.ElectricMixerPip();