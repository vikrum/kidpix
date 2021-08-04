KiddoPaint.Tools.Toolbox.Placer = function() {
    var tool = this;
    this.isDown = false;
    this.image = {};
    this.prevTool = {};
    this.size = {};

    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.mousemove(ev);
    };

    this.mousemove = function(ev) {
        var ctx = tool.isDown ? KiddoPaint.Display.context : KiddoPaint.Display.previewContext;
        var alt = KiddoPaint.Current.modifiedAlt;
        var ctrl = KiddoPaint.Current.modifiedMeta;

        // https://stackoverflow.com/a/37388113
        function drawImageff(img, x, y, width, height, flip, flop, center) {
            ctx.save();
            if (typeof width === "undefined") width = img.width;
            if (typeof height === "undefined") height = img.height;
            if (typeof center === "undefined") center = false;
            // Set rotation point to center of image, instead of top/left
            if (center) {
                x -= width / 2;
                y -= height / 2;
            }

            // Set the origin to the center of the image
            ctx.translate(x + width / 2, y + height / 2);

            // Rotate the canvas around the origin
            //var rad = 2 * Math.PI - deg * Math.PI / 180;    
            //context.rotate(rad);

            // Flip/flop the canvas
            ctx.scale((flip) ? -1 : 1, (flop) ? -1 : 1);

            // Draw the image    
            ctx.drawImage(img, -width / 2, -height / 2);
            ctx.restore();
        }

        if (KiddoPaint.Current.modifiedRange != 0) {
            var scale = 1 + KiddoPaint.Current.modifiedRange / 100.0;
            var scaledImg = scaleImageDataCanvasAPI(tool.image, scale);
            drawImageff(scaledImg, ev._x, ev._y, tool.size.width * scale, tool.size.height * scale, KiddoPaint.Current.modifiedAlt, KiddoPaint.Current.modifiedMeta, true);
        } else {
            drawImageff(tool.image, ev._x, ev._y, tool.size.width, tool.size.height, KiddoPaint.Current.modifiedAlt, KiddoPaint.Current.modifiedMeta, true);
        }
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            tool.image = {};
            KiddoPaint.Display.saveMain();
            KiddoPaint.Current.tool = tool.prevTool;
            reset_ranges();
            tool.prevTool = {};
            tool.size = {};
        }
    };
};
KiddoPaint.Tools.Placer = new KiddoPaint.Tools.Toolbox.Placer();