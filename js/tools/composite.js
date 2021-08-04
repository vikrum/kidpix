KiddoPaint.Tools.Toolbox.Composite = function() {
    var tool = this;
    this.composed = [];

    this.compose = function(t) {
        tool.composed.push(t);
    }

    this.clearComposed = function() {
        tool.composed.length = 0;
    }

    this.mousedown = function(ev) {
        // composites will be doing many saveMains, so pause state here
        KiddoPaint.Display.pauseUndo();
        for (const ctool of tool.composed) {
            ctool.mousedown(ev);
        }
    };

    this.mousemove = function(ev) {
        for (const ctool of tool.composed) {
            ctool.mousemove(ev);
        }
    };

    this.mouseup = function(ev) {
        for (const ctool of tool.composed) {
            ctool.mouseup(ev);
        }
        // ... everything in between should have done saveMains, so all the composite's
        // intermediate preview, tmp contexts, etc are still pending turn it back on now and save main
        KiddoPaint.Display.resumeUndo();
        KiddoPaint.Display.saveMain();
    };
};
KiddoPaint.Tools.Composite = new KiddoPaint.Tools.Toolbox.Composite();