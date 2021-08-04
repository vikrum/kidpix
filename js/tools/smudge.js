KiddoPaint.Tools.Toolbox.Smudge = function() {
    //	 https://stackoverflow.com/a/61970857
    var tool = this;
    this.isDown = false;
    this.size = 36;
    this.previousEv = null;
    this.brushCtx = document.createElement('canvas').getContext("2d");


    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.previousEv = ev;
        updateBrush(ev._x, ev._y);
    };

    this.mousemove = function(ev) {
        if (!tool.isDown) {
            return;
        }

        const line = setupLine(tool.previousEv._x, tool.previousEv._y, ev._x, ev._y);
        KiddoPaint.Display.context.globalAlpha = 0.5;

        for (let more = true; more;) {
            more = advanceLine(line);

            KiddoPaint.Display.context.drawImage(
                tool.brushCtx.canvas,
                line.position[0] - tool.brushCtx.canvas.width / 2,
                line.position[1] - tool.brushCtx.canvas.height / 2
            );
            updateBrush(line.position[0], line.position[1]);
        }
        tool.previousEv = ev;
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            KiddoPaint.Display.context.globalAlpha = 1;
            KiddoPaint.Display.saveMain();
        }
    };

    function feather(ctx) {
        ctx.save();
        ctx.fillStyle = createFeatherGradient(tool.size, 0.1);
        ctx.globalCompositeOperation = 'destination-out';
        const {
            width,
            height
        } = ctx.canvas;
        ctx.translate(width / 2, height / 2);
        ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.restore();
    }

    function updateBrush(x, y) {
        let width = tool.brushCtx.canvas.width;
        let height = tool.brushCtx.canvas.height;
        let srcX = x - width / 2;
        let srcY = y - height / 2;
        // draw it in the middle of the brush
        let dstX = (tool.brushCtx.canvas.width - width) / 2;
        let dstY = (tool.brushCtx.canvas.height - height) / 2;

        // clear the brush canvas
        tool.brushCtx.clearRect(0, 0, tool.brushCtx.canvas.width, tool.brushCtx.canvas.height);

        // clip the rectangle to be
        // inside
        if (srcX < 0) {
            width += srcX;
            dstX -= srcX;
            srcX = 0;
        }
        const overX = srcX + width - KiddoPaint.Display.main_context.canvas.width;
        if (overX > 0) {
            width -= overX;
        }

        if (srcY < 0) {
            dstY -= srcY;
            height += srcY;
            srcY = 0;
        }
        const overY = srcY + height - KiddoPaint.Display.main_context.canvas.height;
        if (overY > 0) {
            height -= overY;
        }

        if (width <= 0 || height <= 0) {
            return;
        }

        // kiddopaint needs to update the brush initially with the main context...
        tool.brushCtx.drawImage(
            KiddoPaint.Display.main_context.canvas,
            srcX, srcY, width, height,
            dstX, dstY, width, height);

        // and also with the preview context.
        tool.brushCtx.drawImage(
            KiddoPaint.Display.context.canvas,
            srcX, srcY, width, height,
            dstX, dstY, width, height);

        feather(tool.brushCtx);
    }


    function setupLine(x, y, targetX, targetY) {
        const deltaX = targetX - x;
        const deltaY = targetY - y;
        const deltaRow = Math.abs(deltaX);
        const deltaCol = Math.abs(deltaY);
        const counter = Math.max(deltaCol, deltaRow);
        const axis = counter == deltaCol ? 1 : 0;

        // setup a line draw.
        return {
            position: [x, y],
            delta: [deltaX, deltaY],
            deltaPerp: [deltaRow, deltaCol],
            inc: [Math.sign(deltaX), Math.sign(deltaY)],
            accum: Math.floor(counter / 2),
            counter: counter,
            endPnt: counter,
            axis: axis,
            u: 0,
        };
    };

    function advanceLine(line) {
        --line.counter;
        line.u = 1 - line.counter / line.endPnt;
        if (line.counter <= 0) {
            return false;
        }
        const axis = line.axis;
        const perp = 1 - axis;
        line.accum += line.deltaPerp[perp];
        if (line.accum >= line.endPnt) {
            line.accum -= line.endPnt;
            line.position[perp] += line.inc[perp];
        }
        line.position[axis] += line.inc[axis];
        return true;
    }

};
KiddoPaint.Tools.Smudge = new KiddoPaint.Tools.Toolbox.Smudge();