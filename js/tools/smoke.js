KiddoPaint.Tools.Toolbox.Smoke = function() {
    var tool = this;
    this.isDown = false;
    this.party = {};

    this.mousedown = function(ev) {
        tool.isDown = true;
        KiddoPaint.Display.context.save();
        var smokeColor = color2json(KiddoPaint.Current.color);
        tool.party = SmokeMachine(KiddoPaint.Display.context, [smokeColor.r, smokeColor.g, smokeColor.b]); // ;
        tool.party.start();
        setTimeout(function() {
            tool.party.addSmoke(ev._x, ev._y, 64);
            tool.party.step(10);
        }, 100);
    };

    this.mousemove = function(ev) {
        if (tool.isDown) {
            tool.party.addSmoke(ev._x, ev._y, 4);
        }
    };

    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            setTimeout(function() {
                tool.party.stop();
                KiddoPaint.Display.saveMain();
                tool.party = {};
                KiddoPaint.Display.context.restore();
            }, 100);
        }
    };
};
KiddoPaint.Tools.Smoke = new KiddoPaint.Tools.Toolbox.Smoke();