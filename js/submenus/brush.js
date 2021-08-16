KiddoPaint.Submenu.wackybrush = [{
        name: 'Leaky Pen',
        imgSrc: 'img/tool-menu-wacky-brush-70.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.AnimBrush;
            KiddoPaint.Tools.AnimBrush.reset();
            KiddoPaint.Tools.AnimBrush.texture = function(step, distancePrev) {
                KiddoPaint.Sounds.brushleakypen(); // sound
                return KiddoPaint.Brushes.LeakyPen(KiddoPaint.Current.color, distancePrev);
            }
        }
    },
    {
        name: 'Zig Zag',
        imgSrc: 'img/tool-menu-wacky-brush-71.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.Scribble;
        }
    },
    {
        name: 'Dots',
        imgSrc: 'img/tool-menu-wacky-brush-72.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.PlainBrush;
            KiddoPaint.Tools.PlainBrush.reset();
            KiddoPaint.Tools.PlainBrush.soundduring = KiddoPaint.Sounds.brushdots;
            KiddoPaint.Tools.PlainBrush.texture = function() {
                KiddoPaint.Tools.PlainBrush.spacing = 22 * KiddoPaint.Current.scaling;
                return KiddoPaint.Current.modifiedMeta ? KiddoPaint.Brushes.RCircles() : KiddoPaint.Brushes.Circles(KiddoPaint.Current.color);
            }
        }
    },
    {
        name: 'Bubbly',
        imgSrc: 'img/tool-menu-wacky-brush-73.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.AnimBrush;
            KiddoPaint.Tools.AnimBrush.reset();
            KiddoPaint.Tools.AnimBrush.texture = function() {
                KiddoPaint.Sounds.brushbubbly();
                return KiddoPaint.Brushes.Bubbles(KiddoPaint.Current.color);
            }
        }
    },
    {
        name: 'Pies',
        imgSrc: 'img/tool-menu-wacky-brush-74.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.PlainBrush;
            KiddoPaint.Tools.PlainBrush.reset();
            KiddoPaint.Tools.PlainBrush.soundduring = KiddoPaint.Sounds.brushpies;
            KiddoPaint.Tools.PlainBrush.texture = function() {
                KiddoPaint.Tools.PlainBrush.spacing = 40 * KiddoPaint.Current.scaling;
                return KiddoPaint.Brushes.Pies(KiddoPaint.Current.color)
            };
        }
    },
    {
        name: 'Echoes',
        imgSrc: 'img/tool-menu-wacky-brush-75.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.PlainBrush;
            KiddoPaint.Tools.PlainBrush.reset();
            KiddoPaint.Tools.PlainBrush.soundduring = KiddoPaint.Sounds.brushecho;
            KiddoPaint.Tools.PlainBrush.spacing = 1;
            KiddoPaint.Tools.PlainBrush.texture = function(step) {
                return KiddoPaint.Brushes.Concentric(KiddoPaint.Current.color, step)
            };
        }
    },
    {
        name: 'Northern Lights',
        imgSrc: 'img/tool-menu-wacky-brush-76.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.Contours;
        }
    },
    {
        name: 'Fuzzer',
        imgSrc: 'img/tool-menu-wacky-brush-77.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-none');
            KiddoPaint.Current.tool = KiddoPaint.Tools.Fuzzer;
        }
    },
    {
        name: 'Magnifying Glass',
        imgSrc: 'img/tool-menu-wacky-brush-78.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.Magnify;
        }
    },
    {
        name: 'Spray Paint',
        imgSrc: 'img/tool-menu-wacky-brush-79.png',
        handler: function(e) {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Tools.SpritePlacer.image = KiddoPaint.Textures.SprayPaint2(KiddoPaint.Current.color);
            KiddoPaint.Tools.SpritePlacer.soundBefore = function() {};
            KiddoPaint.Tools.SpritePlacer.soundDuring = function() {
                KiddoPaint.Sounds.brushspraypaint();
            };
            KiddoPaint.Current.tool = KiddoPaint.Tools.SpritePlacer;
            if (e.ctrlKey) {
                show_generic_submenu('spray');
            }
        }
    },
    {
        name: 'Pine Needles',
        imgSrc: 'img/tool-menu-wacky-brush-80.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.Pines;
        }
    },
    {
        name: '3-D',
        imgSrc: 'img/tool-menu-wacky-brush-81.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.ThreeDBrush;
        }
    },
    {
        name: 'Kaliediscope',
        imgSrc: 'img/tool-menu-wacky-brush-82.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.Kaleidoscope;
        }
    },
    /*
    {
        name: 'Drippy Paint',
        imgSrc: 'img/tool-menu-wacky-brush-83.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Sounds.unimpl();
        }
    },
    */
    {
        name: 'Connect The Dots',
        imgSrc: 'img/tool-menu-wacky-brush-84.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.PlainBrush;
            KiddoPaint.Tools.PlainBrush.reset();
            KiddoPaint.Tools.PlainBrush.spacing = 25;
            KiddoPaint.Tools.PlainBrush.soundduring = KiddoPaint.Sounds.brushtwirly;
            KiddoPaint.Tools.PlainBrush.texture = function(step, pstep) {
                return KiddoPaint.Brushes.ConnectTheDots(KiddoPaint.Current.modifiedMeta ? KiddoPaint.Colors.nextColor() : KiddoPaint.Current.color, pstep)
            };
        }
    },
    /*
    {
        name: 'Alphabet Line',
        imgSrc: 'img/tool-menu-wacky-brush-85.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Sounds.unimpl();
        }
    },
    */
    {
        name: 'Swirl',
        imgSrc: 'img/tool-menu-wacky-brush-86.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.PlainBrush;
            KiddoPaint.Tools.PlainBrush.reset();
            KiddoPaint.Tools.PlainBrush.spacing = 1;
            KiddoPaint.Tools.PlainBrush.soundduring = KiddoPaint.Sounds.brushtwirly;
            KiddoPaint.Tools.PlainBrush.texture = function(step) {
                return KiddoPaint.Brushes.Twirly(KiddoPaint.Current.modifiedMeta ? KiddoPaint.Colors.nextColor() : KiddoPaint.Current.color, step)
            };
        }
    },
    {
        name: 'Rotating Dots',
        imgSrc: 'img/br12.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.PlainBrush;
            KiddoPaint.Tools.PlainBrush.reset();
            KiddoPaint.Tools.PlainBrush.soundduring = KiddoPaint.Sounds.brushrollingdots;
            KiddoPaint.Tools.PlainBrush.spacing = 1;
            KiddoPaint.Tools.PlainBrush.texture = function(step) {
                return KiddoPaint.Current.modifiedCtrl ? KiddoPaint.Brushes.RotatingPentagon(KiddoPaint.Current.modifiedMeta ? KiddoPaint.Colors.nextColor() : KiddoPaint.Current.color, step) : KiddoPaint.Brushes.FollowingSine(KiddoPaint.Current.modifiedMeta ? KiddoPaint.Colors.nextColor() : KiddoPaint.Current.color, step)
            };
        }
    },
    {
        name: 'Inverter',
        imgSrc: 'img/tool-menu-wacky-brush-87.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.Inverter;
        }
    },
    {
        name: 'Geometry',
        imgSrc: 'img/tool-menu-wacky-brush-88.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.Guilloche;
        }
    },
    {
        name: 'XY to XY',
        imgSrc: 'img/br16.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.Astroid;
        }
    },
    {
        name: 'Tree',
        imgSrc: 'img/tool-menu-wacky-brush-89.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.Tree;
        }
    },
    /*
    {
        name: 'Caterpillars',
        imgSrc: 'img/tool-menu-wacky-brush-90.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Sounds.unimpl();
        }
    },
    */
    {
        name: 'Splatter Paint',
        imgSrc: 'img/tool-menu-wacky-brush-91.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.AnimBrush;
            KiddoPaint.Tools.AnimBrush.reset();
            KiddoPaint.Tools.AnimBrush.animInterval = 100;
            KiddoPaint.Tools.AnimBrush.texture = function() {
                KiddoPaint.Sounds.brushbubbly();
                return KiddoPaint.Current.modifiedMeta ? KiddoPaint.Brushes.Triangles() : KiddoPaint.Brushes.Splatters();
            }
        }
    },
    {
        name: 'Starburst',
        imgSrc: 'img/br-starburst.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Tools.Line.size = KiddoPaint.Current.modified ? 3 : 2;
            KiddoPaint.Tools.Line.stomp = false;
            KiddoPaint.Tools.Line.texture = function() {
                return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
            }
            KiddoPaint.Current.tool = KiddoPaint.Tools.Line;
        }
    },
    {
        name: 'The Looper',
        imgSrc: 'img/tool-menu-wacky-brush-92.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.Looper;
        }
    },
    /*
    {
        name: 'Roll The Dice',
        imgSrc: 'img/tool-menu-wacky-brush-93.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Sounds.unimpl();
        }
    },
    */
    {
        name: 'A Galaxy of Stars',
        imgSrc: 'img/tool-menu-wacky-brush-94.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.PlainBrush;
            KiddoPaint.Tools.PlainBrush.reset();
            KiddoPaint.Tools.PlainBrush.spacing = 36;
            KiddoPaint.Tools.PlainBrush.soundduring = KiddoPaint.Sounds.brushstars;
            KiddoPaint.Tools.PlainBrush.texture = function() {
                return KiddoPaint.Builders.Prints(KiddoPaint.Current.color, KiddoPaint.Alphabet.nextWingding(2));
            };
        }
    },
    {
        name: 'Lots of Hugs and Xs',
        imgSrc: 'img/tool-menu-wacky-brush-95.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.PlainBrush;
            KiddoPaint.Tools.PlainBrush.reset();
            KiddoPaint.Tools.PlainBrush.soundduring = KiddoPaint.Sounds.brushxos;
            KiddoPaint.Tools.PlainBrush.spacing = 36;
            KiddoPaint.Tools.PlainBrush.texture = function() {
                return KiddoPaint.Builders.Prints(KiddoPaint.Current.color, KiddoPaint.Alphabet.nextWingding(1));
            };
        }
    },
    {
        name: 'A Full Deck of Cards',
        imgSrc: 'img/tool-menu-wacky-brush-96.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.PlainBrush;
            KiddoPaint.Tools.PlainBrush.reset();
            KiddoPaint.Tools.PlainBrush.soundduring = KiddoPaint.Sounds.brushcards;
            KiddoPaint.Tools.PlainBrush.spacing = 36;
            KiddoPaint.Tools.PlainBrush.texture = function() {
                return KiddoPaint.Builders.Prints(KiddoPaint.Current.color, KiddoPaint.Alphabet.nextWingding(3));
            };
        }
    },
    {
        name: 'Shapes and More Shapes',
        imgSrc: 'img/tool-menu-wacky-brush-97.png',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.PlainBrush;
            KiddoPaint.Tools.PlainBrush.reset();
            KiddoPaint.Tools.PlainBrush.soundduring = KiddoPaint.Sounds.brushshapes;
            KiddoPaint.Tools.PlainBrush.spacing = 36;
            KiddoPaint.Tools.PlainBrush.texture = function() {
                return KiddoPaint.Builders.Prints(KiddoPaint.Current.color, KiddoPaint.Alphabet.nextWingding(4));
            };
        }
    },
    {
        name: 'Paw Prints',
        emoji: '🐾',
        handler: function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add('cursor-paint-brush');
            KiddoPaint.Current.tool = KiddoPaint.Tools.Brush;
            KiddoPaint.Tools.Brush.reset();
            KiddoPaint.Tools.Brush.soundduring = KiddoPaint.Sounds.brushprints;
            KiddoPaint.Tools.Brush.texture = function(angle) {
                return KiddoPaint.Builders.Prints(KiddoPaint.Current.color, KiddoPaint.Current.modifiedMeta ? '👣' : '🐾', angle).brush;
            };
        }
    },


];