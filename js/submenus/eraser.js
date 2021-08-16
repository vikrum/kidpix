KiddoPaint.Submenu.eraser = [{
        name: 'Eraser Squre 20',
        imgSrc: 'img/tool-submenu-eraser-178.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-crosshair');
            KiddoPaint.Tools.Eraser.size = 20;
            KiddoPaint.Tools.Eraser.isSquareEraser = true;
            KiddoPaint.Current.tool = KiddoPaint.Tools.Eraser;
        }
    },
    {
        name: 'Eraser Circle 15',
        imgSrc: 'img/tool-submenu-eraser-179.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-crosshair');
            KiddoPaint.Tools.Eraser.size = 10;
            KiddoPaint.Tools.Eraser.isSquareEraser = false;
            KiddoPaint.Current.tool = KiddoPaint.Tools.Eraser;
        }
    },
    {
        name: 'Eraser',
        imgSrc: 'img/tool-submenu-eraser-180.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-crosshair');
            KiddoPaint.Tools.Eraser.size = 10;
            KiddoPaint.Tools.Eraser.isSquareEraser = true;
            KiddoPaint.Current.tool = KiddoPaint.Tools.Eraser;
        }
    },
    {
        name: 'Eraser',
        imgSrc: 'img/tool-submenu-eraser-181.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-crosshair');
            KiddoPaint.Tools.Eraser.size = 2;
            KiddoPaint.Tools.Eraser.isSquareEraser = true;
            KiddoPaint.Current.tool = KiddoPaint.Tools.Eraser;
        }
    },
    {
        name: 'Firecracker',
        imgSrc: 'img/tool-submenu-eraser-182.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-tnt');
            KiddoPaint.Current.tool = KiddoPaint.Tools.Tnt
        }
    },
    {
        name: 'Hidden Pictures',
        imgSrc: 'img/tool-submenu-eraser-183.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-crosshair');
            KiddoPaint.Tools.EraserHiddenPicture.reset();
            KiddoPaint.Current.tool = KiddoPaint.Tools.EraserHiddenPicture;
        }
    },
    {
        name: 'White Circles',
        imgSrc: 'img/tool-submenu-eraser-184.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-crosshair');
            KiddoPaint.Tools.EraserWhiteCircles.reset();
            KiddoPaint.Current.tool = KiddoPaint.Tools.EraserWhiteCircles;
        }
    },
    {
        name: 'Slip-Sliding Away',
        imgSrc: 'img/tool-submenu-eraser-185.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-guy-smile');
            KiddoPaint.Current.tool = KiddoPaint.Tools.Doorbell;
        }
    },
    {
        name: '#$%!*!!',
        imgSrc: 'img/tool-submenu-eraser-186.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-guy-smile');
            KiddoPaint.Current.tool = KiddoPaint.Tools.EraserLetters;;
        }
    },
    {
        name: 'Fade Away',
        imgSrc: 'img/tool-submenu-eraser-187.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-guy-smile');
            KiddoPaint.Current.tool = KiddoPaint.Tools.EraserFadeAway;
        }
    },
    /*
    {
        name: 'Drop Out',
        imgSrc: 'img/tool-submenu-eraser-188.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-crosshair');
            KiddoPaint.Current.tool = KiddoPaint.Tools.Eraser;
            KiddoPaint.Sounds.unimpl();
        }
    },
    */
    {
        name: 'Black Hole',
        imgSrc: 'img/tool-submenu-eraser-189.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-crosshair');
            KiddoPaint.Current.tool = KiddoPaint.Tools.Eraser;
            KiddoPaint.Sounds.unimpl();
        }
    },
    {
        name: 'Count Down',
        imgSrc: 'img/tool-submenu-eraser-190.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-crosshair');
            KiddoPaint.Current.tool = KiddoPaint.Tools.Eraser;
            KiddoPaint.Sounds.unimpl();
        }
    },
    /*
    {
        name: 'Sweep',
        imgSrc: 'img/tool-submenu-eraser-191.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-crosshair');
            KiddoPaint.Current.tool = KiddoPaint.Tools.Eraser;
	    KiddoPaint.Sounds.unimpl();
        }
    },
    */
];