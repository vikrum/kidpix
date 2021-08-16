KiddoPaint.Submenu.spray = [{
        name: 'Spray Paint 2',
        imgJs: function() {
            return KiddoPaint.Textures.SprayPaint2().toDataURL();
        },
        handler: function() {
            KiddoPaint.Tools.SpritePlacer.image = KiddoPaint.Textures.SprayPaint2(KiddoPaint.Current.color);
            KiddoPaint.Tools.SpritePlacer.soundBefore = function() {};
            KiddoPaint.Tools.SpritePlacer.soundDuring = function() {};
            KiddoPaint.Current.tool = KiddoPaint.Tools.SpritePlacer;
        }
    },
    {
        name: 'Spray Paint 3',
        imgJs: function() {
            return KiddoPaint.Textures.SprayPaint3().toDataURL();
        },
        handler: function() {
            KiddoPaint.Tools.SpritePlacer.image = KiddoPaint.Textures.SprayPaint3(KiddoPaint.Current.color);
            KiddoPaint.Current.tool = KiddoPaint.Tools.SpritePlacer;
        }
    },
    {
        name: 'Spray Paint 4',
        imgJs: function() {
            return KiddoPaint.Textures.SprayPaint4().toDataURL();
        },
        handler: function() {
            KiddoPaint.Tools.SpritePlacer.image = KiddoPaint.Textures.SprayPaint4(KiddoPaint.Current.color);
            KiddoPaint.Current.tool = KiddoPaint.Tools.SpritePlacer;
        }
    },
    {
        name: 'Spray Paint 5',
        imgJs: function() {
            return KiddoPaint.Textures.SprayPaint5().toDataURL();
        },
        handler: function() {
            KiddoPaint.Tools.SpritePlacer.image = KiddoPaint.Textures.SprayPaint5(KiddoPaint.Current.color);
            KiddoPaint.Current.tool = KiddoPaint.Tools.SpritePlacer;
        }
    },
    {
        name: 'Spray Paint 6',
        imgJs: function() {
            return KiddoPaint.Textures.SprayPaint6().toDataURL();
        },
        handler: function() {
            KiddoPaint.Tools.SpritePlacer.image = KiddoPaint.Textures.SprayPaint6(KiddoPaint.Current.color);
            KiddoPaint.Current.tool = KiddoPaint.Tools.SpritePlacer;
        }
    },
    {
        name: 'Spray Paint 7',
        imgJs: function() {
            return KiddoPaint.Textures.SprayPaint7().toDataURL();
        },
        handler: function() {
            KiddoPaint.Tools.SpritePlacer.image = KiddoPaint.Textures.SprayPaint7(KiddoPaint.Current.color);
            KiddoPaint.Current.tool = KiddoPaint.Tools.SpritePlacer;
        }
    }, {
        name: 'spacer',
        invisible: true,
        handler: true
    },
];