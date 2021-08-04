KiddoPaint.Tools.Toolbox.Doorbell = function() {
    var tool = this;
    this.isDown = false;
    this.leftside = {};
    this.rightside = {};
    this.centerGraphic = ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAADIAQAAAADpJcE2AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAd2KE6QAAAAHdElNRQflCAMBLh5YUprGAAAA3ElEQVRYw+3YPQ6DMAyG4Q8xMPYI3KS5WEU4Wo7CERg9INwB0jb87S+ql0joWSJjy7GEitp9woM4SbX7jAZtv5zV2WUJoBmKrPV8sGYOCGxbRSMUlDl6JB4IknzU6+eXe8JBNHVYsNxuzqAyJFhizpIIbCd5oE25FbPBvnXdAxTljwM5bXcGCmjwmcTcRAXfLnc6wxCAbgOKQfhwKqaB6uiFggBrfpqBC5pBUphy+XfiAtXuxTKCBopvm2c8E0QTFSjmOx4sgjhA7kkKbqf7RwSQgnu6XAYjwD/o8QYamlM2v+DGWAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wOC0wM1QwMTo0NjowOCswMDowMGhjP2IAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDgtMDNUMDE6NDY6MDgrMDA6MDAZPofeAAAAAElFTkSuQmCC', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAAC9AQAAAABKKqazAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAd2KE6QAAAAHdElNRQflCAMBLiXpWXPiAAABOklEQVRYw9XYMXKFIBCA4d+hsOQIHMWLOYTMu5hH4QiUFExIoUEx+JKOhcbis3CdZXcBykrHU3maq7erUL8nzdEO41gY1bGzX/Um0ldITBEVUJ7Zj+YqoIIF9JaYItIcvaEdwAIWec5S9p9xg7k98qPUt9lzzfPePkVUOOuC+Yyl2A3hezwqfwE6pyNeQY55hUt9mOI9Rfq6hfXSF4xr5Y9gb8crx/d+oPJe39LRL8bxvV9Uft+fXf2hn0hxXZJjzufwuAzjZ3wXb8bfycs8c3ojf+R6e54U5BhXn89+1bvOzgoq7ys9xCPaVbicL5/m944u/nzw9/kBPiIqbzzM752ddNSHN/cjXV36/ct/7mfqvibMsbe+NpD/FLeygiCfck7VPHG7Z+rsOmcPS/X5rzyOS/+/4vPzjX8DdoGgLPOs1MUAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDgtMDNUMDE6NDY6MDgrMDA6MDBoYz9iAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA4LTAzVDAxOjQ2OjA4KzAwOjAwGT6H3gAAAABJRU5ErkJggg=='];

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

        KiddoPaint.Display.bnimContext.fillStyle = 'white';
        KiddoPaint.Display.bnimContext.fillRect(0, 0, KiddoPaint.Display.main_canvas.width, KiddoPaint.Display.main_canvas.height);
        let image = new Image();
        image.src = KiddoPaint.Tools.EraserHiddenPicture.hiddenPictures.random();
        image.crossOrigin = 'anonymous';
        image.onload = function() {
            var wrh = image.width / image.height;
            var newWidth = KiddoPaint.Display.canvas.width;
            var newHeight = newWidth / wrh;
            if (newHeight > KiddoPaint.Display.canvas.height) {
                newHeight = KiddoPaint.Display.canvas.height;
                newWidth = newHeight * wrh;
            }
            var xOffset = newWidth < KiddoPaint.Display.canvas.width ? ((KiddoPaint.Display.canvas.width - newWidth) / 2) : 0;
            var yOffset = newHeight < KiddoPaint.Display.canvas.height ? ((KiddoPaint.Display.canvas.height - newHeight) / 2) : 0;
            KiddoPaint.Display.bnimContext.imageSmoothingEnabled = false;
            KiddoPaint.Display.bnimContext.save();
            KiddoPaint.Display.bnimContext.drawImage(image, xOffset, yOffset, newWidth, newHeight);
            KiddoPaint.Display.bnimContext.globalCompositeOperation = 'difference';
            KiddoPaint.Display.bnimContext.fillStyle = 'white';
            KiddoPaint.Display.bnimContext.fillRect(0, 0, KiddoPaint.Display.main_canvas.width, KiddoPaint.Display.main_canvas.height);
            KiddoPaint.Display.bnimContext.globalCompositeOperation = 'source-over';
            KiddoPaint.Display.bnimContext.restore();

            let cimage = new Image();
            cimage.src = tool.centerGraphic.random();
            cimage.onload = function() {
                let cxOffset = KiddoPaint.Display.canvas.width / 2 - cimage.width;
                let cyOffset = KiddoPaint.Display.canvas.height / 2 - cimage.height;
                KiddoPaint.Display.bnimContext.drawImage(cimage, cxOffset, cyOffset, cimage.width * 2, cimage.height * 2);
            }
        };


        KiddoPaint.Display.animContext.putImageData(left, 0, 0);
        KiddoPaint.Display.animContext.putImageData(right, KiddoPaint.Display.main_canvas.width / 2, 0);
        KiddoPaint.Display.clearAll();

        KiddoPaint.Sounds.Library.pplaySingle('doordingdong').then(() => {

            KiddoPaint.Sounds.Library.playSingle('doorcreak') // estimated duration: 2.153560 sec 
            var intervalID = setInterval(drawSlideOut, 20); // 20ms frames
            drawSlideOut();

            function drawSlideOut() {
                let totalIter = 107; // 107 frames
                let step = (KiddoPaint.Display.main_canvas.width / 2) / totalIter;

                KiddoPaint.Display.clearAnim();
                KiddoPaint.Display.animContext.putImageData(left, 0 - (iter * step), 0);
                KiddoPaint.Display.animContext.putImageData(right, (KiddoPaint.Display.main_canvas.width / 2) + (iter * step), 0);
                iter++;
                if (iter > totalIter) {
                    clearInterval(intervalID);
                    KiddoPaint.Display.clearAnim();
                    tool.animatenext(ev);
                }
            }

        });
    };


    this.animatenext = function(ev) {
        KiddoPaint.Sounds.Library.playSingle('doorwow') // estimated duration: 1.337959 sec

        var iter = 1;

        var left = KiddoPaint.Display.bnimContext.getImageData(0, 0, KiddoPaint.Display.main_canvas.width / 2, KiddoPaint.Display.main_canvas.height);
        var right = KiddoPaint.Display.bnimContext.getImageData(KiddoPaint.Display.main_canvas.width / 2, 0, KiddoPaint.Display.main_canvas.width / 2, KiddoPaint.Display.main_canvas.height);

        KiddoPaint.Display.animContext.putImageData(left, 0, 0);
        KiddoPaint.Display.animContext.putImageData(right, KiddoPaint.Display.main_canvas.width / 2, 0);

        KiddoPaint.Display.clearBnim();

        var intervalID = setInterval(drawSlideOut, 20); // 20ms frames
        drawSlideOut();

        function drawSlideOut() {
            let totalIter = 67; // 67 frames
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
KiddoPaint.Tools.Doorbell = new KiddoPaint.Tools.Toolbox.Doorbell();