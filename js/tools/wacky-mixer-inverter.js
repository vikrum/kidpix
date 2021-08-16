KiddoPaint.Tools.Toolbox.ElectricMixerInvert = function() {
    var tool = this;
    this.isDown = false;
    this.leftside = {};
    this.rightside = {};

    this.mousedown = function(ev) {
        tool.isDown = true;

        tool.leftside = KiddoPaint.Display.main_context.getImageData(0, 0, KiddoPaint.Display.main_canvas.width / 2, KiddoPaint.Display.main_canvas.height);
        tool.rightside = KiddoPaint.Display.main_context.getImageData(KiddoPaint.Display.main_canvas.width / 2, 0, KiddoPaint.Display.main_canvas.width / 2, KiddoPaint.Display.main_canvas.height);
        tool.animate(ev);
    };

    this.mousemove = function(ev) {};

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            tool.leftside = {};
            tool.rightside = {};
        }
    };

    this.animate = function(ev) {
        var iter = 1;
        var right = flattenImage(tool.rightside);
        var left = flattenImage(tool.leftside);

        KiddoPaint.Display.animContext.putImageData(left, 0, 0);
        KiddoPaint.Display.animContext.putImageData(right, KiddoPaint.Display.main_canvas.width / 2, 0);

        KiddoPaint.Tools.WholeCanvasEffect.effect = JumbleFx.INVERT;
        KiddoPaint.Tools.WholeCanvasEffect.mousedown(ev);
        KiddoPaint.Tools.WholeCanvasEffect.mouseup(ev);

        KiddoPaint.Sounds.mixerinvert(); // estimated duration: 1.393107 sec

        var intervalID = setInterval(drawSlideOut, 20); // 20ms frames
        drawSlideOut();

        function drawSlideOut() {
            let totalIter = 70; // 1393 / 20
            let step = (KiddoPaint.Display.main_canvas.width / 2) / totalIter;

            KiddoPaint.Display.clearAnim();
            KiddoPaint.Display.animContext.putImageData(left, 0 - (iter * step), 0);
            KiddoPaint.Display.animContext.putImageData(right, (KiddoPaint.Display.main_canvas.width / 2) + (iter * step), 0);
            iter++;
            if (iter > totalIter) {
                clearInterval(intervalID);
                KiddoPaint.Display.clearAnim();
            }
        }
    };
};
KiddoPaint.Tools.ElectricMixerInvert = new KiddoPaint.Tools.Toolbox.ElectricMixerInvert();