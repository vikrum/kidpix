KiddoPaint.Submenu.pencil = [{
        name: 'Size 1',
        imgSrc: 'img/tool-submenu-pencil-size-1.png',
        handler: function() {
            KiddoPaint.Tools.Pencil.size = 1;
        }
    },
    {
        name: 'Size 5',
        imgSrc: 'img/tool-submenu-pencil-size-2.png',
        handler: function() {
            KiddoPaint.Tools.Pencil.size = 5;
        }
    },
    {
        name: 'Size 10',
        imgSrc: 'img/tool-submenu-pencil-size-3.png',
        handler: function() {
            KiddoPaint.Tools.Pencil.size = 9;
        }
    },
    {
        name: 'Size 25',
        imgSrc: 'img/tool-submenu-pencil-size-4.png',
        handler: function() {
            KiddoPaint.Tools.Pencil.size = 13;
        }
    },
    {
        name: 'Size 100',
        imgSrc: 'img/tool-submenu-pencil-size-5.png',
        handler: function() {
            KiddoPaint.Tools.Pencil.size = 17;
        }
    },
    {
        name: 'Size 100',
        imgSrc: 'img/tool-submenu-pencil-size-6.png',
        handler: function() {
            KiddoPaint.Tools.Pencil.size = 25;
        }
    },

    {
        name: 'spacer',
        invisible: true,
        handler: true
    },

    {
        name: 'Texture 1',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Solid)
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function() {
                return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
            }
        }
    },
    {
        name: 'Texture 2',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Partial1);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function() {
                return KiddoPaint.Textures.Partial1(KiddoPaint.Current.color);
            }
        }
    },
    {
        name: 'Texture 3',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Partial2);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function() {
                return KiddoPaint.Textures.Partial2(KiddoPaint.Current.color);
            }
        }
    },
    {
        name: 'Texture 4',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Partial3);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function() {
                return KiddoPaint.Textures.Partial3(KiddoPaint.Current.color);
            }
        }
    },
    {
        name: 'Texture 7',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Speckles);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function() {
                return KiddoPaint.Textures.Speckles(KiddoPaint.Current.color);
            }
        }
    },
    {
        name: 'Texture 8',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Bubbles);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function() {
                return KiddoPaint.Textures.Bubbles(KiddoPaint.Current.color);
            }
        }
    },
    {
        name: 'Texture 9',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Diamond);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function() {
                return KiddoPaint.Textures.Diamond(KiddoPaint.Current.color);
            }
        }
    },
    {
        name: 'Texture 10',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Sand);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function() {
                return KiddoPaint.Textures.Sand(KiddoPaint.Current.color);
            }
        }
    },
    {
        name: 'Texture 11',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Brick);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function() {
                return KiddoPaint.Textures.Brick(KiddoPaint.Current.color);
            }
        }
    },
    {
        name: 'Texture 12',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.CornerStair);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function() {
                return KiddoPaint.Textures.CornerStair(KiddoPaint.Current.color);
            }
        }
    },
    {
        name: 'Texture 13',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Houndstooth)
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function() {
                return KiddoPaint.Textures.Houndstooth(KiddoPaint.Current.color);
            }
        }
    },
    {
        name: 'Rainbow',
        imgSrc: 'img/tool-unknown.png',
        handler: function() {
            var hue = 0;
            KiddoPaint.Tools.Pencil.texture = function() {
                if (KiddoPaint.Current.modifiedMeta) {
                    return KiddoPaint.Textures.Rainbow();
                } else if (KiddoPaint.Current.modifiedAlt) {
                    return KiddoPaint.Textures.RSolid();
                } else {
                    hue++;
                    if (hue >= 360) hue = 0;
                    return KiddoPaint.Textures.HueSolid(hue);
                }
            }
        }
    },
    /*
    {
        name: 'Rainbow 3',
        imgSrc: 'img/tool-unknown.png',
        handler: function() {
            KiddoPaint.Current.tool = KiddoPaint.Tools.PlainBrush;
            KiddoPaint.Tools.PlainBrush.reset();
            KiddoPaint.Tools.PlainBrush.spacing = 0;
            KiddoPaint.Tools.PlainBrush.alwaysGapFill = true;
            KiddoPaint.Tools.PlainBrush.texture = function() {
                return KiddoPaint.Brushes.RainbowBar();
            };
        }
    },
    */
];