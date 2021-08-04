KiddoPaint.Submenu.spray = [{
        name: 'Bezier Mean Streak',
        imgSrc: 'img/pw1.png',
        handler: function() {
            KiddoPaint.Tools.PlainBrush.reset();
            KiddoPaint.Tools.PlainBrush.spacing = 1;
            KiddoPaint.Tools.PlainBrush.texture = function(step) {
                return KiddoPaint.Brushes.MeanStreak(step)
            };
            KiddoPaint.Tools.BezFollow.synthtool = KiddoPaint.Tools.PlainBrush;
            KiddoPaint.Current.tool = KiddoPaint.Tools.BezFollow;
        }
    },
    {
        name: 'Bezier Spray Can',
        imgSrc: 'img/pw2.png',
        handler: function() {
            KiddoPaint.Tools.PlainBrush.reset();
            KiddoPaint.Tools.PlainBrush.spacing = 0;
            KiddoPaint.Tools.PlainBrush.texture = function() {
                return KiddoPaint.Brushes.Spray(KiddoPaint.Current.color, KiddoPaint.Current.terColor)
            };
            KiddoPaint.Tools.PlainBrush.preprocess = function() {
                KiddoPaint.Display.context.shadowBlur = 16;
                KiddoPaint.Display.context.shadowColor = KiddoPaint.Current.altColor;
            };
            KiddoPaint.Tools.PlainBrush.postprocess = function() {
                KiddoPaint.Display.context.shadowBlur = 0;
                KiddoPaint.Display.context.shadowColor = null;
            };
            KiddoPaint.Tools.BezFollow.synthtool = KiddoPaint.Tools.PlainBrush;
            KiddoPaint.Current.tool = KiddoPaint.Tools.BezFollow;
        }
    },
    {
        name: 'spacer',
        invisible: true,
        handler: true
    },
    {
        name: 'Bar Spray Can',
        text: 'bar',
        handler: function() {
            KiddoPaint.Current.tool = KiddoPaint.Tools.PlainBrush;
            KiddoPaint.Tools.PlainBrush.reset();
            KiddoPaint.Tools.PlainBrush.spacing = 0;
            KiddoPaint.Tools.PlainBrush.texture = function() {
                return KiddoPaint.Brushes.Dumbbell(KiddoPaint.Current.color, KiddoPaint.Current.terColor)
            };
        }
    },
    {
        name: 'Icy Spray Can',
        text: 'icy',
        handler: function() {
            KiddoPaint.Current.tool = KiddoPaint.Tools.PlainBrush;
            KiddoPaint.Tools.PlainBrush.reset();
            KiddoPaint.Tools.PlainBrush.spacing = 0;
            KiddoPaint.Tools.PlainBrush.texture = function() {
                return KiddoPaint.Brushes.Icy(KiddoPaint.Current.color, KiddoPaint.Current.terColor)
            };
        }
    },
];