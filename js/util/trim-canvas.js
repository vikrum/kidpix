// MIT http://rem.mit-license.org
// https://ourcodeworld.com/articles/read/683/how-to-remove-the-transparent-pixels-that-surrounds-a-canvas-in-javascript
function trimCanvas(c) {
    if (c.width == 0 || c.height == 0) return c;
    var ctx = c.getContext('2d'),
        copy = document.createElement('canvas').getContext('2d'),
        pixels = ctx.getImageData(0, 0, c.width, c.height),
        l = pixels.data.length,
        i,
        bound = {
            top: null,
            left: null,
            right: null,
            bottom: null
        },
        x, y;

    // Iterate over every pixel to find the highest
    // and where it ends on every axis ()
    for (i = 0; i < l; i += 4) {
        if (pixels.data[i + 3] !== 0) {
            x = (i / 4) % c.width;
            y = ~~((i / 4) / c.width);

            if (bound.top === null) {
                bound.top = y;
            }

            if (bound.left === null) {
                bound.left = x;
            } else if (x < bound.left) {
                bound.left = x;
            }

            if (bound.right === null) {
                bound.right = x;
            } else if (bound.right < x) {
                bound.right = x;
            }

            if (bound.bottom === null) {
                bound.bottom = y;
            } else if (bound.bottom < y) {
                bound.bottom = y;
            }
        }
    }

    var trimHeight = bound.bottom - bound.top,
        trimWidth = bound.right - bound.left;
    if (bound.left && bound.top && trimWidth && trimHeight) {
        trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

        copy.canvas.width = trimWidth;
        copy.canvas.height = trimHeight;
        copy.putImageData(trimmed, 0, 0);
    } else {
        trimmed = ctx.getImageData(0, 0, c.width, c.height);
        copy.canvas.width = c.width;
        copy.canvas.height = c.height;
        copy.putImageData(trimmed, 0, 0);
    }

    // Return trimmed canvas
    return copy.canvas;
}

// https://stackoverflow.com/a/58882518 with edits
function trimCanvas2(canvas) {
    if (canvas.width == 0 || canvas.height == 0) return canvas;
    const context = canvas.getContext('2d');

    const topLeft = {
        x: canvas.width,
        y: canvas.height,
        update(x, y) {
            this.x = Math.min(this.x, x);
            this.y = Math.min(this.y, y);
        }
    };

    const bottomRight = {
        x: 0,
        y: 0,
        update(x, y) {
            this.x = Math.max(this.x, x);
            this.y = Math.max(this.y, y);
        }
    };

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            const alpha = imageData.data[((y * (canvas.width * 4)) + (x * 4)) + 3];
            if (alpha !== 0) {
                topLeft.update(x, y);
                bottomRight.update(x, y);
            }
        }
    }

    const width = ((bottomRight.x - topLeft.x) + 1) > canvas.width ? canvas.width : ((bottomRight.x - topLeft.x) + 1);
    const height = ((bottomRight.y - topLeft.y) + 1) > canvas.height ? canvas.height : ((bottomRight.y - topLeft.y) + 1);

    const croppedCanvas = context.getImageData(topLeft.x, topLeft.y, width, height);
    canvas.width = width;
    canvas.height = height;
    context.putImageData(croppedCanvas, 0, 0);

    return canvas;
}

// https://gist.github.com/timdown/021d9c8f2aabc7092df564996f5afbbf
var trimCanvas3 = (function() {
    function rowBlank(imageData, width, y) {
        for (var x = 0; x < width; ++x) {
            if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false;
        }
        return true;
    }

    function columnBlank(imageData, width, x, top, bottom) {
        for (var y = top; y < bottom; ++y) {
            if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false;
        }
        return true;
    }

    return function(canvas) {
        if (canvas.width == 0 || canvas.height == 0) return canvas;
        var ctx = canvas.getContext("2d");
        var width = canvas.width;
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var top = 0,
            bottom = imageData.height,
            left = 0,
            right = imageData.width;

        while (top < bottom && rowBlank(imageData, width, top)) ++top;
        while (bottom - 1 > top && rowBlank(imageData, width, bottom - 1)) --bottom;
        while (left < right && columnBlank(imageData, width, left, top, bottom)) ++left;
        while (right - 1 > left && columnBlank(imageData, width, right - 1, top, bottom)) --right;

        var trimmed = ctx.getImageData(left, top, right - left, bottom - top);
        var copy = canvas.ownerDocument.createElement("canvas");
        var copyCtx = copy.getContext("2d");
        copy.width = trimmed.width;
        copy.height = trimmed.height;
        copyCtx.putImageData(trimmed, 0, 0);

        return copy;
    };
})();

var trimAndFlattenCanvas = (function() {
    function rowBlank(imageData, width, y) {
        for (var x = 0; x < width; ++x) {
            if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false;
        }
        return true;
    }

    function columnBlank(imageData, width, x, top, bottom) {
        for (var y = top; y < bottom; ++y) {
            if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false;
        }
        return true;
    }

    return function(canvas) {
        if (canvas.width == 0 || canvas.height == 0) return canvas;
        var ctx = canvas.getContext("2d");
        var width = canvas.width;
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var top = 0,
            bottom = imageData.height,
            left = 0,
            right = imageData.width;

        while (top < bottom && rowBlank(imageData, width, top)) ++top;
        while (bottom - 1 > top && rowBlank(imageData, width, bottom - 1)) --bottom;
        while (left < right && columnBlank(imageData, width, left, top, bottom)) ++left;
        while (right - 1 > left && columnBlank(imageData, width, right - 1, top, bottom)) --right;

        var trimmed = ctx.getImageData(left, top, right - left, bottom - top);
        var copy = canvas.ownerDocument.createElement("canvas");
        var copyCtx = copy.getContext("2d");
        copy.width = trimmed.width;
        copy.height = trimmed.height;

        flattenImage(trimmed);

        copyCtx.putImageData(trimmed, 0, 0);
        return copy;
    };
})();