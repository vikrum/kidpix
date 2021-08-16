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
        name: 'Solid',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Solid)
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function(color) {
                return KiddoPaint.Textures.Solid(color);
            }
        }
    },
    {
        name: 'Partial 1',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Partial1);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function(color) {
                return KiddoPaint.Textures.Partial1(color);
            }
        }
    },
    {
        name: 'Partial 2',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Partial2);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function(color) {
                return KiddoPaint.Textures.Partial2(color);
            }
        }
    },
    {
        name: 'Partial 3',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Partial3);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function(color) {
                return KiddoPaint.Textures.Partial3(color);
            }
        }
    },
    {
        name: 'Partial Artifact',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.PartialArtifactAlias);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function(color) {
                return KiddoPaint.Textures.PartialArtifactAlias(color);
            }
        }
    },
    {
        name: 'Speckles',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Speckles);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function(color) {
                return KiddoPaint.Textures.Speckles(color);
            }
        }
    },
    {
        name: 'Stripes',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Stripes);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function(color) {
                return KiddoPaint.Textures.Stripes(color);
            }
        }
    },
    {
        name: 'Thatch',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Thatch);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function(color) {
                return KiddoPaint.Textures.Thatch(color);
            }
        }
    },
    {
        name: 'Shingles',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Shingles);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function(color) {
                return KiddoPaint.Textures.Shingles(color);
            }
        }
    },
    {
        name: 'Bubbles',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Bubbles);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function(color) {
                return KiddoPaint.Textures.Bubbles(color);
            }
        }
    },
    {
        name: 'Diamond',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Diamond);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function(color) {
                return KiddoPaint.Textures.Diamond(color);
            }
        }
    },
    {
        name: 'Ribbon',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Ribbon);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function(color) {
                return KiddoPaint.Textures.Ribbon(color);
            }
        }
    },
    {
        name: 'Sand',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Sand);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function(color) {
                return KiddoPaint.Textures.Sand(color);
            }
        }
    },
    {
        name: 'Brick',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Brick);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function(color) {
                return KiddoPaint.Textures.Brick(color);
            }
        }
    },
    {
        name: 'Chevron',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Chevron);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function(color) {
                return KiddoPaint.Textures.Chevron(color);
            }
        }
    },
    {
        name: 'Stairs',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Stairs);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function(color) {
                return KiddoPaint.Textures.Stairs(color);
            }
        }
    },
    {
        name: 'Cross',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Cross);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function(color) {
                return KiddoPaint.Textures.Cross(color);
            }
        }
    },
    {
        name: 'Diagonal Brick',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.DiagBrick);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function(color) {
                return KiddoPaint.Textures.DiagBrick(color);
            }
        }
    },
    {
        name: 'Corner Stair',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.CornerStair);
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function(color) {
                return KiddoPaint.Textures.CornerStair(color);
            }
        }
    },
    {
        name: 'Houndstooth',
        imgJs: function() {
            return makeIcon(KiddoPaint.Textures.Houndstooth)
        },
        handler: function() {
            KiddoPaint.Tools.Pencil.texture = function(color) {
                return KiddoPaint.Textures.Houndstooth(color);
            }
        }
    },

    {
        name: 'Rainbow',
        imgSrc: 'img/tool-unknown.png',
        handler: function() {
            var hue = 0;
            KiddoPaint.Tools.Pencil.texture = function(color) {
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