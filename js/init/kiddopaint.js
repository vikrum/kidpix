// Kiddo Paint Applications
var KiddoPaint = {};
KiddoPaint.Tools = {};
KiddoPaint.Tools.Toolbox = {};
KiddoPaint.Textures = {};
KiddoPaint.Brushes = {};
KiddoPaint.Builders = {};
KiddoPaint.Stamps = {};
KiddoPaint.Sounds = {};
KiddoPaint.Display = {};
KiddoPaint.Colors = {};
KiddoPaint.Current = {};
KiddoPaint.Cache = {};
KiddoPaint.Alphabet = {};
KiddoPaint.Sprite = {};

function init_kiddo_paint() {
    document.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    }, false);

    var canvas = document.getElementById('kiddopaint');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        // sets proper offset due to css canvas positioning and kiddopaint buttons
        canvas.width = canvas.width;
        canvas.height = canvas.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = false;

        var container = canvas.parentNode;

        bnimCanvas = document.createElement('canvas');
        bnimCanvas.id = 'bnimCanvas';
        bnimCanvas.width = canvas.width;
        bnimCanvas.height = canvas.height;
        bnimCanvas.className = 'pixelated';
        container.appendChild(bnimCanvas);
        bnimContext = bnimCanvas.getContext('2d');
        bnimContext.imageSmoothingEnabled = false;
        bnimContext.clearRect(0, 0, canvas.width, canvas.height);

        animCanvas = document.createElement('canvas');
        animCanvas.id = 'animCanvas';
        animCanvas.width = canvas.width;
        animCanvas.height = canvas.height;
        animCanvas.className = 'pixelated';
        container.appendChild(animCanvas);
        animContext = animCanvas.getContext('2d');
        animContext.imageSmoothingEnabled = false;
        animContext.clearRect(0, 0, canvas.width, canvas.height);

        previewCanvas = document.createElement('canvas');
        previewCanvas.id = 'previewCanvas';
        previewCanvas.width = canvas.width;
        previewCanvas.height = canvas.height;
        previewCanvas.className = 'pixelated';
        container.appendChild(previewCanvas);
        previewContext = previewCanvas.getContext('2d');
        previewContext.imageSmoothingEnabled = false;
        previewContext.clearRect(0, 0, canvas.width, canvas.height);

        tmpCanvas = document.createElement('canvas');
        tmpCanvas.id = 'tmpCanvas';
        tmpCanvas.width = canvas.width;
        tmpCanvas.height = canvas.height;
        tmpCanvas.className = 'pixelated';
        container.appendChild(tmpCanvas);
        tmpContext = tmpCanvas.getContext('2d');
        tmpContext.imageSmoothingEnabled = false;
        tmpContext.clearRect(0, 0, canvas.width, canvas.height);

        KiddoPaint.Display.canvas = tmpCanvas;
        KiddoPaint.Display.context = tmpContext;
        KiddoPaint.Display.context.globalAlpha = 1.0;

        KiddoPaint.Display.previewCanvas = previewCanvas;
        KiddoPaint.Display.previewContext = previewContext;
        KiddoPaint.Display.previewContext.globalAlpha = 1.0;

        KiddoPaint.Display.bnimCanvas = bnimCanvas;
        KiddoPaint.Display.bnimContext = bnimContext;
        KiddoPaint.Display.bnimContext.globalAlpha = 1.0;

        KiddoPaint.Display.animCanvas = animCanvas;
        KiddoPaint.Display.animContext = animContext;
        KiddoPaint.Display.animContext.globalAlpha = 1.0;

        KiddoPaint.Display.main_canvas = canvas;
        KiddoPaint.Display.main_context = ctx;

        KiddoPaint.Display.loadFromLocalStorage();

        init_kiddo_defaults();
        init_listeners(tmpCanvas);
        init_tool_bar();
        init_subtool_bars();
        init_color_selector();
    }
}

function init_kiddo_defaults() {
    KiddoPaint.Current.color = KiddoPaint.Colors.currentPalette()[0];
    KiddoPaint.Current.altColor = KiddoPaint.Colors.currentPalette()[0];
    KiddoPaint.Current.terColor = KiddoPaint.Colors.currentPalette()[0];
    KiddoPaint.Current.tool = KiddoPaint.Tools.Pencil;
    KiddoPaint.Current.globalAlpha = 1.0;
    KiddoPaint.Current.scaling = 1;
    KiddoPaint.Display.step = 0;
    KiddoPaint.Current.modified = false;
    KiddoPaint.Current.modifiedAlt = false;
    KiddoPaint.Current.modifiedCtrl = false;
    KiddoPaint.Current.modifiedToggle = false;
    KiddoPaint.Current.modifiedMeta = false;
    KiddoPaint.Current.modifiedTilde = false;
    KiddoPaint.Current.velToggle = false;
    KiddoPaint.Alphabet.page = 1;
    KiddoPaint.Stamps.page = 0;
    KiddoPaint.Sprite.page = 0;
    KiddoPaint.Current.multiplier = 1;
    KiddoPaint.Current.prevEv = null;
    KiddoPaint.Current.prevEvTs = Date.now();
    KiddoPaint.Current.velocity = 0;
    KiddoPaint.Current.velocityMultiplier = 1;
    reset_ranges();
}

function reset_ranges() {
    KiddoPaint.Current.multiplier = 1;
    KiddoPaint.Current.modifiedRange = 0;
    KiddoPaint.Current.modifiedAltRange = 0;
    KiddoPaint.Current.modifiedCtrlRange = 0;
    KiddoPaint.Current.modifiedToggle = false;
    KiddoPaint.Current.velToggle = false;
    KiddoPaint.Current.modifiedMeta = false;
    KiddoPaint.Current.modifiedTilde = false;
}

function init_listeners(canvas) {
    canvas.addEventListener('mousedown', ev_canvas);
    canvas.addEventListener('mousemove', ev_canvas);
    canvas.addEventListener('mouseup', ev_canvas);

    // Set up touch events for mobile, etc
    canvas.addEventListener("touchstart", function(e) {
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
        e.preventDefault();
    }, false);
    canvas.addEventListener("touchend", function(e) {
        var touch = e.changedTouches[0];
        var mouseEvent = new MouseEvent("mouseup", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
        e.preventDefault();
    }, false);
    canvas.addEventListener("touchmove", function(e) {
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
        e.preventDefault();
    }, false);

    canvas.addEventListener('mouseleave', function() {
        // we force a mouse up - this fixes a bug with some effects in which a clearPrev wipes the whole canvas
        KiddoPaint.Current.tool.mouseup(KiddoPaint.Current.ev);
        KiddoPaint.Display.clearPreview();
        KiddoPaint.Display.clearAnim();
        KiddoPaint.Display.clearBnim();
    });
    canvas.addEventListener("mousewheel", mouse_wheel);
    canvas.addEventListener("dragover", function(ev) {
        if (ev.preventDefault) {
            ev.preventDefault();
        };
        ev.returnValue = false;
        return false;
    }, false);
    canvas.addEventListener("drop", image_upload);

    document.onkeydown = function checkKey(e) {
        if (e.keyCode == 16) {
            KiddoPaint.Current.scaling = 2;
            KiddoPaint.Current.modified = true;
        } else if (e.keyCode == 91 || e.keyCode == 93) {
            KiddoPaint.Current.modifiedCtrl = true;
        } else if (e.keyCode == 18) {
            KiddoPaint.Current.modifiedAlt = true;
        } else if (e.keyCode == 17) {
            KiddoPaint.Current.modifiedMeta = true;
        } else if (e.keyCode == 192) {
            KiddoPaint.Current.modifiedTilde = true;
        } else if (e.keyCode == 78) { // n
            var c = KiddoPaint.Colors.nextAllColor();
            // keep them in sync
            KiddoPaint.Current.color = c;
            KiddoPaint.Current.altColor = c;
            KiddoPaint.Current.terColor = c;
            document.getElementById('currentColor').style = 'background-color: ' + c;
        } else if (e.keyCode == 67) { // c
            KiddoPaint.Colors.nextPalette();
            set_colors_to_current_palette();
        } else if (e.keyCode == 82) { // r
            var c = KiddoPaint.Colors.randomAllColor();
            KiddoPaint.Current.color = c;
            document.getElementById('currentColor').style = 'background-color: ' + c;
            KiddoPaint.Current.altColor = KiddoPaint.Colors.randomAllColor();
            KiddoPaint.Current.terColor = KiddoPaint.Colors.randomAllColor();
        } else if (e.keyCode == 83) {
            save_to_file();
        } else if (e.keyCode > 48 && e.keyCode < 58) {
            KiddoPaint.Current.multiplier = e.keyCode - 48;
        } else if (e.keyCode == 32) {
            e.stopPropagation();
            e.preventDefault();
            KiddoPaint.Current.modifiedToggle = !KiddoPaint.Current.modifiedToggle;
        } else if (e.keyCode == 86) {
            KiddoPaint.Current.velToggle = !KiddoPaint.Current.velToggle;
        } else if (e.ctrlKey && e.key === 'z') {
            KiddoPaint.Sounds.mainmenu();
            KiddoPaint.Sounds.oops();
            KiddoPaint.Display.undo(!KiddoPaint.Current.modifiedAlt);
        }
    }
    document.onkeyup = function checkKey(e) {
        if (e.keyCode == 16) {
            KiddoPaint.Current.scaling = 1;
            KiddoPaint.Current.modified = false;
        } else if (e.keyCode == 91 || e.keyCode == 93) {
            KiddoPaint.Current.modifiedCtrl = false;
        } else if (e.keyCode == 17) {
            KiddoPaint.Current.modifiedMeta = false;
        } else if (e.keyCode == 192) {
            KiddoPaint.Current.modifiedTilde = false;
        } else if (e.keyCode == 18) {
            KiddoPaint.Current.modifiedAlt = false;
        };
    }
}

function colorSelect(e) {
    KiddoPaint.Sounds.submenucolor();
    var src = e.srcElement || e.target;
    var colorId = src.id;
    var colorSelected = KiddoPaint.Colors.currentPalette()[colorId];
    if (e.which == 1) {
        KiddoPaint.Current.color = colorSelected
        document.getElementById('currentColor').style = "background-color:" + colorSelected;
    } else if (e.which == 3) {
        KiddoPaint.Current.altColor = colorSelected;
    } else if (e.which == 2) {
        KiddoPaint.Current.terColor = colorSelected;
    }
}

function set_colors_to_current_palette() {
    var pal = KiddoPaint.Colors.currentPalette();
    var buttons = document.getElementById('colorselector').children;
    for (var i = 0, len = buttons.length; i < len; i++) {
        var button = buttons[i];
        var buttonid = button.id;
        var color = pal[buttonid];
        button.style = "background-color:" + color;
    }
}

function init_color_selector() {
    var buttons = document.getElementById('colorselector').children;
    for (var i = 0, len = buttons.length; i < len; i++) {
        var button = buttons[i];
        button.id = i;
        button.addEventListener('mousedown', colorSelect);
    }
    set_colors_to_current_palette();
    document.getElementById('currentColor').style = "background-color:" + KiddoPaint.Current.color;
    init_color_paging();
}

function init_color_paging() {
    document.getElementById('colorprev').addEventListener('mousedown', function() {
        KiddoPaint.Sounds.submenucolor();
        KiddoPaint.Colors.prevPalette();
        set_colors_to_current_palette();
    });
    document.getElementById('colornext').addEventListener('mousedown', function() {
        KiddoPaint.Sounds.submenucolor();
        KiddoPaint.Colors.nextPalette();
        set_colors_to_current_palette();
    });
}

function show_sub_toolbar(subtoolbar) {
    reset_ranges();
    var subtoolbars = document.getElementById('subtoolbars').children;
    for (var i = 0, len = subtoolbars.length; i < len; i++) {
        var div = subtoolbars[i];
        if (div.id === subtoolbar) {
            div.className = 'subtoolbar'
        } else {
            div.className = 'hidden'
        }
    }
}

function init_tool_bar() {
    document.getElementById('save').addEventListener('mousedown', function() {
        KiddoPaint.Sounds.mainmenu();
        save_to_file();
    });

    document.getElementById('pencil').addEventListener('mousedown', function() {
        KiddoPaint.Sounds.mainmenu();
        show_generic_submenu('pencil');
        KiddoPaint.Current.tool = KiddoPaint.Tools.Pencil;
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add('cursor-pencil');
    });

    document.getElementById('line').addEventListener('mousedown', function() {
        KiddoPaint.Sounds.mainmenu();
        show_generic_submenu('line');
        KiddoPaint.Current.tool = KiddoPaint.Tools.Line;
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add('cursor-crosshair');
    });

    document.getElementById('square').addEventListener('mousedown', function() {
        KiddoPaint.Sounds.mainmenu();
        show_generic_submenu('square');
        KiddoPaint.Current.tool = KiddoPaint.Tools.Square;
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add('cursor-crosshair');
    });

    document.getElementById('circle').addEventListener('mousedown', function() {
        KiddoPaint.Sounds.mainmenu();
        show_generic_submenu('circle');
        KiddoPaint.Current.tool = KiddoPaint.Tools.Circle;
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add('cursor-crosshair');
    });

    document.getElementById('brush').addEventListener('mousedown', function() {
        KiddoPaint.Sounds.mainmenu();
        reset_ranges();
        show_generic_submenu('wackybrush');
        KiddoPaint.Submenu.wackybrush[0].handler();
    });

    document.getElementById('stamp').addEventListener('mousedown', function() {
        KiddoPaint.Sounds.mainmenu();
        reset_ranges();
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add('cursor-none');
        if (KiddoPaint.Current.modifiedCtrl) {
            show_generic_submenu('stickers');
        } else {
            init_sprites_submenu(); // automatically does for current page
            show_generic_submenu('sprites');
            KiddoPaint.Tools.Stamp.useColor = false;
            KiddoPaint.Submenu.sprites[0].handler();
        }
    });

    document.getElementById('alphabet').addEventListener('mousedown', function() {
        KiddoPaint.Sounds.mainmenu();
        init_alphabet_bar('character' + KiddoPaint.Alphabet.page);
        show_sub_toolbar('alphabettoolbar');
        KiddoPaint.Tools.Stamp.useColor = true;
        KiddoPaint.Current.tool = KiddoPaint.Tools.Stamp;
        KiddoPaint.Stamps.currentFace = KiddoPaint.Alphabet.english.face;
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add('cursor-none');
    });

    document.getElementById('flood').addEventListener('mousedown', function() {
        KiddoPaint.Sounds.mainmenu();
        show_generic_submenu('flood');
        KiddoPaint.Current.tool = KiddoPaint.Tools.Flood;
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add('cursor-bucket');
    });

    document.getElementById('eraser').addEventListener('mousedown', function() {
        KiddoPaint.Sounds.mainmenu();
        KiddoPaint.Current.tool = KiddoPaint.Tools.Eraser;
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add('cursor-crosshair');
        show_generic_submenu('eraser');
    });

    document.getElementById('truck').addEventListener('mousedown', function() {
        KiddoPaint.Sounds.mainmenu();
        show_generic_submenu('truck');
        KiddoPaint.Current.tool = KiddoPaint.Tools.Cut;
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add('cursor-crosshair');
    });

    document.getElementById('undo').addEventListener('mousedown', function() {
        KiddoPaint.Sounds.mainmenu();
        KiddoPaint.Sounds.oops();
        KiddoPaint.Display.undo(!KiddoPaint.Current.modifiedAlt);
    });

    document.getElementById('alnext').addEventListener('mousedown', function() {
        KiddoPaint.Sounds.submenuoption();
        KiddoPaint.Alphabet.nextPage();
        init_alphabet_bar('character' + KiddoPaint.Alphabet.page);
    });

    //    document.getElementById('stnext').addEventListener('mousedown', function(e) {
    //        KiddoPaint.Sounds.submenuoption();
    //        (e.which == 1) ? KiddoPaint.Stamps.nextPage(): KiddoPaint.Stamps.prevPage(); // left click is 1, right click is 3
    //        init_stamp_bar('stamp' + KiddoPaint.Stamps.page);
    //    });

    document.getElementById('jumble').addEventListener('mousedown', function() {
        KiddoPaint.Sounds.mainmenu();
        show_generic_submenu('jumble');
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add('cursor-guy-smile');
        KiddoPaint.Tools.WholeCanvasEffect.effect = JumbleFx.INVERT;
        KiddoPaint.Current.tool = KiddoPaint.Tools.WholeCanvasEffect;
    });
};

function init_alphabet_bar(alphabetgroup) {
    var alphabettoolbar = KiddoPaint.Alphabet.english[alphabetgroup].letters;
    KiddoPaint.Tools.Stamp.stamp = alphabettoolbar[0];
    for (var i = 0; i < alphabettoolbar.length; i++) {
        var buttonValue = '<h1>' + alphabettoolbar[i] + '</h1>';
        document.getElementById('xal' + i).innerHTML = buttonValue;
    }
}

function init_subtool_bars() {
    init_pencil_subtoolbar();
    init_alphabet_subtoolbar();
}

function init_pencil_subtoolbar() {
    // this is the default, so we show show it
    show_generic_submenu('pencil');
    KiddoPaint.Display.canvas.classList = "";
    KiddoPaint.Display.canvas.classList.add('cursor-pencil');
}

function init_alphabet_subtoolbar() {
    var alphaselect = document.querySelectorAll('*[id^="xal"]');
    for (var i = 0; i < alphaselect.length; i++) {
        var alphaButton = alphaselect[i];
        alphaButton.addEventListener('mousedown', function(ev) {
            reset_ranges();
            src = ev.srcElement || ev.target;
            KiddoPaint.Tools.Stamp.stamp = src.firstChild.nodeValue;
            KiddoPaint.Sounds.Library.playKey(KiddoPaint.Tools.Stamp.stamp);
        });
    }
}

function ev_canvas(ev) {
    if (!ev) {
        return;
    }
    // pre event 
    KiddoPaint.Display.step += 1;
    KiddoPaint.Display.clearPreview();
    KiddoPaint.Current.ev = ev;

    ev._x = ev.offsetX;
    ev._y = ev.offsetY;

    // handle event
    if (ev.type === "touchstart") {
        ev.type = "mousedown";
    }
    if (ev.type === "touchmove") {
        ev.type = "mousemove";
    }
    if (ev.type === "touchend") {
        ev.type = "mouseup";
    }

    var func = KiddoPaint.Current.tool[ev.type];
    if (func) {
        func(ev);
    }

    // common ev processing
    common_ev_proc(ev);

    KiddoPaint.Current.prevEv = ev;
    KiddoPaint.Current.prevEvTs = Date.now();
}

function common_ev_proc(ev) {
    if (!KiddoPaint.Current.prevEv)
        return;

    var dist = distanceBetween(KiddoPaint.Current.prevEv, ev);
    var tsdelta = (Date.now() - KiddoPaint.Current.prevEvTs) + 1;
    var velocity = (1.0 * dist) / tsdelta * 1000.0;
    KiddoPaint.Current.velocity = velocity;
    KiddoPaint.Current.velocityMultiplier = (velocity > 1000) ? velocity / 1000 : 1.0;
    if (KiddoPaint.Current.velToggle) {
        KiddoPaint.Current.scaling = KiddoPaint.Current.velocityMultiplier;
    }
}

function mouse_wheel(ev) {
    var delta = Math.max(-1, Math.min(1, (ev.wheelDelta || -ev.detail)));
    if (KiddoPaint.Current.modified) {
        KiddoPaint.Current.modifiedRange += delta;
        if (KiddoPaint.Current.modifiedRange > 100) {
            KiddoPaint.Current.modifiedRange = -100;
        } else if (KiddoPaint.Current.modifiedRange < -100) {
            KiddoPaint.Current.modifiedRange = 100;
        }
    } else if (KiddoPaint.Current.modifiedAlt) {
        KiddoPaint.Current.modifiedAltRange += delta;
        if (KiddoPaint.Current.modifiedAltRange > 100) {
            KiddoPaint.Current.modifiedAltRange = -100;
        } else if (KiddoPaint.Current.modifiedAltRange < -100) {
            KiddoPaint.Current.modifiedAltRange = 100;
        }
    } else if (KiddoPaint.Current.modifiedCtrl) {
        KiddoPaint.Current.modifiedCtrlRange += delta;
        if (KiddoPaint.Current.modifiedCtrlRange > 100) {
            KiddoPaint.Current.modifiedCtrlRange = -100;
        } else if (KiddoPaint.Current.modifiedCtrlRange < -100) {
            KiddoPaint.Current.modifiedCtrlRange = 100;
        }
    }
    // kick off a redraw of preview
    if (KiddoPaint.Current.ev) {
        ev_canvas(KiddoPaint.Current.ev);
    }
    if (ev.preventDefault) {
        ev.preventDefault();
    }
    ev.returnValue = false;
    return false;
}

function save_to_file() {
    var canvasToSave = KiddoPaint.Current.modifiedAlt ? trimAndFlattenCanvas(KiddoPaint.Display.main_canvas) : KiddoPaint.Display.main_canvas;
    var image = canvasToSave.toDataURL("image/png");
    var a = document.createElement("a");
    a.href = image;
    a.download = "kidpix-" + Date.now() + ".png";
    a.click();
}

function image_upload(ev) {
    var files = ev.dataTransfer.files;
    if (files.length > 0) {
        var file = files[0];
        if (typeof FileReader !== "undefined") {
            var reader = new FileReader();
            reader.onload = function(evt) {
                var img = new Image();
                img.onload = function() {
                    if (KiddoPaint.Current.modifiedAlt) {
                        KiddoPaint.Display.context.drawImage(img, 0, 0);
                        KiddoPaint.Display.saveMain();
                    } else {
                        KiddoPaint.Tools.Placer.image = img;
                        KiddoPaint.Tools.Placer.size = {
                            width: img.width,
                            height: img.height
                        };
                        KiddoPaint.Tools.Placer.prevTool = KiddoPaint.Current.tool;
                        KiddoPaint.Current.tool = KiddoPaint.Tools.Placer;
                    }
                };
                img.src = evt.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
    if (ev.preventDefault) {
        ev.preventDefault();
    }
    ev.returnValue = false;
    return false;
}