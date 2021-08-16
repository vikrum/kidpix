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
    var canvas = document.getElementById("kiddopaint");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        canvas.width = canvas.width;
        canvas.height = canvas.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = false;
        var container = canvas.parentNode;
        bnimCanvas = document.createElement("canvas");
        bnimCanvas.id = "bnimCanvas";
        bnimCanvas.width = canvas.width;
        bnimCanvas.height = canvas.height;
        bnimCanvas.className = "pixelated";
        container.appendChild(bnimCanvas);
        bnimContext = bnimCanvas.getContext("2d");
        bnimContext.imageSmoothingEnabled = false;
        bnimContext.clearRect(0, 0, canvas.width, canvas.height);
        animCanvas = document.createElement("canvas");
        animCanvas.id = "animCanvas";
        animCanvas.width = canvas.width;
        animCanvas.height = canvas.height;
        animCanvas.className = "pixelated";
        container.appendChild(animCanvas);
        animContext = animCanvas.getContext("2d");
        animContext.imageSmoothingEnabled = false;
        animContext.clearRect(0, 0, canvas.width, canvas.height);
        previewCanvas = document.createElement("canvas");
        previewCanvas.id = "previewCanvas";
        previewCanvas.width = canvas.width;
        previewCanvas.height = canvas.height;
        previewCanvas.className = "pixelated";
        container.appendChild(previewCanvas);
        previewContext = previewCanvas.getContext("2d");
        previewContext.imageSmoothingEnabled = false;
        previewContext.clearRect(0, 0, canvas.width, canvas.height);
        tmpCanvas = document.createElement("canvas");
        tmpCanvas.id = "tmpCanvas";
        tmpCanvas.width = canvas.width;
        tmpCanvas.height = canvas.height;
        tmpCanvas.className = "pixelated";
        container.appendChild(tmpCanvas);
        tmpContext = tmpCanvas.getContext("2d");
        tmpContext.imageSmoothingEnabled = false;
        tmpContext.clearRect(0, 0, canvas.width, canvas.height);
        KiddoPaint.Display.canvas = tmpCanvas;
        KiddoPaint.Display.context = tmpContext;
        KiddoPaint.Display.context.globalAlpha = 1;
        KiddoPaint.Display.previewCanvas = previewCanvas;
        KiddoPaint.Display.previewContext = previewContext;
        KiddoPaint.Display.previewContext.globalAlpha = 1;
        KiddoPaint.Display.bnimCanvas = bnimCanvas;
        KiddoPaint.Display.bnimContext = bnimContext;
        KiddoPaint.Display.bnimContext.globalAlpha = 1;
        KiddoPaint.Display.animCanvas = animCanvas;
        KiddoPaint.Display.animContext = animContext;
        KiddoPaint.Display.animContext.globalAlpha = 1;
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
    KiddoPaint.Current.globalAlpha = 1;
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
    canvas.addEventListener("mousedown", ev_canvas);
    canvas.addEventListener("mousemove", ev_canvas);
    canvas.addEventListener("mouseup", ev_canvas);
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
    canvas.addEventListener("mouseleave", function() {
        KiddoPaint.Current.tool.mouseup(KiddoPaint.Current.ev);
        KiddoPaint.Display.clearPreview();
        KiddoPaint.Display.clearAnim();
        KiddoPaint.Display.clearBnim();
    });
    canvas.addEventListener("mousewheel", mouse_wheel);
    canvas.addEventListener("dragover", function(ev) {
        if (ev.preventDefault) {
            ev.preventDefault();
        }
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
        } else if (e.keyCode == 78) {
            var c = KiddoPaint.Colors.nextAllColor();
            KiddoPaint.Current.color = c;
            KiddoPaint.Current.altColor = c;
            KiddoPaint.Current.terColor = c;
            document.getElementById("currentColor").style = "background-color: " + c;
        } else if (e.keyCode == 67) {
            KiddoPaint.Colors.nextPalette();
            set_colors_to_current_palette();
        } else if (e.keyCode == 82) {
            var c = KiddoPaint.Colors.randomAllColor();
            KiddoPaint.Current.color = c;
            document.getElementById("currentColor").style = "background-color: " + c;
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
        } else if (e.ctrlKey && e.key === "z") {
            KiddoPaint.Sounds.mainmenu();
            KiddoPaint.Sounds.oops();
            KiddoPaint.Display.undo(!KiddoPaint.Current.modifiedAlt);
        }
    };
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
        }
    };
}

function colorSelect(e) {
    KiddoPaint.Sounds.submenucolor();
    var src = e.srcElement || e.target;
    var colorId = src.id;
    var colorSelected = KiddoPaint.Colors.currentPalette()[colorId];
    if (e.which == 1) {
        KiddoPaint.Current.color = colorSelected;
        document.getElementById("currentColor").style = "background-color:" + colorSelected;
    } else if (e.which == 3) {
        KiddoPaint.Current.altColor = colorSelected;
    } else if (e.which == 2) {
        KiddoPaint.Current.terColor = colorSelected;
    }
}

function set_colors_to_current_palette() {
    var pal = KiddoPaint.Colors.currentPalette();
    var buttons = document.getElementById("colorselector").children;
    for (var i = 0, len = buttons.length; i < len; i++) {
        var button = buttons[i];
        var buttonid = button.id;
        var color = pal[buttonid];
        button.style = "background-color:" + color;
    }
}

function init_color_selector() {
    var buttons = document.getElementById("colorselector").children;
    for (var i = 0, len = buttons.length; i < len; i++) {
        var button = buttons[i];
        button.id = i;
        button.addEventListener("mousedown", colorSelect);
    }
    set_colors_to_current_palette();
    document.getElementById("currentColor").style = "background-color:" + KiddoPaint.Current.color;
    init_color_paging();
}

function init_color_paging() {
    document.getElementById("colorprev").addEventListener("mousedown", function() {
        KiddoPaint.Sounds.submenucolor();
        KiddoPaint.Colors.prevPalette();
        set_colors_to_current_palette();
    });
    document.getElementById("colornext").addEventListener("mousedown", function() {
        KiddoPaint.Sounds.submenucolor();
        KiddoPaint.Colors.nextPalette();
        set_colors_to_current_palette();
    });
}

function show_sub_toolbar(subtoolbar) {
    reset_ranges();
    var subtoolbars = document.getElementById("subtoolbars").children;
    for (var i = 0, len = subtoolbars.length; i < len; i++) {
        var div = subtoolbars[i];
        if (div.id === subtoolbar) {
            div.className = "subtoolbar";
        } else {
            div.className = "hidden";
        }
    }
}

function init_tool_bar() {
    document.getElementById("save").addEventListener("mousedown", function() {
        KiddoPaint.Sounds.mainmenu();
        save_to_file();
    });
    document.getElementById("pencil").addEventListener("mousedown", function() {
        KiddoPaint.Sounds.mainmenu();
        show_generic_submenu("pencil");
        KiddoPaint.Current.tool = KiddoPaint.Tools.Pencil;
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-pencil");
    });
    document.getElementById("line").addEventListener("mousedown", function() {
        KiddoPaint.Sounds.mainmenu();
        show_generic_submenu("line");
        KiddoPaint.Current.tool = KiddoPaint.Tools.Line;
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-crosshair");
    });
    document.getElementById("square").addEventListener("mousedown", function() {
        KiddoPaint.Sounds.mainmenu();
        show_generic_submenu("square");
        KiddoPaint.Current.tool = KiddoPaint.Tools.Square;
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-crosshair");
    });
    document.getElementById("circle").addEventListener("mousedown", function() {
        KiddoPaint.Sounds.mainmenu();
        show_generic_submenu("circle");
        KiddoPaint.Current.tool = KiddoPaint.Tools.Circle;
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-crosshair");
    });
    document.getElementById("brush").addEventListener("mousedown", function() {
        KiddoPaint.Sounds.mainmenu();
        reset_ranges();
        show_generic_submenu("wackybrush");
        KiddoPaint.Submenu.wackybrush[0].handler();
    });
    document.getElementById("stamp").addEventListener("mousedown", function() {
        KiddoPaint.Sounds.mainmenu();
        reset_ranges();
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-none");
        if (KiddoPaint.Current.modifiedCtrl) {
            show_generic_submenu("stickers");
        } else {
            init_sprites_submenu();
            show_generic_submenu("sprites");
            KiddoPaint.Tools.Stamp.useColor = false;
            KiddoPaint.Submenu.sprites[0].handler();
        }
    });
    document.getElementById("alphabet").addEventListener("mousedown", function() {
        KiddoPaint.Sounds.mainmenu();
        init_alphabet_bar("character" + KiddoPaint.Alphabet.page);
        show_sub_toolbar("alphabettoolbar");
        KiddoPaint.Tools.Stamp.useColor = true;
        KiddoPaint.Current.tool = KiddoPaint.Tools.Stamp;
        KiddoPaint.Stamps.currentFace = KiddoPaint.Alphabet.english.face;
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-none");
    });
    document.getElementById("flood").addEventListener("mousedown", function() {
        KiddoPaint.Sounds.mainmenu();
        show_generic_submenu("flood");
        KiddoPaint.Current.tool = KiddoPaint.Tools.Flood;
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-bucket");
    });
    document.getElementById("eraser").addEventListener("mousedown", function() {
        KiddoPaint.Sounds.mainmenu();
        KiddoPaint.Current.tool = KiddoPaint.Tools.Eraser;
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-crosshair");
        show_generic_submenu("eraser");
    });
    document.getElementById("truck").addEventListener("mousedown", function() {
        KiddoPaint.Sounds.mainmenu();
        show_generic_submenu("truck");
        KiddoPaint.Current.tool = KiddoPaint.Tools.Cut;
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-crosshair");
    });
    document.getElementById("undo").addEventListener("mousedown", function() {
        KiddoPaint.Sounds.mainmenu();
        KiddoPaint.Sounds.oops();
        KiddoPaint.Display.undo(!KiddoPaint.Current.modifiedAlt);
    });
    document.getElementById("alnext").addEventListener("mousedown", function() {
        KiddoPaint.Sounds.submenuoption();
        KiddoPaint.Alphabet.nextPage();
        init_alphabet_bar("character" + KiddoPaint.Alphabet.page);
    });
    document.getElementById("jumble").addEventListener("mousedown", function() {
        KiddoPaint.Sounds.mainmenu();
        show_generic_submenu("jumble");
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-guy-smile");
        KiddoPaint.Tools.WholeCanvasEffect.effect = JumbleFx.INVERT;
        KiddoPaint.Current.tool = KiddoPaint.Tools.WholeCanvasEffect;
    });
}

function init_alphabet_bar(alphabetgroup) {
    var alphabettoolbar = KiddoPaint.Alphabet.english[alphabetgroup].letters;
    KiddoPaint.Tools.Stamp.stamp = alphabettoolbar[0];
    for (var i = 0; i < alphabettoolbar.length; i++) {
        var buttonValue = "<h1>" + alphabettoolbar[i] + "</h1>";
        document.getElementById("xal" + i).innerHTML = buttonValue;
    }
}

function init_subtool_bars() {
    init_pencil_subtoolbar();
    init_alphabet_subtoolbar();
}

function init_pencil_subtoolbar() {
    show_generic_submenu("pencil");
    KiddoPaint.Display.canvas.classList = "";
    KiddoPaint.Display.canvas.classList.add("cursor-pencil");
}

function init_alphabet_subtoolbar() {
    var alphaselect = document.querySelectorAll('*[id^="xal"]');
    for (var i = 0; i < alphaselect.length; i++) {
        var alphaButton = alphaselect[i];
        alphaButton.addEventListener("mousedown", function(ev) {
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
    KiddoPaint.Display.step += 1;
    KiddoPaint.Display.clearPreview();
    KiddoPaint.Current.ev = ev;
    ev._x = ev.offsetX;
    ev._y = ev.offsetY;
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
    common_ev_proc(ev);
    KiddoPaint.Current.prevEv = ev;
    KiddoPaint.Current.prevEvTs = Date.now();
}

function common_ev_proc(ev) {
    if (!KiddoPaint.Current.prevEv) return;
    var dist = distanceBetween(KiddoPaint.Current.prevEv, ev);
    var tsdelta = Date.now() - KiddoPaint.Current.prevEvTs + 1;
    var velocity = 1 * dist / tsdelta * 1e3;
    KiddoPaint.Current.velocity = velocity;
    KiddoPaint.Current.velocityMultiplier = velocity > 1e3 ? velocity / 1e3 : 1;
    if (KiddoPaint.Current.velToggle) {
        KiddoPaint.Current.scaling = KiddoPaint.Current.velocityMultiplier;
    }
}

function mouse_wheel(ev) {
    var delta = Math.max(-1, Math.min(1, ev.wheelDelta || -ev.detail));
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

KiddoPaint.Submenu = {};

function show_generic_submenu(subtoolbar) {
    if (!KiddoPaint.Submenu[subtoolbar]) {
        return;
    }
    reset_ranges();
    var subtoolbars = document.getElementById("subtoolbars").children;
    var genericsubmenu = null;
    for (var i = 0, len = subtoolbars.length; i < len; i++) {
        var div = subtoolbars[i];
        if (div.id === "genericsubmenu") {
            div.className = "subtoolbar";
            genericsubmenu = div;
        } else {
            div.className = "hidden";
        }
    }
    genericsubmenu.removeAllChildren();
    for (var i = 0, len = KiddoPaint.Submenu[subtoolbar].length; i < len; i++) {
        var buttonDetail = KiddoPaint.Submenu[subtoolbar][i];
        var button = document.createElement("button");
        button.className = "tool";
        button.title = buttonDetail.name;
        if (buttonDetail.invisible) {
            button.className += " invisible";
        } else if (buttonDetail.imgSrc) {
            var img = document.createElement("img");
            img.src = buttonDetail.imgSrc;
            img.className = "toolImg pixelated";
            button.appendChild(img);
        } else if (buttonDetail.imgJs) {
            var img = document.createElement("img");
            img.src = buttonDetail.imgJs();
            img.className = "pixelated";
            button.appendChild(img);
        } else if (buttonDetail.text) {
            var t = document.createTextNode(buttonDetail.text);
            button.appendChild(t);
        } else if (buttonDetail.emoji) {
            var emoji = document.createElement("emj");
            var text = document.createTextNode(buttonDetail.emoji);
            emoji.appendChild(text);
            button.appendChild(emoji);
        } else if (buttonDetail.spriteSheet) {
            var img = document.createElement("img");
            img.src = buttonDetail.spriteSheet;
            img.className = "tool sprite sprite-pos-" + buttonDetail.spriteCol + "-" + buttonDetail.spriteRow;
            button.appendChild(img);
        } else {}
        let localFRef = buttonDetail.handler;
        let wrappedHandler = function(e) {
            KiddoPaint.Sounds.submenuoption();
            localFRef(e);
        };
        button.onclick = wrappedHandler;
        button.oncontextmenu = wrappedHandler;
        genericsubmenu.appendChild(button);
    }
}

Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
};

function fisherYatesArrayShuffle(array) {
    var count = array.length, randomnumber, temp;
    while (count) {
        randomnumber = Math.random() * count-- | 0;
        temp = array[count];
        array[count] = array[randomnumber];
        array[randomnumber] = temp;
    }
}

KiddoPaint.Cache.StampSettings = {};

KiddoPaint.Cache.Defaults = {
    hueShift: 0,
    altSize: 144
};

KiddoPaint.Cache.getStampSettings = function(stamp) {
    if (!KiddoPaint.Cache.StampSettings[stamp]) {
        KiddoPaint.Cache.StampSettings[stamp] = {
            hueShift: KiddoPaint.Cache.Defaults.hueShift,
            altSize: KiddoPaint.Cache.Defaults.altSize
        };
    }
    return KiddoPaint.Cache.StampSettings[stamp];
};

KiddoPaint.Cache.setStampSetting = function(stamp, setting, value) {
    if (!KiddoPaint.Cache.StampSettings[stamp]) {
        KiddoPaint.Cache.StampSettings[stamp] = {
            hueShift: KiddoPaint.Cache.Defaults.hueShift,
            altSize: KiddoPaint.Cache.Defaults.altSize
        };
    }
    KiddoPaint.Cache.StampSettings[stamp][setting] = value;
};

KiddoPaint.Colors.Palette = {};

KiddoPaint.Colors.Current = {};

KiddoPaint.Colors.Palette.Blank = [ "rgba(0, 0, 0, 0)" ];

KiddoPaint.Colors.Palette.Bright = [ "rgb(255,0,0)", "rgb(255,255,0)", "rgb(0,255,0)", "rgb(0,0,255)", "rgb(0,255,255)", "rgb(255,0,255)" ];

KiddoPaint.Colors.Palette.Basic = [ "rgb(0, 0, 0)", "rgb(255, 255, 255)", "rgb(32, 32, 32)", "rgb(64, 64, 64)", "rgb(128, 128, 128)", "rgb(192, 192, 192)", "rgb(128, 0, 0)", "rgb(255, 0, 0)", "rgb(128, 128, 0)", "rgb(255, 255, 1)", "rgb(0, 64, 64)", "rgb(0, 100, 0)", "rgb(0, 128, 0)", "rgb(0, 255, 0)", "rgb(0, 128, 128)", "rgb(128, 255, 255)", "rgb(0, 0, 128)", "rgb(0, 0, 255)", "rgb(0, 64, 128)", "rgb(0, 128, 255)", "rgb(128, 0, 255)", "rgb(128, 128, 255)", "rgb(128, 0, 128)", "rgb(255, 0, 255)", "rgb(128, 0, 64)", "rgb(255, 0, 128)", "rgb(73, 61, 38)", "rgb(136, 104, 67)", "rgb(128, 64, 0)", "rgb(255, 128, 64)", "rgb(225, 135, 0)", "rgb(255, 195, 30)" ];

KiddoPaint.Colors.Palette.Endesga = [ "rgb(24,20,37)", "rgb(255,255,255)", "rgb(190,74,47)", "rgb(215,118,67)", "rgb(234,212,170)", "rgb(228,166,114)", "rgb(184,111,80)", "rgb(115,62,57)", "rgb(62,39,49)", "rgb(162,38,51)", "rgb(228,59,68)", "rgb(247,118,34)", "rgb(254,174,52)", "rgb(254,231,97)", "rgb(99,199,77)", "rgb(62,137,72)", "rgb(38,92,66)", "rgb(25,60,62)", "rgb(18,78,137)", "rgb(0,153,219)", "rgb(44,232,245)", "rgb(192,203,220)", "rgb(139,155,180)", "rgb(90,105,136)", "rgb(58,68,102)", "rgb(38,43,68)", "rgb(255,0,68)", "rgb(104,56,108)", "rgb(181,80,136)", "rgb(246,117,122)", "rgb(232,183,150)", "rgb(194,133,105)" ];

KiddoPaint.Colors.Palette.DawnBringer = [ "rgb(0, 0, 0)", "rgb(255, 255, 255)", "rgb( 34 , 32 ,52 )", "rgb( 69 , 40 ,60 )", "rgb( 102 , 57 ,49 )", "rgb( 143 , 86 ,59 )", "rgb( 223 , 113 ,38 )", "rgb( 217 , 160 ,102 )", "rgb( 238 , 195 ,154 )", "rgb( 251 , 242 ,54 )", "rgb( 153 , 229 ,80 )", "rgb( 106 , 190 ,48 )", "rgb( 55 , 148 ,110 )", "rgb( 75 , 105 ,47 )", "rgb( 82 , 75 ,36 )", "rgb( 50 , 60 ,57 )", "rgb( 63 , 63 ,116 )", "rgb( 48 , 96 ,130 )", "rgb( 91 , 110 ,225 )", "rgb( 99 , 155 ,255 )", "rgb( 95 , 205 ,228 )", "rgb( 203 , 219 ,252 )", "rgb( 155 , 173 ,183 )", "rgb( 132 , 126 ,135 )", "rgb( 105 , 106 ,106 )", "rgb( 89 , 86 ,82 )", "rgb( 118 , 66 ,138 )", "rgb( 172 , 50 ,50 )", "rgb( 217 , 87 ,99 )", "rgb( 215 , 123 ,186 )", "rgb( 143 , 151 ,74 )", "rgb( 138 , 111 ,48 )" ];

KiddoPaint.Colors.Palette.Pastels = [ "#84dcce", "#e8a2bd", "#9dd9b3", "#e5b8e7", "#d2f5c1", "#b8abe1", "#e0d59c", "#87afd9", "#f0b097", "#7cdfea", "#f7abb0", "#5cbbb7", "#cc9dc6", "#aed09e", "#f3daff", "#baab79", "#acd6ff", "#c5a780", "#5bb8cf", "#d1a189", "#acf9ff", "#c1a4b0", "#c8fff6", "#9eadbf", "#fffbe2", "#a6ada7", "#e5fff7", "#a7af93", "#dfe5ff", "#ffdfcb", "#fff5f8", "#ffe3ed" ];

KiddoPaint.Colors.Palette.Pinks = [ "#d170e6", "#984060", "#9d6fe8", "#e02f87", "#6d4bba", "#ea90b4", "#8a4bc8", "#e9a6db", "#9935b8", "#ba749c", "#b032a2", "#d6a5f2", "#b32c7c", "#a78ad1", "#af3b70", "#785bae", "#e969a2", "#72619d", "#db49af", "#864b6f", "#e97ad3", "#704889", "#c1589b", "#76409a", "#9a4876", "#9c52b5", "#8c588c", "#9c3d92", "#ba76b1", "#8c468c", "#b672c7", "#9166aa" ];

KiddoPaint.Colors.Palette.Blues = [ "#52e2ff", "#0065cd", "#83fae3", "#0e59ac", "#01ecf1", "#6d91fd", "#5cc4b1", "#596fbb", "#41ebff", "#0065a6", "#8df0fd", "#6b7abc", "#00988c", "#91a6ff", "#02c0c2", "#8cb0ff", "#46adb2", "#007cc5", "#02d8fd", "#476c9c", "#5ed5ff", "#006994", "#a3bdff", "#00a6c5", "#9ba6dd", "#69cae1", "#57b1ff", "#009dc4", "#6ec0ff", "#588cbb", "#00aeeb", "#0098dc" ];

KiddoPaint.Colors.Palette.Greyscale = [ "rgb(0,    0,     0)", "rgb(8,    8,     8)", "rgb(16,   16,    16)", "rgb(24,   24,    24)", "rgb(32,   32,    32)", "rgb(40,   40,    40)", "rgb(48,   48,    48)", "rgb(56,   56,    56)", "rgb(64,   64,    64)", "rgb(72,   72,    72)", "rgb(80,   80,    80)", "rgb(88,   88,    88)", "rgb(96,   96,    96)", "rgb(104,  104,   104)", "rgb(112,  112,   112)", "rgb(120,  120,   120)", "rgb(128,  128,   128)", "rgb(136,  136,   136)", "rgb(144,  144,   144)", "rgb(152,  152,   152)", "rgb(160,  160,   160)", "rgb(168,  168,   168)", "rgb(176,  176,   176)", "rgb(184,  184,   184)", "rgb(192,  192,   192)", "rgb(200,  200,   200)", "rgb(208,  208,   208)", "rgb(216,  216,   216)", "rgb(224,  224,   224)", "rgb(232,  232,   232)", "rgb(242,  242,   242)", "rgb(255,  255,   255)" ];

KiddoPaint.Colors.Palette.CyanMagenta = [ "#22FFFF", "#44FFFF", "#2AF7FF", "#31F0FF", "#39E8FF", "#40E1FF", "#48D9FF", "#50D1FF", "#57CAFF", "#5FC2FF", "#67BAFF", "#6EB3FF", "#76ABFF", "#7DA4FF", "#859CFF", "#8D94FF", "#948DFF", "#9C85FF", "#A47DFF", "#AB76FF", "#B36EFF", "#BA67FF", "#C25FFF", "#CA57FF", "#D150FF", "#D948FF", "#E140FF", "#E839FF", "#F031FF", "#F72AFF", "#FF88FF", "#FF22FF" ];

KiddoPaint.Colors.All = [ KiddoPaint.Colors.Palette.Basic, KiddoPaint.Colors.Palette.DawnBringer, KiddoPaint.Colors.Palette.Endesga, KiddoPaint.Colors.Palette.Pastels, KiddoPaint.Colors.Palette.Pinks, KiddoPaint.Colors.Palette.Blues, KiddoPaint.Colors.Palette.CyanMagenta, KiddoPaint.Colors.Palette.Greyscale ];

KiddoPaint.Colors.Current.PaletteNumber = 0;

KiddoPaint.Colors.Current.Palette = KiddoPaint.Colors.All[KiddoPaint.Colors.Current.PaletteNumber];

KiddoPaint.Colors.rainbowPalette = function() {
    var rpal = [];
    if (KiddoPaint.Colors.Current.PaletteNumber == 0) {
        rpal = [ "red", "orange", "yellow", "green", "blue", "purple", "violet" ];
    } else {
        const cpal = KiddoPaint.Colors.currentPalette();
        const offset = KiddoPaint.Colors.Current.PaletteNumber % 2;
        rpal.push(cpal[0 + offset]);
        rpal.push(cpal[4 + offset]);
        rpal.push(cpal[8 + offset]);
        rpal.push(cpal[12 + offset]);
        rpal.push(cpal[16 + offset]);
        rpal.push(cpal[20 + offset]);
        rpal.push(cpal[30 + offset]);
    }
    return rpal;
};

KiddoPaint.Colors.currentPalette = function() {
    return KiddoPaint.Colors.All[KiddoPaint.Colors.Current.PaletteNumber];
};

KiddoPaint.Colors.nextPalette = function() {
    KiddoPaint.Colors.Current.PaletteNumber += 1;
    if (KiddoPaint.Colors.Current.PaletteNumber >= KiddoPaint.Colors.All.length) {
        KiddoPaint.Colors.Current.PaletteNumber = 0;
    }
    KiddoPaint.Colors.Current.Palette = KiddoPaint.Colors.All[KiddoPaint.Colors.Current.PaletteNumber];
    return KiddoPaint.Colors.Current.Palette;
};

KiddoPaint.Colors.prevPalette = function() {
    KiddoPaint.Colors.Current.PaletteNumber -= 1;
    if (KiddoPaint.Colors.Current.PaletteNumber < 0) {
        KiddoPaint.Colors.Current.PaletteNumber = KiddoPaint.Colors.All.length - 1;
    }
    KiddoPaint.Colors.Current.Palette = KiddoPaint.Colors.All[KiddoPaint.Colors.Current.PaletteNumber];
    return KiddoPaint.Colors.Current.Palette;
};

KiddoPaint.Colors.nextColor = function() {
    return KiddoPaint.Colors.Palette.Bright[KiddoPaint.Display.step % KiddoPaint.Colors.Palette.Bright.length];
};

KiddoPaint.Colors.randomColor = function() {
    return KiddoPaint.Colors.Palette.Bright[Math.floor(Math.random() * KiddoPaint.Colors.Palette.Bright.length)];
};

KiddoPaint.Colors.Current.colorStep = 0;

KiddoPaint.Colors.getAndIncColorStep = function() {
    KiddoPaint.Colors.Current.colorStep += 1;
    return KiddoPaint.Colors.Current.colorStep;
};

KiddoPaint.Colors.nextAllColor = function() {
    var pal = KiddoPaint.Colors.currentPalette();
    return pal[KiddoPaint.Colors.getAndIncColorStep() % pal.length];
};

KiddoPaint.Colors.randomAllColor = function() {
    var pal = KiddoPaint.Colors.currentPalette();
    return pal[Math.floor(Math.random() * pal.length)];
};

function getColorIndicesForCoord(x, y, width) {
    var red = y * (width * 4) + x * 4;
    return [ red, red + 1, red + 2, red + 3 ];
}

KiddoPaint.Display.undoData = null;

KiddoPaint.Display.undoOn = true;

KiddoPaint.Display.allowClearTmp = true;

KiddoPaint.Display.clearAll = function() {
    KiddoPaint.Display.saveUndo();
    KiddoPaint.Display.clearPreview();
    KiddoPaint.Display.clearTmp();
    KiddoPaint.Display.clearMain();
    KiddoPaint.Display.clearLocalStorage();
};

KiddoPaint.Display.clearMain = function() {
    KiddoPaint.Display.main_context.clearRect(0, 0, KiddoPaint.Display.main_canvas.width, KiddoPaint.Display.main_canvas.height);
};

KiddoPaint.Display.clearTmp = function() {
    if (KiddoPaint.Display.allowClearTmp) {
        KiddoPaint.Display.context.clearRect(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
    }
};

KiddoPaint.Display.clearPreview = function() {
    KiddoPaint.Display.previewContext.clearRect(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
};

KiddoPaint.Display.clearAnim = function() {
    KiddoPaint.Display.animContext.clearRect(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
};

KiddoPaint.Display.clearBnim = function() {
    KiddoPaint.Display.bnimContext.clearRect(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
};

KiddoPaint.Display.clearBeforeSaveMain = function() {
    if (KiddoPaint.Display.saveUndo()) {
        KiddoPaint.Display.clearMain();
        KiddoPaint.Display.main_context.drawImage(KiddoPaint.Display.canvas, 0, 0);
        KiddoPaint.Display.clearTmp();
        KiddoPaint.Display.saveToLocalStorage();
    }
};

KiddoPaint.Display.saveMainGco = function(op) {
    if (KiddoPaint.Display.saveUndo()) {
        let prevGco = KiddoPaint.Display.main_context.globalCompositeOperation;
        KiddoPaint.Display.main_context.globalCompositeOperation = op;
        KiddoPaint.Display.main_context.drawImage(KiddoPaint.Display.canvas, 0, 0);
        KiddoPaint.Display.main_context.globalCompositeOperation = prevGco;
        KiddoPaint.Display.clearTmp();
        KiddoPaint.Display.saveToLocalStorage();
    }
};

KiddoPaint.Display.saveMainGcoSkipUndo = function(op) {
    let prevGco = KiddoPaint.Display.main_context.globalCompositeOperation;
    KiddoPaint.Display.main_context.globalCompositeOperation = op;
    KiddoPaint.Display.main_context.drawImage(KiddoPaint.Display.canvas, 0, 0);
    KiddoPaint.Display.main_context.globalCompositeOperation = prevGco;
    KiddoPaint.Display.clearTmp();
    KiddoPaint.Display.saveToLocalStorage();
};

KiddoPaint.Display.saveMain = function() {
    if (KiddoPaint.Display.saveUndo()) {
        KiddoPaint.Display.main_context.drawImage(KiddoPaint.Display.canvas, 0, 0);
        KiddoPaint.Display.clearTmp();
        KiddoPaint.Display.saveToLocalStorage();
    }
};

KiddoPaint.Display.saveMainSkipUndo = function() {
    KiddoPaint.Display.main_context.drawImage(KiddoPaint.Display.canvas, 0, 0);
    KiddoPaint.Display.clearTmp();
    KiddoPaint.Display.saveToLocalStorage();
};

KiddoPaint.Display.pauseUndo = function() {
    KiddoPaint.Display.undoOn = false;
};

KiddoPaint.Display.resumeUndo = function() {
    KiddoPaint.Display.undoOn = true;
};

KiddoPaint.Display.toggleUndo = function() {
    KiddoPaint.Display.undoOn = !KiddoPaint.Display.undoOn;
};

KiddoPaint.Display.saveUndo = function() {
    if (KiddoPaint.Display.undoOn) {
        KiddoPaint.Display.undoData = KiddoPaint.Display.main_canvas.toDataURL();
    }
    return KiddoPaint.Display.undoOn;
};

KiddoPaint.Display.undo = function(doClearMain) {
    if (KiddoPaint.Display.undoData) {
        var nextUndoData = KiddoPaint.Display.main_canvas.toDataURL();
        var img = new Image();
        img.src = KiddoPaint.Display.undoData;
        img.onload = function() {
            if (doClearMain) {
                KiddoPaint.Display.clearMain();
            }
            KiddoPaint.Display.main_context.drawImage(img, 0, 0);
        };
        KiddoPaint.Display.undoData = nextUndoData;
    }
};

KiddoPaint.Display.clearLocalStorage = function() {
    if (typeof Storage != "undefined") {
        localStorage.removeItem("kiddopaint");
    }
};

KiddoPaint.Display.saveToLocalStorage = function() {
    if (typeof Storage != "undefined") {
        try {
            localStorage.setItem("kiddopaint", KiddoPaint.Display.main_canvas.toDataURL());
        } catch (e) {
            try {
                localStorage.setItem("kiddopaint", KiddoPaint.Display.main_canvas.toDataURL("image/jpeg", .87));
            } catch (e2) {
                console.log(e2);
            }
        }
    }
};

KiddoPaint.Display.loadFromLocalStorage = function() {
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
        KiddoPaint.Display.clearMain();
        KiddoPaint.Display.main_context.drawImage(img, 0, 0);
    };
    if (typeof Storage != "undefined" && localStorage.getItem("kiddopaint")) {
        img.src = localStorage.getItem("kiddopaint");
    } else {
        img.src = "static/splash.png";
    }
};

KiddoPaint.Display.canvasToImageData = function(canvas) {
    return canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
};

KiddoPaint.Display.imageTypeToCanvas = function(imageData, doDraw) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    if (doDraw) {
        ctx.drawImage(imageData, 0, 0);
    } else {
        ctx.putImageData(imageData, 0, 0);
    }
    return canvas;
};

class CanvasDither {
    grayscale(image) {
        for (let i = 0; i < image.data.length; i += 4) {
            const luminance = image.data[i] * .299 + image.data[i + 1] * .587 + image.data[i + 2] * .114;
            image.data.fill(luminance, i, i + 3);
        }
        return image;
    }
    threshold(image, threshold) {
        for (let i = 0; i < image.data.length; i += 4) {
            const luminance = image.data[i] * .299 + image.data[i + 1] * .587 + image.data[i + 2] * .114;
            const value = luminance < threshold ? 0 : 255;
            image.data.fill(value, i, i + 3);
        }
        return image;
    }
    bayer(image, threshold) {
        const thresholdMapA = [ [ 15, 135, 45, 165 ], [ 195, 75, 225, 105 ], [ 60, 180, 30, 150 ], [ 240, 120, 210, 90 ] ];
        const thresholdMapB = [ [ 0, 8, 2, 10 ], [ 12, 4, 14, 6 ], [ 3, 11, 1, 9 ], [ 15, 7, 13, 5 ] ];
        const thresholdMapC = [ [ 0, 48, 12, 60, 3, 51, 15, 63 ], [ 32, 16, 44, 28, 35, 19, 47, 31 ], [ 8, 56, 4, 52, 11, 59, 7, 55 ], [ 40, 24, 36, 20, 43, 27, 39, 23 ], [ 2, 50, 14, 62, 1, 49, 13, 61 ], [ 34, 18, 46, 30, 33, 17, 45, 29 ], [ 10, 58, 6, 54, 9, 57, 5, 53 ], [ 42, 26, 38, 22, 41, 25, 37, 21 ] ];
        const thresholdMap = thresholdMapA;
        var ret = KiddoPaint.Display.context.createImageData(image);
        for (let i = 0; i < image.data.length; i += 4) {
            const luminance = image.data[i] * .299 + image.data[i + 1] * .587 + image.data[i + 2] * .114;
            const x = i / 4 % image.width;
            const y = Math.floor(i / 4 / image.width);
            const map = Math.floor((luminance + thresholdMap[x % 4][y % 4]) / 2);
            const value = map < threshold ? 0 : 255;
            ret.data.fill(value, i, i + 3);
            ret.data[i + 3] = image.data[i + 3];
        }
        return ret;
    }
    floydsteinberg(image) {
        const width = image.width;
        const luminance = new Uint8ClampedArray(image.width * image.height);
        for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
            luminance[l] = image.data[i] * .299 + image.data[i + 1] * .587 + image.data[i + 2] * .114;
        }
        for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
            const value = luminance[l] < 129 ? 0 : 255;
            const error = Math.floor((luminance[l] - value) / 16);
            image.data.fill(value, i, i + 3);
            luminance[l + 1] += error * 7;
            luminance[l + width - 1] += error * 3;
            luminance[l + width] += error * 5;
            luminance[l + width + 1] += error * 1;
        }
        return image;
    }
    atkinson(image) {
        const width = image.width;
        const luminance = new Uint8ClampedArray(image.width * image.height);
        for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
            luminance[l] = image.data[i] * .299 + image.data[i + 1] * .587 + image.data[i + 2] * .114;
        }
        for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
            const value = luminance[l] < 129 ? 0 : 255;
            const error = Math.floor((luminance[l] - value) / 8);
            image.data.fill(value, i, i + 3);
            luminance[l + 1] += error;
            luminance[l + 2] += error;
            luminance[l + width - 1] += error;
            luminance[l + width] += error;
            luminance[l + width + 1] += error;
            luminance[l + 2 * width] += error;
        }
        return image;
    }
}

var Dither = new CanvasDither();

function getSqSegDist(p, p1, p2) {
    var x = p1[0], y = p1[1], dx = p2[0] - x, dy = p2[1] - y;
    if (dx !== 0 || dy !== 0) {
        var t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
        if (t > 1) {
            x = p2[0];
            y = p2[1];
        } else if (t > 0) {
            x += dx * t;
            y += dy * t;
        }
    }
    dx = p[0] - x;
    dy = p[1] - y;
    return dx * dx + dy * dy;
}

function simplifyDPStep(points, first, last, sqTolerance, simplified) {
    var maxSqDist = sqTolerance, index;
    for (var i = first + 1; i < last; i++) {
        var sqDist = getSqSegDist(points[i], points[first], points[last]);
        if (sqDist > maxSqDist) {
            index = i;
            maxSqDist = sqDist;
        }
    }
    if (maxSqDist > sqTolerance) {
        if (index - first > 1) simplifyDPStep(points, first, index, sqTolerance, simplified);
        simplified.push(points[index]);
        if (last - index > 1) simplifyDPStep(points, index, last, sqTolerance, simplified);
    }
}

function simplifyDouglasPeucker(points, tolerance) {
    if (points.length <= 1) return points;
    tolerance = typeof tolerance === "number" ? tolerance : 1;
    var sqTolerance = tolerance * tolerance;
    var last = points.length - 1;
    var simplified = [ points[0] ];
    simplifyDPStep(points, 0, last, sqTolerance, simplified);
    simplified.push(points[last]);
    return simplified;
}

Filters = {};

Filters.getPixels = function(img) {
    var c, ctx;
    if (img.getContext) {
        c = img;
        try {
            ctx = c.getContext("2d");
        } catch (e) {}
    }
    if (!ctx) {
        c = this.getCanvas(img.width, img.height);
        ctx = c.getContext("2d");
        ctx.drawImage(img, 0, 0);
    }
    return ctx.getImageData(0, 0, c.width, c.height);
};

Filters.getCanvas = function(w, h) {
    var c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    return c;
};

Filters.filterImage = function(filter, image, var_args) {
    var args = [ this.getPixels(image) ];
    for (var i = 2; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    return filter.apply(null, args);
};

Filters.grayscale = function(pixels, args) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
        var r = d[i];
        var g = d[i + 1];
        var b = d[i + 2];
        var v = .2126 * r + .7152 * g + .0722 * b;
        d[i] = d[i + 1] = d[i + 2] = v;
    }
    return pixels;
};

Filters.brightness = function(pixels, adjustment) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
        d[i] += adjustment;
        d[i + 1] += adjustment;
        d[i + 2] += adjustment;
    }
    return pixels;
};

Filters.invert = function(pixels) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
        d[i] = 255 - d[i];
        d[i + 1] = 255 - d[i + 1];
        d[i + 2] = 255 - d[i + 2];
    }
    return pixels;
};

Filters.gcoOpWithWhite = function(imageData, alpha, op) {
    var canvas = KiddoPaint.Display.imageTypeToCanvas(imageData, false);
    var ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = op;
    ctx.fillStyle = "white";
    ctx.globalAlpha = alpha;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return canvas;
};

Filters.gcoInvert = function(imageData, alpha) {
    return Filters.gcoOpWithWhite(imageData, alpha, "difference");
};

Filters.gcoOverlay = function(imageData, alpha) {
    return Filters.gcoOpWithWhite(imageData, alpha, "overlay");
};

Filters.threshold = function(pixels, threshold) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
        var r = d[i];
        var g = d[i + 1];
        var b = d[i + 2];
        var v = .2126 * r + .7152 * g + .0722 * b >= threshold ? 255 : 0;
        d[i] = d[i + 1] = d[i + 2] = v;
    }
    return pixels;
};

Filters.tmpCanvas = document.createElement("canvas");

Filters.tmpCtx = Filters.tmpCanvas.getContext("2d");

Filters.createImageData = function(w, h) {
    return this.tmpCtx.createImageData(w, h);
};

Filters.convolute = function(pixels, weights, opaque) {
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);
    var src = pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;
    var w = sw;
    var h = sh;
    var output = Filters.createImageData(w, h);
    var dst = output.data;
    var alphaFac = opaque ? 1 : 0;
    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            var sy = y;
            var sx = x;
            var dstOff = (y * w + x) * 4;
            var r = 0, g = 0, b = 0, a = 0;
            for (var cy = 0; cy < side; cy++) {
                for (var cx = 0; cx < side; cx++) {
                    var scy = Math.min(sh - 1, Math.max(0, sy + cy - halfSide));
                    var scx = Math.min(sw - 1, Math.max(0, sx + cx - halfSide));
                    var srcOff = (scy * sw + scx) * 4;
                    var wt = weights[cy * side + cx];
                    r += src[srcOff] * wt;
                    g += src[srcOff + 1] * wt;
                    b += src[srcOff + 2] * wt;
                    a += src[srcOff + 3] * wt;
                }
            }
            dst[dstOff] = r;
            dst[dstOff + 1] = g;
            dst[dstOff + 2] = b;
            dst[dstOff + 3] = a + alphaFac * (255 - a);
        }
    }
    return output;
};

if (!window.Float32Array) Float32Array = Array;

Filters.convoluteFloat32 = function(pixels, weights, opaque) {
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);
    var src = pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;
    var w = sw;
    var h = sh;
    var output = {
        width: w,
        height: h,
        data: new Float32Array(w * h * 4)
    };
    var dst = output.data;
    var alphaFac = opaque ? 1 : 0;
    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            var sy = y;
            var sx = x;
            var dstOff = (y * w + x) * 4;
            var r = 0, g = 0, b = 0, a = 0;
            for (var cy = 0; cy < side; cy++) {
                for (var cx = 0; cx < side; cx++) {
                    var scy = Math.min(sh - 1, Math.max(0, sy + cy - halfSide));
                    var scx = Math.min(sw - 1, Math.max(0, sx + cx - halfSide));
                    var srcOff = (scy * sw + scx) * 4;
                    var wt = weights[cy * side + cx];
                    r += src[srcOff] * wt;
                    g += src[srcOff + 1] * wt;
                    b += src[srcOff + 2] * wt;
                    a += src[srcOff + 3] * wt;
                }
            }
            dst[dstOff] = r;
            dst[dstOff + 1] = g;
            dst[dstOff + 2] = b;
            dst[dstOff + 3] = a + alphaFac * (255 - a);
        }
    }
    return output;
};

Filters.sobel = function(px) {
    px = Filters.grayscale(px);
    var vertical = Filters.convoluteFloat32(px, [ -1, -2, -1, 0, 0, 0, 1, 2, 1 ]);
    var horizontal = Filters.convoluteFloat32(px, [ -1, 0, 1, -2, 0, 2, -1, 0, 1 ]);
    var id = Filters.createImageData(vertical.width, vertical.height);
    for (var i = 0; i < id.data.length; i += 4) {
        var v = Math.abs(vertical.data[i]);
        id.data[i] = v;
        var h = Math.abs(horizontal.data[i]);
        id.data[i + 1] = h;
        id.data[i + 2] = (v + h) / 4;
        id.data[i + 3] = 255;
    }
    return id;
};

function fitCurve(points, maxError, progressCallback) {
    if (!Array.isArray(points)) {
        throw new TypeError("First argument should be an array");
    }
    points.forEach(point => {
        if (!Array.isArray(point) || point.some(item => typeof item !== "number") || point.length !== points[0].length) {
            throw Error("Each point should be an array of numbers. Each point should have the same amount of numbers.");
        }
    });
    points = points.filter((point, i) => i === 0 || !point.every((val, j) => val === points[i - 1][j]));
    if (points.length < 2) {
        return [];
    }
    const len = points.length;
    const leftTangent = createTangent(points[1], points[0]);
    const rightTangent = createTangent(points[len - 2], points[len - 1]);
    return fitCubic(points, leftTangent, rightTangent, maxError, progressCallback);
}

function fitCubic(points, leftTangent, rightTangent, error, progressCallback) {
    const MaxIterations = 20;
    var bezCurve, u, uPrime, maxError, prevErr, splitPoint, prevSplit, centerVector, toCenterTangent, fromCenterTangent, beziers, dist, i;
    if (points.length === 2) {
        dist = maths.vectorLen(maths.subtract(points[0], points[1])) / 3;
        bezCurve = [ points[0], maths.addArrays(points[0], maths.mulItems(leftTangent, dist)), maths.addArrays(points[1], maths.mulItems(rightTangent, dist)), points[1] ];
        return [ bezCurve ];
    }
    u = chordLengthParameterize(points);
    [bezCurve, maxError, splitPoint] = generateAndReport(points, u, u, leftTangent, rightTangent, progressCallback);
    if (maxError === 0 || maxError < error) {
        return [ bezCurve ];
    }
    if (maxError < error * error) {
        uPrime = u;
        prevErr = maxError;
        prevSplit = splitPoint;
        for (i = 0; i < MaxIterations; i++) {
            uPrime = reparameterize(bezCurve, points, uPrime);
            [bezCurve, maxError, splitPoint] = generateAndReport(points, u, uPrime, leftTangent, rightTangent, progressCallback);
            if (maxError < error) {
                return [ bezCurve ];
            } else if (splitPoint === prevSplit) {
                let errChange = maxError / prevErr;
                if (errChange > .9999 && errChange < 1.0001) {
                    break;
                }
            }
            prevErr = maxError;
            prevSplit = splitPoint;
        }
    }
    beziers = [];
    centerVector = maths.subtract(points[splitPoint - 1], points[splitPoint + 1]);
    if (centerVector.every(val => val === 0)) {
        centerVector = maths.subtract(points[splitPoint - 1], points[splitPoint]);
        [centerVector[0], centerVector[1]] = [ -centerVector[1], centerVector[0] ];
    }
    toCenterTangent = maths.normalize(centerVector);
    fromCenterTangent = maths.mulItems(toCenterTangent, -1);
    beziers = beziers.concat(fitCubic(points.slice(0, splitPoint + 1), leftTangent, toCenterTangent, error, progressCallback));
    beziers = beziers.concat(fitCubic(points.slice(splitPoint), fromCenterTangent, rightTangent, error, progressCallback));
    return beziers;
}

function generateAndReport(points, paramsOrig, paramsPrime, leftTangent, rightTangent, progressCallback) {
    var bezCurve, maxError, splitPoint;
    bezCurve = generateBezier(points, paramsPrime, leftTangent, rightTangent, progressCallback);
    [maxError, splitPoint] = computeMaxError(points, bezCurve, paramsOrig);
    if (progressCallback) {
        progressCallback({
            bez: bezCurve,
            points: points,
            params: paramsOrig,
            maxErr: maxError,
            maxPoint: splitPoint
        });
    }
    return [ bezCurve, maxError, splitPoint ];
}

function generateBezier(points, parameters, leftTangent, rightTangent) {
    var bezCurve, A, a, C, X, det_C0_C1, det_C0_X, det_X_C1, alpha_l, alpha_r, epsilon, segLength, i, len, tmp, u, ux, firstPoint = points[0], lastPoint = points[points.length - 1];
    bezCurve = [ firstPoint, null, null, lastPoint ];
    A = maths.zeros_Xx2x2(parameters.length);
    for (i = 0, len = parameters.length; i < len; i++) {
        u = parameters[i];
        ux = 1 - u;
        a = A[i];
        a[0] = maths.mulItems(leftTangent, 3 * u * (ux * ux));
        a[1] = maths.mulItems(rightTangent, 3 * ux * (u * u));
    }
    C = [ [ 0, 0 ], [ 0, 0 ] ];
    X = [ 0, 0 ];
    for (i = 0, len = points.length; i < len; i++) {
        u = parameters[i];
        a = A[i];
        C[0][0] += maths.dot(a[0], a[0]);
        C[0][1] += maths.dot(a[0], a[1]);
        C[1][0] += maths.dot(a[0], a[1]);
        C[1][1] += maths.dot(a[1], a[1]);
        tmp = maths.subtract(points[i], bezier.q([ firstPoint, firstPoint, lastPoint, lastPoint ], u));
        X[0] += maths.dot(a[0], tmp);
        X[1] += maths.dot(a[1], tmp);
    }
    det_C0_C1 = C[0][0] * C[1][1] - C[1][0] * C[0][1];
    det_C0_X = C[0][0] * X[1] - C[1][0] * X[0];
    det_X_C1 = X[0] * C[1][1] - X[1] * C[0][1];
    alpha_l = det_C0_C1 === 0 ? 0 : det_X_C1 / det_C0_C1;
    alpha_r = det_C0_C1 === 0 ? 0 : det_C0_X / det_C0_C1;
    segLength = maths.vectorLen(maths.subtract(firstPoint, lastPoint));
    epsilon = 1e-6 * segLength;
    if (alpha_l < epsilon || alpha_r < epsilon) {
        bezCurve[1] = maths.addArrays(firstPoint, maths.mulItems(leftTangent, segLength / 3));
        bezCurve[2] = maths.addArrays(lastPoint, maths.mulItems(rightTangent, segLength / 3));
    } else {
        bezCurve[1] = maths.addArrays(firstPoint, maths.mulItems(leftTangent, alpha_l));
        bezCurve[2] = maths.addArrays(lastPoint, maths.mulItems(rightTangent, alpha_r));
    }
    return bezCurve;
}

function reparameterize(bezier, points, parameters) {
    return parameters.map((p, i) => newtonRaphsonRootFind(bezier, points[i], p));
}

function newtonRaphsonRootFind(bez, point, u) {
    var d = maths.subtract(bezier.q(bez, u), point), qprime = bezier.qprime(bez, u), numerator = maths.mulMatrix(d, qprime), denominator = maths.sum(maths.squareItems(qprime)) + 2 * maths.mulMatrix(d, bezier.qprimeprime(bez, u));
    if (denominator === 0) {
        return u;
    } else {
        return u - numerator / denominator;
    }
}

function chordLengthParameterize(points) {
    var u = [], currU, prevU, prevP;
    points.forEach((p, i) => {
        currU = i ? prevU + maths.vectorLen(maths.subtract(p, prevP)) : 0;
        u.push(currU);
        prevU = currU;
        prevP = p;
    });
    u = u.map(x => x / prevU);
    return u;
}

function computeMaxError(points, bez, parameters) {
    var dist, maxDist, splitPoint, v, i, count, point, t;
    maxDist = 0;
    splitPoint = Math.floor(points.length / 2);
    const t_distMap = mapTtoRelativeDistances(bez, 10);
    for (i = 0, count = points.length; i < count; i++) {
        point = points[i];
        t = find_t(bez, parameters[i], t_distMap, 10);
        v = maths.subtract(bezier.q(bez, t), point);
        dist = v[0] * v[0] + v[1] * v[1];
        if (dist > maxDist) {
            maxDist = dist;
            splitPoint = i;
        }
    }
    return [ maxDist, splitPoint ];
}

var mapTtoRelativeDistances = function(bez, B_parts) {
    var B_t_curr;
    var B_t_dist = [ 0 ];
    var B_t_prev = bez[0];
    var sumLen = 0;
    for (var i = 1; i <= B_parts; i++) {
        B_t_curr = bezier.q(bez, i / B_parts);
        sumLen += maths.vectorLen(maths.subtract(B_t_curr, B_t_prev));
        B_t_dist.push(sumLen);
        B_t_prev = B_t_curr;
    }
    B_t_dist = B_t_dist.map(x => x / sumLen);
    return B_t_dist;
};

function find_t(bez, param, t_distMap, B_parts) {
    if (param < 0) {
        return 0;
    }
    if (param > 1) {
        return 1;
    }
    var lenMax, lenMin, tMax, tMin, t;
    for (var i = 1; i <= B_parts; i++) {
        if (param <= t_distMap[i]) {
            tMin = (i - 1) / B_parts;
            tMax = i / B_parts;
            lenMin = t_distMap[i - 1];
            lenMax = t_distMap[i];
            t = (param - lenMin) / (lenMax - lenMin) * (tMax - tMin) + tMin;
            break;
        }
    }
    return t;
}

function createTangent(pointA, pointB) {
    return maths.normalize(maths.subtract(pointA, pointB));
}

class maths {
    static zeros_Xx2x2(x) {
        var zs = [];
        while (x--) {
            zs.push([ 0, 0 ]);
        }
        return zs;
    }
    static mulItems(items, multiplier) {
        return items.map(x => x * multiplier);
    }
    static mulMatrix(m1, m2) {
        return m1.reduce((sum, x1, i) => sum + x1 * m2[i], 0);
    }
    static subtract(arr1, arr2) {
        return arr1.map((x1, i) => x1 - arr2[i]);
    }
    static addArrays(arr1, arr2) {
        return arr1.map((x1, i) => x1 + arr2[i]);
    }
    static addItems(items, addition) {
        return items.map(x => x + addition);
    }
    static sum(items) {
        return items.reduce((sum, x) => sum + x);
    }
    static dot(m1, m2) {
        return maths.mulMatrix(m1, m2);
    }
    static vectorLen(v) {
        return Math.hypot(...v);
    }
    static divItems(items, divisor) {
        return items.map(x => x / divisor);
    }
    static squareItems(items) {
        return items.map(x => x * x);
    }
    static normalize(v) {
        return this.divItems(v, this.vectorLen(v));
    }
}

class bezier {
    static q(ctrlPoly, t) {
        var tx = 1 - t;
        var pA = maths.mulItems(ctrlPoly[0], tx * tx * tx), pB = maths.mulItems(ctrlPoly[1], 3 * tx * tx * t), pC = maths.mulItems(ctrlPoly[2], 3 * tx * t * t), pD = maths.mulItems(ctrlPoly[3], t * t * t);
        return maths.addArrays(maths.addArrays(pA, pB), maths.addArrays(pC, pD));
    }
    static qprime(ctrlPoly, t) {
        var tx = 1 - t;
        var pA = maths.mulItems(maths.subtract(ctrlPoly[1], ctrlPoly[0]), 3 * tx * tx), pB = maths.mulItems(maths.subtract(ctrlPoly[2], ctrlPoly[1]), 6 * tx * t), pC = maths.mulItems(maths.subtract(ctrlPoly[3], ctrlPoly[2]), 3 * t * t);
        return maths.addArrays(maths.addArrays(pA, pB), pC);
    }
    static qprimeprime(ctrlPoly, t) {
        return maths.addArrays(maths.mulItems(maths.addArrays(maths.subtract(ctrlPoly[2], maths.mulItems(ctrlPoly[1], 2)), ctrlPoly[0]), 6 * (1 - t)), maths.mulItems(maths.addArrays(maths.subtract(ctrlPoly[3], maths.mulItems(ctrlPoly[2], 2)), ctrlPoly[1]), 6 * t));
    }
}

var fx = function() {
    function q(a, d, c) {
        return Math.max(a, Math.min(d, c));
    }
    function w(b) {
        return {
            _: b,
            loadContentsOf: function(b) {
                a = this._.gl;
                this._.loadContentsOf(b);
            },
            destroy: function() {
                a = this._.gl;
                this._.destroy();
            }
        };
    }
    function A(a) {
        return w(r.fromElement(a));
    }
    function B(b, d) {
        var c = a.UNSIGNED_BYTE;
        if (a.getExtension("OES_texture_float") && a.getExtension("OES_texture_float_linear")) {
            var e = new r(100, 100, a.RGBA, a.FLOAT);
            try {
                e.drawTo(function() {
                    c = a.FLOAT;
                });
            } catch (g) {}
            e.destroy();
        }
        this._.texture && this._.texture.destroy();
        this._.spareTexture && this._.spareTexture.destroy();
        this.width = b;
        this.height = d;
        this._.texture = new r(b, d, a.RGBA, c);
        this._.spareTexture = new r(b, d, a.RGBA, c);
        this._.extraTexture = this._.extraTexture || new r(0, 0, a.RGBA, c);
        this._.flippedShader = this._.flippedShader || new h(null, "uniform sampler2D texture;varying vec2 texCoord;void main(){gl_FragColor=texture2D(texture,vec2(texCoord.x,1.0-texCoord.y));}");
        this._.isInitialized = !0;
    }
    function C(a, d, c) {
        this._.isInitialized && a._.width == this.width && a._.height == this.height || B.call(this, d ? d : a._.width, c ? c : a._.height);
        a._.use();
        this._.texture.drawTo(function() {
            h.getDefaultShader().drawRect();
        });
        return this;
    }
    function D() {
        this._.texture.use();
        this._.flippedShader.drawRect();
        return this;
    }
    function f(a, d, c, e) {
        (c || this._.texture).use();
        this._.spareTexture.drawTo(function() {
            a.uniforms(d).drawRect();
        });
        this._.spareTexture.swapWith(e || this._.texture);
    }
    function E(a) {
        a.parentNode.insertBefore(this, a);
        a.parentNode.removeChild(a);
        return this;
    }
    function F() {
        var b = new r(this._.texture.width, this._.texture.height, a.RGBA, a.UNSIGNED_BYTE);
        this._.texture.use();
        b.drawTo(function() {
            h.getDefaultShader().drawRect();
        });
        return w(b);
    }
    function G() {
        var b = this._.texture.width, d = this._.texture.height, c = new Uint8Array(4 * b * d);
        this._.texture.drawTo(function() {
            a.readPixels(0, 0, b, d, a.RGBA, a.UNSIGNED_BYTE, c);
        });
        return c;
    }
    function k(b) {
        return function() {
            a = this._.gl;
            return b.apply(this, arguments);
        };
    }
    function x(a, d, c, e, g, l, n, p) {
        var m = c - g, h = e - l, f = n - g, k = p - l;
        g = a - c + g - n;
        l = d - e + l - p;
        var q = m * k - f * h, f = (g * k - f * l) / q, m = (m * l - g * h) / q;
        return [ c - a + f * c, e - d + f * e, f, n - a + m * n, p - d + m * p, m, a, d, 1 ];
    }
    function y(a) {
        var d = a[0], c = a[1], e = a[2], g = a[3], l = a[4], n = a[5], p = a[6], m = a[7];
        a = a[8];
        var f = d * l * a - d * n * m - c * g * a + c * n * p + e * g * m - e * l * p;
        return [ (l * a - n * m) / f, (e * m - c * a) / f, (c * n - e * l) / f, (n * p - g * a) / f, (d * a - e * p) / f, (e * g - d * n) / f, (g * m - l * p) / f, (c * p - d * m) / f, (d * l - c * g) / f ];
    }
    function z(a) {
        var d = a.length;
        this.xa = [];
        this.ya = [];
        this.u = [];
        this.y2 = [];
        a.sort(function(a, b) {
            return a[0] - b[0];
        });
        for (var c = 0; c < d; c++) this.xa.push(a[c][0]), this.ya.push(a[c][1]);
        this.u[0] = 0;
        this.y2[0] = 0;
        for (c = 1; c < d - 1; ++c) {
            a = this.xa[c + 1] - this.xa[c - 1];
            var e = (this.xa[c] - this.xa[c - 1]) / a, g = e * this.y2[c - 1] + 2;
            this.y2[c] = (e - 1) / g;
            this.u[c] = (6 * ((this.ya[c + 1] - this.ya[c]) / (this.xa[c + 1] - this.xa[c]) - (this.ya[c] - this.ya[c - 1]) / (this.xa[c] - this.xa[c - 1])) / a - e * this.u[c - 1]) / g;
        }
        this.y2[d - 1] = 0;
        for (c = d - 2; 0 <= c; --c) this.y2[c] = this.y2[c] * this.y2[c + 1] + this.u[c];
    }
    function u(a, d) {
        return new h(null, a + "uniform sampler2D texture;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 coord=texCoord*texSize;" + d + "gl_FragColor=texture2D(texture,coord/texSize);vec2 clampedCoord=clamp(coord,vec2(0.0),texSize);if(coord!=clampedCoord){gl_FragColor.a*=max(0.0,1.0-length(coord-clampedCoord));}}");
    }
    function H(b, d) {
        a.brightnessContrast = a.brightnessContrast || new h(null, "uniform sampler2D texture;uniform float brightness;uniform float contrast;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);color.rgb+=brightness;if(contrast>0.0){color.rgb=(color.rgb-0.5)/(1.0-contrast)+0.5;}else{color.rgb=(color.rgb-0.5)*(1.0+contrast)+0.5;}gl_FragColor=color;}");
        f.call(this, a.brightnessContrast, {
            brightness: q(-1, b, 1),
            contrast: q(-1, d, 1)
        });
        return this;
    }
    function t(a) {
        a = new z(a);
        for (var d = [], c = 0; 256 > c; c++) d.push(q(0, Math.floor(256 * a.interpolate(c / 255)), 255));
        return d;
    }
    function I(b, d, c) {
        b = t(b);
        1 == arguments.length ? d = c = b : (d = t(d), c = t(c));
        for (var e = [], g = 0; 256 > g; g++) e.splice(e.length, 0, b[g], d[g], c[g], 255);
        this._.extraTexture.initFromBytes(256, 1, e);
        this._.extraTexture.use(1);
        a.curves = a.curves || new h(null, "uniform sampler2D texture;uniform sampler2D map;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);color.r=texture2D(map,vec2(color.r)).r;color.g=texture2D(map,vec2(color.g)).g;color.b=texture2D(map,vec2(color.b)).b;gl_FragColor=color;}");
        a.curves.textures({
            map: 1
        });
        f.call(this, a.curves, {});
        return this;
    }
    function J(b) {
        a.denoise = a.denoise || new h(null, "uniform sampler2D texture;uniform float exponent;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;void main(){vec4 center=texture2D(texture,texCoord);vec4 color=vec4(0.0);float total=0.0;for(float x=-4.0;x<=4.0;x+=1.0){for(float y=-4.0;y<=4.0;y+=1.0){vec4 sample=texture2D(texture,texCoord+vec2(x,y)/texSize);float weight=1.0-abs(dot(sample.rgb-center.rgb,vec3(0.25)));weight=pow(weight,exponent);color+=sample*weight;total+=weight;}}gl_FragColor=color/total;}");
        for (var d = 0; 2 > d; d++) f.call(this, a.denoise, {
            exponent: Math.max(0, b),
            texSize: [ this.width, this.height ]
        });
        return this;
    }
    function K(b, d) {
        a.hueSaturation = a.hueSaturation || new h(null, "uniform sampler2D texture;uniform float hue;uniform float saturation;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float angle=hue*3.14159265;float s=sin(angle),c=cos(angle);vec3 weights=(vec3(2.0*c,-sqrt(3.0)*s-c,sqrt(3.0)*s-c)+1.0)/3.0;float len=length(color.rgb);color.rgb=vec3(dot(color.rgb,weights.xyz),dot(color.rgb,weights.zxy),dot(color.rgb,weights.yzx));float average=(color.r+color.g+color.b)/3.0;if(saturation>0.0){color.rgb+=(average-color.rgb)*(1.0-1.0/(1.001-saturation));}else{color.rgb+=(average-color.rgb)*(-saturation);}gl_FragColor=color;}");
        f.call(this, a.hueSaturation, {
            hue: q(-1, b, 1),
            saturation: q(-1, d, 1)
        });
        return this;
    }
    function L(b) {
        a.noise = a.noise || new h(null, "uniform sampler2D texture;uniform float amount;varying vec2 texCoord;float rand(vec2 co){return fract(sin(dot(co.xy,vec2(12.9898,78.233)))*43758.5453);}void main(){vec4 color=texture2D(texture,texCoord);float diff=(rand(texCoord)-0.5)*amount;color.r+=diff;color.g+=diff;color.b+=diff;gl_FragColor=color;}");
        f.call(this, a.noise, {
            amount: q(0, b, 1)
        });
        return this;
    }
    function M(b) {
        a.sepia = a.sepia || new h(null, "uniform sampler2D texture;uniform float amount;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float r=color.r;float g=color.g;float b=color.b;color.r=min(1.0,(r*(1.0-(0.607*amount)))+(g*(0.769*amount))+(b*(0.189*amount)));color.g=min(1.0,(r*0.349*amount)+(g*(1.0-(0.314*amount)))+(b*0.168*amount));color.b=min(1.0,(r*0.272*amount)+(g*0.534*amount)+(b*(1.0-(0.869*amount))));gl_FragColor=color;}");
        f.call(this, a.sepia, {
            amount: q(0, b, 1)
        });
        return this;
    }
    function N(b, d) {
        a.unsharpMask = a.unsharpMask || new h(null, "uniform sampler2D blurredTexture;uniform sampler2D originalTexture;uniform float strength;uniform float threshold;varying vec2 texCoord;void main(){vec4 blurred=texture2D(blurredTexture,texCoord);vec4 original=texture2D(originalTexture,texCoord);gl_FragColor=mix(blurred,original,1.0+strength);}");
        this._.extraTexture.ensureFormat(this._.texture);
        this._.texture.use();
        this._.extraTexture.drawTo(function() {
            h.getDefaultShader().drawRect();
        });
        this._.extraTexture.use(1);
        this.triangleBlur(b);
        a.unsharpMask.textures({
            originalTexture: 1
        });
        f.call(this, a.unsharpMask, {
            strength: d
        });
        this._.extraTexture.unuse(1);
        return this;
    }
    function O(b) {
        a.vibrance = a.vibrance || new h(null, "uniform sampler2D texture;uniform float amount;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float average=(color.r+color.g+color.b)/3.0;float mx=max(color.r,max(color.g,color.b));float amt=(mx-average)*(-amount*3.0);color.rgb=mix(color.rgb,vec3(mx),amt);gl_FragColor=color;}");
        f.call(this, a.vibrance, {
            amount: q(-1, b, 1)
        });
        return this;
    }
    function P(b, d) {
        a.vignette = a.vignette || new h(null, "uniform sampler2D texture;uniform float size;uniform float amount;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float dist=distance(texCoord,vec2(0.5,0.5));color.rgb*=smoothstep(0.8,size*0.799,dist*(amount+size));gl_FragColor=color;}");
        f.call(this, a.vignette, {
            size: q(0, b, 1),
            amount: q(0, d, 1)
        });
        return this;
    }
    function Q(b, d, c) {
        a.lensBlurPrePass = a.lensBlurPrePass || new h(null, "uniform sampler2D texture;uniform float power;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);color=pow(color,vec4(power));gl_FragColor=vec4(color);}");
        var e = "uniform sampler2D texture0;uniform sampler2D texture1;uniform vec2 delta0;uniform vec2 delta1;uniform float power;varying vec2 texCoord;" + s + "vec4 sample(vec2 delta){float offset=random(vec3(delta,151.7182),0.0);vec4 color=vec4(0.0);float total=0.0;for(float t=0.0;t<=30.0;t++){float percent=(t+offset)/30.0;color+=texture2D(texture0,texCoord+delta*percent);total+=1.0;}return color/total;}";
        a.lensBlur0 = a.lensBlur0 || new h(null, e + "void main(){gl_FragColor=sample(delta0);}");
        a.lensBlur1 = a.lensBlur1 || new h(null, e + "void main(){gl_FragColor=(sample(delta0)+sample(delta1))*0.5;}");
        a.lensBlur2 = a.lensBlur2 || new h(null, e + "void main(){vec4 color=(sample(delta0)+2.0*texture2D(texture1,texCoord))/3.0;gl_FragColor=pow(color,vec4(power));}").textures({
            texture1: 1
        });
        for (var e = [], g = 0; 3 > g; g++) {
            var l = c + 2 * g * Math.PI / 3;
            e.push([ b * Math.sin(l) / this.width, b * Math.cos(l) / this.height ]);
        }
        b = Math.pow(10, q(-1, d, 1));
        f.call(this, a.lensBlurPrePass, {
            power: b
        });
        this._.extraTexture.ensureFormat(this._.texture);
        f.call(this, a.lensBlur0, {
            delta0: e[0]
        }, this._.texture, this._.extraTexture);
        f.call(this, a.lensBlur1, {
            delta0: e[1],
            delta1: e[2]
        }, this._.extraTexture, this._.extraTexture);
        f.call(this, a.lensBlur0, {
            delta0: e[1]
        });
        this._.extraTexture.use(1);
        f.call(this, a.lensBlur2, {
            power: 1 / b,
            delta0: e[2]
        });
        return this;
    }
    function R(b, d, c, e, g, l) {
        a.tiltShift = a.tiltShift || new h(null, "uniform sampler2D texture;uniform float blurRadius;uniform float gradientRadius;uniform vec2 start;uniform vec2 end;uniform vec2 delta;uniform vec2 texSize;varying vec2 texCoord;" + s + "void main(){vec4 color=vec4(0.0);float total=0.0;float offset=random(vec3(12.9898,78.233,151.7182),0.0);vec2 normal=normalize(vec2(start.y-end.y,end.x-start.x));float radius=smoothstep(0.0,1.0,abs(dot(texCoord*texSize-start,normal))/gradientRadius)*blurRadius;for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec4 sample=texture2D(texture,texCoord+delta/texSize*percent*radius);sample.rgb*=sample.a;color+=sample*weight;total+=weight;}gl_FragColor=color/total;gl_FragColor.rgb/=gl_FragColor.a+0.00001;}");
        var n = c - b, p = e - d, m = Math.sqrt(n * n + p * p);
        f.call(this, a.tiltShift, {
            blurRadius: g,
            gradientRadius: l,
            start: [ b, d ],
            end: [ c, e ],
            delta: [ n / m, p / m ],
            texSize: [ this.width, this.height ]
        });
        f.call(this, a.tiltShift, {
            blurRadius: g,
            gradientRadius: l,
            start: [ b, d ],
            end: [ c, e ],
            delta: [ -p / m, n / m ],
            texSize: [ this.width, this.height ]
        });
        return this;
    }
    function S(b) {
        a.triangleBlur = a.triangleBlur || new h(null, "uniform sampler2D texture;uniform vec2 delta;varying vec2 texCoord;" + s + "void main(){vec4 color=vec4(0.0);float total=0.0;float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec4 sample=texture2D(texture,texCoord+delta*percent);sample.rgb*=sample.a;color+=sample*weight;total+=weight;}gl_FragColor=color/total;gl_FragColor.rgb/=gl_FragColor.a+0.00001;}");
        f.call(this, a.triangleBlur, {
            delta: [ b / this.width, 0 ]
        });
        f.call(this, a.triangleBlur, {
            delta: [ 0, b / this.height ]
        });
        return this;
    }
    function T(b, d, c) {
        a.zoomBlur = a.zoomBlur || new h(null, "uniform sampler2D texture;uniform vec2 center;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;" + s + "void main(){vec4 color=vec4(0.0);float total=0.0;vec2 toCenter=center-texCoord*texSize;float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=0.0;t<=40.0;t++){float percent=(t+offset)/40.0;float weight=4.0*(percent-percent*percent);vec4 sample=texture2D(texture,texCoord+toCenter*percent*strength/texSize);sample.rgb*=sample.a;color+=sample*weight;total+=weight;}gl_FragColor=color/total;gl_FragColor.rgb/=gl_FragColor.a+0.00001;}");
        f.call(this, a.zoomBlur, {
            center: [ b, d ],
            strength: c,
            texSize: [ this.width, this.height ]
        });
        return this;
    }
    function U(b, d, c, e) {
        a.colorHalftone = a.colorHalftone || new h(null, "uniform sampler2D texture;uniform vec2 center;uniform float angle;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;float pattern(float angle){float s=sin(angle),c=cos(angle);vec2 tex=texCoord*texSize-center;vec2 point=vec2(c*tex.x-s*tex.y,s*tex.x+c*tex.y)*scale;return(sin(point.x)*sin(point.y))*4.0;}void main(){vec4 color=texture2D(texture,texCoord);vec3 cmy=1.0-color.rgb;float k=min(cmy.x,min(cmy.y,cmy.z));cmy=(cmy-k)/(1.0-k);cmy=clamp(cmy*10.0-3.0+vec3(pattern(angle+0.26179),pattern(angle+1.30899),pattern(angle)),0.0,1.0);k=clamp(k*10.0-5.0+pattern(angle+0.78539),0.0,1.0);gl_FragColor=vec4(1.0-cmy-k,color.a);}");
        f.call(this, a.colorHalftone, {
            center: [ b, d ],
            angle: c,
            scale: Math.PI / e,
            texSize: [ this.width, this.height ]
        });
        return this;
    }
    function V(b, d, c, e) {
        a.dotScreen = a.dotScreen || new h(null, "uniform sampler2D texture;uniform vec2 center;uniform float angle;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;float pattern(){float s=sin(angle),c=cos(angle);vec2 tex=texCoord*texSize-center;vec2 point=vec2(c*tex.x-s*tex.y,s*tex.x+c*tex.y)*scale;return(sin(point.x)*sin(point.y))*4.0;}void main(){vec4 color=texture2D(texture,texCoord);float average=(color.r+color.g+color.b)/3.0;gl_FragColor=vec4(vec3(average*10.0-5.0+pattern()),color.a);}");
        f.call(this, a.dotScreen, {
            center: [ b, d ],
            angle: c,
            scale: Math.PI / e,
            texSize: [ this.width, this.height ]
        });
        return this;
    }
    function W(b) {
        a.edgeWork1 = a.edgeWork1 || new h(null, "uniform sampler2D texture;uniform vec2 delta;varying vec2 texCoord;" + s + "void main(){vec2 color=vec2(0.0);vec2 total=vec2(0.0);float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec3 sample=texture2D(texture,texCoord+delta*percent).rgb;float average=(sample.r+sample.g+sample.b)/3.0;color.x+=average*weight;total.x+=weight;if(abs(t)<15.0){weight=weight*2.0-1.0;color.y+=average*weight;total.y+=weight;}}gl_FragColor=vec4(color/total,0.0,1.0);}");
        a.edgeWork2 = a.edgeWork2 || new h(null, "uniform sampler2D texture;uniform vec2 delta;varying vec2 texCoord;" + s + "void main(){vec2 color=vec2(0.0);vec2 total=vec2(0.0);float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec2 sample=texture2D(texture,texCoord+delta*percent).xy;color.x+=sample.x*weight;total.x+=weight;if(abs(t)<15.0){weight=weight*2.0-1.0;color.y+=sample.y*weight;total.y+=weight;}}float c=clamp(10000.0*(color.y/total.y-color.x/total.x)+0.5,0.0,1.0);gl_FragColor=vec4(c,c,c,1.0);}");
        f.call(this, a.edgeWork1, {
            delta: [ b / this.width, 0 ]
        });
        f.call(this, a.edgeWork2, {
            delta: [ 0, b / this.height ]
        });
        return this;
    }
    function X(b, d, c) {
        a.hexagonalPixelate = a.hexagonalPixelate || new h(null, "uniform sampler2D texture;uniform vec2 center;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 tex=(texCoord*texSize-center)/scale;tex.y/=0.866025404;tex.x-=tex.y*0.5;vec2 a;if(tex.x+tex.y-floor(tex.x)-floor(tex.y)<1.0)a=vec2(floor(tex.x),floor(tex.y));else a=vec2(ceil(tex.x),ceil(tex.y));vec2 b=vec2(ceil(tex.x),floor(tex.y));vec2 c=vec2(floor(tex.x),ceil(tex.y));vec3 TEX=vec3(tex.x,tex.y,1.0-tex.x-tex.y);vec3 A=vec3(a.x,a.y,1.0-a.x-a.y);vec3 B=vec3(b.x,b.y,1.0-b.x-b.y);vec3 C=vec3(c.x,c.y,1.0-c.x-c.y);float alen=length(TEX-A);float blen=length(TEX-B);float clen=length(TEX-C);vec2 choice;if(alen<blen){if(alen<clen)choice=a;else choice=c;}else{if(blen<clen)choice=b;else choice=c;}choice.x+=choice.y*0.5;choice.y*=0.866025404;choice*=scale/texSize;gl_FragColor=texture2D(texture,choice+center/texSize);}");
        f.call(this, a.hexagonalPixelate, {
            center: [ b, d ],
            scale: c,
            texSize: [ this.width, this.height ]
        });
        return this;
    }
    function Y(b) {
        a.ink = a.ink || new h(null, "uniform sampler2D texture;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 dx=vec2(1.0/texSize.x,0.0);vec2 dy=vec2(0.0,1.0/texSize.y);vec4 color=texture2D(texture,texCoord);float bigTotal=0.0;float smallTotal=0.0;vec3 bigAverage=vec3(0.0);vec3 smallAverage=vec3(0.0);for(float x=-2.0;x<=2.0;x+=1.0){for(float y=-2.0;y<=2.0;y+=1.0){vec3 sample=texture2D(texture,texCoord+dx*x+dy*y).rgb;bigAverage+=sample;bigTotal+=1.0;if(abs(x)+abs(y)<2.0){smallAverage+=sample;smallTotal+=1.0;}}}vec3 edge=max(vec3(0.0),bigAverage/bigTotal-smallAverage/smallTotal);gl_FragColor=vec4(color.rgb-dot(edge,edge)*strength*100000.0,color.a);}");
        f.call(this, a.ink, {
            strength: b * b * b * b * b,
            texSize: [ this.width, this.height ]
        });
        return this;
    }
    function Z(b, d, c, e) {
        a.bulgePinch = a.bulgePinch || u("uniform float radius;uniform float strength;uniform vec2 center;", "coord-=center;float distance=length(coord);if(distance<radius){float percent=distance/radius;if(strength>0.0){coord*=mix(1.0,smoothstep(0.0,radius/distance,percent),strength*0.75);}else{coord*=mix(1.0,pow(percent,1.0+strength*0.75)*radius/distance,1.0-percent);}}coord+=center;");
        f.call(this, a.bulgePinch, {
            radius: c,
            strength: q(-1, e, 1),
            center: [ b, d ],
            texSize: [ this.width, this.height ]
        });
        return this;
    }
    function $(b, d, c) {
        a.matrixWarp = a.matrixWarp || u("uniform mat3 matrix;uniform bool useTextureSpace;", "if(useTextureSpace)coord=coord/texSize*2.0-1.0;vec3 warp=matrix*vec3(coord,1.0);coord=warp.xy/warp.z;if(useTextureSpace)coord=(coord*0.5+0.5)*texSize;");
        b = Array.prototype.concat.apply([], b);
        if (4 == b.length) b = [ b[0], b[1], 0, b[2], b[3], 0, 0, 0, 1 ]; else if (9 != b.length) throw "can only warp with 2x2 or 3x3 matrix";
        f.call(this, a.matrixWarp, {
            matrix: d ? y(b) : b,
            texSize: [ this.width, this.height ],
            useTextureSpace: c | 0
        });
        return this;
    }
    function aa(a, d) {
        var c = x.apply(null, d), e = x.apply(null, a), c = y(c);
        return this.matrixWarp([ c[0] * e[0] + c[1] * e[3] + c[2] * e[6], c[0] * e[1] + c[1] * e[4] + c[2] * e[7], c[0] * e[2] + c[1] * e[5] + c[2] * e[8], c[3] * e[0] + c[4] * e[3] + c[5] * e[6], c[3] * e[1] + c[4] * e[4] + c[5] * e[7], c[3] * e[2] + c[4] * e[5] + c[5] * e[8], c[6] * e[0] + c[7] * e[3] + c[8] * e[6], c[6] * e[1] + c[7] * e[4] + c[8] * e[7], c[6] * e[2] + c[7] * e[5] + c[8] * e[8] ]);
    }
    function ba(b, d, c, e) {
        a.swirl = a.swirl || u("uniform float radius;uniform float angle;uniform vec2 center;", "coord-=center;float distance=length(coord);if(distance<radius){float percent=(radius-distance)/radius;float theta=percent*percent*angle;float s=sin(theta);float c=cos(theta);coord=vec2(coord.x*c-coord.y*s,coord.x*s+coord.y*c);}coord+=center;");
        f.call(this, a.swirl, {
            radius: c,
            center: [ b, d ],
            angle: e,
            texSize: [ this.width, this.height ]
        });
        return this;
    }
    var v = {};
    (function() {
        function a(b) {
            if (!b.getExtension("OES_texture_float")) return !1;
            var c = b.createFramebuffer(), e = b.createTexture();
            b.bindTexture(b.TEXTURE_2D, e);
            b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
            b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
            b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
            b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
            b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, 1, 1, 0, b.RGBA, b.UNSIGNED_BYTE, null);
            b.bindFramebuffer(b.FRAMEBUFFER, c);
            b.framebufferTexture2D(b.FRAMEBUFFER, b.COLOR_ATTACHMENT0, b.TEXTURE_2D, e, 0);
            c = b.createTexture();
            b.bindTexture(b.TEXTURE_2D, c);
            b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.LINEAR);
            b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR);
            b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
            b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
            b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, 2, 2, 0, b.RGBA, b.FLOAT, new Float32Array([ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]));
            var e = b.createProgram(), d = b.createShader(b.VERTEX_SHADER), g = b.createShader(b.FRAGMENT_SHADER);
            b.shaderSource(d, "attribute vec2 vertex;void main(){gl_Position=vec4(vertex,0.0,1.0);}");
            b.shaderSource(g, "uniform sampler2D texture;void main(){gl_FragColor=texture2D(texture,vec2(0.5));}");
            b.compileShader(d);
            b.compileShader(g);
            b.attachShader(e, d);
            b.attachShader(e, g);
            b.linkProgram(e);
            d = b.createBuffer();
            b.bindBuffer(b.ARRAY_BUFFER, d);
            b.bufferData(b.ARRAY_BUFFER, new Float32Array([ 0, 0 ]), b.STREAM_DRAW);
            b.enableVertexAttribArray(0);
            b.vertexAttribPointer(0, 2, b.FLOAT, !1, 0, 0);
            d = new Uint8Array(4);
            b.useProgram(e);
            b.viewport(0, 0, 1, 1);
            b.bindTexture(b.TEXTURE_2D, c);
            b.drawArrays(b.POINTS, 0, 1);
            b.readPixels(0, 0, 1, 1, b.RGBA, b.UNSIGNED_BYTE, d);
            return 127 === d[0] || 128 === d[0];
        }
        function d() {}
        function c(a) {
            "OES_texture_float_linear" === a ? (void 0 === this.$OES_texture_float_linear$ && Object.defineProperty(this, "$OES_texture_float_linear$", {
                enumerable: !1,
                configurable: !1,
                writable: !1,
                value: new d()
            }), a = this.$OES_texture_float_linear$) : a = n.call(this, a);
            return a;
        }
        function e() {
            var a = f.call(this);
            -1 === a.indexOf("OES_texture_float_linear") && a.push("OES_texture_float_linear");
            return a;
        }
        try {
            var g = document.createElement("canvas").getContext("experimental-webgl");
        } catch (l) {}
        if (g && -1 === g.getSupportedExtensions().indexOf("OES_texture_float_linear") && a(g)) {
            var n = WebGLRenderingContext.prototype.getExtension, f = WebGLRenderingContext.prototype.getSupportedExtensions;
            WebGLRenderingContext.prototype.getExtension = c;
            WebGLRenderingContext.prototype.getSupportedExtensions = e;
        }
    })();
    var a;
    v.canvas = function() {
        var b = document.createElement("canvas");
        try {
            a = b.getContext("experimental-webgl", {
                premultipliedAlpha: !1
            });
        } catch (d) {
            a = null;
        }
        if (!a) throw "This browser does not support WebGL";
        b._ = {
            gl: a,
            isInitialized: !1,
            texture: null,
            spareTexture: null,
            flippedShader: null
        };
        b.texture = k(A);
        b.draw = k(C);
        b.update = k(D);
        b.replace = k(E);
        b.contents = k(F);
        b.getPixelArray = k(G);
        b.brightnessContrast = k(H);
        b.hexagonalPixelate = k(X);
        b.hueSaturation = k(K);
        b.colorHalftone = k(U);
        b.triangleBlur = k(S);
        b.unsharpMask = k(N);
        b.perspective = k(aa);
        b.matrixWarp = k($);
        b.bulgePinch = k(Z);
        b.tiltShift = k(R);
        b.dotScreen = k(V);
        b.edgeWork = k(W);
        b.lensBlur = k(Q);
        b.zoomBlur = k(T);
        b.noise = k(L);
        b.denoise = k(J);
        b.curves = k(I);
        b.swirl = k(ba);
        b.ink = k(Y);
        b.vignette = k(P);
        b.vibrance = k(O);
        b.sepia = k(M);
        return b;
    };
    v.splineInterpolate = t;
    var h = function() {
        function b(b, c) {
            var e = a.createShader(b);
            a.shaderSource(e, c);
            a.compileShader(e);
            if (!a.getShaderParameter(e, a.COMPILE_STATUS)) throw "compile error: " + a.getShaderInfoLog(e);
            return e;
        }
        function d(d, l) {
            this.texCoordAttribute = this.vertexAttribute = null;
            this.program = a.createProgram();
            d = d || c;
            l = l || e;
            l = "precision highp float;" + l;
            a.attachShader(this.program, b(a.VERTEX_SHADER, d));
            a.attachShader(this.program, b(a.FRAGMENT_SHADER, l));
            a.linkProgram(this.program);
            if (!a.getProgramParameter(this.program, a.LINK_STATUS)) throw "link error: " + a.getProgramInfoLog(this.program);
        }
        var c = "attribute vec2 vertex;attribute vec2 _texCoord;varying vec2 texCoord;void main(){texCoord=_texCoord;gl_Position=vec4(vertex*2.0-1.0,0.0,1.0);}", e = "uniform sampler2D texture;varying vec2 texCoord;void main(){gl_FragColor=texture2D(texture,texCoord);}";
        d.prototype.destroy = function() {
            a.deleteProgram(this.program);
            this.program = null;
        };
        d.prototype.uniforms = function(b) {
            a.useProgram(this.program);
            for (var e in b) if (b.hasOwnProperty(e)) {
                var c = a.getUniformLocation(this.program, e);
                if (null !== c) {
                    var d = b[e];
                    if ("[object Array]" == Object.prototype.toString.call(d)) switch (d.length) {
                      case 1:
                        a.uniform1fv(c, new Float32Array(d));
                        break;

                      case 2:
                        a.uniform2fv(c, new Float32Array(d));
                        break;

                      case 3:
                        a.uniform3fv(c, new Float32Array(d));
                        break;

                      case 4:
                        a.uniform4fv(c, new Float32Array(d));
                        break;

                      case 9:
                        a.uniformMatrix3fv(c, !1, new Float32Array(d));
                        break;

                      case 16:
                        a.uniformMatrix4fv(c, !1, new Float32Array(d));
                        break;

                      default:
                        throw "dont't know how to load uniform \"" + e + '" of length ' + d.length;
                    } else if ("[object Number]" == Object.prototype.toString.call(d)) a.uniform1f(c, d); else throw 'attempted to set uniform "' + e + '" to invalid value ' + (d || "undefined").toString();
                }
            }
            return this;
        };
        d.prototype.textures = function(b) {
            a.useProgram(this.program);
            for (var c in b) b.hasOwnProperty(c) && a.uniform1i(a.getUniformLocation(this.program, c), b[c]);
            return this;
        };
        d.prototype.drawRect = function(b, c, e, d) {
            var f = a.getParameter(a.VIEWPORT);
            c = void 0 !== c ? (c - f[1]) / f[3] : 0;
            b = void 0 !== b ? (b - f[0]) / f[2] : 0;
            e = void 0 !== e ? (e - f[0]) / f[2] : 1;
            d = void 0 !== d ? (d - f[1]) / f[3] : 1;
            null == a.vertexBuffer && (a.vertexBuffer = a.createBuffer());
            a.bindBuffer(a.ARRAY_BUFFER, a.vertexBuffer);
            a.bufferData(a.ARRAY_BUFFER, new Float32Array([ b, c, b, d, e, c, e, d ]), a.STATIC_DRAW);
            null == a.texCoordBuffer && (a.texCoordBuffer = a.createBuffer(), a.bindBuffer(a.ARRAY_BUFFER, a.texCoordBuffer), 
            a.bufferData(a.ARRAY_BUFFER, new Float32Array([ 0, 0, 0, 1, 1, 0, 1, 1 ]), a.STATIC_DRAW));
            null == this.vertexAttribute && (this.vertexAttribute = a.getAttribLocation(this.program, "vertex"), 
            a.enableVertexAttribArray(this.vertexAttribute));
            null == this.texCoordAttribute && (this.texCoordAttribute = a.getAttribLocation(this.program, "_texCoord"), 
            a.enableVertexAttribArray(this.texCoordAttribute));
            a.useProgram(this.program);
            a.bindBuffer(a.ARRAY_BUFFER, a.vertexBuffer);
            a.vertexAttribPointer(this.vertexAttribute, 2, a.FLOAT, !1, 0, 0);
            a.bindBuffer(a.ARRAY_BUFFER, a.texCoordBuffer);
            a.vertexAttribPointer(this.texCoordAttribute, 2, a.FLOAT, !1, 0, 0);
            a.drawArrays(a.TRIANGLE_STRIP, 0, 4);
        };
        d.getDefaultShader = function() {
            a.defaultShader = a.defaultShader || new d();
            return a.defaultShader;
        };
        return d;
    }();
    z.prototype.interpolate = function(a) {
        for (var d = 0, c = this.ya.length - 1; 1 < c - d; ) {
            var e = c + d >> 1;
            this.xa[e] > a ? c = e : d = e;
        }
        var e = this.xa[c] - this.xa[d], g = (this.xa[c] - a) / e;
        a = (a - this.xa[d]) / e;
        return g * this.ya[d] + a * this.ya[c] + ((g * g * g - g) * this.y2[d] + (a * a * a - a) * this.y2[c]) * e * e / 6;
    };
    var r = function() {
        function b(b, c, d, f) {
            this.gl = a;
            this.id = a.createTexture();
            this.width = b;
            this.height = c;
            this.format = d;
            this.type = f;
            a.bindTexture(a.TEXTURE_2D, this.id);
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR);
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR);
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE);
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE);
            b && c && a.texImage2D(a.TEXTURE_2D, 0, this.format, b, c, 0, this.format, this.type, null);
        }
        function d(a) {
            null == c && (c = document.createElement("canvas"));
            c.width = a.width;
            c.height = a.height;
            a = c.getContext("2d");
            a.clearRect(0, 0, c.width, c.height);
            return a;
        }
        b.fromElement = function(c) {
            var d = new b(0, 0, a.RGBA, a.UNSIGNED_BYTE);
            d.loadContentsOf(c);
            return d;
        };
        b.prototype.loadContentsOf = function(b) {
            this.width = b.width || b.videoWidth;
            this.height = b.height || b.videoHeight;
            a.bindTexture(a.TEXTURE_2D, this.id);
            a.texImage2D(a.TEXTURE_2D, 0, this.format, this.format, this.type, b);
        };
        b.prototype.initFromBytes = function(b, c, d) {
            this.width = b;
            this.height = c;
            this.format = a.RGBA;
            this.type = a.UNSIGNED_BYTE;
            a.bindTexture(a.TEXTURE_2D, this.id);
            a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, b, c, 0, a.RGBA, this.type, new Uint8Array(d));
        };
        b.prototype.destroy = function() {
            a.deleteTexture(this.id);
            this.id = null;
        };
        b.prototype.use = function(b) {
            a.activeTexture(a.TEXTURE0 + (b || 0));
            a.bindTexture(a.TEXTURE_2D, this.id);
        };
        b.prototype.unuse = function(b) {
            a.activeTexture(a.TEXTURE0 + (b || 0));
            a.bindTexture(a.TEXTURE_2D, null);
        };
        b.prototype.ensureFormat = function(b, c, d, f) {
            if (1 == arguments.length) {
                var h = arguments[0];
                b = h.width;
                c = h.height;
                d = h.format;
                f = h.type;
            }
            if (b != this.width || c != this.height || d != this.format || f != this.type) this.width = b, 
            this.height = c, this.format = d, this.type = f, a.bindTexture(a.TEXTURE_2D, this.id), 
            a.texImage2D(a.TEXTURE_2D, 0, this.format, b, c, 0, this.format, this.type, null);
        };
        b.prototype.drawTo = function(b) {
            a.framebuffer = a.framebuffer || a.createFramebuffer();
            a.bindFramebuffer(a.FRAMEBUFFER, a.framebuffer);
            a.framebufferTexture2D(a.FRAMEBUFFER, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, this.id, 0);
            if (a.checkFramebufferStatus(a.FRAMEBUFFER) !== a.FRAMEBUFFER_COMPLETE) throw Error("incomplete framebuffer");
            a.viewport(0, 0, this.width, this.height);
            b();
            a.bindFramebuffer(a.FRAMEBUFFER, null);
        };
        var c = null;
        b.prototype.fillUsingCanvas = function(b) {
            b(d(this));
            this.format = a.RGBA;
            this.type = a.UNSIGNED_BYTE;
            a.bindTexture(a.TEXTURE_2D, this.id);
            a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, c);
            return this;
        };
        b.prototype.toImage = function(b) {
            this.use();
            h.getDefaultShader().drawRect();
            var f = 4 * this.width * this.height, k = new Uint8Array(f), n = d(this), p = n.createImageData(this.width, this.height);
            a.readPixels(0, 0, this.width, this.height, a.RGBA, a.UNSIGNED_BYTE, k);
            for (var m = 0; m < f; m++) p.data[m] = k[m];
            n.putImageData(p, 0, 0);
            b.src = c.toDataURL();
        };
        b.prototype.swapWith = function(a) {
            var b;
            b = a.id;
            a.id = this.id;
            this.id = b;
            b = a.width;
            a.width = this.width;
            this.width = b;
            b = a.height;
            a.height = this.height;
            this.height = b;
            b = a.format;
            a.format = this.format;
            this.format = b;
        };
        return b;
    }(), s = "float random(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}";
    return v;
}();

HTMLElement.prototype.removeAllChildren = function() {
    while (this.lastChild) {
        this.removeChild(this.lastChild);
    }
};

(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([ "exports" ], factory);
    } else if (typeof exports === "object") {
        factory(exports);
    } else {
        factory(root);
    }
})(this, function(exports) {
    function Node(obj, dimension, parent) {
        this.obj = obj;
        this.left = null;
        this.right = null;
        this.parent = parent;
        this.dimension = dimension;
    }
    function kdTree(points, metric, dimensions) {
        var self = this;
        function buildTree(points, depth, parent) {
            var dim = depth % dimensions.length, median, node;
            if (points.length === 0) {
                return null;
            }
            if (points.length === 1) {
                return new Node(points[0], dim, parent);
            }
            points.sort(function(a, b) {
                return a[dimensions[dim]] - b[dimensions[dim]];
            });
            median = Math.floor(points.length / 2);
            node = new Node(points[median], dim, parent);
            node.left = buildTree(points.slice(0, median), depth + 1, node);
            node.right = buildTree(points.slice(median + 1), depth + 1, node);
            return node;
        }
        function loadTree(data) {
            self.root = data;
            function restoreParent(root) {
                if (root.left) {
                    root.left.parent = root;
                    restoreParent(root.left);
                }
                if (root.right) {
                    root.right.parent = root;
                    restoreParent(root.right);
                }
            }
            restoreParent(self.root);
        }
        if (!Array.isArray(points)) loadTree(points, metric, dimensions); else this.root = buildTree(points, 0, null);
        this.toJSON = function(src) {
            if (!src) src = this.root;
            var dest = new Node(src.obj, src.dimension, null);
            if (src.left) dest.left = self.toJSON(src.left);
            if (src.right) dest.right = self.toJSON(src.right);
            return dest;
        };
        this.insert = function(point) {
            function innerSearch(node, parent) {
                if (node === null) {
                    return parent;
                }
                var dimension = dimensions[node.dimension];
                if (point[dimension] < node.obj[dimension]) {
                    return innerSearch(node.left, node);
                } else {
                    return innerSearch(node.right, node);
                }
            }
            var insertPosition = innerSearch(this.root, null), newNode, dimension;
            if (insertPosition === null) {
                this.root = new Node(point, 0, null);
                return;
            }
            newNode = new Node(point, (insertPosition.dimension + 1) % dimensions.length, insertPosition);
            dimension = dimensions[insertPosition.dimension];
            if (point[dimension] < insertPosition.obj[dimension]) {
                insertPosition.left = newNode;
            } else {
                insertPosition.right = newNode;
            }
        };
        this.remove = function(point) {
            var node;
            function nodeSearch(node) {
                if (node === null) {
                    return null;
                }
                if (node.obj === point) {
                    return node;
                }
                var dimension = dimensions[node.dimension];
                if (point[dimension] < node.obj[dimension]) {
                    return nodeSearch(node.left, node);
                } else {
                    return nodeSearch(node.right, node);
                }
            }
            function removeNode(node) {
                var nextNode, nextObj, pDimension;
                function findMin(node, dim) {
                    var dimension, own, left, right, min;
                    if (node === null) {
                        return null;
                    }
                    dimension = dimensions[dim];
                    if (node.dimension === dim) {
                        if (node.left !== null) {
                            return findMin(node.left, dim);
                        }
                        return node;
                    }
                    own = node.obj[dimension];
                    left = findMin(node.left, dim);
                    right = findMin(node.right, dim);
                    min = node;
                    if (left !== null && left.obj[dimension] < own) {
                        min = left;
                    }
                    if (right !== null && right.obj[dimension] < min.obj[dimension]) {
                        min = right;
                    }
                    return min;
                }
                if (node.left === null && node.right === null) {
                    if (node.parent === null) {
                        self.root = null;
                        return;
                    }
                    pDimension = dimensions[node.parent.dimension];
                    if (node.obj[pDimension] < node.parent.obj[pDimension]) {
                        node.parent.left = null;
                    } else {
                        node.parent.right = null;
                    }
                    return;
                }
                if (node.right !== null) {
                    nextNode = findMin(node.right, node.dimension);
                    nextObj = nextNode.obj;
                    removeNode(nextNode);
                    node.obj = nextObj;
                } else {
                    nextNode = findMin(node.left, node.dimension);
                    nextObj = nextNode.obj;
                    removeNode(nextNode);
                    node.right = node.left;
                    node.left = null;
                    node.obj = nextObj;
                }
            }
            node = nodeSearch(self.root);
            if (node === null) {
                return;
            }
            removeNode(node);
        };
        this.nearest = function(point, maxNodes, maxDistance) {
            var i, result, bestNodes;
            bestNodes = new BinaryHeap(function(e) {
                return -e[1];
            });
            function nearestSearch(node) {
                var bestChild, dimension = dimensions[node.dimension], ownDistance = metric(point, node.obj), linearPoint = {}, linearDistance, otherChild, i;
                function saveNode(node, distance) {
                    bestNodes.push([ node, distance ]);
                    if (bestNodes.size() > maxNodes) {
                        bestNodes.pop();
                    }
                }
                for (i = 0; i < dimensions.length; i += 1) {
                    if (i === node.dimension) {
                        linearPoint[dimensions[i]] = point[dimensions[i]];
                    } else {
                        linearPoint[dimensions[i]] = node.obj[dimensions[i]];
                    }
                }
                linearDistance = metric(linearPoint, node.obj);
                if (node.right === null && node.left === null) {
                    if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
                        saveNode(node, ownDistance);
                    }
                    return;
                }
                if (node.right === null) {
                    bestChild = node.left;
                } else if (node.left === null) {
                    bestChild = node.right;
                } else {
                    if (point[dimension] < node.obj[dimension]) {
                        bestChild = node.left;
                    } else {
                        bestChild = node.right;
                    }
                }
                nearestSearch(bestChild);
                if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
                    saveNode(node, ownDistance);
                }
                if (bestNodes.size() < maxNodes || Math.abs(linearDistance) < bestNodes.peek()[1]) {
                    if (bestChild === node.left) {
                        otherChild = node.right;
                    } else {
                        otherChild = node.left;
                    }
                    if (otherChild !== null) {
                        nearestSearch(otherChild);
                    }
                }
            }
            if (maxDistance) {
                for (i = 0; i < maxNodes; i += 1) {
                    bestNodes.push([ null, maxDistance ]);
                }
            }
            if (self.root) nearestSearch(self.root);
            result = [];
            for (i = 0; i < Math.min(maxNodes, bestNodes.content.length); i += 1) {
                if (bestNodes.content[i][0]) {
                    result.push([ bestNodes.content[i][0].obj, bestNodes.content[i][1] ]);
                }
            }
            return result;
        };
        this.balanceFactor = function() {
            function height(node) {
                if (node === null) {
                    return 0;
                }
                return Math.max(height(node.left), height(node.right)) + 1;
            }
            function count(node) {
                if (node === null) {
                    return 0;
                }
                return count(node.left) + count(node.right) + 1;
            }
            return height(self.root) / (Math.log(count(self.root)) / Math.log(2));
        };
    }
    function BinaryHeap(scoreFunction) {
        this.content = [];
        this.scoreFunction = scoreFunction;
    }
    BinaryHeap.prototype = {
        push: function(element) {
            this.content.push(element);
            this.bubbleUp(this.content.length - 1);
        },
        pop: function() {
            var result = this.content[0];
            var end = this.content.pop();
            if (this.content.length > 0) {
                this.content[0] = end;
                this.sinkDown(0);
            }
            return result;
        },
        peek: function() {
            return this.content[0];
        },
        remove: function(node) {
            var len = this.content.length;
            for (var i = 0; i < len; i++) {
                if (this.content[i] == node) {
                    var end = this.content.pop();
                    if (i != len - 1) {
                        this.content[i] = end;
                        if (this.scoreFunction(end) < this.scoreFunction(node)) this.bubbleUp(i); else this.sinkDown(i);
                    }
                    return;
                }
            }
            throw new Error("Node not found.");
        },
        size: function() {
            return this.content.length;
        },
        bubbleUp: function(n) {
            var element = this.content[n];
            while (n > 0) {
                var parentN = Math.floor((n + 1) / 2) - 1, parent = this.content[parentN];
                if (this.scoreFunction(element) < this.scoreFunction(parent)) {
                    this.content[parentN] = element;
                    this.content[n] = parent;
                    n = parentN;
                } else {
                    break;
                }
            }
        },
        sinkDown: function(n) {
            var length = this.content.length, element = this.content[n], elemScore = this.scoreFunction(element);
            while (true) {
                var child2N = (n + 1) * 2, child1N = child2N - 1;
                var swap = null;
                if (child1N < length) {
                    var child1 = this.content[child1N], child1Score = this.scoreFunction(child1);
                    if (child1Score < elemScore) swap = child1N;
                }
                if (child2N < length) {
                    var child2 = this.content[child2N], child2Score = this.scoreFunction(child2);
                    if (child2Score < (swap == null ? elemScore : child1Score)) {
                        swap = child2N;
                    }
                }
                if (swap != null) {
                    this.content[n] = this.content[swap];
                    this.content[swap] = element;
                    n = swap;
                } else {
                    break;
                }
            }
        }
    };
    exports.kdTree = kdTree;
    exports.BinaryHeap = BinaryHeap;
});

(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory();
        module.exports.default = module.exports;
    } else {
        root.smokemachine = root.SmokeMachine = factory();
    }
})(typeof self !== "undefined" ? self : this, function() {
    var opacities = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 5, 5, 7, 4, 4, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 17, 27, 41, 52, 56, 34, 23, 15, 11, 4, 9, 5, 1, 0, 0, 0, 0, 0, 0, 1, 45, 63, 57, 45, 78, 66, 52, 41, 34, 37, 23, 20, 0, 1, 0, 0, 0, 0, 1, 43, 62, 66, 64, 67, 115, 112, 114, 56, 58, 47, 33, 18, 12, 10, 0, 0, 0, 0, 39, 50, 63, 76, 87, 107, 105, 112, 128, 104, 69, 64, 29, 18, 21, 15, 0, 0, 0, 7, 42, 52, 85, 91, 103, 126, 153, 128, 124, 82, 57, 52, 52, 24, 1, 0, 0, 0, 2, 17, 41, 67, 84, 100, 122, 136, 159, 127, 78, 69, 60, 50, 47, 25, 7, 1, 0, 0, 0, 34, 33, 66, 82, 113, 138, 149, 168, 175, 82, 142, 133, 70, 62, 41, 25, 6, 0, 0, 0, 18, 39, 55, 113, 111, 137, 141, 139, 141, 128, 102, 130, 90, 96, 65, 37, 0, 0, 0, 2, 15, 27, 71, 104, 129, 129, 158, 140, 154, 146, 150, 131, 92, 100, 67, 26, 3, 0, 0, 0, 0, 46, 73, 104, 124, 145, 135, 122, 107, 120, 122, 101, 98, 96, 35, 38, 7, 2, 0, 0, 0, 50, 58, 91, 124, 127, 139, 118, 121, 177, 156, 88, 90, 88, 28, 43, 3, 0, 0, 0, 0, 30, 62, 68, 91, 83, 117, 89, 139, 139, 99, 105, 77, 32, 1, 1, 0, 0, 0, 0, 0, 16, 21, 8, 45, 101, 125, 118, 87, 110, 86, 64, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 28, 79, 79, 117, 122, 88, 84, 54, 46, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 6, 55, 61, 68, 71, 30, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 23, 25, 20, 12, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 12, 9, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0 ];
    var smokeSpriteSize = 20;
    var polyfillAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    function floatInRange(start, end) {
        return start + Math.random() * (end - start);
    }
    function makeSmokeSprite(color) {
        color = color || [ 24, 46.8, 48.2 ];
        var smokeSprite = document.createElement("canvas"), ctx = smokeSprite.getContext("2d"), data = ctx.createImageData(smokeSpriteSize, smokeSpriteSize), d = data.data;
        for (var i = 0; i < d.length; i += 4) {
            d[i] = color[0];
            d[i + 1] = color[1];
            d[i + 2] = color[2];
            d[i + 3] = opacities[i / 4];
        }
        smokeSprite.width = smokeSpriteSize;
        smokeSprite.height = smokeSpriteSize;
        ctx.putImageData(data, 0, 0);
        return smokeSprite;
    }
    function createParticle(x, y, options) {
        options = options || {};
        var lifetime = options.lifetime || 4e3;
        var particle = {
            x: x,
            y: y,
            vx: floatInRange(options.minVx || -4 / 100, options.maxVx || 4 / 100),
            startvy: floatInRange(options.minVy || -4 / 10, options.maxVy || -1 / 10),
            scale: floatInRange(options.minScale || 0, options.maxScale || .5),
            lifetime: floatInRange(options.minLifetime || 2e3, options.maxLifetime || 8e3),
            age: 0
        };
        particle.finalScale = floatInRange(options.minScale || 25 + particle.scale, options.maxScale || 30 + particle.scale);
        particle.vy = particle.startvy;
        return particle;
    }
    function updateParticle(particle, deltatime) {
        particle.x += particle.vx * deltatime;
        particle.y += particle.vy * deltatime;
        var frac = Math.sqrt(particle.age / particle.lifetime);
        particle.vy = (1 - frac) * particle.startvy;
        particle.age += deltatime;
        particle.scale = frac * particle.finalScale;
    }
    function drawParticle(particle, smokeParticleImage, context) {
        context.globalAlpha = (1 - Math.abs(1 - 2 * particle.age / particle.lifetime)) / 8;
        var off = particle.scale * smokeSpriteSize / 2;
        var xmin = particle.x - off;
        var xmax = xmin + off * 2;
        var ymin = particle.y - off;
        var ymax = ymin + off * 2;
        context.drawImage(smokeParticleImage, xmin, ymin, xmax - xmin, ymax - ymin);
    }
    return function SmokeMachine(context, color) {
        var smokeParticleImage = makeSmokeSprite(color), particles = [], preDrawCallback = function() {};
        function updateAndDrawParticles(deltatime) {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            particles.forEach(function(p) {
                updateParticle(p, deltatime);
            });
            particles = particles.filter(function(p) {
                return p.age < p.lifetime;
            });
            preDrawCallback(deltatime, particles);
            particles.forEach(function(p) {
                drawParticle(p, smokeParticleImage, context);
            });
        }
        var running = false, lastframe = performance.now();
        function frame(time) {
            if (!running) return;
            var dt = time - lastframe;
            lastframe = time;
            updateAndDrawParticles(dt);
            polyfillAnimFrame(frame);
        }
        function addParticles(x, y, numParticles, options) {
            numParticles = numParticles || 10;
            if (numParticles < 1) return Math.random() <= numParticles && particles.push(createParticle(x, y, options));
            for (var i = 0; i < numParticles; i++) particles.push(createParticle(x, y, options));
        }
        return {
            step: function step(dt) {
                dt = dt || 16;
                updateAndDrawParticles(dt);
            },
            start: function start() {
                running = true;
                lastframe = performance.now();
                polyfillAnimFrame(frame);
            },
            setPreDrawCallback: function(f) {
                preDrawCallback = f;
            },
            stop: function stop() {
                running = false;
            },
            addsmoke: addParticles,
            addSmoke: addParticles
        };
    };
});

(function() {
    var AbstractInterpolator, CubicInterpolator, Enum, LinearInterpolator, NearestInterpolator, PI, SincFilterInterpolator, Smooth, clipClamp, clipMirror, clipPeriodic, defaultConfig, getColumn, getType, isValidNumber, k, makeLanczosWindow, makeScaledFunction, makeSincKernel, normalizeScaleTo, shallowCopy, sin, sinc, v, validateNumber, validateVector, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
        for (var key in parent) {
            if (__hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    };
    Enum = {
        METHOD_NEAREST: "nearest",
        METHOD_LINEAR: "linear",
        METHOD_CUBIC: "cubic",
        METHOD_LANCZOS: "lanczos",
        METHOD_SINC: "sinc",
        CLIP_CLAMP: "clamp",
        CLIP_ZERO: "zero",
        CLIP_PERIODIC: "periodic",
        CLIP_MIRROR: "mirror",
        CUBIC_TENSION_DEFAULT: 0,
        CUBIC_TENSION_CATMULL_ROM: 0
    };
    defaultConfig = {
        method: Enum.METHOD_CUBIC,
        cubicTension: Enum.CUBIC_TENSION_DEFAULT,
        clip: Enum.CLIP_CLAMP,
        scaleTo: 0,
        sincFilterSize: 2,
        sincWindow: void 0
    };
    clipClamp = function(i, n) {
        return Math.max(0, Math.min(i, n - 1));
    };
    clipPeriodic = function(i, n) {
        i = i % n;
        if (i < 0) i += n;
        return i;
    };
    clipMirror = function(i, n) {
        var period;
        period = 2 * (n - 1);
        i = clipPeriodic(i, period);
        if (i > n - 1) i = period - i;
        return i;
    };
    AbstractInterpolator = function() {
        function AbstractInterpolator(array, config) {
            this.array = array.slice(0);
            this.length = this.array.length;
            if (!(this.clipHelper = {
                clamp: this.clipHelperClamp,
                zero: this.clipHelperZero,
                periodic: this.clipHelperPeriodic,
                mirror: this.clipHelperMirror
            }[config.clip])) {
                throw "Invalid clip: " + config.clip;
            }
        }
        AbstractInterpolator.prototype.getClippedInput = function(i) {
            if (0 <= i && i < this.length) {
                return this.array[i];
            } else {
                return this.clipHelper(i);
            }
        };
        AbstractInterpolator.prototype.clipHelperClamp = function(i) {
            return this.array[clipClamp(i, this.length)];
        };
        AbstractInterpolator.prototype.clipHelperZero = function(i) {
            return 0;
        };
        AbstractInterpolator.prototype.clipHelperPeriodic = function(i) {
            return this.array[clipPeriodic(i, this.length)];
        };
        AbstractInterpolator.prototype.clipHelperMirror = function(i) {
            return this.array[clipMirror(i, this.length)];
        };
        AbstractInterpolator.prototype.interpolate = function(t) {
            throw "Subclasses of AbstractInterpolator must override the interpolate() method.";
        };
        return AbstractInterpolator;
    }();
    NearestInterpolator = function(_super) {
        __extends(NearestInterpolator, _super);
        function NearestInterpolator() {
            NearestInterpolator.__super__.constructor.apply(this, arguments);
        }
        NearestInterpolator.prototype.interpolate = function(t) {
            return this.getClippedInput(Math.round(t));
        };
        return NearestInterpolator;
    }(AbstractInterpolator);
    LinearInterpolator = function(_super) {
        __extends(LinearInterpolator, _super);
        function LinearInterpolator() {
            LinearInterpolator.__super__.constructor.apply(this, arguments);
        }
        LinearInterpolator.prototype.interpolate = function(t) {
            var k;
            k = Math.floor(t);
            t -= k;
            return (1 - t) * this.getClippedInput(k) + t * this.getClippedInput(k + 1);
        };
        return LinearInterpolator;
    }(AbstractInterpolator);
    CubicInterpolator = function(_super) {
        __extends(CubicInterpolator, _super);
        function CubicInterpolator(array, config) {
            this.tangentFactor = 1 - Math.max(0, Math.min(1, config.cubicTension));
            CubicInterpolator.__super__.constructor.apply(this, arguments);
        }
        CubicInterpolator.prototype.getTangent = function(k) {
            return this.tangentFactor * (this.getClippedInput(k + 1) - this.getClippedInput(k - 1)) / 2;
        };
        CubicInterpolator.prototype.interpolate = function(t) {
            var k, m, p, t2, t3;
            k = Math.floor(t);
            m = [ this.getTangent(k), this.getTangent(k + 1) ];
            p = [ this.getClippedInput(k), this.getClippedInput(k + 1) ];
            t -= k;
            t2 = t * t;
            t3 = t * t2;
            return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + t) * m[0] + (-2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1];
        };
        return CubicInterpolator;
    }(AbstractInterpolator);
    sin = Math.sin, PI = Math.PI;
    sinc = function(x) {
        if (x === 0) {
            return 1;
        } else {
            return sin(PI * x) / (PI * x);
        }
    };
    makeLanczosWindow = function(a) {
        return function(x) {
            return sinc(x / a);
        };
    };
    makeSincKernel = function(window) {
        return function(x) {
            return sinc(x) * window(x);
        };
    };
    SincFilterInterpolator = function(_super) {
        __extends(SincFilterInterpolator, _super);
        function SincFilterInterpolator(array, config) {
            SincFilterInterpolator.__super__.constructor.apply(this, arguments);
            this.a = config.sincFilterSize;
            if (!config.sincWindow) throw "No sincWindow provided";
            this.kernel = makeSincKernel(config.sincWindow);
        }
        SincFilterInterpolator.prototype.interpolate = function(t) {
            var k, n, sum, _ref, _ref2;
            k = Math.floor(t);
            sum = 0;
            for (n = _ref = k - this.a + 1, _ref2 = k + this.a; _ref <= _ref2 ? n <= _ref2 : n >= _ref2; _ref <= _ref2 ? n++ : n--) {
                sum += this.kernel(t - n) * this.getClippedInput(n);
            }
            return sum;
        };
        return SincFilterInterpolator;
    }(AbstractInterpolator);
    getColumn = function(arr, i) {
        var row, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = arr.length; _i < _len; _i++) {
            row = arr[_i];
            _results.push(row[i]);
        }
        return _results;
    };
    makeScaledFunction = function(f, baseScale, scaleRange) {
        var scaleFactor, translation;
        if (scaleRange.join === "0,1") {
            return f;
        } else {
            scaleFactor = baseScale / (scaleRange[1] - scaleRange[0]);
            translation = scaleRange[0];
            return function(t) {
                return f(scaleFactor * (t - translation));
            };
        }
    };
    getType = function(x) {
        return Object.prototype.toString.call(x).slice("[object ".length, -1);
    };
    validateNumber = function(n) {
        if (isNaN(n)) throw "NaN in Smooth() input";
        if (getType(n) !== "Number") throw "Non-number in Smooth() input";
        if (!isFinite(n)) throw "Infinity in Smooth() input";
    };
    validateVector = function(v, dimension) {
        var n, _i, _len;
        if (getType(v) !== "Array") throw "Non-vector in Smooth() input";
        if (v.length !== dimension) throw "Inconsistent dimension in Smooth() input";
        for (_i = 0, _len = v.length; _i < _len; _i++) {
            n = v[_i];
            validateNumber(n);
        }
    };
    isValidNumber = function(n) {
        return getType(n) === "Number" && isFinite(n) && !isNaN(n);
    };
    normalizeScaleTo = function(s) {
        var invalidErr;
        invalidErr = "scaleTo param must be number or array of two numbers";
        switch (getType(s)) {
          case "Number":
            if (!isValidNumber(s)) throw invalidErr;
            s = [ 0, s ];
            break;

          case "Array":
            if (s.length !== 2) throw invalidErr;
            if (!(isValidNumber(s[0]) && isValidNumber(s[1]))) throw invalidErr;
            break;

          default:
            throw invalidErr;
        }
        return s;
    };
    shallowCopy = function(obj) {
        var copy, k, v;
        copy = {};
        for (k in obj) {
            if (!__hasProp.call(obj, k)) continue;
            v = obj[k];
            copy[k] = v;
        }
        return copy;
    };
    Smooth = function(arr, config) {
        var baseDomainEnd, dimension, i, interpolator, interpolatorClass, interpolators, k, n, properties, smoothFunc, v;
        if (config == null) config = {};
        properties = {};
        config = shallowCopy(config);
        properties.config = shallowCopy(config);
        if (config.scaleTo == null) config.scaleTo = config.period;
        if (config.sincFilterSize == null) {
            config.sincFilterSize = config.lanczosFilterSize;
        }
        for (k in defaultConfig) {
            if (!__hasProp.call(defaultConfig, k)) continue;
            v = defaultConfig[k];
            if (config[k] == null) config[k] = v;
        }
        if (!(interpolatorClass = {
            nearest: NearestInterpolator,
            linear: LinearInterpolator,
            cubic: CubicInterpolator,
            lanczos: SincFilterInterpolator,
            sinc: SincFilterInterpolator
        }[config.method])) {
            throw "Invalid method: " + config.method;
        }
        if (config.method === "lanczos") {
            config.sincWindow = makeLanczosWindow(config.sincFilterSize);
        }
        if (arr.length < 2) throw "Array must have at least two elements";
        properties.count = arr.length;
        smoothFunc = function() {
            var _i, _j, _len, _len2;
            switch (getType(arr[0])) {
              case "Number":
                properties.dimension = "scalar";
                if (Smooth.deepValidation) {
                    for (_i = 0, _len = arr.length; _i < _len; _i++) {
                        n = arr[_i];
                        validateNumber(n);
                    }
                }
                interpolator = new interpolatorClass(arr, config);
                return function(t) {
                    return interpolator.interpolate(t);
                };

              case "Array":
                properties.dimension = dimension = arr[0].length;
                if (!dimension) throw "Vectors must be non-empty";
                if (Smooth.deepValidation) {
                    for (_j = 0, _len2 = arr.length; _j < _len2; _j++) {
                        v = arr[_j];
                        validateVector(v, dimension);
                    }
                }
                interpolators = function() {
                    var _results;
                    _results = [];
                    for (i = 0; 0 <= dimension ? i < dimension : i > dimension; 0 <= dimension ? i++ : i--) {
                        _results.push(new interpolatorClass(getColumn(arr, i), config));
                    }
                    return _results;
                }();
                return function(t) {
                    var interpolator, _k, _len3, _results;
                    _results = [];
                    for (_k = 0, _len3 = interpolators.length; _k < _len3; _k++) {
                        interpolator = interpolators[_k];
                        _results.push(interpolator.interpolate(t));
                    }
                    return _results;
                };

              default:
                throw "Invalid element type: " + getType(arr[0]);
            }
        }();
        if (config.clip === "periodic") {
            baseDomainEnd = arr.length;
        } else {
            baseDomainEnd = arr.length - 1;
        }
        config.scaleTo || (config.scaleTo = baseDomainEnd);
        properties.domain = normalizeScaleTo(config.scaleTo);
        smoothFunc = makeScaledFunction(smoothFunc, baseDomainEnd, properties.domain);
        properties.domain.sort();
        for (k in properties) {
            if (!__hasProp.call(properties, k)) continue;
            v = properties[k];
            smoothFunc[k] = v;
        }
        return smoothFunc;
    };
    for (k in Enum) {
        if (!__hasProp.call(Enum, k)) continue;
        v = Enum[k];
        Smooth[k] = v;
    }
    Smooth.deepValidation = true;
    (typeof exports !== "undefined" && exports !== null ? exports : window).Smooth = Smooth;
}).call(this);

function trimCanvas(c) {
    if (c.width == 0 || c.height == 0) return c;
    var ctx = c.getContext("2d"), copy = document.createElement("canvas").getContext("2d"), pixels = ctx.getImageData(0, 0, c.width, c.height), l = pixels.data.length, i, bound = {
        top: null,
        left: null,
        right: null,
        bottom: null
    }, x, y;
    for (i = 0; i < l; i += 4) {
        if (pixels.data[i + 3] !== 0) {
            x = i / 4 % c.width;
            y = ~~(i / 4 / c.width);
            if (bound.top === null) {
                bound.top = y;
            }
            if (bound.left === null) {
                bound.left = x;
            } else if (x < bound.left) {
                bound.left = x;
            }
            if (bound.right === null) {
                bound.right = x;
            } else if (bound.right < x) {
                bound.right = x;
            }
            if (bound.bottom === null) {
                bound.bottom = y;
            } else if (bound.bottom < y) {
                bound.bottom = y;
            }
        }
    }
    var trimHeight = bound.bottom - bound.top, trimWidth = bound.right - bound.left;
    if (bound.left && bound.top && trimWidth && trimHeight) {
        trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);
        copy.canvas.width = trimWidth;
        copy.canvas.height = trimHeight;
        copy.putImageData(trimmed, 0, 0);
    } else {
        trimmed = ctx.getImageData(0, 0, c.width, c.height);
        copy.canvas.width = c.width;
        copy.canvas.height = c.height;
        copy.putImageData(trimmed, 0, 0);
    }
    return copy.canvas;
}

function trimCanvas2(canvas) {
    if (canvas.width == 0 || canvas.height == 0) return canvas;
    const context = canvas.getContext("2d");
    const topLeft = {
        x: canvas.width,
        y: canvas.height,
        update(x, y) {
            this.x = Math.min(this.x, x);
            this.y = Math.min(this.y, y);
        }
    };
    const bottomRight = {
        x: 0,
        y: 0,
        update(x, y) {
            this.x = Math.max(this.x, x);
            this.y = Math.max(this.y, y);
        }
    };
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            const alpha = imageData.data[y * (canvas.width * 4) + x * 4 + 3];
            if (alpha !== 0) {
                topLeft.update(x, y);
                bottomRight.update(x, y);
            }
        }
    }
    const width = bottomRight.x - topLeft.x + 1 > canvas.width ? canvas.width : bottomRight.x - topLeft.x + 1;
    const height = bottomRight.y - topLeft.y + 1 > canvas.height ? canvas.height : bottomRight.y - topLeft.y + 1;
    const croppedCanvas = context.getImageData(topLeft.x, topLeft.y, width, height);
    canvas.width = width;
    canvas.height = height;
    context.putImageData(croppedCanvas, 0, 0);
    return canvas;
}

var trimCanvas3 = function() {
    function rowBlank(imageData, width, y) {
        for (var x = 0; x < width; ++x) {
            if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false;
        }
        return true;
    }
    function columnBlank(imageData, width, x, top, bottom) {
        for (var y = top; y < bottom; ++y) {
            if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false;
        }
        return true;
    }
    return function(canvas) {
        if (canvas.width == 0 || canvas.height == 0) return canvas;
        var ctx = canvas.getContext("2d");
        var width = canvas.width;
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var top = 0, bottom = imageData.height, left = 0, right = imageData.width;
        while (top < bottom && rowBlank(imageData, width, top)) ++top;
        while (bottom - 1 > top && rowBlank(imageData, width, bottom - 1)) --bottom;
        while (left < right && columnBlank(imageData, width, left, top, bottom)) ++left;
        while (right - 1 > left && columnBlank(imageData, width, right - 1, top, bottom)) --right;
        var trimmed = ctx.getImageData(left, top, right - left, bottom - top);
        var copy = canvas.ownerDocument.createElement("canvas");
        var copyCtx = copy.getContext("2d");
        copy.width = trimmed.width;
        copy.height = trimmed.height;
        copyCtx.putImageData(trimmed, 0, 0);
        return copy;
    };
}();

var trimAndFlattenCanvas = function() {
    function rowBlank(imageData, width, y) {
        for (var x = 0; x < width; ++x) {
            if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false;
        }
        return true;
    }
    function columnBlank(imageData, width, x, top, bottom) {
        for (var y = top; y < bottom; ++y) {
            if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false;
        }
        return true;
    }
    return function(canvas) {
        if (canvas.width == 0 || canvas.height == 0) return canvas;
        var ctx = canvas.getContext("2d");
        var width = canvas.width;
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var top = 0, bottom = imageData.height, left = 0, right = imageData.width;
        while (top < bottom && rowBlank(imageData, width, top)) ++top;
        while (bottom - 1 > top && rowBlank(imageData, width, bottom - 1)) --bottom;
        while (left < right && columnBlank(imageData, width, left, top, bottom)) ++left;
        while (right - 1 > left && columnBlank(imageData, width, right - 1, top, bottom)) --right;
        var trimmed = ctx.getImageData(left, top, right - left, bottom - top);
        var copy = canvas.ownerDocument.createElement("canvas");
        var copyCtx = copy.getContext("2d");
        copy.width = trimmed.width;
        copy.height = trimmed.height;
        flattenImage(trimmed);
        copyCtx.putImageData(trimmed, 0, 0);
        return copy;
    };
}();

function distanceBetween(ev1, ev2) {
    var deltaxsq = (ev2._x - ev1._x) * (ev2._x - ev1._x);
    var deltaysq = (ev2._y - ev1._y) * (ev2._y - ev1._y);
    return Math.sqrt(deltaxsq + deltaysq);
}

function angleBetween(ev1, ev2) {
    var y = ev2._y - ev1._y;
    var x = ev2._x - ev1._x;
    var angle = Math.atan(y / (x == 0 ? .001 : x)) + (x < 0 ? Math.PI : 0);
    return angle;
}

function angleBetweenRad(ev1, ev2) {
    return Math.atan2(ev2._x - ev1._x, ev2._y - ev1._y);
}

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0;
    } else {
        var d = max - min;
        s = l > .5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;

          case g:
            h = (b - r) / d + 2;
            break;

          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
    }
    return {
        h: h,
        s: s,
        l: l
    };
}

function hslToRgb(h, s, l) {
    var r, g, b;
    if (s == 0) {
        r = g = b = l;
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }
        var q = l < .5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function hueShift(canvas, context, shift) {
    if (shift === 0) return;
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var rawData = imageData.data;
    for (var i = 0; i < rawData.length; i += 4) {
        var red = rawData[i + 0];
        var green = rawData[i + 1];
        var blue = rawData[i + 2];
        var alpha = rawData[i + 3];
        if (red === 0 && green === 0 && blue === 0 && alpha === 0) continue;
        var hsl = rgbToHsl(red, green, blue);
        var shiftedRgb = hslToRgb(hsl.h + shift, hsl.s, hsl.l);
        rawData[i + 0] = shiftedRgb.r;
        rawData[i + 1] = shiftedRgb.g;
        rawData[i + 2] = shiftedRgb.b;
        rawData[i + 3] = alpha;
    }
    context.putImageData(imageData, 0, 0);
}

function ziggurat() {
    return (Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() - 3) / 3;
}

function boxmuller() {
    const r = Math.sqrt(-2 * Math.log(Math.random()));
    const theta = 2 * Math.PI * Math.random();
    return [ r * Math.cos(theta), y = r * Math.sin(theta) ];
}

function randn_bm(min, max, skew) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    num = num / 10 + .5;
    if (num > 1 || num < 0) {
        num = randn_bm(min, max, skew);
    } else {
        num = Math.pow(num, skew);
        num *= max - min;
        num += min;
    }
    return num;
}

function extractSprite(img, size, col, row, offset) {
    var canvasIcon = document.createElement("canvas");
    canvasIcon.width = size;
    canvasIcon.height = size;
    var contextIcon = canvasIcon.getContext("2d");
    contextIcon.imageSmoothingEnabled = false;
    sourceX = offset + col * size;
    sourceY = offset + row * size;
    contextIcon.drawImage(img, sourceX, sourceY, size, size, 0, 0, size, size);
    return canvasIcon;
}

function makeIcon(texture) {
    var canvasIcon = document.createElement("canvas");
    canvasIcon.width = 50;
    canvasIcon.height = 50;
    var contextIcon = canvasIcon.getContext("2d");
    contextIcon.beginPath();
    contextIcon.lineWidth = 1;
    contextIcon.strokeRect(10, 10, 30, 30);
    contextIcon.fillStyle = texture();
    contextIcon.fillRect(10, 10, 30, 30);
    contextIcon.closePath();
    return canvasIcon.toDataURL();
}

function makeCircleIcon(texture) {
    var canvasIcon = document.createElement("canvas");
    canvasIcon.width = 50;
    canvasIcon.height = 50;
    var contextIcon = canvasIcon.getContext("2d");
    contextIcon.beginPath();
    contextIcon.lineWidth = 1;
    contextIcon.fillStyle = texture();
    contextIcon.arc(25, 25, 15, 0, 2 * Math.PI);
    contextIcon.fill();
    contextIcon.stroke();
    contextIcon.closePath();
    return canvasIcon.toDataURL();
}

function guil(R, r, m, theta, p, Q, m, n) {
    var x = (R + r) * Math.cos(m * theta) + (r + p) * Math.cos((R + r) / r * m * theta) + Q * Math.cos(n * theta);
    var y = (R + r) * Math.sin(m * theta) - (r + p) * Math.sin((R + r) / r * m * theta) + Q * Math.sin(n * theta);
    return {
        x: x,
        y: y
    };
}

function scaleImageData(imageData, scale) {
    return scaleImageDataCanvasAPIPixelatedAlt(imageData, scale);
}

function scaleImageDataCanvasAPI(imageData, scale) {
    var canvas = document.createElement("canvas");
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    canvas.getContext("2d").drawImage(imageData, 0, 0);
    var scaleCanvas = document.createElement("canvas");
    scaleCanvas.width = imageData.width * scale;
    scaleCanvas.height = imageData.height * scale;
    var scaleCtx = scaleCanvas.getContext("2d");
    scaleCtx.scale(scale, scale);
    scaleCtx.drawImage(canvas, 0, 0);
    return scaleCanvas;
}

function scaleImageDataCanvasAPIPixelatedAlt(imageData, scale) {
    var canvas = document.createElement("canvas");
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    canvas.getContext("2d").imageSmoothingEnabled = false;
    canvas.getContext("2d").putImageData(imageData, 0, 0);
    var scaleCanvas = document.createElement("canvas");
    scaleCanvas.width = imageData.width * scale;
    scaleCanvas.height = imageData.height * scale;
    var scaleCtx = scaleCanvas.getContext("2d");
    scaleCtx.imageSmoothingEnabled = false;
    scaleCtx.scale(scale, scale);
    scaleCtx.drawImage(canvas, 0, 0);
    return scaleCtx.getImageData(0, 0, scaleCanvas.width, scaleCanvas.height);
}

function scaleImageDataCanvasAPIPixelated(imageData, scale) {
    var canvas = document.createElement("canvas");
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    canvas.getContext("2d").imageSmoothingEnabled = false;
    canvas.getContext("2d").drawImage(imageData, 0, 0);
    var scaleCanvas = document.createElement("canvas");
    scaleCanvas.width = imageData.width * scale;
    scaleCanvas.height = imageData.height * scale;
    var scaleCtx = scaleCanvas.getContext("2d");
    scaleCtx.imageSmoothingEnabled = false;
    scaleCtx.scale(scale, scale);
    scaleCtx.drawImage(canvas, 0, 0);
    return scaleCanvas;
}

function pixelateCanvas(imageData, block) {
    var size = block / 100;
    var w = imageData.width * size;
    var h = imageData.height * size;
    var canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(imageData, 0, 0, w, h);
    var canvas2 = document.createElement("canvas");
    canvas2.width = imageData.width;
    canvas2.height = imageData.height;
    var ctx2 = canvas2.getContext("2d");
    ctx2.imageSmoothingEnabled = false;
    ctx2.drawImage(canvas, 0, 0, w, h, 0, 0, canvas2.width, canvas2.height);
    return canvas2;
}

function scaleImageDataPixelwise(imageData, scale) {
    var scaled = KiddoPaint.Display.main_context.createImageData(imageData.width * scale, imageData.height * scale);
    for (var row = 0; row < imageData.height; row++) {
        for (var col = 0; col < imageData.width; col++) {
            var sourcePixel = imageData.data[(row * imageData.width + col) * 4 + 0] == 0 && imageData.data[(row * imageData.width + col) * 4 + 1] == 0 && imageData.data[(row * imageData.width + col) * 4 + 2] == 0 && imageData.data[(row * imageData.width + col) * 4 + 3] == 0 ? [ 255, 255, 255, 255 ] : [ imageData.data[(row * imageData.width + col) * 4 + 0], imageData.data[(row * imageData.width + col) * 4 + 1], imageData.data[(row * imageData.width + col) * 4 + 2], imageData.data[(row * imageData.width + col) * 4 + 3] ];
            for (var y = 0; y < scale; y++) {
                var destRow = row * scale + y;
                for (var x = 0; x < scale; x++) {
                    var destCol = col * scale + x;
                    for (var i = 0; i < 4; i++) {
                        if (sourcePixel[i] == 0) {
                            scaled.data[(destRow * scaled.width + destCol) * 4 + i] = [ 255, 255, 255, 255 ];
                        } else {
                            scaled.data[(destRow * scaled.width + destCol) * 4 + i] = sourcePixel[i];
                        }
                    }
                }
            }
        }
    }
    return scaled;
}

function greyscaleImageData(imageData) {
    var grey = KiddoPaint.Display.main_context.createImageData(imageData.width, imageData.height);
    var imageDataLength = imageData.data.length;
    for (var pixel = 0; pixel <= imageDataLength; pixel += 4) {
        if (imageData.data[pixel] == 0 && imageData.data[pixel + 1] == 0 && imageData.data[pixel + 2] == 0 && imageData.data[pixel + 3] == 0) continue;
        var hsl = rgbToHsl(imageData.data[pixel], imageData.data[pixel + 1], imageData.data[pixel + 2]);
        var desat = hslToRgb(hsl.h, 0, hsl.l);
        grey.data[pixel + 0] = desat.r;
        grey.data[pixel + 1] = desat.g;
        grey.data[pixel + 2] = desat.b;
        grey.data[pixel + 3] = imageData.data[pixel + 3];
    }
    return grey;
}

function ditherImageData(imageData) {
    var threshold = 128;
    var bayerThresholdMap = [ [ 15, 135, 45, 165 ], [ 195, 75, 225, 105 ], [ 60, 180, 30, 150 ], [ 240, 120, 210, 90 ] ];
    var lumR = [], lumG = [], lumB = [];
    for (var i = 0; i < 256; i++) {
        lumR[i] = i * .299;
        lumG[i] = i * .587;
        lumB[i] = i * .114;
    }
    var dithered = KiddoPaint.Display.main_context.createImageData(imageData.width, imageData.height);
    var imageDataLength = imageData.data.length;
    for (var i = 0; i <= imageDataLength; i += 4) {
        dithered.data[i] = Math.floor(lumR[imageData.data[i]] + lumG[imageData.data[i + 1]] + lumB[imageData.data[i + 2]]);
    }
    for (var pixel = 0; pixel <= imageDataLength; pixel += 4) {
        if (imageData.data[pixel] == 0 && imageData.data[pixel + 1] == 0 && imageData.data[pixel + 2] == 0 && imageData.data[pixel + 3] == 0) continue;
        var x = pixel / 4 % imageData.width;
        var y = Math.floor(pixel / 4 / imageData.width);
        var map = Math.floor((imageData.data[pixel] + bayerThresholdMap[x % 4][y % 4]) / 2);
        dithered.data[pixel] = dithered.data[pixel + 1] = dithered.data[pixel + 2] = map < threshold ? 0 : 255;
        dithered.data[pixel + 3] = 255;
    }
    return dithered;
}

function srng(seed) {
    seed = seed || 7;
    var constant = Math.pow(2, 11) + 1;
    var prime = 4241;
    var maximum = 4243;
    return {
        next: function() {
            seed *= constant;
            seed += prime;
            return seed % maximum / maximum;
        }
    };
}

function bresenham(x1, y1, x2, y2, callback) {
    var dx = x2 - x1;
    var sx = 1;
    var dy = y2 - y1;
    var sy = 1;
    var space = 0;
    var spacing = 3;
    if (dx < 0) {
        sx = -1;
        dx = -dx;
    }
    if (dy < 0) {
        sy = -1;
        dy = -dy;
    }
    dx = dx << 1;
    dy = dy << 1;
    if (dy < dx) {
        var fraction = dy - (dx >> 1);
        while (x1 != x2) {
            if (fraction >= 0) {
                y1 += sy;
                fraction -= dx;
            }
            fraction += dy;
            x1 += sx;
            if (space == spacing) {
                callback(x1, y1);
                space = 0;
            } else {
                space += 1;
            }
        }
    } else {
        var fraction = dx - (dy >> 1);
        while (y1 != y2) {
            if (fraction >= 0) {
                x1 += sx;
                fraction -= dy;
            }
            fraction += dx;
            y1 += sy;
            if (space == spacing) {
                callback(x1, y1);
                space = 0;
            } else {
                space += 1;
            }
        }
    }
    callback(x1, y1);
}

function color2json(color) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    var imageData = ctx.getImageData(0, 0, 1, 1);
    return {
        r: imageData.data[0],
        g: imageData.data[1],
        b: imageData.data[2],
        a: imageData.data[3]
    };
}

function colorsEqual(color1, color2) {
    return color1.r === color2.r && color1.g === color2.g && color1.b === color2.b && color1.a === color2.a;
}

function colorNearWhite(color) {
    let basegrey = 221;
    return color.r > basegrey && color.g > basegrey && color.b > basegrey && color.a > 235;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function invlerp(a, b, v) {
    return 1 * (v - a) / (1 * (b - a));
}

function remap(imin, imax, omin, omax, v) {
    return lerp(omin, omax, invlerp(imin, imax, v));
}

function createFeatherGradient(radius, hardness) {
    const innerRadius = Math.min(radius * hardness, radius - 1);
    const gradient = KiddoPaint.Display.context.createRadialGradient(0, 0, innerRadius, 0, 0, radius);
    gradient.addColorStop(0, "rgba(255, 0, 0, 0)");
    gradient.addColorStop(1, "rgba(0, 0, 255, 1)");
    return gradient;
}

function getCubicBezierXYatPercent(startPt, controlPt1, controlPt2, endPt, percent) {
    var x = CubicN(percent, startPt[0], controlPt1[0], controlPt2[0], endPt[0]);
    var y = CubicN(percent, startPt[1], controlPt1[1], controlPt2[1], endPt[1]);
    return {
        _x: x,
        _y: y
    };
}

function CubicN(T, a, b, c, d) {
    var t2 = T * T;
    var t3 = t2 * T;
    return a + (-a * 3 + T * (3 * a - a * T)) * T + (3 * b + T * (-6 * b + b * 3 * T)) * T + (c * 3 - c * 3 * T) * t2 + d * t3;
}

function bezierLength(startPt, controlPt1, controlPt2, endPt) {
    var a = startPt;
    var b = endPt;
    var c1 = controlPt1;
    var c2 = controlPt2;
    var svgBezier = `M${a[0]} ${a[1]} C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${b[0]} ${b[1]}`;
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", svgBezier);
    return path.getTotalLength();
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function flattenImage(imageData) {
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        if (data[i + 3] == 0) {
            data[i] = data[i + 1] = data[i + 2] = data[i + 3] = 255;
        }
    }
    return imageData;
}

function getRandomLetter() {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return possible[Math.floor(Math.random() * possible.length)];
}

function makePatternFromImage(image) {
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = KiddoPaint.Display.canvas.width;
    canvasPattern.height = KiddoPaint.Display.canvas.height;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.fillStyle = "white";
    contextPattern.fillRect(0, 0, canvasPattern.width, canvasPattern.height);
    var xOffset = KiddoPaint.Display.canvas.width / 2 - image.width;
    var yOffset = KiddoPaint.Display.canvas.height / 2 - image.height;
    contextPattern.imageSmoothingEnabled = false;
    contextPattern.drawImage(image, xOffset, yOffset, image.width * 2, image.height * 2);
    return contextPattern.createPattern(canvasPattern, "no-repeat");
}

function getOffset(obj) {
    var offsetLeft = 0;
    var offsetTop = 0;
    do {
        if (!isNaN(obj.offsetLeft)) {
            offsetLeft += obj.offsetLeft;
        }
        if (!isNaN(obj.offsetTop)) {
            offsetTop += obj.offsetTop;
        }
    } while (obj = obj.offsetParent);
    return {
        left: offsetLeft,
        top: offsetTop
    };
}

KiddoPaint.Tools.Toolbox.AnimBrush = function() {
    var tool = this;
    this.isDown = false;
    this.previousEv = null;
    this.currentEv = null;
    this.distanceFromPrev = null;
    this.texture = function() {};
    this.preprocess = function() {};
    this.postprocess = function() {};
    this.step = 0;
    this.animInterval = 30;
    this.timeout = null;
    this.reset = function() {
        tool.isDown = false;
        tool.currentEv = null;
        tool.previousEv = null;
        tool.distanceFromPrev = null;
        tool.texture = function() {};
        tool.preprocess = function() {};
        tool.postprocess = function() {};
        tool.step = 0;
        tool.animInterval = 30;
        if (tool.timeout) {
            clearTimeout(tool.timeout);
            tool.timeout = null;
        }
    };
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.preprocess();
        tool.currentEv = ev;
        let interval = tool.animInterval;
        tool.timeout = setTimeout(function draw() {
            tool.toolDraw();
            if (!tool.timeout) return;
            tool.timeout = setTimeout(draw, interval);
        }, interval);
        tool.toolDraw();
    };
    this.mousemove = function(ev) {
        if (tool.isDown) {
            tool.distanceFromPrev = tool.previousEv ? distanceBetween(tool.previousEv, ev) : Number.MAX_VALUE;
            tool.previousEv = tool.currentEv;
            tool.currentEv = ev;
            tool.toolDraw();
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.postprocess();
            tool.isDown = false;
            if (tool.timeout) {
                clearTimeout(tool.timeout);
                tool.timeout = null;
            }
            tool.currentEv = null;
            tool.previousEv = null;
            tool.distanceFromPrev = null;
            tool.step = 0;
            KiddoPaint.Display.saveMain();
        }
    };
    this.toolDraw = function() {
        if (tool.isDown) {
            let ev = tool.currentEv;
            var brushFill = tool.texture(tool.step, tool.distanceFromPrev);
            let lx = ev._x;
            let ly = ev._y;
            if (brushFill.offset) {
                lx = lx - brushFill.offset;
                ly = ly - brushFill.offset;
            } else if (brushFill.abspos) {
                lx = brushFill.abspos.x;
                ly = brushFill.abspos.y;
            }
            KiddoPaint.Display.context.drawImage(brushFill.brush, lx, ly);
            tool.step += 1;
        }
    };
};

KiddoPaint.Tools.AnimBrush = new KiddoPaint.Tools.Toolbox.AnimBrush();

KiddoPaint.Tools.Toolbox.Astroid = function() {
    var tool = this;
    this.size = 1;
    this.stroke = function() {
        return KiddoPaint.Current.color;
    };
    this.points = [];
    this.drawAstroid = function(pt1, pt2, pt3) {
        var interval = 37 * KiddoPaint.Current.scaling;
        seg1deltax = (pt2.x - pt1.x) / interval;
        seg1deltay = (pt2.y - pt1.y) / interval;
        seg2deltax = (pt3.x - pt2.x) / interval;
        seg2deltay = (pt3.y - pt2.y) / interval;
        for (var i = 0; i <= interval; i++) {
            var a1 = {
                x: pt1.x + seg1deltax * i,
                y: pt1.y + seg1deltay * i
            };
            var a2 = {
                x: pt2.x + seg2deltax * i,
                y: pt2.y + seg2deltay * i
            };
            KiddoPaint.Display.context.beginPath();
            KiddoPaint.Display.context.lineWidth = tool.size;
            KiddoPaint.Display.context.moveTo(Math.round(a1.x), Math.round(a1.y));
            KiddoPaint.Display.context.lineTo(Math.round(a2.x), Math.round(a2.y));
            if (KiddoPaint.Current.modifiedMeta) {
                KiddoPaint.Display.context.strokeStyle = KiddoPaint.Colors.randomColor();
            } else if (KiddoPaint.Current.modifiedCtrl) {
                KiddoPaint.Display.context.strokeStyle = i % 2 ? KiddoPaint.Current.color : KiddoPaint.Current.altColor;
            } else {
                KiddoPaint.Display.context.strokeStyle = KiddoPaint.Current.color;
            }
            KiddoPaint.Display.context.stroke();
            KiddoPaint.Display.context.closePath();
        }
    };
    this.mousedown = function(ev) {
        KiddoPaint.Sounds.xyStart();
        tool.points.push({
            x: ev._x,
            y: ev._y
        });
    };
    this.mousemove = function(ev) {
        KiddoPaint.Display.clearTmp();
        if (tool.points.length == 1) {
            KiddoPaint.Sounds.xyDuring();
            KiddoPaint.Display.context.beginPath();
            KiddoPaint.Display.context.moveTo(Math.round(tool.points[0].x), Math.round(tool.points[0].y));
            KiddoPaint.Display.context.lineTo(ev._x, ev._y);
            KiddoPaint.Display.context.strokeStyle = tool.stroke();
            KiddoPaint.Display.context.lineWidth = tool.size;
            KiddoPaint.Display.context.stroke();
            KiddoPaint.Display.context.closePath();
        } else if (tool.points.length == 2) {
            KiddoPaint.Sounds.xyDuring();
            tool.drawAstroid(tool.points[0], tool.points[1], {
                x: ev._x,
                y: ev._y
            });
        }
    };
    this.mouseup = function(ev) {
        if (tool.points.length == 3) {
            KiddoPaint.Sounds.xyEnd();
            KiddoPaint.Display.clearTmp();
            tool.drawAstroid(tool.points[0], tool.points[1], {
                x: ev._x,
                y: ev._y
            });
            tool.points = [];
            KiddoPaint.Display.saveMain();
        }
    };
};

KiddoPaint.Tools.Astroid = new KiddoPaint.Tools.Toolbox.Astroid();

KiddoPaint.Tools.Toolbox.BezFollow = function() {
    var tool = this;
    this.isDown = false;
    this.previousEv = null;
    this.spacing = 25;
    this.synthtool = {};
    this.ylimit = {
        min: 5e3,
        max: -1
    };
    this.points = [];
    this.size = function() {
        return KiddoPaint.Tools.Pencil.size;
    };
    this.texture = function() {
        return KiddoPaint.Tools.Pencil.texture();
    };
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.points = [];
        tool.mousemove(ev);
        tool.previousEv = ev;
    };
    this.mousemove = function(ev) {
        if (tool.isDown) {
            if (ev._y < tool.ylimit.min) {
                tool.ylimit.min = ev._y;
            }
            if (ev._y > tool.ylimit.max) {
                tool.ylimit.max = ev._y;
            }
            if (tool.previousEv == null || distanceBetween(tool.previousEv, ev) > tool.spacing) {
                tool.points.push([ ev._x, ev._y ]);
                tool.previousEv = ev;
            }
            tool.points.forEach(pt => {
                KiddoPaint.Display.previewContext.fillStyle = "#0f0";
                KiddoPaint.Display.previewContext.fillRect(pt[0], pt[1], 5, 5);
            });
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            tool.points.push([ ev._x, ev._y ]);
            KiddoPaint.Display.clearPreview();
            KiddoPaint.Display.pauseUndo();
            bumpLimits();
            renderFitLine(KiddoPaint.Display.context);
            KiddoPaint.Display.resumeUndo();
            KiddoPaint.Display.saveMain();
            tool.ylimit = {
                min: 5e3,
                max: -1
            };
        }
    };
    function bumpLimits() {
        tool.ylimit.min -= 15;
        tool.ylimit.max += 15;
    }
    function offsetPoints(bezPoints, offsetAmount) {
        var startPt = bezPoints[0];
        var ctrl1 = bezPoints[1];
        var ctrl2 = bezPoints[2];
        var stopPt = bezPoints[3];
        return [ [ startPt[0] + offsetAmount, startPt[1] + offsetAmount ], [ ctrl1[0] + offsetAmount, ctrl1[1] + offsetAmount ], [ ctrl2[0] + offsetAmount, ctrl2[1] + offsetAmount ], [ stopPt[0] + offsetAmount, stopPt[1] + offsetAmount ] ];
    }
    function calculateInterval(startPt, ctrl1, ctrl2, stopPt) {
        var approxDistance = bezierLength(startPt, ctrl1, ctrl2, stopPt);
        return Math.round(approxDistance / 3.5);
    }
    function renderFitLine(ctx) {
        var fitted = fitCurve(tool.points, 25);
        if (fitted) {
            var oldMultiplier = KiddoPaint.Current.scaling;
            var oldAlpha = KiddoPaint.Display.context.globalAlpha;
            var lastSegmentEv = null;
            var startScaling = 5;
            var endScaling = 1;
            var startAlpha = 0;
            var endAlpha = oldAlpha;
            fitted.forEach(element => {
                for (var i = 0; i < 1; i++) {
                    var offsetElement = offsetPoints(element, 11 * i);
                    var startPt = offsetElement[0];
                    var ctrl1 = offsetElement[1];
                    var ctrl2 = offsetElement[2];
                    var stopPt = offsetElement[3];
                    var fakeEv = getCubicBezierXYatPercent(startPt, ctrl1, ctrl2, stopPt, 0);
                    KiddoPaint.Current.scaling = remap(tool.ylimit.min, tool.ylimit.max, startScaling, endScaling, fakeEv._y);
                    KiddoPaint.Display.context.globalAlpha = remap(tool.ylimit.min, tool.ylimit.max, startAlpha, endAlpha, fakeEv._y);
                    if (!lastSegmentEv) {
                        tool.synthtool.mousedown(fakeEv);
                    } else {
                        tool.synthtool.mousemove(lastSegmentEv);
                    }
                    var interval = calculateInterval(startPt, ctrl1, ctrl2, stopPt);
                    for (var n = 0; n <= interval; n++) {
                        fakeEv = getCubicBezierXYatPercent(startPt, ctrl1, ctrl2, stopPt, n / (interval * 1));
                        KiddoPaint.Current.scaling = remap(tool.ylimit.min, tool.ylimit.max, startScaling, endScaling, fakeEv._y);
                        KiddoPaint.Display.context.globalAlpha = remap(tool.ylimit.min, tool.ylimit.max, startAlpha, endAlpha, fakeEv._y);
                        tool.synthtool.mousemove(fakeEv);
                    }
                    fakeEv = getCubicBezierXYatPercent(startPt, ctrl1, ctrl2, stopPt, 1);
                    KiddoPaint.Current.scaling = remap(tool.ylimit.min, tool.ylimit.max, startScaling, endScaling, fakeEv._y);
                    KiddoPaint.Display.context.globalAlpha = remap(tool.ylimit.min, tool.ylimit.max, startAlpha, endAlpha, fakeEv._y);
                    tool.synthtool.mousemove(fakeEv);
                    lastSegmentEv = fakeEv;
                }
            });
            KiddoPaint.Current.scaling = remap(tool.ylimit.min, tool.ylimit.max, startScaling, endScaling, lastSegmentEv._y);
            tool.synthtool.mouseup(lastSegmentEv);
            KiddoPaint.Current.scaling = oldMultiplier;
            KiddoPaint.Display.context.globalAlpha = oldAlpha;
        }
    }
};

KiddoPaint.Tools.BezFollow = new KiddoPaint.Tools.Toolbox.BezFollow();

KiddoPaint.Tools.Toolbox.Brush = function() {
    var tool = this;
    this.isDown = false;
    this.didMove = false;
    this.previousEv = null;
    this.minDistance = 0;
    this.texture = function(angle) {};
    this.soundduring = null;
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.didMove = true;
        tool.mousemove(ev);
        tool.didMove = false;
        tool.previousEv = ev;
    };
    this.reset = function() {
        tool.soundduring = null;
        tool.texture = function(angle) {};
    };
    this.mousemove = function(ev) {
        if (tool.isDown) {
            if (!tool.didMove) {
                KiddoPaint.Display.clearTmp();
                tool.didMove = true;
                tool.previousEv = ev;
                tool.minDistance = 0;
            } else if (tool.previousEv == null || distanceBetween(tool.previousEv, ev) > tool.minDistance) {
                var angle = tool.previousEv == null ? 0 : angleBetween(tool.previousEv, ev) + .5 * Math.PI;
                var brushFill = tool.texture(angle);
                if (tool.soundduring) tool.soundduring();
                KiddoPaint.Display.context.drawImage(brushFill, Math.round(ev._x), Math.round(ev._y));
                tool.previousEv = ev;
                tool.minDistance = 25 * KiddoPaint.Current.scaling;
            }
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            tool.previousEv = null;
            tool.minDistance = 0;
            KiddoPaint.Display.saveMain();
        }
    };
};

KiddoPaint.Tools.Brush = new KiddoPaint.Tools.Toolbox.Brush();

KiddoPaint.Tools.Toolbox.Circle = function() {
    var tool = this;
    this.isDown = false;
    this.size = 1;
    this.stomp = true;
    this.startEv = null;
    this.texture = function() {
        return KiddoPaint.Textures.None();
    };
    this.stroke = function() {
        return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
    };
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.startEv = ev;
    };
    this.mousemove = function(ev) {
        if (tool.isDown) {
            if (tool.stomp) {
                KiddoPaint.Display.clearTmp();
            }
            KiddoPaint.Sounds.circle();
            KiddoPaint.Display.context.beginPath();
            KiddoPaint.Display.context.fillStyle = tool.texture(tool.startEv, ev);
            KiddoPaint.Display.context.strokeStyle = tool.stroke();
            KiddoPaint.Display.context.lineWidth = 1.5;
            if (KiddoPaint.Current.modifiedMeta) {
                KiddoPaint.Display.context.arc(tool.startEv._x, tool.startEv._y, distanceBetween(ev, {
                    _x: tool.startEv._x,
                    _y: tool.startEv._y
                }), 0, 2 * Math.PI);
            } else if (KiddoPaint.Current.modified) {
                let sizex = Math.abs(ev._x - tool.startEv._x);
                let sizey = Math.abs(ev._y - tool.startEv._y);
                KiddoPaint.Display.context.ellipse((ev._x + tool.startEv._x) / 2, (ev._y + tool.startEv._y) / 2, sizex, sizey, 0, 0, 2 * Math.PI);
            } else {
                KiddoPaint.Display.context.arc((ev._x + tool.startEv._x) / 2, (ev._y + tool.startEv._y) / 2, .5 * distanceBetween(ev, {
                    _x: tool.startEv._x,
                    _y: tool.startEv._y
                }), 0, 2 * Math.PI);
            }
            KiddoPaint.Display.context.fill();
            if (!KiddoPaint.Current.modifiedCtrl) {
                KiddoPaint.Display.context.stroke();
            }
            KiddoPaint.Display.context.closePath();
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.mousemove(ev);
            tool.isDown = false;
            tool.startEv = null;
            KiddoPaint.Display.saveMain();
        }
    };
};

KiddoPaint.Tools.Circle = new KiddoPaint.Tools.Toolbox.Circle();

KiddoPaint.Tools.Toolbox.Composite = function() {
    var tool = this;
    this.composed = [];
    this.compose = function(t) {
        tool.composed.push(t);
    };
    this.clearComposed = function() {
        tool.composed.length = 0;
    };
    this.mousedown = function(ev) {
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
        KiddoPaint.Display.resumeUndo();
        KiddoPaint.Display.saveMain();
    };
};

KiddoPaint.Tools.Composite = new KiddoPaint.Tools.Toolbox.Composite();

KiddoPaint.Tools.Toolbox.Contours = function() {
    var tool = this;
    this.isDown = false;
    this.size = 2;
    this.stroke = function() {
        return KiddoPaint.Textures.Solid(KiddoPaint.Current.modified ? KiddoPaint.Colors.randomColor() : KiddoPaint.Current.color);
    };
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.x = ev._x;
        tool.y = ev._y;
    };
    this.mousemove = function(ev) {
        if (tool.isDown) {
            KiddoPaint.Sounds.brushnorthern();
            KiddoPaint.Display.context.beginPath();
            KiddoPaint.Display.context.strokeStyle = tool.stroke();
            KiddoPaint.Display.context.lineWidth = tool.size;
            KiddoPaint.Current.modifiedAlt ? KiddoPaint.Display.context.moveTo(tool.x, ev._y) : KiddoPaint.Display.context.moveTo(ev._x, tool.y);
            KiddoPaint.Display.context.lineTo(ev._x, ev._y);
            KiddoPaint.Display.context.stroke();
            KiddoPaint.Display.context.closePath();
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.mousemove(ev);
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
        }
    };
};

KiddoPaint.Tools.Contours = new KiddoPaint.Tools.Toolbox.Contours();

KiddoPaint.Tools.Toolbox.Cut = function() {
    var tool = this;
    this.isDown = false;
    this.length = 50;
    this.width = 50;
    this.size = function() {
        let lx = tool.length;
        let ly = tool.width;
        return {
            x: lx * KiddoPaint.Current.scaling * KiddoPaint.Current.multiplier * ((KiddoPaint.Current.modifiedCtrlRange + 100) / 100),
            y: ly * KiddoPaint.Current.scaling * KiddoPaint.Current.multiplier * ((KiddoPaint.Current.modifiedAltRange + 100) / 100)
        };
    };
    this.stomp = true;
    this.selectedData;
    this.texture = function() {
        return KiddoPaint.Textures.None();
    };
    this.mousedown = function(ev) {
        KiddoPaint.Sounds.truckStart();
        tool.isDown = true;
        tool.x = ev._x;
        tool.y = ev._y;
        sizex = tool.size().x;
        sizey = tool.size().y;
        if (!KiddoPaint.Current.modifiedToggle) {
            tool.selectedData = KiddoPaint.Display.main_context.getImageData(ev._x - sizex, ev._y - sizey, 2 * sizex, 2 * sizey);
        }
        tool.mousemove(ev);
    };
    this.mousemove = function(ev) {
        sizex = tool.size().x;
        sizey = tool.size().y;
        if (tool.stomp) {
            KiddoPaint.Display.clearTmp();
        }
        if (tool.isDown || KiddoPaint.Current.modifiedToggle && tool.selectedData) {
            KiddoPaint.Sounds.truckDuring();
            if (!KiddoPaint.Current.modifiedMeta) {
                KiddoPaint.Display.animContext.fillStyle = "white";
                KiddoPaint.Display.animContext.fillRect(tool.x - sizex, tool.y - sizey, 2 * sizex, 2 * sizey);
            } else {
                KiddoPaint.Display.clearAnim();
            }
            KiddoPaint.Display.previewContext.putImageData(tool.selectedData, ev._x - sizex, ev._y - sizey);
        } else {
            KiddoPaint.Display.previewContext.strokeStyle = "white";
            KiddoPaint.Display.previewContext.lineWidth = .5;
            KiddoPaint.Display.previewContext.setLineDash(KiddoPaint.Display.step % 2 ? [ 4 ] : [ 2 ]);
            KiddoPaint.Display.previewContext.strokeRect(ev._x - sizex, ev._y - sizey, 2 * sizex, 2 * sizey);
            KiddoPaint.Display.previewContext.strokeStyle = "black";
            KiddoPaint.Display.previewContext.strokeRect(ev._x - sizex, ev._y - sizey, 2 * sizex + 1, 2 * sizey + 1);
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            KiddoPaint.Sounds.truckEnd();
            sizex = tool.size().x;
            sizey = tool.size().y;
            tool.isDown = false;
            KiddoPaint.Display.context.putImageData(tool.selectedData, ev._x - sizex, ev._y - sizey);
            KiddoPaint.Display.saveUndo();
            if (!KiddoPaint.Current.modifiedMeta) {
                KiddoPaint.Display.main_context.clearRect(tool.x - sizex, tool.y - sizey, 2 * sizex, 2 * sizey);
            }
            KiddoPaint.Display.main_context.drawImage(KiddoPaint.Display.canvas, 0, 0);
            KiddoPaint.Display.clearTmp();
            KiddoPaint.Display.clearAnim();
            KiddoPaint.Display.saveToLocalStorage();
        }
    };
};

KiddoPaint.Tools.Cut = new KiddoPaint.Tools.Toolbox.Cut();

KiddoPaint.Tools.Toolbox.Doorbell = function() {
    var tool = this;
    this.isDown = false;
    this.leftside = {};
    this.rightside = {};
    this.centerGraphic = [ "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAADIAQAAAADpJcE2AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAd2KE6QAAAAHdElNRQflCAMBLh5YUprGAAAA3ElEQVRYw+3YPQ6DMAyG4Q8xMPYI3KS5WEU4Wo7CERg9INwB0jb87S+ql0joWSJjy7GEitp9woM4SbX7jAZtv5zV2WUJoBmKrPV8sGYOCGxbRSMUlDl6JB4IknzU6+eXe8JBNHVYsNxuzqAyJFhizpIIbCd5oE25FbPBvnXdAxTljwM5bXcGCmjwmcTcRAXfLnc6wxCAbgOKQfhwKqaB6uiFggBrfpqBC5pBUphy+XfiAtXuxTKCBopvm2c8E0QTFSjmOx4sgjhA7kkKbqf7RwSQgnu6XAYjwD/o8QYamlM2v+DGWAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wOC0wM1QwMTo0NjowOCswMDowMGhjP2IAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDgtMDNUMDE6NDY6MDgrMDA6MDAZPofeAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPEAAAC9AQAAAABKKqazAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAd2KE6QAAAAHdElNRQflCAMBLiXpWXPiAAABOklEQVRYw9XYMXKFIBCA4d+hsOQIHMWLOYTMu5hH4QiUFExIoUEx+JKOhcbis3CdZXcBykrHU3maq7erUL8nzdEO41gY1bGzX/Um0ldITBEVUJ7Zj+YqoIIF9JaYItIcvaEdwAIWec5S9p9xg7k98qPUt9lzzfPePkVUOOuC+Yyl2A3hezwqfwE6pyNeQY55hUt9mOI9Rfq6hfXSF4xr5Y9gb8crx/d+oPJe39LRL8bxvV9Uft+fXf2hn0hxXZJjzufwuAzjZ3wXb8bfycs8c3ojf+R6e54U5BhXn89+1bvOzgoq7ys9xCPaVbicL5/m944u/nzw9/kBPiIqbzzM752ddNSHN/cjXV36/ct/7mfqvibMsbe+NpD/FLeygiCfck7VPHG7Z+rsOmcPS/X5rzyOS/+/4vPzjX8DdoGgLPOs1MUAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDgtMDNUMDE6NDY6MDgrMDA6MDBoYz9iAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA4LTAzVDAxOjQ2OjA4KzAwOjAwGT6H3gAAAABJRU5ErkJggg==" ];
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.leftside = KiddoPaint.Display.main_context.getImageData(0, 0, KiddoPaint.Display.main_canvas.width / 2, KiddoPaint.Display.main_canvas.height);
        tool.rightside = KiddoPaint.Display.main_context.getImageData(KiddoPaint.Display.main_canvas.width / 2, 0, KiddoPaint.Display.main_canvas.width / 2, KiddoPaint.Display.main_canvas.height);
        tool.animate(ev);
    };
    this.mousemove = function(ev) {};
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            tool.leftside = {};
            tool.rightside = {};
        }
    };
    this.animate = function(ev) {
        var iter = 1;
        var right = flattenImage(tool.rightside);
        var left = flattenImage(tool.leftside);
        KiddoPaint.Display.bnimContext.fillStyle = "white";
        KiddoPaint.Display.bnimContext.fillRect(0, 0, KiddoPaint.Display.main_canvas.width, KiddoPaint.Display.main_canvas.height);
        let image = new Image();
        image.src = KiddoPaint.Tools.EraserHiddenPicture.hiddenPictures.random();
        image.crossOrigin = "anonymous";
        image.onload = function() {
            var wrh = image.width / image.height;
            var newWidth = KiddoPaint.Display.canvas.width;
            var newHeight = newWidth / wrh;
            if (newHeight > KiddoPaint.Display.canvas.height) {
                newHeight = KiddoPaint.Display.canvas.height;
                newWidth = newHeight * wrh;
            }
            var xOffset = newWidth < KiddoPaint.Display.canvas.width ? (KiddoPaint.Display.canvas.width - newWidth) / 2 : 0;
            var yOffset = newHeight < KiddoPaint.Display.canvas.height ? (KiddoPaint.Display.canvas.height - newHeight) / 2 : 0;
            KiddoPaint.Display.bnimContext.imageSmoothingEnabled = false;
            KiddoPaint.Display.bnimContext.save();
            KiddoPaint.Display.bnimContext.drawImage(image, xOffset, yOffset, newWidth, newHeight);
            KiddoPaint.Display.bnimContext.globalCompositeOperation = "difference";
            KiddoPaint.Display.bnimContext.fillStyle = "white";
            KiddoPaint.Display.bnimContext.fillRect(0, 0, KiddoPaint.Display.main_canvas.width, KiddoPaint.Display.main_canvas.height);
            KiddoPaint.Display.bnimContext.globalCompositeOperation = "source-over";
            KiddoPaint.Display.bnimContext.restore();
            let cimage = new Image();
            cimage.src = tool.centerGraphic.random();
            cimage.onload = function() {
                let cxOffset = KiddoPaint.Display.canvas.width / 2 - cimage.width;
                let cyOffset = KiddoPaint.Display.canvas.height / 2 - cimage.height;
                KiddoPaint.Display.bnimContext.drawImage(cimage, cxOffset, cyOffset, cimage.width * 2, cimage.height * 2);
            };
        };
        KiddoPaint.Display.animContext.putImageData(left, 0, 0);
        KiddoPaint.Display.animContext.putImageData(right, KiddoPaint.Display.main_canvas.width / 2, 0);
        KiddoPaint.Display.clearAll();
        KiddoPaint.Sounds.Library.pplaySingle("doordingdong").then(() => {
            KiddoPaint.Sounds.Library.playSingle("doorcreak");
            var intervalID = setInterval(drawSlideOut, 20);
            drawSlideOut();
            function drawSlideOut() {
                let totalIter = 107;
                let step = KiddoPaint.Display.main_canvas.width / 2 / totalIter;
                KiddoPaint.Display.clearAnim();
                KiddoPaint.Display.animContext.putImageData(left, 0 - iter * step, 0);
                KiddoPaint.Display.animContext.putImageData(right, KiddoPaint.Display.main_canvas.width / 2 + iter * step, 0);
                iter++;
                if (iter > totalIter) {
                    clearInterval(intervalID);
                    KiddoPaint.Display.clearAnim();
                    tool.animatenext(ev);
                }
            }
        });
    };
    this.animatenext = function(ev) {
        KiddoPaint.Sounds.Library.playSingle("doorwow");
        var iter = 1;
        var left = KiddoPaint.Display.bnimContext.getImageData(0, 0, KiddoPaint.Display.main_canvas.width / 2, KiddoPaint.Display.main_canvas.height);
        var right = KiddoPaint.Display.bnimContext.getImageData(KiddoPaint.Display.main_canvas.width / 2, 0, KiddoPaint.Display.main_canvas.width / 2, KiddoPaint.Display.main_canvas.height);
        KiddoPaint.Display.animContext.putImageData(left, 0, 0);
        KiddoPaint.Display.animContext.putImageData(right, KiddoPaint.Display.main_canvas.width / 2, 0);
        KiddoPaint.Display.clearBnim();
        var intervalID = setInterval(drawSlideOut, 20);
        drawSlideOut();
        function drawSlideOut() {
            let totalIter = 67;
            let step = KiddoPaint.Display.main_canvas.width / 2 / totalIter;
            KiddoPaint.Display.clearAnim();
            KiddoPaint.Display.animContext.putImageData(left, 0 - iter * step, 0);
            KiddoPaint.Display.animContext.putImageData(right, KiddoPaint.Display.main_canvas.width / 2 + iter * step, 0);
            iter++;
            if (iter > totalIter) {
                clearInterval(intervalID);
                KiddoPaint.Display.clearAnim();
            }
        }
    };
};

KiddoPaint.Tools.Doorbell = new KiddoPaint.Tools.Toolbox.Doorbell();

KiddoPaint.Tools.Toolbox.EraserFadeAway = function() {
    var tool = this;
    this.mousedown = function(ev) {
        var ctx = KiddoPaint.Display.context;
        setTimeout(function() {
            KiddoPaint.Sounds.eraserfadeb();
            ctx.fillStyle = KiddoPaint.Textures.Screen1();
            ctx.fillRect(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
        }, 500);
        setTimeout(function() {
            KiddoPaint.Sounds.eraserfadea();
            ctx.fillStyle = KiddoPaint.Textures.Screen2();
            ctx.fillRect(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
            ctx.fillStyle = KiddoPaint.Textures.Screen3();
            ctx.fillRect(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
        }, 1200);
        setTimeout(function() {
            KiddoPaint.Sounds.eraserfadeb();
            ctx.fillStyle = KiddoPaint.Textures.Screen4();
            ctx.fillRect(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
        }, 1900);
        setTimeout(function() {
            KiddoPaint.Display.clearAll();
        }, 2e3);
    };
    this.mousemove = function(ev) {};
    this.mouseup = function(ev) {};
};

KiddoPaint.Tools.EraserFadeAway = new KiddoPaint.Tools.Toolbox.EraserFadeAway();

KiddoPaint.Tools.Toolbox.EraserHiddenPicture = function() {
    var tool = this;
    this.hiddenPictures = [ "img/kp-h-bear.png", "img/kp-h-bison.png", "img/kp-h-corn.png", "img/kp-h-eye.png", "img/kp-h-fox.png", "img/kp-h-horse.png", "img/kp-h-hummingbird.png", "img/kp-h-ladybug.png", "img/kp-h-lion.png", "img/kp-h-magnet.png", "img/kp-h-moth.png", "img/kp-h-octopus.png" ];
    this.isDown = false;
    this.size = 32;
    this.hiddenPattern = null;
    this.reset = function() {
        let image = new Image();
        image.src = tool.hiddenPictures.random();
        image.crossOrigin = "anonymous";
        image.onload = function() {
            tool.hiddenPattern = makePatternFromImage(image);
        };
    };
    this.mousedown = function(ev) {
        tool.isDown = true;
    };
    this.mousemove = function(ev) {
        let currentSize = tool.size * KiddoPaint.Current.scaling;
        if (tool.isDown) {
            var ctx = KiddoPaint.Display.context;
            ctx.fillStyle = tool.hiddenPattern;
            ctx.fillRect(Math.round(ev._x) - currentSize / 2, Math.round(ev._y) - currentSize / 2, currentSize, currentSize);
        } else {
            var ctx = KiddoPaint.Display.previewContext;
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.strokeRect(Math.round(ev._x) - currentSize / 2, Math.round(ev._y) - currentSize / 2, currentSize, currentSize);
            ctx.fillRect(Math.round(ev._x) - currentSize / 2, Math.round(ev._y) - currentSize / 2, currentSize, currentSize);
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
        }
    };
};

KiddoPaint.Tools.EraserHiddenPicture = new KiddoPaint.Tools.Toolbox.EraserHiddenPicture();

KiddoPaint.Tools.Toolbox.EraserLetters = function() {
    var tool = this;
    this.isDown = false;
    this.animInterval = 10;
    this.timeout = null;
    this.mousedown = function(ev) {
        tool.isDown = true;
        let interval = tool.animInterval;
        tool.timeout = setTimeout(function draw() {
            tool.toolDraw();
            if (!tool.timeout) return;
            tool.timeout = setTimeout(draw, interval);
        }, interval);
        tool.toolDraw();
    };
    this.mousemove = function(ev) {};
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            if (tool.timeout) {
                clearTimeout(tool.timeout);
                tool.timeout = null;
            }
            KiddoPaint.Display.clearAnim();
            KiddoPaint.Display.clearAll();
        }
    };
    this.toolDraw = function() {
        if (tool.isDown) {
            KiddoPaint.Sounds.mixershadowbox();
            let rx = getRandomFloat(-10, KiddoPaint.Display.canvas.width);
            let ry = getRandomFloat(-10, KiddoPaint.Display.canvas.height);
            let rs = getRandomInt(24, 500);
            let rl = getRandomLetter();
            KiddoPaint.Display.animContext.fillStyle = "white";
            KiddoPaint.Display.animContext.fillRect(rx, ry, rs / 2, rs / 2);
            KiddoPaint.Display.animContext.font = rs + "px serif";
            KiddoPaint.Display.animContext.textBaseline = "top";
            KiddoPaint.Display.animContext.textAlign = "center";
            KiddoPaint.Display.animContext.fillStyle = KiddoPaint.Colors.randomAllColor();
            KiddoPaint.Display.animContext.strokeStyle = KiddoPaint.Colors.randomAllColor();
            if (Math.random() > .25) {
                KiddoPaint.Display.animContext.fillText(" " + rl, rx, ry);
            } else {
                KiddoPaint.Display.animContext.strokeText(" " + rl, rx, ry);
            }
        }
    };
};

KiddoPaint.Tools.EraserLetters = new KiddoPaint.Tools.Toolbox.EraserLetters();

KiddoPaint.Tools.Toolbox.EraserWhiteCircles = function() {
    var tool = this;
    this.isDown = false;
    this.size = 10;
    this.reset = function() {
        tool.size = 25;
    };
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.mousemove(ev);
    };
    this.mousemove = function(ev) {
        if (tool.isDown) {
            KiddoPaint.Sounds.bubblepops();
            let currentSize = tool.size * KiddoPaint.Current.scaling;
            var ctx = KiddoPaint.Display.context;
            ctx.fillStyle = "white";
            ctx.beginPath();
            let rx = getRandomFloat(0, KiddoPaint.Display.canvas.width);
            let ry = getRandomFloat(0, KiddoPaint.Display.canvas.height);
            ctx.arc(rx, ry, currentSize, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
            if (tool.size < 200) tool.size += 1;
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.mousemove(ev);
            tool.isDown = false;
            KiddoPaint.Display.saveMainGco("destination-out");
        }
    };
};

KiddoPaint.Tools.EraserWhiteCircles = new KiddoPaint.Tools.Toolbox.EraserWhiteCircles();

KiddoPaint.Tools.Toolbox.Eraser = function() {
    var tool = this;
    this.isDown = false;
    this.size = 10;
    this.isSquareEraser = true;
    this.texture = function() {
        return KiddoPaint.Textures.Solid("rgb(240, 180, 180)");
    };
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.mousemove(ev);
    };
    this.mousemove = function(ev) {
        let currentSize = tool.size * KiddoPaint.Current.scaling;
        var ctx = tool.isDown ? KiddoPaint.Display.context : KiddoPaint.Display.previewContext;
        ctx.fillStyle = tool.texture();
        if (tool.isSquareEraser) {
            ctx.fillRect(Math.round(ev._x) - currentSize / 2, Math.round(ev._y) - currentSize / 2, currentSize, currentSize);
        } else {
            ctx.beginPath();
            ctx.arc(ev._x, ev._y, currentSize, 0, 2 * Math.PI);
            ctx.fill();
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.mousemove(ev);
            tool.isDown = false;
            KiddoPaint.Display.saveMainGco("destination-out");
        }
    };
};

KiddoPaint.Tools.Eraser = new KiddoPaint.Tools.Toolbox.Eraser();

KiddoPaint.Tools.Toolbox.Flood = function() {
    var tool = this;
    this.gcop = "destination-in";
    this.texture = function(color) {
        return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
    };
    this.mousedown = function(ev) {
        if (KiddoPaint.Current.modifiedAlt) {
            tool.canvasWideReplace(ev);
        } else {
            tool.boundedFill(ev);
        }
    };
    this.canvasWideReplace = function(ev) {
        KiddoPaint.Sounds.flood();
        var x = ev._x;
        var y = ev._y;
        var pixels = KiddoPaint.Display.main_context.getImageData(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
        var changedPixels = new ImageData(KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
        var linear_cords = (y * KiddoPaint.Display.canvas.width + x) * 4;
        var original_color = {
            r: pixels.data[linear_cords],
            g: pixels.data[linear_cords + 1],
            b: pixels.data[linear_cords + 2],
            a: pixels.data[linear_cords + 3]
        };
        var color = color2json(KiddoPaint.Current.color);
        if (colorsEqual(color, original_color)) {
            return;
        }
        var d = pixels.data;
        for (var i = 0; i < d.length; i += 4) {
            if (pixels.data[i] == original_color.r && pixels.data[i + 1] == original_color.g && pixels.data[i + 2] == original_color.b && pixels.data[i + 3] == original_color.a) {
                changedPixels.data[i] = color.r;
                changedPixels.data[i + 1] = color.g;
                changedPixels.data[i + 2] = color.b;
                changedPixels.data[i + 3] = color.a;
            }
        }
        KiddoPaint.Display.context.putImageData(changedPixels, 0, 0);
        KiddoPaint.Display.context.globalCompositeOperation = tool.gcop;
        KiddoPaint.Display.context.fillStyle = tool.texture(KiddoPaint.Current.color);
        KiddoPaint.Display.context.fillRect(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
        KiddoPaint.Display.context.globalCompositeOperation = "source-over";
        KiddoPaint.Display.saveMain();
    };
    this.boundedFill = function(ev) {
        KiddoPaint.Sounds.flood();
        var x = ev._x;
        var y = ev._y;
        var pixel_stack = [ {
            x: x,
            y: y
        } ];
        var touched = [];
        var pixels = KiddoPaint.Display.main_context.getImageData(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
        var changedPixels = new ImageData(KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
        var linear_cords = (y * KiddoPaint.Display.canvas.width + x) * 4;
        var original_color = {
            r: pixels.data[linear_cords],
            g: pixels.data[linear_cords + 1],
            b: pixels.data[linear_cords + 2],
            a: pixels.data[linear_cords + 3]
        };
        var color = color2json(KiddoPaint.Current.color);
        if (colorsEqual(color, original_color)) {
            return;
        }
        while (pixel_stack.length > 0) {
            var new_pixel = pixel_stack.shift();
            x = new_pixel.x;
            y = new_pixel.y;
            var linear_cords = (y * KiddoPaint.Display.canvas.width + x) * 4;
            while (y-- >= 0 && (pixels.data[linear_cords] == original_color.r && pixels.data[linear_cords + 1] == original_color.g && pixels.data[linear_cords + 2] == original_color.b && pixels.data[linear_cords + 3] == original_color.a)) {
                linear_cords -= KiddoPaint.Display.canvas.width * 4;
            }
            linear_cords += KiddoPaint.Display.canvas.width * 4;
            y++;
            var reached_left = false;
            var reached_right = false;
            while (y++ < KiddoPaint.Display.canvas.height && (pixels.data[linear_cords] == original_color.r && pixels.data[linear_cords + 1] == original_color.g && pixels.data[linear_cords + 2] == original_color.b && pixels.data[linear_cords + 3] == original_color.a)) {
                pixels.data[linear_cords] = color.r;
                pixels.data[linear_cords + 1] = color.g;
                pixels.data[linear_cords + 2] = color.b;
                pixels.data[linear_cords + 3] = color.a;
                touched.push(linear_cords);
                if (x > 0) {
                    if (pixels.data[linear_cords - 4] == original_color.r && pixels.data[linear_cords - 4 + 1] == original_color.g && pixels.data[linear_cords - 4 + 2] == original_color.b && pixels.data[linear_cords - 4 + 3] == original_color.a) {
                        if (!reached_left) {
                            pixel_stack.push({
                                x: x - 1,
                                y: y
                            });
                            reached_left = true;
                        }
                    } else if (reached_left) {
                        reached_left = false;
                    }
                }
                if (x < KiddoPaint.Display.canvas.width - 1) {
                    if (pixels.data[linear_cords + 4] == original_color.r && pixels.data[linear_cords + 4 + 1] == original_color.g && pixels.data[linear_cords + 4 + 2] == original_color.b && pixels.data[linear_cords + 4 + 3] == original_color.a) {
                        if (!reached_right) {
                            pixel_stack.push({
                                x: x + 1,
                                y: y
                            });
                            reached_right = true;
                        }
                    } else if (reached_right) {
                        reached_right = false;
                    }
                }
                linear_cords += KiddoPaint.Display.canvas.width * 4;
            }
        }
        for (let z = 0; z < touched.length; z++) {
            let l = touched[z];
            changedPixels.data[l] = color.r;
            changedPixels.data[l + 1] = color.g;
            changedPixels.data[l + 2] = color.b;
            changedPixels.data[l + 3] = color.a;
        }
        KiddoPaint.Display.context.putImageData(changedPixels, 0, 0);
        KiddoPaint.Display.context.globalCompositeOperation = tool.gcop;
        KiddoPaint.Display.context.fillStyle = tool.texture(KiddoPaint.Current.color);
        KiddoPaint.Display.context.fillRect(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
        KiddoPaint.Display.context.globalCompositeOperation = "source-over";
        KiddoPaint.Display.saveMain();
    };
    this.mousemove = function(ev) {};
    this.mouseup = function(ev) {};
};

KiddoPaint.Tools.Flood = new KiddoPaint.Tools.Toolbox.Flood();

KiddoPaint.Tools.Toolbox.Fuzzer = function() {
    var tool = this;
    this.isDown = false;
    this.size = function() {
        return 13 * KiddoPaint.Current.scaling;
    };
    this.timeout = null;
    this.currentEv = null;
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.currentEv = ev;
        let interval = 37;
        tool.timeout = setTimeout(function draw() {
            tool.toolDraw();
            if (!tool.timeout) return;
            tool.timeout = setTimeout(draw, interval);
        }, interval);
    };
    this.mousemove = function(ev) {
        tool.currentEv = ev;
        if (!tool.isDown) {
            tool.toolDraw();
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
            if (tool.timeout) {
                clearTimeout(tool.timeout);
                tool.timeout = null;
            }
        }
    };
    this.toolDraw = function() {
        var target = KiddoPaint.Display.main_context.getImageData(tool.currentEv._x - tool.size(), tool.currentEv._y - tool.size(), 2 * tool.size(), 2 * tool.size());
        var ctx = tool.isDown ? KiddoPaint.Display.context : KiddoPaint.Display.previewContext;
        let jitterx = getRandomFloat(-7, 7);
        let jittery = getRandomFloat(-7, 7);
        if (tool.isDown) KiddoPaint.Sounds.brushfuzzer();
        ctx.putImageData(target, tool.currentEv._x - tool.size() + jitterx, tool.currentEv._y - tool.size() + jittery);
    };
};

KiddoPaint.Tools.Fuzzer = new KiddoPaint.Tools.Toolbox.Fuzzer();

KiddoPaint.Tools.Toolbox.Guilloche = function() {
    var tool = this;
    this.isDown = false;
    this.minDistance = 50;
    this.previousEv = null;
    this.randomSettings = {};
    this.texture = function() {
        return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
    };
    this.mousedown = function(ev) {
        tool.randomSettings = {
            outradius: (41 + 64 * Math.random()) * KiddoPaint.Current.scaling,
            inradius: (21 + 42 * Math.random()) * KiddoPaint.Current.scaling,
            r: -5 * Math.random(),
            Q: 7 * Math.random(),
            m: 5 * Math.random(),
            n: 10 * Math.random()
        };
        tool.isDown = true;
        tool.mousemove(ev);
    };
    this.mousemove = function(ev) {
        if (!tool.isDown) return;
        if (tool.previousEv == null || distanceBetween(tool.previousEv, ev) > tool.minDistance) {
            KiddoPaint.Sounds.brushguil();
            KiddoPaint.Display.context.beginPath();
            KiddoPaint.Display.context.lineWidth = .5;
            KiddoPaint.Display.context.strokeStyle = tool.texture();
            KiddoPaint.Display.context.fillStyle = tool.texture();
            for (var i = 0; i < Math.PI * 4; i += .007) {
                var coord = guil(tool.randomSettings.outradius, tool.randomSettings.r, tool.randomSettings.m, i, tool.randomSettings.inradius, tool.randomSettings.Q, tool.randomSettings.m, tool.randomSettings.n);
                if (KiddoPaint.Current.modifiedMeta) {
                    KiddoPaint.Display.context.fillRect(Math.round(ev._x + coord.x), Math.round(ev._y + coord.y), 1, 1);
                } else {
                    KiddoPaint.Display.context.lineTo(Math.round(ev._x + coord.x), Math.round(ev._y + coord.y));
                }
            }
            KiddoPaint.Display.context.stroke();
            KiddoPaint.Display.context.closePath();
            tool.previousEv = ev;
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            tool.previousEv = null;
            tool.randomSettings = {};
            KiddoPaint.Display.saveMain();
        }
    };
};

KiddoPaint.Tools.Guilloche = new KiddoPaint.Tools.Toolbox.Guilloche();

KiddoPaint.Tools.Toolbox.Inverter = function() {
    var tool = this;
    this.isDown = false;
    this.size = 25;
    this.hiddenPattern = null;
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.hiddenPattern = KiddoPaint.Display.context.createPattern(Filters.gcoInvert(KiddoPaint.Display.main_context.getImageData(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height)), "no-repeat");
    };
    this.mousemove = function(ev) {
        let currentSize = tool.size * KiddoPaint.Current.scaling;
        if (tool.isDown) {
            KiddoPaint.Sounds.brushinvert();
            var ctx = KiddoPaint.Display.context;
            ctx.fillStyle = tool.hiddenPattern;
            ctx.fillRect(Math.round(ev._x) - currentSize / 2, Math.round(ev._y) - currentSize / 2, currentSize, currentSize);
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            tool.hiddenPattern = null;
            KiddoPaint.Display.saveMain();
        }
    };
};

KiddoPaint.Tools.Inverter = new KiddoPaint.Tools.Toolbox.Inverter();

KiddoPaint.Tools.Toolbox.Kaleidoscope = function() {
    var tool = this;
    this.isDown = false;
    this.size = 2;
    this.origin = {};
    this.texture = function() {
        return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
    };
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.previousEv = {
            x: 0,
            y: 0
        };
        tool.origin = ev;
        KiddoPaint.Display.context.strokeStyle = tool.texture();
        KiddoPaint.Display.context.lineWidth = tool.size;
        KiddoPaint.Display.context.beginPath();
        KiddoPaint.Display.context.save();
        KiddoPaint.Display.context.lineJoin = KiddoPaint.Display.context.lineCap = "round";
        KiddoPaint.Display.context.translate(ev._x + .1, ev._y + .1);
        KiddoPaint.Display.context.moveTo(0, 0);
    };
    this.mousemove = function(ev) {
        if (tool.isDown) {
            KiddoPaint.Sounds.brushkaliediscope();
            var x = tool.origin._x - ev._x;
            var y = tool.origin._y - ev._y;
            if (KiddoPaint.Current.modifiedAlt) {
                KiddoPaint.Display.context.moveTo(tool.previousEv.x, tool.previousEv.y);
                KiddoPaint.Display.context.lineTo(x, y);
                KiddoPaint.Display.context.moveTo(tool.previousEv.y, tool.previousEv.x);
                KiddoPaint.Display.context.lineTo(y, x);
                KiddoPaint.Display.context.moveTo(-tool.previousEv.x, -tool.previousEv.y);
                KiddoPaint.Display.context.lineTo(-x, -y);
                KiddoPaint.Display.context.moveTo(-tool.previousEv.y, -tool.previousEv.x);
                KiddoPaint.Display.context.lineTo(-y, -x);
            } else {
                KiddoPaint.Display.context.moveTo(tool.previousEv.x, tool.previousEv.y);
                KiddoPaint.Display.context.lineTo(x, y);
                KiddoPaint.Display.context.moveTo(-tool.previousEv.x, tool.previousEv.y);
                KiddoPaint.Display.context.lineTo(-x, y);
                KiddoPaint.Display.context.moveTo(tool.previousEv.x, -tool.previousEv.y);
                KiddoPaint.Display.context.lineTo(x, -y);
                KiddoPaint.Display.context.moveTo(-tool.previousEv.x, -tool.previousEv.y);
                KiddoPaint.Display.context.lineTo(-x, -y);
            }
            KiddoPaint.Display.context.stroke();
            tool.previousEv = {
                x: x,
                y: y
            };
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            KiddoPaint.Display.context.restore();
            KiddoPaint.Display.context.closePath();
            tool.previousEv = {
                x: 0,
                y: 0
            };
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
        }
    };
};

KiddoPaint.Tools.Kaleidoscope = new KiddoPaint.Tools.Toolbox.Kaleidoscope();

KiddoPaint.Tools.Toolbox.PlainBrush = function() {
    var tool = this;
    this.isDown = false;
    this.previousEv = null;
    this.texture = function() {};
    this.preprocess = function() {};
    this.postprocess = function() {};
    this.spacing = 5;
    this.step = 0;
    this.points = [];
    this.reset = function() {
        tool.isDown = false;
        tool.previousEv = null;
        tool.texture = function() {};
        tool.preprocess = function() {};
        tool.postprocess = function() {};
        tool.step = 0;
        tool.points = [];
    };
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.mousemove(ev);
        tool.previousEv = ev;
        tool.preprocess();
    };
    this.mousemove = function(ev) {
        if (tool.isDown) {
            var point = [ ev._x, ev.y ];
            tool.points.push(point);
        }
        tool.mousemoveDirect(ev);
    };
    this.mousemoveDirect = function(ev) {
        if (tool.isDown) {
            if (tool.previousEv == null || distanceBetween(tool.previousEv, ev) > tool.spacing) {
                if (KiddoPaint.Current.modifiedTilde) {
                    KiddoPaint.Display.context.globalAlpha *= .95;
                    KiddoPaint.Display.previewContext.globalAlpha *= .95;
                }
                if (KiddoPaint.Current.modifiedAlt && tool.previousEv != null) {
                    var dist = distanceBetween(tool.previousEv, ev);
                    var angle = angleBetweenRad(tool.previousEv, ev);
                    for (var i = 0; i < dist; i += 5) {
                        var x = tool.previousEv._x + Math.sin(angle) * i;
                        var y = tool.previousEv._y + Math.cos(angle) * i;
                        var brushFill = tool.texture(tool.step);
                        KiddoPaint.Display.context.drawImage(brushFill.brush, Math.round(x - brushFill.offset), Math.round(y - brushFill.offset));
                        tool.step += 1;
                        if (KiddoPaint.Current.modifiedTilde) {
                            KiddoPaint.Display.context.globalAlpha *= .99;
                            KiddoPaint.Display.previewContext.globalAlpha *= .99;
                        }
                    }
                }
                var brushFill = tool.texture(tool.step);
                KiddoPaint.Display.context.drawImage(brushFill.brush, Math.round(ev._x - brushFill.offset), Math.round(ev._y - brushFill.offset));
                tool.previousEv = ev;
                tool.step += 1;
            }
        } else {
            var brushFill = tool.texture(0);
            KiddoPaint.Display.previewContext.drawImage(brushFill.brush, Math.round(ev._x - brushFill.offset), Math.round(ev._y - brushFill.offset));
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            KiddoPaint.Display.clearTmp();
            var s = Smooth(tool.points, {
                method: Smooth.METHOD_LANCZOS
            });
            for (var i = 0; i < tool.points.length; i++) {
                for (var j = 0; j < 3; j++) {
                    var pt = s(i + j / 4);
                    var ptev = {
                        _x: pt[0],
                        _y: pt[1]
                    };
                    tool.mousemoveDirect(ptev);
                }
            }
            tool.points = [];
            tool.mouseupDirect(ev);
        }
    };
    this.mouseupDirect = function(ev) {
        if (tool.isDown) {
            tool.mousemove(ev);
            tool.isDown = false;
            tool.previousEv = null;
            tool.step = 0;
            tool.postprocess();
            KiddoPaint.Display.saveMain();
            KiddoPaint.Display.context.globalAlpha = KiddoPaint.Current.globalAlpha;
            KiddoPaint.Display.previewContext.globalAlpha = KiddoPaint.Current.globalAlpha;
        }
    };
};

KiddoPaint.Tools.PlainBrush = new KiddoPaint.Tools.Toolbox.PlainBrush();

KiddoPaint.Tools.Toolbox.Line = function() {
    var tool = this;
    this.isDown = false;
    this.size = 7;
    this.stomp = true;
    this.texture = function() {
        return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
    };
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.x = ev._x;
        tool.y = ev._y;
        KiddoPaint.Sounds.lineStart();
    };
    this.mousemove = function(ev) {
        if (tool.isDown) {
            if (tool.stomp) {
                KiddoPaint.Display.clearTmp();
            }
            KiddoPaint.Sounds.lineDuring();
            KiddoPaint.Display.context.beginPath();
            KiddoPaint.Display.context.moveTo(Math.round(tool.x), Math.round(tool.y));
            if (KiddoPaint.Current.modified) {
                deltax = Math.abs(ev._x - tool.x);
                deltay = Math.abs(ev._y - tool.y);
                if (deltax < deltay) {
                    KiddoPaint.Display.context.lineTo(tool.x, ev._y);
                } else {
                    KiddoPaint.Display.context.lineTo(ev._x, tool.y);
                }
            } else {
                KiddoPaint.Display.context.lineTo(ev._x, ev._y);
            }
            KiddoPaint.Display.context.strokeStyle = tool.texture();
            KiddoPaint.Display.context.lineWidth = tool.size;
            KiddoPaint.Display.context.stroke();
            KiddoPaint.Display.context.closePath();
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.mousemove(ev);
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
            KiddoPaint.Sounds.lineEnd();
        }
    };
};

KiddoPaint.Tools.Line = new KiddoPaint.Tools.Toolbox.Line();

KiddoPaint.Tools.Toolbox.Looper = function() {
    var tool = this;
    this.isDown = false;
    this.size = 5;
    this.radius = 32;
    this.lstep = 0;
    this.lincr = .15;
    this.previousCoord = null;
    this.stroke = function() {
        return KiddoPaint.Textures.Solid(KiddoPaint.Current.modifiedMeta ? KiddoPaint.Colors.randomColor() : KiddoPaint.Current.color);
    };
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.previousCoord = {
            x: ev._x + tool.radius * Math.sin(-tool.lstep),
            y: ev._y + tool.radius * Math.cos(tool.lstep)
        };
    };
    this.mousemove = function(ev) {
        if (tool.isDown) {
            let x = ev._x + tool.radius * Math.sin(-tool.lstep);
            let y = ev._y + tool.radius * Math.cos(tool.lstep);
            KiddoPaint.Display.context.beginPath();
            KiddoPaint.Display.context.strokeStyle = tool.stroke();
            KiddoPaint.Display.context.lineWidth = tool.size;
            KiddoPaint.Display.context.lineCap = "round";
            KiddoPaint.Display.context.lineJoin = "round";
            KiddoPaint.Display.context.moveTo(tool.previousCoord.x, tool.previousCoord.y);
            KiddoPaint.Display.context.lineTo(x, y);
            KiddoPaint.Display.context.stroke();
            KiddoPaint.Display.context.closePath();
            tool.lstep += tool.lincr;
            tool.previousCoord = {
                x: x,
                y: y
            };
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.mousemove(ev);
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
        }
    };
};

KiddoPaint.Tools.Looper = new KiddoPaint.Tools.Toolbox.Looper();

KiddoPaint.Tools.Toolbox.Magnify = function() {
    var tool = this;
    this.isDown = false;
    this.size = function() {
        return 36 * KiddoPaint.Current.scaling;
    };
    this.scale = 2;
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.mousemove(ev);
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-none");
    };
    this.mousemove = function(ev) {
        if (tool.isDown) {
            KiddoPaint.Sounds.brushzoom();
            var target = KiddoPaint.Display.main_context.getImageData(ev._x - tool.size(), ev._y - tool.size(), 2 * tool.size(), 2 * tool.size());
            var ctx = KiddoPaint.Display.previewContext;
            var scaled = scaleImageData(target, tool.scale);
            ctx.putImageData(scaled, ev._x - tool.scale * tool.size(), ev._y - tool.scale * tool.size());
            KiddoPaint.Display.clearAnim();
            KiddoPaint.Display.animContext.fillStyle = "white";
            KiddoPaint.Display.animContext.fillRect(ev._x - tool.scale * tool.size(), ev._y - tool.scale * tool.size(), tool.scale * tool.size() * 2, tool.scale * tool.size() * 2);
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            KiddoPaint.Display.clearAnim();
            KiddoPaint.Display.saveUndo();
            var target = KiddoPaint.Display.main_context.getImageData(ev._x - tool.size(), ev._y - tool.size(), 2 * tool.size(), 2 * tool.size());
            var ctx = KiddoPaint.Display.context;
            var scaled = scaleImageData(target, tool.scale);
            ctx.putImageData(scaled, ev._x - tool.scale * tool.size(), ev._y - tool.scale * tool.size());
            KiddoPaint.Display.main_context.clearRect(ev._x - tool.scale * tool.size(), ev._y - tool.scale * tool.size(), tool.scale * tool.size() * 2, tool.scale * tool.size() * 2);
            KiddoPaint.Display.main_context.drawImage(KiddoPaint.Display.canvas, 0, 0);
            KiddoPaint.Display.clearTmp();
            KiddoPaint.Display.clearAnim();
            KiddoPaint.Display.saveToLocalStorage();
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        }
    };
};

KiddoPaint.Tools.Magnify = new KiddoPaint.Tools.Toolbox.Magnify();

KiddoPaint.Tools.Toolbox.Maze = function() {
    var tool = this;
    this.isDown = false;
    this.texture = function() {
        return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
    };
    this.mousedown = function(ev) {
        tool.isDown = true;
        var maze = makeMaze();
        KiddoPaint.Display.context.drawImage(maze, ev._x, ev._y);
    };
    this.mousemove = function(ev) {};
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
        }
    };
};

KiddoPaint.Tools.Maze = new KiddoPaint.Tools.Toolbox.Maze();

function makeMaze() {
    var canvasBrush = document.createElement("canvas");
    var contextBrush = canvasBrush.getContext("2d");
    pathWidth = 20;
    wall = 5;
    outerWall = 5;
    width = 25 * KiddoPaint.Current.scaling;
    height = 25 * KiddoPaint.Current.scaling;
    delay = 1;
    x = width / 2 | 0;
    y = height / 2 | 0;
    seed = Math.random() * 1e5 | 0;
    wallColor = KiddoPaint.Current.color;
    pathColor = KiddoPaint.Current.altColor;
    randomGen = function(seed) {
        if (seed === undefined) var seed = performance.now();
        return function() {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
        };
    };
    init = function() {
        offset = pathWidth / 2 + outerWall;
        map = [];
        mazeWidth = outerWall * 2 + width * (pathWidth + wall) - wall;
        mazeHeight = outerWall * 2 + height * (pathWidth + wall) - wall;
        canvasBrush.width = mazeWidth;
        canvasBrush.height = mazeHeight;
        contextBrush.globalCompositeOperation = "source-over";
        contextBrush.fillStyle = wallColor;
        contextBrush.fillRect(0, 0, mazeWidth, mazeHeight);
        random = randomGen(seed);
        contextBrush.strokeStyle = pathColor;
        contextBrush.globalCompositeOperation = "destination-out";
        contextBrush.lineCap = "square";
        contextBrush.lineWidth = pathWidth;
        contextBrush.beginPath();
        for (var i = 0; i < height * 2; i++) {
            map[i] = [];
            for (var j = 0; j < width * 2; j++) {
                map[i][j] = false;
            }
        }
        map[y * 2][x * 2] = true;
        route = [ [ x, y ] ];
        contextBrush.moveTo(x * (pathWidth + wall) + offset, y * (pathWidth + wall) + offset);
    };
    init();
    loop = function() {
        x = route[route.length - 1][0] | 0;
        y = route[route.length - 1][1] | 0;
        var directions = [ [ 1, 0 ], [ -1, 0 ], [ 0, 1 ], [ 0, -1 ] ], alternatives = [];
        for (var i = 0; i < directions.length; i++) {
            if (map[(directions[i][1] + y) * 2] != undefined && map[(directions[i][1] + y) * 2][(directions[i][0] + x) * 2] === false) {
                alternatives.push(directions[i]);
            }
        }
        if (alternatives.length === 0) {
            route.pop();
            if (route.length > 0) {
                contextBrush.moveTo(route[route.length - 1][0] * (pathWidth + wall) + offset, route[route.length - 1][1] * (pathWidth + wall) + offset);
                loop();
            }
            return;
        }
        direction = alternatives[random() * alternatives.length | 0];
        route.push([ direction[0] + x, direction[1] + y ]);
        contextBrush.lineTo((direction[0] + x) * (pathWidth + wall) + offset, (direction[1] + y) * (pathWidth + wall) + offset);
        map[(direction[1] + y) * 2][(direction[0] + x) * 2] = true;
        map[direction[1] + y * 2][direction[0] + x * 2] = true;
        contextBrush.stroke();
        loop();
    };
    loop();
    contextBrush.closePath();
    return canvasBrush;
}

KiddoPaint.Tools.Toolbox.Ink = function() {
    var tool = this;
    this.isDown = false;
    this.size = 36;
    this.scale = 1;
    this.gfx = fx.canvas();
    this.initialClick = {};
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.initialClick = ev;
        tool.mousemove(ev);
    };
    this.mousemove = function(ev) {
        var target = KiddoPaint.Display.main_context.getImageData(ev._x - tool.size, ev._y - tool.size, 2 * tool.size, 2 * tool.size);
        var ctx = tool.isDown ? KiddoPaint.Display.context : KiddoPaint.Display.previewContext;
        var t = tool.gfx.texture(target);
        var moo = tool.gfx.draw(t).edgeWork(tool.size / 2).update();
        ctx.drawImage(moo, ev._x - tool.scale * tool.size, ev._y - tool.scale * tool.size);
        t.destroy();
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
        }
    };
};

KiddoPaint.Tools.Ink = new KiddoPaint.Tools.Toolbox.Ink();

KiddoPaint.Tools.Toolbox.Pines = function() {
    var tool = this;
    this.isDown = false;
    this.previousEv = null;
    this.texture = function() {
        return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
    };
    this.spacing = 3;
    this.strokeSize = 1;
    this.boundingBox = 25;
    this.jitter = function() {
        return getRandomFloat(-tool.boundingBox, tool.boundingBox);
    };
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.previousEv = ev;
    };
    this.mousemove = function(ev) {
        if (tool.isDown) {
            if (tool.previousEv == null || distanceBetween(tool.previousEv, ev) > tool.spacing) {
                KiddoPaint.Sounds.brushpines();
                jitterx = tool.jitter();
                jittery = tool.jitter();
                for (let i = 0; i < 7; i++) {
                    KiddoPaint.Display.context.beginPath();
                    KiddoPaint.Display.context.moveTo(ev._x, ev._y);
                    KiddoPaint.Display.context.lineTo(tool.previousEv._x + jitterx, tool.previousEv._y + jittery);
                    KiddoPaint.Display.context.strokeStyle = tool.texture();
                    KiddoPaint.Display.context.lineWidth = tool.strokeSize;
                    KiddoPaint.Display.context.stroke();
                    KiddoPaint.Display.context.closePath();
                }
                tool.previousEv = ev;
            }
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.mousemove(ev);
            tool.isDown = false;
            tool.previousEv = null;
            KiddoPaint.Display.saveMain();
        }
    };
};

KiddoPaint.Tools.Pines = new KiddoPaint.Tools.Toolbox.Pines();

KiddoPaint.Tools.Toolbox.Pencil = function() {
    var tool = this;
    this.isDown = false;
    this.lastX = 0;
    this.lastY = 0;
    this.size = 7;
    this.texture = function(color) {
        return KiddoPaint.Textures.Solid(color);
    };
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.lastX = ev._x;
        tool.lastY = ev._y;
    };
    this.mousemove = function(ev) {
        if (tool.isDown) {
            KiddoPaint.Sounds.pencil();
            KiddoPaint.Display.context.beginPath();
            KiddoPaint.Display.context.strokeStyle = tool.texture(KiddoPaint.Current.color);
            KiddoPaint.Display.context.lineWidth = tool.size * KiddoPaint.Current.scaling;
            KiddoPaint.Display.context.lineCap = "round";
            KiddoPaint.Display.context.lineJoin = "round";
            KiddoPaint.Display.context.moveTo(tool.lastX, tool.lastY);
            KiddoPaint.Display.context.lineTo(ev._x, ev._y);
            KiddoPaint.Display.context.stroke();
            tool.lastX = ev._x;
            tool.lastY = ev._y;
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.mousemove(ev);
            KiddoPaint.Display.context.closePath();
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
        }
    };
};

KiddoPaint.Tools.Pencil = new KiddoPaint.Tools.Toolbox.Pencil();

KiddoPaint.Tools.Toolbox.Placer = function() {
    var tool = this;
    this.isDown = false;
    this.image = {};
    this.prevTool = {};
    this.size = {};
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.mousemove(ev);
    };
    this.mousemove = function(ev) {
        var ctx = tool.isDown ? KiddoPaint.Display.context : KiddoPaint.Display.previewContext;
        var alt = KiddoPaint.Current.modifiedAlt;
        var ctrl = KiddoPaint.Current.modifiedMeta;
        function drawImageff(img, x, y, width, height, flip, flop, center) {
            ctx.save();
            if (typeof width === "undefined") width = img.width;
            if (typeof height === "undefined") height = img.height;
            if (typeof center === "undefined") center = false;
            if (center) {
                x -= width / 2;
                y -= height / 2;
            }
            ctx.translate(x + width / 2, y + height / 2);
            ctx.scale(flip ? -1 : 1, flop ? -1 : 1);
            ctx.drawImage(img, -width / 2, -height / 2);
            ctx.restore();
        }
        if (KiddoPaint.Current.modifiedRange != 0) {
            var scale = 1 + KiddoPaint.Current.modifiedRange / 100;
            var scaledImg = scaleImageDataCanvasAPI(tool.image, scale);
            drawImageff(scaledImg, ev._x, ev._y, tool.size.width * scale, tool.size.height * scale, KiddoPaint.Current.modifiedAlt, KiddoPaint.Current.modifiedMeta, true);
        } else {
            drawImageff(tool.image, ev._x, ev._y, tool.size.width, tool.size.height, KiddoPaint.Current.modifiedAlt, KiddoPaint.Current.modifiedMeta, true);
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            tool.image = {};
            KiddoPaint.Display.saveMain();
            KiddoPaint.Current.tool = tool.prevTool;
            reset_ranges();
            tool.prevTool = {};
            tool.size = {};
        }
    };
};

KiddoPaint.Tools.Placer = new KiddoPaint.Tools.Toolbox.Placer();

KiddoPaint.Tools.Toolbox.PlainBrush = function() {
    var tool = this;
    this.isDown = false;
    this.previousEv = null;
    this.texture = function() {};
    this.preprocess = function() {};
    this.postprocess = function() {};
    this.soundduring = function() {};
    this.spacing = 5;
    this.step = 0;
    this.pstep = 0;
    this.alwaysGapFill = false;
    this.reset = function() {
        tool.isDown = false;
        tool.previousEv = null;
        tool.texture = function() {};
        tool.preprocess = function() {};
        tool.postprocess = function() {};
        tool.soundduring = function() {};
        tool.step = 0;
        tool.pstep = 0;
        tool.alwaysGapFill = false;
    };
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.mousemove(ev);
        tool.previousEv = ev;
        tool.preprocess();
    };
    this.mousemove = function(ev) {
        if (tool.isDown) {
            if (tool.previousEv == null || distanceBetween(tool.previousEv, ev) > tool.spacing) {
                if (KiddoPaint.Current.modifiedTilde) {
                    KiddoPaint.Display.context.globalAlpha *= .95;
                    KiddoPaint.Display.previewContext.globalAlpha *= .95;
                }
                if ((KiddoPaint.Current.modifiedAlt || tool.alwaysGapFill) && tool.previousEv != null) {
                    var dist = distanceBetween(tool.previousEv, ev);
                    var angle = angleBetweenRad(tool.previousEv, ev);
                    for (var i = 0; i < dist; i += 5) {
                        var x = tool.previousEv._x + Math.sin(angle) * i;
                        var y = tool.previousEv._y + Math.cos(angle) * i;
                        var brushFill = tool.texture(tool.step, tool.pstep);
                        KiddoPaint.Display.context.drawImage(brushFill.brush, Math.round(x - brushFill.offset), Math.round(y - brushFill.offset));
                        tool.step += 1;
                        tool.pstep += 1;
                        if (KiddoPaint.Current.modifiedTilde) {
                            KiddoPaint.Display.context.globalAlpha *= .99;
                            KiddoPaint.Display.previewContext.globalAlpha *= .99;
                        }
                    }
                }
                var brushFill = tool.texture(tool.step, tool.pstep);
                tool.soundduring();
                KiddoPaint.Display.context.drawImage(brushFill.brush, Math.round(ev._x - brushFill.offset), Math.round(ev._y - brushFill.offset));
                tool.previousEv = ev;
                tool.step += 1;
                tool.pstep += 1;
            }
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.mousemove(ev);
            tool.isDown = false;
            tool.previousEv = null;
            tool.step = 0;
            tool.postprocess();
            KiddoPaint.Display.saveMain();
            KiddoPaint.Display.context.globalAlpha = KiddoPaint.Current.globalAlpha;
            KiddoPaint.Display.previewContext.globalAlpha = KiddoPaint.Current.globalAlpha;
        }
    };
};

KiddoPaint.Tools.PlainBrush = new KiddoPaint.Tools.Toolbox.PlainBrush();

KiddoPaint.Tools.Toolbox.Scribble = function() {
    var tool = this;
    this.isDown = false;
    this.previousEv = null;
    this.texture = function() {
        return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
    };
    this.spacing = 5;
    this.size = 1;
    this.jitter = function() {
        let baseJitter = KiddoPaint.Current.modifiedMeta ? 25 : 10;
        return baseJitter + Math.random() * baseJitter;
    };
    this.mousedown = function(ev) {
        KiddoPaint.Sounds.brushzigzag();
        tool.isDown = true;
        KiddoPaint.Display.context.beginPath();
        KiddoPaint.Display.context.moveTo(ev._x, ev._y);
        tool.previousEv = ev;
    };
    this.mousemove = function(ev) {
        if (tool.isDown) {
            if (tool.previousEv == null || distanceBetween(tool.previousEv, ev) > tool.spacing) {
                KiddoPaint.Sounds.brushzigzag();
                jitterx = tool.jitter();
                jittery = tool.jitter();
                KiddoPaint.Display.context.lineTo(ev._x + (Math.random() * jitterx - jitterx / 2), ev._y + (Math.random() * jittery - jittery / 2));
                KiddoPaint.Display.context.strokeStyle = tool.texture();
                KiddoPaint.Display.context.lineWidth = tool.size;
                KiddoPaint.Display.context.stroke();
                tool.previousEv = ev;
            }
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.mousemove(ev);
            tool.isDown = false;
            tool.previousEv = null;
            KiddoPaint.Display.context.closePath();
            KiddoPaint.Display.saveMain();
        }
    };
};

KiddoPaint.Tools.Scribble = new KiddoPaint.Tools.Toolbox.Scribble();

KiddoPaint.Tools.Toolbox.Smoke = function() {
    var tool = this;
    this.isDown = false;
    this.party = {};
    this.mousedown = function(ev) {
        tool.isDown = true;
        KiddoPaint.Display.context.save();
        var smokeColor = color2json(KiddoPaint.Current.color);
        tool.party = SmokeMachine(KiddoPaint.Display.context, [ smokeColor.r, smokeColor.g, smokeColor.b ]);
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

KiddoPaint.Tools.Toolbox.SmoothPen = function() {
    var tool = this;
    this.isDown = false;
    this.previousEv = null;
    this.spacing = 25;
    this.points = [];
    this.rainbowMode = false;
    this.size = function() {
        return KiddoPaint.Tools.Pencil.size;
    };
    this.texture = function() {
        tool.rainbowMode = KiddoPaint.Tools.Pencil.texture.toString().includes("RSolid");
        return KiddoPaint.Tools.Pencil.texture();
    };
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.points = [];
    };
    this.mousemove = function(ev) {
        if (tool.isDown) {
            if (tool.previousEv == null || distanceBetween(tool.previousEv, ev) > tool.spacing) {
                tool.points.push([ ev._x, ev._y ]);
                tool.previousEv = ev;
            }
            renderFitLine(KiddoPaint.Display.previewContext);
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            tool.points.push([ ev._x, ev._y ]);
            KiddoPaint.Display.clearPreview();
            renderFitLine(KiddoPaint.Display.context);
            KiddoPaint.Display.saveMain();
        }
    };
    function offsetPoints(bezPoints, xoffsetAmount, yoffsetAmount, index) {
        var colors = KiddoPaint.Colors.rainbowPalette();
        var startPt = bezPoints[0];
        var ctrl1 = bezPoints[1];
        var ctrl2 = bezPoints[2];
        var stopPt = bezPoints[3];
        return [ [ startPt[0] + xoffsetAmount, startPt[1] + yoffsetAmount ], [ ctrl1[0] + xoffsetAmount, ctrl1[1] + yoffsetAmount ], [ ctrl2[0] + xoffsetAmount, ctrl2[1] + yoffsetAmount ], [ stopPt[0] + xoffsetAmount, stopPt[1] + yoffsetAmount ], colors[index] ];
    }
    function renderFitLine(ctx) {
        var fitted = fitCurve(tool.points, 75);
        if (fitted) {
            ctx.strokeStyle = tool.texture();
            ctx.lineWidth = tool.size();
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            var lines = tool.rainbowMode ? 7 : 1;
            fitted.forEach(element => {
                for (var i = 0; i < lines; i++) {
                    var offsetElement = offsetPoints(element, 0, 11 * i, i);
                    var startPt = offsetElement[0];
                    var ctrl1 = offsetElement[1];
                    var ctrl2 = offsetElement[2];
                    var stopPt = offsetElement[3];
                    var rainbowColor = tool.rainbowMode ? offsetElement[4] : null;
                    ctx.beginPath();
                    if (rainbowColor) {
                        ctx.strokeStyle = rainbowColor;
                    }
                    ctx.moveTo(startPt[0], startPt[1]);
                    ctx.bezierCurveTo(ctrl1[0], ctrl1[1], ctrl2[0], ctrl2[1], stopPt[0], stopPt[1]);
                    ctx.stroke();
                    ctx.closePath();
                }
            });
        }
    }
};

KiddoPaint.Tools.SmoothPen = new KiddoPaint.Tools.Toolbox.SmoothPen();

KiddoPaint.Tools.Toolbox.Smudge = function() {
    var tool = this;
    this.isDown = false;
    this.size = 36;
    this.previousEv = null;
    this.brushCtx = document.createElement("canvas").getContext("2d");
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
        KiddoPaint.Display.context.globalAlpha = .5;
        for (let more = true; more; ) {
            more = advanceLine(line);
            KiddoPaint.Display.context.drawImage(tool.brushCtx.canvas, line.position[0] - tool.brushCtx.canvas.width / 2, line.position[1] - tool.brushCtx.canvas.height / 2);
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
        ctx.fillStyle = createFeatherGradient(tool.size, .1);
        ctx.globalCompositeOperation = "destination-out";
        const {width: width, height: height} = ctx.canvas;
        ctx.translate(width / 2, height / 2);
        ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.restore();
    }
    function updateBrush(x, y) {
        let width = tool.brushCtx.canvas.width;
        let height = tool.brushCtx.canvas.height;
        let srcX = x - width / 2;
        let srcY = y - height / 2;
        let dstX = (tool.brushCtx.canvas.width - width) / 2;
        let dstY = (tool.brushCtx.canvas.height - height) / 2;
        tool.brushCtx.clearRect(0, 0, tool.brushCtx.canvas.width, tool.brushCtx.canvas.height);
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
        tool.brushCtx.drawImage(KiddoPaint.Display.main_context.canvas, srcX, srcY, width, height, dstX, dstY, width, height);
        tool.brushCtx.drawImage(KiddoPaint.Display.context.canvas, srcX, srcY, width, height, dstX, dstY, width, height);
        feather(tool.brushCtx);
    }
    function setupLine(x, y, targetX, targetY) {
        const deltaX = targetX - x;
        const deltaY = targetY - y;
        const deltaRow = Math.abs(deltaX);
        const deltaCol = Math.abs(deltaY);
        const counter = Math.max(deltaCol, deltaRow);
        const axis = counter == deltaCol ? 1 : 0;
        return {
            position: [ x, y ],
            delta: [ deltaX, deltaY ],
            deltaPerp: [ deltaRow, deltaCol ],
            inc: [ Math.sign(deltaX), Math.sign(deltaY) ],
            accum: Math.floor(counter / 2),
            counter: counter,
            endPnt: counter,
            axis: axis,
            u: 0
        };
    }
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

KiddoPaint.Tools.Toolbox.Spiral = function() {
    var tool = this;
    this.isDown = false;
    this.mousedown = function(ev) {
        tool.isDown = true;
        drawSpiral(ev._x, ev._y);
        processMainCanvas();
    };
    this.mousemove = function(ev) {};
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
        }
    };
};

KiddoPaint.Tools.Spiral = new KiddoPaint.Tools.Toolbox.Spiral();

KiddoPaint.Current.kdspiral = {};

function drawSpiral(cx, cy) {
    var width = 5e3;
    var height = 5e3;
    var phi = (Math.sqrt(5) + 1) / 2 - 1;
    var golden_angle = phi * 2 * Math.PI;
    var lg_area = width * height;
    var points = [];
    var sm_area = golden_angle * 3;
    var nbr_circles = lg_area / sm_area;
    for (var i = 1; i <= nbr_circles; ++i) {
        var angle = i * golden_angle;
        var cum_area = i * sm_area;
        var spiral_rad = Math.sqrt(cum_area / Math.PI);
        var x = cx + Math.cos(angle) * spiral_rad;
        var y = cy + Math.sin(angle) * spiral_rad;
        points.push({
            x: x,
            y: y
        });
    }
    var distance = function(a, b) {
        return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
    };
    KiddoPaint.Current.kdspiral = new kdTree(points, distance, [ "x", "y" ]);
}

function processMainCanvas() {
    var w = KiddoPaint.Display.main_canvas.width;
    var h = KiddoPaint.Display.main_canvas.height;
    var pixels = KiddoPaint.Display.main_context.getImageData(0, 0, w, h);
    function isBlack(n) {
        return pixels.data[n] == 0 && pixels.data[n + 1] == 0 && pixels.data[n + 2] == 0 && pixels.data[n + 3] == 255;
    }
    function isTransparent(n) {
        return pixels.data[n + 3] == 0;
    }
    function isWhite(n) {
        return pixels.data[n] == 255 && pixels.data[n + 1] == 255 && pixels.data[n + 2] == 255 && pixels.data[n + 3] == 255;
    }
    function isAlone(x, y) {
        var above = ((y - 1) * w + x) * 4;
        var abover = ((y - 1) * w + (x + 1)) * 4;
        var abovel = ((y - 1) * w + (x - 1)) * 4;
        var below = ((y + 1) * w + x) * 4;
        var belowr = ((y + 1) * w + (x + 1)) * 4;
        var belowl = ((y + 1) * w + (x - 1)) * 4;
        var left = (y * w + (x - 1)) * 4;
        var right = (y * w + (x + 1)) * 4;
        return isBlack(above) && isBlack(below) && isBlack(right) && isBlack(left) && isBlack(abover) && isBlack(abovel) && isBlack(belowr) && isBlack(belowl);
    }
    var snaptospiral = [];
    for (i = 1; i < w - 1; i++) {
        for (j = 1; j < h - 1; j++) {
            var linear_cords = 4 * (j * w + i);
            if (isWhite(linear_cords) && isAlone(i, j)) {
                pixels.data[linear_cords + 0] = 0;
                pixels.data[linear_cords + 1] = 0;
                pixels.data[linear_cords + 2] = 0;
                pixels.data[linear_cords + 3] = 255;
                var nearest = KiddoPaint.Current.kdspiral.nearest({
                    x: i,
                    y: j
                }, 1);
                snaptospiral.push(nearest[0][0]);
            }
        }
    }
    KiddoPaint.Display.clearMain();
    KiddoPaint.Display.main_context.putImageData(pixels, 0, 0);
    KiddoPaint.Display.context.fillStyle = "white";
    snaptospiral.forEach(element => KiddoPaint.Display.context.fillRect(Math.round(element.x), Math.round(element.y), 1, 1));
}

KiddoPaint.Tools.Toolbox.SpritePlacer = function() {
    var tool = this;
    this.isDown = false;
    this.image = {};
    this.prevTool = {};
    this.size = {};
    this.soundBefore = function() {};
    this.soundDuring = function() {};
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.mousemove(ev);
        tool.soundBefore();
    };
    this.mousemove = function(ev) {
        var ctx = tool.isDown ? KiddoPaint.Display.context : KiddoPaint.Display.previewContext;
        var alt = KiddoPaint.Current.modifiedAlt;
        var ctrl = KiddoPaint.Current.modifiedMeta;
        function drawImageff(img, x, y, width, height, flip, flop, center) {
            ctx.save();
            ctx.imageSmoothingEnabled = false;
            img = scaleImageDataCanvasAPIPixelated(img, 1 * KiddoPaint.Current.scaling * (KiddoPaint.Current.modifiedCtrl ? 3 : 1));
            if (typeof width === "undefined") width = img.width;
            if (typeof height === "undefined") height = img.height;
            if (typeof center === "undefined") center = false;
            if (center) {
                x -= width / 2;
                y -= height / 2;
            }
            ctx.translate(x + width / 2, y + height / 2);
            ctx.scale(flip ? -1 : 1, flop ? -1 : 1);
            ctx.drawImage(img, -width / 2, -height / 2);
            ctx.restore();
        }
        if (tool.isDown) {
            tool.soundDuring();
        }
        drawImageff(tool.image, ev._x, ev._y, tool.size.width, tool.size.height, KiddoPaint.Current.modifiedAlt, KiddoPaint.Current.modifiedMeta, true);
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
            tool.size = {};
        }
    };
};

KiddoPaint.Tools.SpritePlacer = new KiddoPaint.Tools.Toolbox.SpritePlacer();

KiddoPaint.Tools.Toolbox.Square = function() {
    var tool = this;
    this.isDown = false;
    this.size = 1;
    this.startEv = null;
    this.texture = function() {
        return KiddoPaint.Textures.None();
    };
    this.stroke = function() {
        return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
    };
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.startEv = ev;
    };
    this.mousemove = function(ev) {
        if (tool.startEv) {
            var ctx = tool.isDown ? KiddoPaint.Display.previewContext : KiddoPaint.Display.context;
            let sizex = ev._x - tool.startEv._x;
            let sizey = ev._y - tool.startEv._y;
            if (KiddoPaint.Current.modified) {
                let signx = Math.sign(sizex);
                let signy = Math.sign(sizey);
                sizex = sizey = Math.max(Math.abs(sizex), Math.abs(sizey));
                sizex *= signx;
                sizey *= signy;
            }
            if (!KiddoPaint.Current.modifiedCtrl) {
                ctx.strokeStyle = tool.stroke();
                ctx.lineWidth = 1.5;
                ctx.strokeRect(tool.startEv._x, tool.startEv._y, sizex, sizey);
            }
            ctx.fillStyle = tool.texture(tool.startEv, ev);
            ctx.fillRect(tool.startEv._x, tool.startEv._y, sizex, sizey);
            KiddoPaint.Sounds.box();
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            tool.mousemove(ev);
            KiddoPaint.Display.saveMain();
            tool.startEv = null;
        }
    };
};

KiddoPaint.Tools.Square = new KiddoPaint.Tools.Toolbox.Square();

KiddoPaint.Tools.Toolbox.Stamp = function() {
    var tool = this;
    this.isDown = false;
    this.stamp = "🚂";
    this.size = 64;
    this.useColor = false;
    this.seed = 1;
    this.texture = function() {
        var altSize = KiddoPaint.Cache.getStampSettings(tool.stamp).altSize;
        if (KiddoPaint.Current.modifiedRange !== 0) {
            var modifiedSize = KiddoPaint.Current.modifiedRange + 112;
            KiddoPaint.Cache.setStampSetting(tool.stamp, "altSize", modifiedSize);
            altSize = modifiedSize;
        }
        tool.size = KiddoPaint.Current.modified ? altSize : 64;
        var hueShift = KiddoPaint.Cache.getStampSettings(tool.stamp).hueShift;
        if (KiddoPaint.Current.modifiedCtrlRange !== 0) {
            var modifiedHue = KiddoPaint.Current.modifiedCtrlRange / 100;
            KiddoPaint.Cache.setStampSetting(tool.stamp, "hueShift", modifiedHue);
            hueShift = modifiedHue;
        }
        return KiddoPaint.Stamps.stamp(tool.stamp, KiddoPaint.Current.modifiedAlt, KiddoPaint.Current.modifiedMeta, tool.size, hueShift, tool.useColor ? KiddoPaint.Current.color : null);
    };
    this.mousedown = function(ev) {
        var rng = srng(tool.seed);
        tool.isDown = true;
        KiddoPaint.Sounds.stamp();
        KiddoPaint.Display.context.fillStyle = tool.useColor ? KiddoPaint.Current.color : null;
        var brushFill = tool.texture();
        KiddoPaint.Display.context.drawImage(brushFill, Math.round(ev._x), Math.round(ev._y - tool.size));
        if (KiddoPaint.Current.multiplier > 1) {
            for (var i = 0; i < 2 * KiddoPaint.Current.multiplier; i++) {
                var x = Math.round(ev._x + (1e3 * rng.next() - 500));
                var y = Math.round(ev._y + (20 * rng.next() - 10) - tool.size);
                KiddoPaint.Display.context.drawImage(brushFill, x, y);
            }
        }
    };
    this.mousemove = function(ev) {
        var rng = srng(tool.seed);
        if (!tool.isDown) {
            KiddoPaint.Display.previewContext.fillStyle = tool.useColor ? KiddoPaint.Current.color : null;
            var brushFill = tool.texture();
            KiddoPaint.Display.previewContext.drawImage(brushFill, Math.round(ev._x), Math.round(ev._y - tool.size));
            if (KiddoPaint.Current.multiplier > 1) {
                for (var i = 0; i < 2 * KiddoPaint.Current.multiplier; i++) {
                    var x = Math.round(ev._x + (1e3 * rng.next() - 500));
                    var y = Math.round(ev._y + (20 * rng.next() - 10) - tool.size);
                    KiddoPaint.Display.previewContext.drawImage(brushFill, x, y);
                }
            }
        }
    };
    this.mouseup = function(ev) {
        tool.isDown = false;
        tool.seed += 1;
        KiddoPaint.Display.saveMain();
    };
};

KiddoPaint.Tools.Stamp = new KiddoPaint.Tools.Toolbox.Stamp();

KiddoPaint.Tools.Toolbox.ThreeDBrush = function() {
    var tool = this;
    this.isDown = false;
    this.size = function() {
        return 16 * KiddoPaint.Current.scaling;
    };
    this.previousEv = null;
    this.spacing = 3;
    this.texture = function() {
        let shadecolor = colorNearWhite(color2json(KiddoPaint.Current.color)) ? "black" : "white";
        if (KiddoPaint.Current.modifiedAlt) {
            return KiddoPaint.Textures.Bubbles(shadecolor);
        } else if (KiddoPaint.Current.modifiedCtrl) {
            return KiddoPaint.Textures.Speckles(shadecolor);
        } else if (KiddoPaint.Current.modifiedMeta) {
            return KiddoPaint.Textures.Sand(shadecolor);
        } else {
            return KiddoPaint.Textures.Partial1(shadecolor);
        }
    };
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.mousemove(ev);
        tool.previousEv = ev;
    };
    this.mousemove = function(ev) {
        if (tool.isDown) {
            if (KiddoPaint.Current.modifiedToggle) {
                ev._x = ev._x - ev._x % tool.size();
                ev._y = ev._y - ev._y % tool.size();
            }
            if (tool.previousEv == null || distanceBetween(tool.previousEv, ev) < tool.spacing) {
                KiddoPaint.Display.context.fillStyle = KiddoPaint.Current.color;
                KiddoPaint.Display.context.fillRect(Math.round(ev._x), Math.round(ev._y), tool.size(), tool.size());
                KiddoPaint.Display.context.fillStyle = tool.texture();
                KiddoPaint.Display.context.fillRect(Math.round(ev._x), Math.round(ev._y), tool.size() / 2, tool.size() / 2);
            } else {
                bresenham(tool.previousEv._x, tool.previousEv._y, ev._x, ev._y, function(lx, ly) {
                    KiddoPaint.Display.context.fillStyle = KiddoPaint.Current.color;
                    KiddoPaint.Display.context.fillRect(lx, ly, tool.size(), tool.size());
                    KiddoPaint.Display.context.fillStyle = tool.texture();
                    KiddoPaint.Display.context.fillRect(lx, ly, tool.size() / 2, tool.size() / 2);
                });
            }
            tool.previousEv = ev;
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.mousemove(ev);
            tool.isDown = false;
            tool.previousEv = null;
            KiddoPaint.Display.saveMain();
        }
    };
};

KiddoPaint.Tools.ThreeDBrush = new KiddoPaint.Tools.Toolbox.ThreeDBrush();

KiddoPaint.Tools.Toolbox.Tnt = function() {
    var tool = this;
    this.isDown = false;
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.animate(ev);
    };
    this.mousemove = function(ev) {};
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
        }
    };
    this.animate = function(ev) {
        KiddoPaint.Display.saveUndo();
        KiddoPaint.Display.pauseUndo();
        var iter = 1;
        var intervalID = setInterval(drawBomb, 175);
        KiddoPaint.Sounds.explosion();
        drawBomb();
        function drawBomb() {
            var ctx = KiddoPaint.Display.context;
            ctx.beginPath();
            ctx.fillStyle = "rgb(0, 255, 0)";
            ctx.arc(ev._x, ev._y, 50 * iter, 0, 2 * Math.PI);
            ctx.fill();
            KiddoPaint.Display.saveMainGcoSkipUndo("difference");
            iter++;
            if (iter > 15) {
                clearInterval(intervalID);
                KiddoPaint.Display.clearAll();
                KiddoPaint.Display.resumeUndo();
            } else if (KiddoPaint.Current.modifiedMeta) {
                clearInterval(intervalID);
                KiddoPaint.Display.resumeUndo();
            }
        }
    };
};

KiddoPaint.Tools.Tnt = new KiddoPaint.Tools.Toolbox.Tnt();

KiddoPaint.Tools.Toolbox.Tree = function() {
    var tool = this;
    this.isDown = false;
    this.mousedown = function(ev) {
        tool.isDown = true;
        KiddoPaint.Sounds.brushtree();
        drawTree(ev._x, ev._y, 32 * KiddoPaint.Current.scaling, -Math.PI / 2, 12, 15);
    };
    this.mousemove = function(ev) {};
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            KiddoPaint.Display.saveMain();
        }
    };
};

KiddoPaint.Tools.Tree = new KiddoPaint.Tools.Toolbox.Tree();

function drawTree(startX, startY, length, angle, depth, branchWidth) {
    var rand = Math.random;
    var newLength, newAngle, newDepth, maxBranch = 3, endX, endY, maxAngle = 2 * Math.PI / 6, subBranches;
    KiddoPaint.Display.context.beginPath();
    KiddoPaint.Display.context.moveTo(startX, startY);
    endX = startX + length * Math.cos(angle);
    endY = startY + length * Math.sin(angle);
    KiddoPaint.Display.context.lineCap = "round";
    KiddoPaint.Display.context.lineWidth = branchWidth;
    KiddoPaint.Display.context.lineTo(endX, endY);
    if (depth <= 2) {
        KiddoPaint.Display.context.strokeStyle = "rgb(0," + (rand() * 64 + 128 >> 0) + ",0)";
    } else {
        KiddoPaint.Display.context.strokeStyle = "rgb(0," + (rand() * 64 + 64 >> 0) + ",20)";
    }
    KiddoPaint.Display.context.stroke();
    newDepth = depth - 1;
    if (!newDepth) {
        return;
    }
    subBranches = rand() * (maxBranch - 1) + 1;
    branchWidth *= .7;
    for (var i = 0; i < subBranches; i++) {
        newAngle = angle + rand() * maxAngle - maxAngle * .5;
        newLength = length * (.7 + rand() * .3);
        drawTree(endX, endY, newLength, newAngle, newDepth, branchWidth);
    }
}

KiddoPaint.Tools.Toolbox.WackyMixerCheckerboard = function() {
    var tool = this;
    this.mousedown = function(ev) {
        var ctx = KiddoPaint.Display.context;
        ctx.fillStyle = KiddoPaint.Textures.BigGrid();
        ctx.fillRect(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
        KiddoPaint.Display.saveMainGco("difference");
    };
    this.mousemove = function(ev) {};
    this.mouseup = function(ev) {};
};

KiddoPaint.Tools.WackyMixerCheckerboard = new KiddoPaint.Tools.Toolbox.WackyMixerCheckerboard();

KiddoPaint.Tools.Toolbox.ElectricMixerInvert = function() {
    var tool = this;
    this.isDown = false;
    this.leftside = {};
    this.rightside = {};
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.leftside = KiddoPaint.Display.main_context.getImageData(0, 0, KiddoPaint.Display.main_canvas.width / 2, KiddoPaint.Display.main_canvas.height);
        tool.rightside = KiddoPaint.Display.main_context.getImageData(KiddoPaint.Display.main_canvas.width / 2, 0, KiddoPaint.Display.main_canvas.width / 2, KiddoPaint.Display.main_canvas.height);
        tool.animate(ev);
    };
    this.mousemove = function(ev) {};
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            tool.leftside = {};
            tool.rightside = {};
        }
    };
    this.animate = function(ev) {
        var iter = 1;
        var right = flattenImage(tool.rightside);
        var left = flattenImage(tool.leftside);
        KiddoPaint.Display.animContext.putImageData(left, 0, 0);
        KiddoPaint.Display.animContext.putImageData(right, KiddoPaint.Display.main_canvas.width / 2, 0);
        KiddoPaint.Tools.WholeCanvasEffect.effect = JumbleFx.INVERT;
        KiddoPaint.Tools.WholeCanvasEffect.mousedown(ev);
        KiddoPaint.Tools.WholeCanvasEffect.mouseup(ev);
        KiddoPaint.Sounds.mixerinvert();
        var intervalID = setInterval(drawSlideOut, 20);
        drawSlideOut();
        function drawSlideOut() {
            let totalIter = 70;
            let step = KiddoPaint.Display.main_canvas.width / 2 / totalIter;
            KiddoPaint.Display.clearAnim();
            KiddoPaint.Display.animContext.putImageData(left, 0 - iter * step, 0);
            KiddoPaint.Display.animContext.putImageData(right, KiddoPaint.Display.main_canvas.width / 2 + iter * step, 0);
            iter++;
            if (iter > totalIter) {
                clearInterval(intervalID);
                KiddoPaint.Display.clearAnim();
            }
        }
    };
};

KiddoPaint.Tools.ElectricMixerInvert = new KiddoPaint.Tools.Toolbox.ElectricMixerInvert();

KiddoPaint.Tools.Toolbox.WackyMixerPattern = function() {
    var tool = this;
    this.patternImages = [ "img/kidpix-mixer-pattern-206.png", "img/kidpix-mixer-pattern-207.png", "img/kidpix-mixer-pattern-208.png", "img/kidpix-mixer-pattern-209.png", "img/kidpix-mixer-pattern-210.png", "img/kidpix-mixer-pattern-211.png", "img/kidpix-mixer-pattern-212.png", "img/kidpix-mixer-pattern-213.png", "img/kidpix-mixer-pattern-214.png", "img/kidpix-mixer-pattern-215.png", "img/kidpix-mixer-pattern-216.png", "img/kidpix-mixer-pattern-217.png", "img/kidpix-mixer-pattern-218.png", "img/kidpix-mixer-pattern-219.png", "img/kidpix-mixer-pattern-220.png", "img/kidpix-mixer-pattern-221.png", "img/kidpix-mixer-pattern-222.png", "img/kidpix-mixer-pattern-223.png", "img/kidpix-mixer-pattern-224.png", "img/kidpix-mixer-pattern-225.png", "img/kidpix-mixer-pattern-226.png", "img/kidpix-mixer-pattern-227.png", "img/kidpix-mixer-pattern-228.png", "img/kidpix-mixer-pattern-229.png", "img/kidpix-mixer-pattern-230.png" ];
    this.mousedown = function(ev) {
        KiddoPaint.Sounds.mixerframe();
        let image = new Image();
        image.src = tool.patternImages.random();
        image.crossOrigin = "anonymous";
        image.onload = function() {
            var ctx = KiddoPaint.Display.context;
            ctx.imageSmoothingEnabled = false;
            ctx.fillStyle = ctx.createPattern(scaleImageDataCanvasAPIPixelated(image, 4), "repeat");
            ctx.fillRect(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
            KiddoPaint.Display.saveMain();
        };
    };
    this.mousemove = function(ev) {};
    this.mouseup = function(ev) {};
};

KiddoPaint.Tools.WackyMixerPattern = new KiddoPaint.Tools.Toolbox.WackyMixerPattern();

KiddoPaint.Tools.Toolbox.ElectricMixerPip = function() {
    var tool = this;
    this.isDown = false;
    this.mousedown = function(ev) {
        tool.isDown = true;
        KiddoPaint.Sounds.mixerpip();
    };
    this.mousemove = function(ev) {};
    this.mouseup = function(ev) {
        if (tool.isDown) {
            KiddoPaint.Sounds.mixershadowbox();
            tool.isDown = false;
            var target = KiddoPaint.Display.main_context.getImageData(0, 0, KiddoPaint.Display.canvas.width, KiddoPaint.Display.canvas.height);
            KiddoPaint.Tools.Placer.image = KiddoPaint.Display.imageTypeToCanvas(scaleImageData(target, 1 / 5), false);
            KiddoPaint.Tools.Placer.size = {
                width: KiddoPaint.Display.canvas.width / 5,
                height: KiddoPaint.Display.canvas.width / 5
            };
            KiddoPaint.Current.tool = KiddoPaint.Tools.Placer;
            KiddoPaint.Tools.Placer.prevTool = KiddoPaint.Tools.ElectricMixerPip;
        }
    };
};

KiddoPaint.Tools.ElectricMixerPip = new KiddoPaint.Tools.Toolbox.ElectricMixerPip();

KiddoPaint.Tools.Toolbox.WackyMixerShadowBoxes = function() {
    var tool = this;
    this.isDown = false;
    this.animInterval = 50;
    this.timeout = null;
    this.mousedown = function(ev) {
        tool.isDown = true;
        KiddoPaint.Display.context.save();
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-guy-wow");
        let interval = tool.animInterval;
        tool.timeout = setTimeout(function draw() {
            tool.toolDraw();
            if (!tool.timeout) return;
            tool.timeout = setTimeout(draw, interval);
        }, interval);
        tool.toolDraw();
    };
    this.mousemove = function(ev) {};
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            KiddoPaint.Display.context.restore();
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add("cursor-guy-smile");
            if (tool.timeout) {
                clearTimeout(tool.timeout);
                tool.timeout = null;
            }
            KiddoPaint.Display.saveMain();
        }
    };
    this.toolDraw = function() {
        if (tool.isDown) {
            KiddoPaint.Sounds.mixershadowbox();
            let minSize = .05 * KiddoPaint.Display.canvas.width;
            let maxSize = .2 * KiddoPaint.Display.canvas.width;
            let rx = getRandomFloat(0, KiddoPaint.Display.canvas.width);
            let ry = getRandomFloat(0, KiddoPaint.Display.canvas.height);
            let rwidth = getRandomFloat(minSize, maxSize);
            let rheight = getRandomFloat(minSize, maxSize);
            let rdx = getRandomFloat(-25, KiddoPaint.Display.canvas.width);
            let rdy = getRandomFloat(-25, KiddoPaint.Display.canvas.height);
            var sourceImage = KiddoPaint.Display.main_context.getImageData(rx, ry, rwidth, rheight);
            KiddoPaint.Display.context.shadowColor = KiddoPaint.Current.modifiedMeta ? KiddoPaint.Colors.randomAllColor() : "black";
            KiddoPaint.Display.context.shadowBlur = 4;
            KiddoPaint.Display.context.lineWidth = 4;
            KiddoPaint.Display.context.shadowOffsetX = 2;
            KiddoPaint.Display.context.shadowOffsetY = 2;
            KiddoPaint.Display.context.strokeStyle = KiddoPaint.Current.color;
            KiddoPaint.Display.context.strokeRect(rdx, rdy, rwidth, rheight);
            KiddoPaint.Display.context.putImageData(sourceImage, rdx, rdy);
        }
    };
};

KiddoPaint.Tools.WackyMixerShadowBoxes = new KiddoPaint.Tools.Toolbox.WackyMixerShadowBoxes();

KiddoPaint.Tools.Toolbox.WackyMixerVenetianBlinds = function() {
    var tool = this;
    this.isDown = false;
    this.animInterval = 100;
    this.timeout = null;
    this.currentEv = null;
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.currentEv = ev;
        KiddoPaint.Display.context.save();
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-guy-wow");
        let interval = tool.animInterval;
        tool.timeout = setTimeout(function draw() {
            tool.toolDraw();
            if (!tool.timeout) return;
            tool.timeout = setTimeout(draw, interval);
        }, interval);
        tool.toolDraw();
    };
    this.mousemove = function(ev) {
        tool.currentEv = ev;
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            KiddoPaint.Display.context.restore();
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add("cursor-guy-smile");
            if (tool.timeout) {
                clearTimeout(tool.timeout);
                tool.timeout = null;
            }
            KiddoPaint.Display.clearAnim();
            KiddoPaint.Display.clearBeforeSaveMain();
        }
    };
    this.toolDraw = function() {
        if (tool.isDown) {
            KiddoPaint.Sounds.mixervenetian();
            KiddoPaint.Display.animContext.fillStyle = "white";
            KiddoPaint.Display.animContext.fillRect(0, 0, KiddoPaint.Display.main_canvas.width, KiddoPaint.Display.main_canvas.height);
            let rwidth = KiddoPaint.Display.canvas.width;
            let rheight = KiddoPaint.Display.canvas.height / 10;
            let blinds = [];
            for (let i = 0; i < 10; i++) {
                var sourceImage = KiddoPaint.Display.main_context.getImageData(0, rheight * i, rwidth, rheight);
                blinds[i] = sourceImage;
            }
            fisherYatesArrayShuffle(blinds);
            for (let i = 0; i < 10; i++) {
                KiddoPaint.Display.context.putImageData(blinds[i], 0, rheight * i);
            }
        }
    };
};

KiddoPaint.Tools.WackyMixerVenetianBlinds = new KiddoPaint.Tools.Toolbox.WackyMixerVenetianBlinds();

KiddoPaint.Tools.Toolbox.WackyMixerWallpaper = function() {
    var tool = this;
    this.isDown = false;
    this.animInterval = 50;
    this.timeout = null;
    this.currentEv = null;
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.currentEv = ev;
        KiddoPaint.Display.context.save();
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-guy-wow");
        let interval = tool.animInterval;
        tool.timeout = setTimeout(function draw() {
            tool.toolDraw();
            if (!tool.timeout) return;
            tool.timeout = setTimeout(draw, interval);
        }, interval);
        tool.toolDraw();
    };
    this.mousemove = function(ev) {
        tool.currentEv = ev;
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            KiddoPaint.Display.context.restore();
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add("cursor-guy-smile");
            if (tool.timeout) {
                clearTimeout(tool.timeout);
                tool.timeout = null;
            }
            KiddoPaint.Display.clearAnim();
            KiddoPaint.Display.clearBeforeSaveMain();
        }
    };
    this.toolDraw = function() {
        if (tool.isDown) {
            KiddoPaint.Sounds.mixerwallpaper();
            KiddoPaint.Display.animContext.fillStyle = "white";
            KiddoPaint.Display.animContext.fillRect(0, 0, KiddoPaint.Display.main_canvas.width, KiddoPaint.Display.main_canvas.height);
            let rx = tool.currentEv._x;
            let ry = tool.currentEv._y;
            let rwidth = KiddoPaint.Display.canvas.width / 3;
            let rheight = KiddoPaint.Display.canvas.height / 3;
            var sourceImage = KiddoPaint.Display.main_context.getImageData(rx, ry, rwidth, rheight);
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    KiddoPaint.Display.context.putImageData(sourceImage, rwidth * i + getRandomInt(1, 4), rheight * j + getRandomInt(1, 4));
                }
            }
        }
    };
};

KiddoPaint.Tools.WackyMixerWallpaper = new KiddoPaint.Tools.Toolbox.WackyMixerWallpaper();

const JumbleFx = {
    PINCH: "pinch",
    SWIRL: "swirl",
    LENSBLUR: "lensblur",
    TRIBLUR: "triblur",
    ZOOM: "zoom",
    HEXAGON: "hexagon",
    INK: "ink",
    EDGE: "edge",
    PANCAKE: "pancake",
    PIXELATE: "pixelate",
    HUE: "hue",
    SAT: "sat",
    NIGHTVISION: "nightvision",
    INVERT: "invert",
    SUNSHINE: "sunshine",
    DITHER: "dither",
    THRESHOLD: "threshold"
};

KiddoPaint.Tools.Toolbox.WholeCanvasEffect = function() {
    var tool = this;
    this.isDown = false;
    this.gfx = fx.canvas();
    this.textureGfx = {};
    this.mainImageData = {};
    this.initialClick = {};
    this.effect = JumbleFx.PANCAKE;
    this.mousedown = function(ev) {
        tool.isDown = true;
        tool.initialClick = ev;
        tool.mainImageData = KiddoPaint.Display.main_context.getImageData(0, 0, KiddoPaint.Display.main_canvas.width, KiddoPaint.Display.main_canvas.height);
        tool.textureGfx = tool.gfx.texture(KiddoPaint.Display.main_canvas);
        KiddoPaint.Display.saveUndo();
        KiddoPaint.Display.clearMain();
        tool.mousemove(ev);
    };
    this.mousemove = function(ev) {
        if (tool.isDown) {
            KiddoPaint.Display.clearTmp();
            var drawDistance = distanceBetween(ev, tool.initialClick);
            switch (tool.effect) {
              case JumbleFx.PINCH:
                var strength = remap(0, 500, -1, 1, drawDistance);
                var renderedGfx = tool.gfx.draw(tool.textureGfx).bulgePinch(tool.initialClick._x, tool.initialClick._y, 200, strength).update();
                break;

              case JumbleFx.SWIRL:
                var horizDist = Math.abs(ev._x - tool.initialClick._x);
                var vertDist = ev._y - tool.initialClick._y;
                var swirlAngle = remap(-300, 300, -Math.PI * 2, Math.PI * 2, vertDist);
                var renderedGfx = tool.gfx.draw(tool.textureGfx).swirl(tool.initialClick._x, tool.initialClick._y, horizDist, swirlAngle).update();
                break;

              case JumbleFx.LENSBLUR:
                var strength = remap(0, 500, 0, 50, drawDistance);
                var renderedGfx = tool.gfx.draw(tool.textureGfx).lensBlur(strength, .88, .70841).update();
                break;

              case JumbleFx.TRIBLUR:
                var renderedGfx = tool.gfx.draw(tool.textureGfx).triangleBlur(drawDistance / 5).update();
                break;

              case JumbleFx.ZOOM:
                var strength = remap(0, 250, 0, 1, drawDistance);
                var renderedGfx = tool.gfx.draw(tool.textureGfx).zoomBlur(tool.initialClick._x, tool.initialClick._y, strength).update();
                break;

              case JumbleFx.HEXAGON:
                var renderedGfx = tool.gfx.draw(tool.textureGfx).hexagonalPixelate(tool.initialClick._x, tool.initialClick._y, drawDistance / 10).update();
                break;

              case JumbleFx.INK:
                var strength = remap(0, 250, -1, 1, drawDistance);
                var renderedGfx = tool.gfx.draw(tool.textureGfx).ink(strength).update();
                break;

              case JumbleFx.HUE:
                var strength = remap(0, 1e3, -1, 1, drawDistance);
                var renderedGfx = tool.gfx.draw(tool.textureGfx).hueSaturation(strength, 0).update();
                break;

              case JumbleFx.SAT:
                var strength = remap(0, 500, -1, 1, drawDistance);
                var renderedGfx = tool.gfx.draw(tool.textureGfx).hueSaturation(0, strength).update();
                break;

              case JumbleFx.EDGE:
                var renderedGfx = tool.gfx.draw(tool.textureGfx).edgeWork(drawDistance / 10).update();
                break;

              case JumbleFx.PANCAKE:
                var renderedGfx = tool.gfx.draw(tool.textureGfx).brightnessContrast(0, 0).update();
                var howManyPancakes = 2 + drawDistance / 64;
                var increment = KiddoPaint.Current.modifiedAlt ? 4 : 16;
                var furthestAway = howManyPancakes * increment;
                var deltax = ev._x - tool.initialClick._x;
                var deltay = ev._y - tool.initialClick._y;
                for (var i = 1; i < howManyPancakes; i++) {
                    KiddoPaint.Display.context.globalAlpha = i / (howManyPancakes * 1);
                    KiddoPaint.Display.context.drawImage(renderedGfx, (furthestAway - i * increment) * Math.sign(deltax), (furthestAway - i * increment) * Math.sign(deltay));
                }
                KiddoPaint.Display.context.globalAlpha = 1;
                break;

              case JumbleFx.PIXELATE:
                var renderedGfx = tool.gfx.draw(tool.textureGfx).brightnessContrast(0, 0).update();
                var blocks = remap(0, 500, 50, 7, clamp(0, 500, drawDistance));
                renderedGfx = pixelateCanvas(renderedGfx, blocks);
                break;

              case JumbleFx.NIGHTVISION:
                var s = Filters.sobel(tool.mainImageData);
                renderedGfx = KiddoPaint.Display.imageTypeToCanvas(s, false);
                break;

              case JumbleFx.INVERT:
                var alpha = remap(0, 500, 1, 0, clamp(0, 500, drawDistance));
                var s = Filters.gcoInvert(tool.mainImageData, alpha);
                renderedGfx = s;
                break;

              case JumbleFx.SUNSHINE:
                var alpha = remap(0, 500, 1, 0, clamp(0, 500, drawDistance));
                var s = Filters.gcoOverlay(tool.mainImageData, alpha);
                renderedGfx = s;
                break;

              case JumbleFx.DITHER:
                var s = {};
                if (KiddoPaint.Current.modifiedCtrl) {
                    var threshold = remap(0, 500, 192, 0, clamp(0, 500, drawDistance));
                    s = Dither.bayer(tool.mainImageData, threshold);
                } else if (KiddoPaint.Current.modifiedMeta) {
                    s = Dither.atkinson(tool.mainImageData);
                } else {
                    s = Dither.floydsteinberg(tool.mainImageData);
                }
                renderedGfx = KiddoPaint.Display.imageTypeToCanvas(s, false);
                break;

              case JumbleFx.THRESHOLD:
                var s = Dither.threshold(tool.mainImageData, 100);
                renderedGfx = KiddoPaint.Display.imageTypeToCanvas(s, false);
                break;
            }
            KiddoPaint.Display.context.drawImage(renderedGfx, 0, 0);
        }
    };
    this.mouseup = function(ev) {
        if (tool.isDown) {
            tool.isDown = false;
            tool.textureGfx.destroy();
            tool.textureGfx = {};
            tool.mainImageData = {};
            tool.initialClick = {};
            KiddoPaint.Display.saveMainSkipUndo();
        }
    };
};

KiddoPaint.Tools.WholeCanvasEffect = new KiddoPaint.Tools.Toolbox.WholeCanvasEffect();

var lightMix = function() {
    var canvas2 = document.createElement("canvas");
    canvas2.width = 360;
    canvas2.height = 360;
    var ctx = canvas2.getContext("2d");
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.beginPath();
    ctx.fillStyle = KiddoPaint.Current.color;
    ctx.arc(100, 200, 100, Math.PI * 2, 0, false);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = KiddoPaint.Current.altColor;
    ctx.arc(220, 200, 100, Math.PI * 2, 0, false);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = KiddoPaint.Current.terColor;
    ctx.arc(160, 100, 100, Math.PI * 2, 0, false);
    ctx.fill();
    ctx.restore();
    return ctx.canvas;
};

var colorSphere = function() {
    var canvas1 = document.createElement("canvas");
    canvas1.width = 360;
    canvas1.height = 360;
    var ctx = canvas1.getContext("2d");
    var width = 360;
    var halfWidth = width / 2;
    var rotate = 1 / 360 * Math.PI * 2;
    var oleft = -20;
    var otop = -20;
    for (var n = 0; n <= 359; n++) {
        var gradient = ctx.createLinearGradient(oleft + halfWidth, otop, oleft + halfWidth, otop + halfWidth);
        var color = Color.HSV_RGB({
            H: (n + 300) % 360,
            S: 100,
            V: 100
        });
        gradient.addColorStop(0, KiddoPaint.Current.modifiedToggle ? "rgba(255, 255, 255, 0)" : "rgba(0, 0, 0, 0)");
        gradient.addColorStop(.7, "rgba(" + color.R + "," + color.G + "," + color.B + ",1)");
        gradient.addColorStop(1, "rgba(255,255,255,1)");
        ctx.beginPath();
        ctx.moveTo(oleft + halfWidth, otop);
        ctx.lineTo(oleft + halfWidth, otop + halfWidth);
        ctx.lineTo(oleft + halfWidth + 6, otop);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.translate(oleft + halfWidth, otop + halfWidth);
        ctx.rotate(rotate);
        ctx.translate(-(oleft + halfWidth), -(otop + halfWidth));
    }
    return ctx.canvas;
};

Color = {};

Color.HSV_RGB = function(o) {
    var H = o.H / 360, S = o.S / 100, V = o.V / 100, R, G, B;
    var A, B, C, D;
    if (S == 0) {
        R = G = B = Math.round(V * 255);
    } else {
        if (H >= 1) H = 0;
        H = 6 * H;
        D = H - Math.floor(H);
        A = Math.round(255 * V * (1 - S));
        B = Math.round(255 * V * (1 - S * D));
        C = Math.round(255 * V * (1 - S * (1 - D)));
        V = Math.round(255 * V);
        switch (Math.floor(H)) {
          case 0:
            R = V;
            G = C;
            B = A;
            break;

          case 1:
            R = B;
            G = V;
            B = A;
            break;

          case 2:
            R = A;
            G = V;
            B = C;
            break;

          case 3:
            R = A;
            G = B;
            B = V;
            break;

          case 4:
            R = C;
            G = A;
            B = V;
            break;

          case 5:
            R = V;
            G = A;
            B = B;
            break;
        }
    }
    return {
        R: R,
        G: G,
        B: B
    };
};

function makeComposite(gco) {
    var dest = document.createElement("canvas");
    dest.width = 360;
    dest.height = 360;
    var ctx = dest.getContext("2d");
    ctx.drawImage(colorSphere(), 0, 0);
    ctx.globalCompositeOperation = gco;
    ctx.drawImage(lightMix(), 0, 0);
    return dest;
}

KiddoPaint.Textures.Solid = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 1;
    canvasPattern.height = 1;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.fillRect(0, 0, 1, 1);
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.Partial1 = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 4;
    canvasPattern.height = 2;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.fillRect(0, 0, 2, 1);
    contextPattern.fillRect(1, 1, 3, 1);
    contextPattern.fillRect(3, 0, 1, 1);
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.Partial2 = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 2;
    canvasPattern.height = 2;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.fillRect(0, 0, 1, 1);
    contextPattern.fillRect(1, 1, 1, 1);
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.Partial3 = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 2;
    canvasPattern.height = 2;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.fillRect(0, 0, 1, 1);
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.PartialSquares = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 16;
    canvasPattern.height = 16;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.strokeStyle = color1;
    contextPattern.rect(0, 0, 12.5, 12.5);
    contextPattern.stroke();
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.PartialArtifactAlias = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 4;
    canvasPattern.height = 2;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.strokeStyle = color1;
    contextPattern.rect(0, 0, 4.5, 2.5);
    contextPattern.stroke();
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.RSolid = function() {
    color1 = KiddoPaint.Colors.randomAllColor();
    return KiddoPaint.Textures.Solid(color1);
};

KiddoPaint.Textures.HueSolid = function(hue) {
    let hsl = `hsl(${hue}, 100%, 55%)`;
    return hsl;
};

KiddoPaint.Textures.None = function() {
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 1;
    canvasPattern.height = 1;
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.Stripes = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 4;
    canvasPattern.height = 4;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    if (KiddoPaint.Current.modifiedAlt) {
        contextPattern.fillRect(1, 0, 1, 1);
        contextPattern.fillRect(2, 1, 1, 1);
        contextPattern.fillRect(3, 2, 1, 1);
        contextPattern.fillRect(0, 3, 1, 1);
    } else {
        contextPattern.fillRect(0, 2, 1, 1);
        contextPattern.fillRect(1, 1, 1, 1);
        contextPattern.fillRect(2, 0, 1, 1);
        contextPattern.fillRect(3, 3, 1, 1);
    }
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.Speckles = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.fillRect(1, 0, 2, 2);
    contextPattern.fillRect(4, 0, 2, 1);
    contextPattern.fillRect(6, 1, 2, 2);
    contextPattern.fillRect(2, 3, 2, 2);
    contextPattern.fillRect(5, 4, 2, 2);
    contextPattern.fillRect(0, 5, 2, 2);
    contextPattern.fillRect(4, 7, 2, 1);
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.Bubbles = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.rect(2, 0, 5, 1);
    contextPattern.rect(0, 1, 2, 1);
    contextPattern.rect(3, 1, 3, 1);
    contextPattern.rect(7, 1, 1, 1);
    contextPattern.rect(1, 2, 2, 3);
    contextPattern.rect(0, 3, 2, 3);
    contextPattern.rect(6, 2, 1, 3);
    contextPattern.rect(7, 3, 1, 3);
    contextPattern.rect(3, 5, 3, 1);
    contextPattern.rect(2, 6, 1, 2);
    contextPattern.rect(3, 7, 4, 1);
    contextPattern.rect(5, 6, 2, 1);
    contextPattern.fill();
    contextPattern.closePath();
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.Thatch = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.rect(2, 1, 5, 1);
    contextPattern.rect(4, 0, 1, 4);
    contextPattern.rect(3, 0, 3, 3);
    contextPattern.rect(7, 0, 1, 1);
    contextPattern.rect(7, 0, 1, 1);
    contextPattern.rect(1, 2, 1, 1);
    contextPattern.rect(0, 3, 1, 5);
    contextPattern.rect(1, 4, 1, 3);
    contextPattern.rect(1, 4, 1, 3);
    contextPattern.rect(2, 5, 1, 1);
    contextPattern.rect(3, 6, 1, 1);
    contextPattern.rect(4, 7, 1, 1);
    contextPattern.rect(5, 4, 1, 1);
    contextPattern.rect(6, 5, 1, 1);
    contextPattern.rect(7, 6, 1, 1);
    contextPattern.rect(7, 4, 1, 2);
    contextPattern.fill();
    contextPattern.closePath();
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.Shingles = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.rect(0, 0, 5, 1);
    contextPattern.rect(2, 1, 1, 2);
    contextPattern.rect(1, 3, 1, 1);
    contextPattern.rect(0, 4, 1, 1);
    contextPattern.rect(3, 3, 1, 1);
    contextPattern.rect(4, 4, 4, 1);
    contextPattern.rect(6, 5, 1, 2);
    contextPattern.rect(5, 7, 1, 1);
    contextPattern.rect(7, 7, 1, 1);
    contextPattern.fill();
    contextPattern.closePath();
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.Diamond = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    for (var startx = 3, starty = 0; starty < 4; startx -= 1, starty += 1) {
        for (var i = 0; i < 4; i++) {
            contextPattern.rect(startx + i, starty + i, 1, 1);
        }
    }
    contextPattern.fill();
    contextPattern.closePath();
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.Ribbon = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.rect(4, 1, 1, 1);
    contextPattern.rect(3, 2, 1, 1);
    contextPattern.rect(2, 3, 1, 1);
    contextPattern.rect(6, 5, 1, 1);
    contextPattern.rect(7, 6, 1, 1);
    contextPattern.rect(0, 7, 1, 1);
    contextPattern.fill();
    contextPattern.closePath();
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.Sand = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.rect(0, 0, 1, 1);
    contextPattern.rect(5, 1, 1, 1);
    contextPattern.rect(2, 2, 1, 1);
    contextPattern.rect(7, 3, 1, 1);
    contextPattern.rect(3, 4, 1, 1);
    contextPattern.rect(6, 5, 1, 1);
    contextPattern.rect(1, 6, 1, 1);
    contextPattern.rect(4, 7, 1, 1);
    contextPattern.fill();
    contextPattern.closePath();
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.Brick = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.rect(0, 0, 1, 3);
    contextPattern.rect(0, 3, 8, 1);
    contextPattern.rect(4, 4, 1, 3);
    contextPattern.rect(0, 7, 8, 1);
    contextPattern.fill();
    contextPattern.closePath();
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.Chevron = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 8;
    canvasPattern.height = 5;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.rect(0, 0, 1, 1);
    contextPattern.rect(1, 1, 1, 1);
    contextPattern.rect(2, 2, 1, 1);
    contextPattern.rect(3, 3, 1, 1);
    contextPattern.rect(4, 4, 1, 1);
    contextPattern.rect(5, 3, 1, 1);
    contextPattern.rect(6, 2, 1, 1);
    contextPattern.rect(7, 1, 1, 1);
    contextPattern.fill();
    contextPattern.closePath();
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.Stairs = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.rect(0, 0, 5, 1);
    contextPattern.rect(4, 1, 1, 4);
    contextPattern.rect(5, 4, 3, 1);
    contextPattern.rect(0, 4, 1, 4);
    contextPattern.fill();
    contextPattern.closePath();
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.Cross = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    for (var i = 0; i < 8; i++) {
        contextPattern.rect(i, i, 1, 1);
    }
    for (var i = 1; i < 8; i++) {
        contextPattern.rect(i, 8 - i, 1, 1);
    }
    contextPattern.fill();
    contextPattern.closePath();
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.DiagBrick = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.rect(2, 0, 1, 1);
    contextPattern.rect(1, 1, 1, 1);
    contextPattern.rect(0, 2, 1, 2);
    contextPattern.rect(1, 3, 1, 1);
    contextPattern.rect(2, 4, 1, 1);
    contextPattern.rect(3, 5, 3, 1);
    contextPattern.rect(4, 6, 1, 1);
    contextPattern.rect(3, 7, 1, 1);
    contextPattern.rect(6, 4, 1, 1);
    contextPattern.rect(7, 3, 1, 1);
    contextPattern.fill();
    contextPattern.closePath();
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.CornerStair = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 8;
    canvasPattern.height = 8;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    if (KiddoPaint.Current.modifiedCtrl) {
        contextPattern.rect(0, 0, 6, 2);
        contextPattern.rect(0, 2, 4, 2);
        contextPattern.rect(0, 4, 2, 2);
    } else {
        contextPattern.rect(2, 6, 6, 2);
        contextPattern.rect(4, 4, 4, 2);
        contextPattern.rect(6, 2, 2, 2);
    }
    contextPattern.fill();
    contextPattern.closePath();
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.Houndstooth = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 9;
    canvasPattern.height = 11;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.rect(0, 4, 1, 2);
    contextPattern.rect(1, 3, 1, 2);
    contextPattern.rect(6, 0, 1, 1);
    contextPattern.rect(5, 1, 2, 1);
    contextPattern.rect(2, 2, 7, 1);
    contextPattern.rect(2, 3, 6, 1);
    contextPattern.rect(2, 4, 5, 2);
    contextPattern.rect(2, 6, 7, 1);
    contextPattern.rect(8, 5, 1, 1);
    contextPattern.rect(4, 7, 2, 1);
    contextPattern.rect(3, 8, 2, 1);
    contextPattern.rect(2, 9, 2, 1);
    contextPattern.rect(2, 10, 1, 1);
    contextPattern.fill();
    contextPattern.closePath();
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.Rainbow = function() {
    var patternCanvas = document.createElement("canvas"), dotWidth = 20, dotDistance = 5, ctx = patternCanvas.getContext("2d");
    patternCanvas.width = 35;
    patternCanvas.height = 20;
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 5, 20);
    ctx.fillStyle = "orange";
    ctx.fillRect(5, 0, 10, 20);
    ctx.fillStyle = "yellow";
    ctx.fillRect(10, 0, 15, 20);
    ctx.fillStyle = "green";
    ctx.fillRect(15, 0, 20, 20);
    ctx.fillStyle = "lightblue";
    ctx.fillRect(20, 0, 25, 20);
    ctx.fillStyle = "blue";
    ctx.fillRect(25, 0, 30, 20);
    ctx.fillStyle = "purple";
    ctx.fillRect(30, 0, 35, 20);
    return KiddoPaint.Display.context.createPattern(patternCanvas, "repeat");
};

KiddoPaint.Textures.RainbowBar = function() {
    var canvas = document.createElement("canvas");
    var size = 50 * KiddoPaint.Current.scaling;
    canvas.width = size * 2;
    canvas.height = size * 2;
    var ctx = canvas.getContext("2d");
    var gradient = ctx.createLinearGradient(10, 0, size * 2, 0);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(1 / 6, "orange");
    gradient.addColorStop(2 / 6, "yellow");
    gradient.addColorStop(3 / 6, "green");
    gradient.addColorStop(4 / 6, "blue");
    gradient.addColorStop(5 / 6, "indigo");
    gradient.addColorStop(1, "violet");
    ctx.fillStyle = gradient;
    ctx.rotate(20 * Math.PI / 180);
    ctx.fillRect(0, 0, size * 2, 16);
    return KiddoPaint.Display.context.createPattern(canvas, "repeat");
};

KiddoPaint.Textures.RainbowGrad = function(start, end) {
    if (start && end) {
        var grad = KiddoPaint.Display.context.createLinearGradient(start._x, start._y, start._x, end._y);
        grad.addColorStop(0, "red");
        grad.addColorStop(1 / 6, "orange");
        grad.addColorStop(2 / 6, "yellow");
        grad.addColorStop(3 / 6, "green");
        grad.addColorStop(4 / 6, "blue");
        grad.addColorStop(5 / 6, "indigo");
        grad.addColorStop(1, "violet");
        return grad;
    } else {
        return KiddoPaint.Textures.None();
    }
};

KiddoPaint.Textures.BigGrid = function() {
    let color1 = "black";
    let color2 = "white";
    let size = 64;
    let hsize = size / 2;
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = size;
    canvasPattern.height = size;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color2;
    contextPattern.fillRect(0, 0, size, size);
    contextPattern.fillStyle = color1;
    contextPattern.fillRect(0, 0, hsize, hsize);
    contextPattern.fillRect(hsize, hsize, size, size);
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.Screen1 = function() {
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 2;
    canvasPattern.height = 2;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = "white";
    contextPattern.fillRect(0, 0, 1, 1);
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.Screen2 = function() {
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 2;
    canvasPattern.height = 2;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = "white";
    contextPattern.fillRect(1, 1, 2, 2);
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.Screen3 = function() {
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 2;
    canvasPattern.height = 2;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = "white";
    contextPattern.fillRect(0, 1, 2, 1);
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.Screen4 = function() {
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 2;
    canvasPattern.height = 2;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = "white";
    contextPattern.fillRect(1, 0, 1, 2);
    return KiddoPaint.Display.context.createPattern(canvasPattern, "repeat");
};

KiddoPaint.Textures.SprayPaint2 = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 16;
    canvasPattern.height = 16;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.fillRect(7, 0, 1, 1);
    contextPattern.fillRect(11, 1, 1, 1);
    contextPattern.fillRect(2, 2, 1, 1);
    contextPattern.fillRect(8, 2, 1, 1);
    contextPattern.fillRect(5, 3, 1, 1);
    contextPattern.fillRect(10, 4, 1, 1);
    contextPattern.fillRect(14, 4, 1, 1);
    contextPattern.fillRect(0, 5, 1, 1);
    contextPattern.fillRect(6, 5, 1, 1);
    contextPattern.fillRect(3, 6, 1, 1);
    contextPattern.fillRect(9, 6, 1, 1);
    contextPattern.fillRect(12, 6, 1, 1);
    contextPattern.fillRect(7, 7, 1, 1);
    contextPattern.fillRect(15, 7, 1, 1);
    contextPattern.fillRect(5, 8, 1, 1);
    contextPattern.fillRect(9, 8, 1, 1);
    contextPattern.fillRect(0, 9, 1, 1);
    contextPattern.fillRect(3, 9, 1, 1);
    contextPattern.fillRect(12, 9, 1, 1);
    contextPattern.fillRect(6, 10, 1, 1);
    contextPattern.fillRect(10, 10, 1, 1);
    contextPattern.fillRect(14, 10, 1, 1);
    contextPattern.fillRect(4, 11, 1, 1);
    contextPattern.fillRect(1, 12, 1, 1);
    contextPattern.fillRect(7, 12, 1, 1);
    contextPattern.fillRect(10, 12, 1, 1);
    contextPattern.fillRect(13, 13, 1, 1);
    contextPattern.fillRect(4, 14, 1, 1);
    contextPattern.fillRect(8, 15, 1, 1);
    return canvasPattern;
};

KiddoPaint.Textures.SprayPaint3 = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 16;
    canvasPattern.height = 16;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.fillRect(8, 2, 1, 1);
    contextPattern.fillRect(4, 3, 1, 1);
    contextPattern.fillRect(11, 3, 1, 1);
    contextPattern.fillRect(6, 5, 1, 1);
    contextPattern.fillRect(10, 5, 1, 1);
    contextPattern.fillRect(3, 6, 1, 1);
    contextPattern.fillRect(13, 6, 1, 1);
    contextPattern.fillRect(7, 7, 1, 1);
    contextPattern.fillRect(10, 8, 1, 1);
    contextPattern.fillRect(2, 9, 1, 1);
    contextPattern.fillRect(5, 10, 1, 1);
    contextPattern.fillRect(8, 10, 1, 1);
    contextPattern.fillRect(12, 10, 1, 1);
    contextPattern.fillRect(3, 12, 1, 1);
    contextPattern.fillRect(6, 13, 1, 1);
    contextPattern.fillRect(10, 13, 1, 1);
    return canvasPattern;
};

KiddoPaint.Textures.SprayPaint4 = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 16;
    canvasPattern.height = 16;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.fillRect(15, 0, 1, 1);
    contextPattern.fillRect(13, 2, 1, 1);
    contextPattern.fillRect(11, 4, 1, 1);
    contextPattern.fillRect(9, 6, 1, 1);
    contextPattern.fillRect(7, 8, 1, 1);
    contextPattern.fillRect(5, 10, 1, 1);
    contextPattern.fillRect(3, 12, 1, 1);
    contextPattern.fillRect(1, 14, 1, 1);
    return canvasPattern;
};

KiddoPaint.Textures.SprayPaint5 = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 16;
    canvasPattern.height = 16;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.fillRect(1, 1, 1, 1);
    contextPattern.fillRect(4, 1, 1, 1);
    contextPattern.fillRect(7, 1, 1, 1);
    contextPattern.fillRect(10, 1, 1, 1);
    contextPattern.fillRect(13, 1, 1, 1);
    contextPattern.fillRect(1, 4, 1, 1);
    contextPattern.fillRect(4, 4, 1, 1);
    contextPattern.fillRect(7, 4, 1, 1);
    contextPattern.fillRect(10, 4, 1, 1);
    contextPattern.fillRect(13, 4, 1, 1);
    contextPattern.fillRect(1, 7, 1, 1);
    contextPattern.fillRect(4, 7, 1, 1);
    contextPattern.fillRect(7, 7, 1, 1);
    contextPattern.fillRect(10, 7, 1, 1);
    contextPattern.fillRect(13, 7, 1, 1);
    contextPattern.fillRect(1, 10, 1, 1);
    contextPattern.fillRect(4, 10, 1, 1);
    contextPattern.fillRect(7, 10, 1, 1);
    contextPattern.fillRect(10, 10, 1, 1);
    contextPattern.fillRect(13, 10, 1, 1);
    contextPattern.fillRect(1, 13, 1, 1);
    contextPattern.fillRect(4, 13, 1, 1);
    contextPattern.fillRect(7, 13, 1, 1);
    contextPattern.fillRect(10, 13, 1, 1);
    contextPattern.fillRect(13, 13, 1, 1);
    return canvasPattern;
};

KiddoPaint.Textures.SprayPaint6 = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 16;
    canvasPattern.height = 16;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.fillRect(7, 1, 1, 1);
    contextPattern.fillRect(4, 4, 1, 1);
    contextPattern.fillRect(10, 4, 1, 1);
    contextPattern.fillRect(1, 7, 1, 1);
    contextPattern.fillRect(7, 7, 1, 1);
    contextPattern.fillRect(13, 7, 1, 1);
    contextPattern.fillRect(4, 10, 1, 1);
    contextPattern.fillRect(10, 10, 1, 1);
    contextPattern.fillRect(7, 13, 1, 1);
    return canvasPattern;
};

KiddoPaint.Textures.SprayPaint7 = function(color1) {
    color1 = color1 || "black";
    var canvasPattern = document.createElement("canvas");
    canvasPattern.width = 16;
    canvasPattern.height = 16;
    var contextPattern = canvasPattern.getContext("2d");
    contextPattern.beginPath();
    contextPattern.fillStyle = color1;
    contextPattern.fillRect(7, 0, 1, 1);
    contextPattern.fillRect(9, 0, 1, 1);
    contextPattern.fillRect(5, 1, 1, 1);
    contextPattern.fillRect(11, 1, 1, 1);
    contextPattern.fillRect(2, 2, 1, 1);
    contextPattern.fillRect(8, 2, 1, 1);
    contextPattern.fillRect(10, 2, 1, 1);
    contextPattern.fillRect(6, 3, 1, 1);
    contextPattern.fillRect(12, 3, 1, 1);
    contextPattern.fillRect(2, 4, 1, 1);
    contextPattern.fillRect(4, 4, 1, 1);
    contextPattern.fillRect(8, 4, 1, 1);
    contextPattern.fillRect(10, 4, 1, 1);
    contextPattern.fillRect(14, 4, 1, 1);
    contextPattern.fillRect(0, 5, 1, 1);
    contextPattern.fillRect(6, 5, 1, 1);
    contextPattern.fillRect(12, 5, 1, 1);
    contextPattern.fillRect(3, 6, 1, 1);
    contextPattern.fillRect(9, 6, 1, 1);
    contextPattern.fillRect(14, 6, 1, 1);
    contextPattern.fillRect(2, 7, 1, 1);
    contextPattern.fillRect(7, 7, 1, 1);
    contextPattern.fillRect(11, 7, 1, 1);
    contextPattern.fillRect(15, 7, 1, 1);
    contextPattern.fillRect(5, 8, 1, 1);
    contextPattern.fillRect(9, 8, 1, 1);
    contextPattern.fillRect(13, 8, 1, 1);
    contextPattern.fillRect(0, 9, 1, 1);
    contextPattern.fillRect(3, 9, 1, 1);
    contextPattern.fillRect(12, 9, 1, 1);
    contextPattern.fillRect(2, 10, 1, 1);
    contextPattern.fillRect(6, 10, 1, 1);
    contextPattern.fillRect(8, 10, 1, 1);
    contextPattern.fillRect(10, 10, 1, 1);
    contextPattern.fillRect(14, 10, 1, 1);
    contextPattern.fillRect(4, 11, 1, 1);
    contextPattern.fillRect(12, 11, 1, 1);
    contextPattern.fillRect(1, 12, 1, 1);
    contextPattern.fillRect(5, 12, 1, 1);
    contextPattern.fillRect(7, 12, 1, 1);
    contextPattern.fillRect(10, 12, 1, 1);
    contextPattern.fillRect(3, 13, 1, 1);
    contextPattern.fillRect(13, 13, 1, 1);
    contextPattern.fillRect(4, 14, 1, 1);
    contextPattern.fillRect(6, 14, 1, 1);
    contextPattern.fillRect(10, 14, 1, 1);
    contextPattern.fillRect(8, 15, 1, 1);
    return canvasPattern;
};

KiddoPaint.Submenu.wackybrush = [ {
    name: "Leaky Pen",
    imgSrc: "img/tool-menu-wacky-brush-70.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.AnimBrush;
        KiddoPaint.Tools.AnimBrush.reset();
        KiddoPaint.Tools.AnimBrush.texture = function(step, distancePrev) {
            KiddoPaint.Sounds.brushleakypen();
            return KiddoPaint.Brushes.LeakyPen(KiddoPaint.Current.color, distancePrev);
        };
    }
}, {
    name: "Zig Zag",
    imgSrc: "img/tool-menu-wacky-brush-71.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.Scribble;
    }
}, {
    name: "Dots",
    imgSrc: "img/tool-menu-wacky-brush-72.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.PlainBrush;
        KiddoPaint.Tools.PlainBrush.reset();
        KiddoPaint.Tools.PlainBrush.soundduring = KiddoPaint.Sounds.brushdots;
        KiddoPaint.Tools.PlainBrush.texture = function() {
            KiddoPaint.Tools.PlainBrush.spacing = 22 * KiddoPaint.Current.scaling;
            return KiddoPaint.Current.modifiedMeta ? KiddoPaint.Brushes.RCircles() : KiddoPaint.Brushes.Circles(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Bubbly",
    imgSrc: "img/tool-menu-wacky-brush-73.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.AnimBrush;
        KiddoPaint.Tools.AnimBrush.reset();
        KiddoPaint.Tools.AnimBrush.texture = function() {
            KiddoPaint.Sounds.brushbubbly();
            return KiddoPaint.Brushes.Bubbles(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Pies",
    imgSrc: "img/tool-menu-wacky-brush-74.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.PlainBrush;
        KiddoPaint.Tools.PlainBrush.reset();
        KiddoPaint.Tools.PlainBrush.soundduring = KiddoPaint.Sounds.brushpies;
        KiddoPaint.Tools.PlainBrush.texture = function() {
            KiddoPaint.Tools.PlainBrush.spacing = 40 * KiddoPaint.Current.scaling;
            return KiddoPaint.Brushes.Pies(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Echoes",
    imgSrc: "img/tool-menu-wacky-brush-75.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.PlainBrush;
        KiddoPaint.Tools.PlainBrush.reset();
        KiddoPaint.Tools.PlainBrush.soundduring = KiddoPaint.Sounds.brushecho;
        KiddoPaint.Tools.PlainBrush.spacing = 1;
        KiddoPaint.Tools.PlainBrush.texture = function(step) {
            return KiddoPaint.Brushes.Concentric(KiddoPaint.Current.color, step);
        };
    }
}, {
    name: "Northern Lights",
    imgSrc: "img/tool-menu-wacky-brush-76.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.Contours;
    }
}, {
    name: "Fuzzer",
    imgSrc: "img/tool-menu-wacky-brush-77.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-none");
        KiddoPaint.Current.tool = KiddoPaint.Tools.Fuzzer;
    }
}, {
    name: "Magnifying Glass",
    imgSrc: "img/tool-menu-wacky-brush-78.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.Magnify;
    }
}, {
    name: "Spray Paint",
    imgSrc: "img/tool-menu-wacky-brush-79.png",
    handler: function(e) {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Tools.SpritePlacer.image = KiddoPaint.Textures.SprayPaint2(KiddoPaint.Current.color);
        KiddoPaint.Tools.SpritePlacer.soundBefore = function() {};
        KiddoPaint.Tools.SpritePlacer.soundDuring = function() {
            KiddoPaint.Sounds.brushspraypaint();
        };
        KiddoPaint.Current.tool = KiddoPaint.Tools.SpritePlacer;
        if (e.ctrlKey) {
            show_generic_submenu("spray");
        }
    }
}, {
    name: "Pine Needles",
    imgSrc: "img/tool-menu-wacky-brush-80.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.Pines;
    }
}, {
    name: "3-D",
    imgSrc: "img/tool-menu-wacky-brush-81.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.ThreeDBrush;
    }
}, {
    name: "Kaliediscope",
    imgSrc: "img/tool-menu-wacky-brush-82.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.Kaleidoscope;
    }
}, {
    name: "Connect The Dots",
    imgSrc: "img/tool-menu-wacky-brush-84.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.PlainBrush;
        KiddoPaint.Tools.PlainBrush.reset();
        KiddoPaint.Tools.PlainBrush.spacing = 25;
        KiddoPaint.Tools.PlainBrush.soundduring = KiddoPaint.Sounds.brushtwirly;
        KiddoPaint.Tools.PlainBrush.texture = function(step, pstep) {
            return KiddoPaint.Brushes.ConnectTheDots(KiddoPaint.Current.modifiedMeta ? KiddoPaint.Colors.nextColor() : KiddoPaint.Current.color, pstep);
        };
    }
}, {
    name: "Swirl",
    imgSrc: "img/tool-menu-wacky-brush-86.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.PlainBrush;
        KiddoPaint.Tools.PlainBrush.reset();
        KiddoPaint.Tools.PlainBrush.spacing = 1;
        KiddoPaint.Tools.PlainBrush.soundduring = KiddoPaint.Sounds.brushtwirly;
        KiddoPaint.Tools.PlainBrush.texture = function(step) {
            return KiddoPaint.Brushes.Twirly(KiddoPaint.Current.modifiedMeta ? KiddoPaint.Colors.nextColor() : KiddoPaint.Current.color, step);
        };
    }
}, {
    name: "Rotating Dots",
    imgSrc: "img/br12.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.PlainBrush;
        KiddoPaint.Tools.PlainBrush.reset();
        KiddoPaint.Tools.PlainBrush.soundduring = KiddoPaint.Sounds.brushrollingdots;
        KiddoPaint.Tools.PlainBrush.spacing = 1;
        KiddoPaint.Tools.PlainBrush.texture = function(step) {
            return KiddoPaint.Current.modifiedCtrl ? KiddoPaint.Brushes.RotatingPentagon(KiddoPaint.Current.modifiedMeta ? KiddoPaint.Colors.nextColor() : KiddoPaint.Current.color, step) : KiddoPaint.Brushes.FollowingSine(KiddoPaint.Current.modifiedMeta ? KiddoPaint.Colors.nextColor() : KiddoPaint.Current.color, step);
        };
    }
}, {
    name: "Inverter",
    imgSrc: "img/tool-menu-wacky-brush-87.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.Inverter;
    }
}, {
    name: "Geometry",
    imgSrc: "img/tool-menu-wacky-brush-88.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.Guilloche;
    }
}, {
    name: "XY to XY",
    imgSrc: "img/br16.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.Astroid;
    }
}, {
    name: "Tree",
    imgSrc: "img/tool-menu-wacky-brush-89.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.Tree;
    }
}, {
    name: "Splatter Paint",
    imgSrc: "img/tool-menu-wacky-brush-91.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.AnimBrush;
        KiddoPaint.Tools.AnimBrush.reset();
        KiddoPaint.Tools.AnimBrush.animInterval = 100;
        KiddoPaint.Tools.AnimBrush.texture = function() {
            KiddoPaint.Sounds.brushbubbly();
            return KiddoPaint.Current.modifiedMeta ? KiddoPaint.Brushes.Triangles() : KiddoPaint.Brushes.Splatters();
        };
    }
}, {
    name: "Starburst",
    imgSrc: "img/br-starburst.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Tools.Line.size = KiddoPaint.Current.modified ? 3 : 2;
        KiddoPaint.Tools.Line.stomp = false;
        KiddoPaint.Tools.Line.texture = function() {
            return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
        };
        KiddoPaint.Current.tool = KiddoPaint.Tools.Line;
    }
}, {
    name: "The Looper",
    imgSrc: "img/tool-menu-wacky-brush-92.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.Looper;
    }
}, {
    name: "A Galaxy of Stars",
    imgSrc: "img/tool-menu-wacky-brush-94.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.PlainBrush;
        KiddoPaint.Tools.PlainBrush.reset();
        KiddoPaint.Tools.PlainBrush.spacing = 36;
        KiddoPaint.Tools.PlainBrush.soundduring = KiddoPaint.Sounds.brushstars;
        KiddoPaint.Tools.PlainBrush.texture = function() {
            return KiddoPaint.Builders.Prints(KiddoPaint.Current.color, KiddoPaint.Alphabet.nextWingding(2));
        };
    }
}, {
    name: "Lots of Hugs and Xs",
    imgSrc: "img/tool-menu-wacky-brush-95.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.PlainBrush;
        KiddoPaint.Tools.PlainBrush.reset();
        KiddoPaint.Tools.PlainBrush.soundduring = KiddoPaint.Sounds.brushxos;
        KiddoPaint.Tools.PlainBrush.spacing = 36;
        KiddoPaint.Tools.PlainBrush.texture = function() {
            return KiddoPaint.Builders.Prints(KiddoPaint.Current.color, KiddoPaint.Alphabet.nextWingding(1));
        };
    }
}, {
    name: "A Full Deck of Cards",
    imgSrc: "img/tool-menu-wacky-brush-96.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.PlainBrush;
        KiddoPaint.Tools.PlainBrush.reset();
        KiddoPaint.Tools.PlainBrush.soundduring = KiddoPaint.Sounds.brushcards;
        KiddoPaint.Tools.PlainBrush.spacing = 36;
        KiddoPaint.Tools.PlainBrush.texture = function() {
            return KiddoPaint.Builders.Prints(KiddoPaint.Current.color, KiddoPaint.Alphabet.nextWingding(3));
        };
    }
}, {
    name: "Shapes and More Shapes",
    imgSrc: "img/tool-menu-wacky-brush-97.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.PlainBrush;
        KiddoPaint.Tools.PlainBrush.reset();
        KiddoPaint.Tools.PlainBrush.soundduring = KiddoPaint.Sounds.brushshapes;
        KiddoPaint.Tools.PlainBrush.spacing = 36;
        KiddoPaint.Tools.PlainBrush.texture = function() {
            return KiddoPaint.Builders.Prints(KiddoPaint.Current.color, KiddoPaint.Alphabet.nextWingding(4));
        };
    }
}, {
    name: "Paw Prints",
    emoji: "🐾",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-paint-brush");
        KiddoPaint.Current.tool = KiddoPaint.Tools.Brush;
        KiddoPaint.Tools.Brush.reset();
        KiddoPaint.Tools.Brush.soundduring = KiddoPaint.Sounds.brushprints;
        KiddoPaint.Tools.Brush.texture = function(angle) {
            return KiddoPaint.Builders.Prints(KiddoPaint.Current.color, KiddoPaint.Current.modifiedMeta ? "👣" : "🐾", angle).brush;
        };
    }
} ];

KiddoPaint.Submenu.circle = [ {
    name: "Texture 1",
    imgJs: function() {
        return makeCircleIcon(KiddoPaint.Textures.None);
    },
    handler: function() {
        KiddoPaint.Tools.Circle.texture = function() {
            return KiddoPaint.Textures.None(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 1",
    imgJs: function() {
        return makeCircleIcon(KiddoPaint.Textures.Solid);
    },
    handler: function() {
        KiddoPaint.Tools.Circle.texture = function() {
            return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 2",
    imgJs: function() {
        return makeCircleIcon(KiddoPaint.Textures.Partial1);
    },
    handler: function() {
        KiddoPaint.Tools.Circle.texture = function() {
            return KiddoPaint.Textures.Partial1(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 3",
    imgJs: function() {
        return makeCircleIcon(KiddoPaint.Textures.Partial2);
    },
    handler: function() {
        KiddoPaint.Tools.Circle.texture = function() {
            return KiddoPaint.Textures.Partial2(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 4",
    imgJs: function() {
        return makeCircleIcon(KiddoPaint.Textures.Partial3);
    },
    handler: function() {
        KiddoPaint.Tools.Circle.texture = function() {
            return KiddoPaint.Textures.Partial3(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 6",
    imgJs: function() {
        return makeCircleIcon(KiddoPaint.Textures.PartialArtifactAlias);
    },
    handler: function() {
        KiddoPaint.Tools.Circle.texture = function() {
            return KiddoPaint.Textures.PartialArtifactAlias(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 7",
    imgJs: function() {
        return makeCircleIcon(KiddoPaint.Textures.Speckles);
    },
    handler: function() {
        KiddoPaint.Tools.Circle.texture = function() {
            return KiddoPaint.Textures.Speckles(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 7",
    imgJs: function() {
        return makeCircleIcon(KiddoPaint.Textures.Stripes);
    },
    handler: function() {
        KiddoPaint.Tools.Circle.texture = function() {
            return KiddoPaint.Textures.Stripes(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 7",
    imgJs: function() {
        return makeCircleIcon(KiddoPaint.Textures.Thatch);
    },
    handler: function() {
        KiddoPaint.Tools.Circle.texture = function() {
            return KiddoPaint.Textures.Thatch(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 7",
    imgJs: function() {
        return makeCircleIcon(KiddoPaint.Textures.Shingles);
    },
    handler: function() {
        KiddoPaint.Tools.Circle.texture = function() {
            return KiddoPaint.Textures.Shingles(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 8",
    imgJs: function() {
        return makeCircleIcon(KiddoPaint.Textures.Bubbles);
    },
    handler: function() {
        KiddoPaint.Tools.Circle.texture = function() {
            return KiddoPaint.Textures.Bubbles(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 9",
    imgJs: function() {
        return makeCircleIcon(KiddoPaint.Textures.Diamond);
    },
    handler: function() {
        KiddoPaint.Tools.Circle.texture = function() {
            return KiddoPaint.Textures.Diamond(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 9",
    imgJs: function() {
        return makeCircleIcon(KiddoPaint.Textures.Ribbon);
    },
    handler: function() {
        KiddoPaint.Tools.Circle.texture = function() {
            return KiddoPaint.Textures.Ribbon(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 10",
    imgJs: function() {
        return makeCircleIcon(KiddoPaint.Textures.Sand);
    },
    handler: function() {
        KiddoPaint.Tools.Circle.texture = function() {
            return KiddoPaint.Textures.Sand(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 11",
    imgJs: function() {
        return makeCircleIcon(KiddoPaint.Textures.Brick);
    },
    handler: function() {
        KiddoPaint.Tools.Circle.texture = function() {
            return KiddoPaint.Textures.Brick(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 11",
    imgJs: function() {
        return makeCircleIcon(KiddoPaint.Textures.Chevron);
    },
    handler: function() {
        KiddoPaint.Tools.Circle.texture = function() {
            return KiddoPaint.Textures.Chevron(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 11",
    imgJs: function() {
        return makeCircleIcon(KiddoPaint.Textures.Stairs);
    },
    handler: function() {
        KiddoPaint.Tools.Circle.texture = function() {
            return KiddoPaint.Textures.Stairs(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 11",
    imgJs: function() {
        return makeCircleIcon(KiddoPaint.Textures.Cross);
    },
    handler: function() {
        KiddoPaint.Tools.Circle.texture = function() {
            return KiddoPaint.Textures.Cross(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 11",
    imgJs: function() {
        return makeCircleIcon(KiddoPaint.Textures.DiagBrick);
    },
    handler: function() {
        KiddoPaint.Tools.Circle.texture = function() {
            return KiddoPaint.Textures.DiagBrick(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 12",
    imgJs: function() {
        return makeCircleIcon(KiddoPaint.Textures.CornerStair);
    },
    handler: function() {
        KiddoPaint.Tools.Circle.texture = function() {
            return KiddoPaint.Textures.CornerStair(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 13",
    imgJs: function() {
        return makeCircleIcon(KiddoPaint.Textures.Houndstooth);
    },
    handler: function() {
        KiddoPaint.Tools.Circle.texture = function() {
            return KiddoPaint.Textures.Houndstooth(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture ?",
    imgSrc: "img/tool-unknown.png",
    handler: function() {
        KiddoPaint.Tools.Circle.texture = function(start, end) {
            return KiddoPaint.Textures.RainbowGrad(start, end);
        };
    }
} ];

KiddoPaint.Submenu.eraser = [ {
    name: "Eraser Squre 20",
    imgSrc: "img/tool-submenu-eraser-178.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-crosshair");
        KiddoPaint.Tools.Eraser.size = 20;
        KiddoPaint.Tools.Eraser.isSquareEraser = true;
        KiddoPaint.Current.tool = KiddoPaint.Tools.Eraser;
    }
}, {
    name: "Eraser Circle 15",
    imgSrc: "img/tool-submenu-eraser-179.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-crosshair");
        KiddoPaint.Tools.Eraser.size = 10;
        KiddoPaint.Tools.Eraser.isSquareEraser = false;
        KiddoPaint.Current.tool = KiddoPaint.Tools.Eraser;
    }
}, {
    name: "Eraser",
    imgSrc: "img/tool-submenu-eraser-180.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-crosshair");
        KiddoPaint.Tools.Eraser.size = 10;
        KiddoPaint.Tools.Eraser.isSquareEraser = true;
        KiddoPaint.Current.tool = KiddoPaint.Tools.Eraser;
    }
}, {
    name: "Eraser",
    imgSrc: "img/tool-submenu-eraser-181.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-crosshair");
        KiddoPaint.Tools.Eraser.size = 2;
        KiddoPaint.Tools.Eraser.isSquareEraser = true;
        KiddoPaint.Current.tool = KiddoPaint.Tools.Eraser;
    }
}, {
    name: "Firecracker",
    imgSrc: "img/tool-submenu-eraser-182.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-tnt");
        KiddoPaint.Current.tool = KiddoPaint.Tools.Tnt;
    }
}, {
    name: "Hidden Pictures",
    imgSrc: "img/tool-submenu-eraser-183.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-crosshair");
        KiddoPaint.Tools.EraserHiddenPicture.reset();
        KiddoPaint.Current.tool = KiddoPaint.Tools.EraserHiddenPicture;
    }
}, {
    name: "White Circles",
    imgSrc: "img/tool-submenu-eraser-184.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-crosshair");
        KiddoPaint.Tools.EraserWhiteCircles.reset();
        KiddoPaint.Current.tool = KiddoPaint.Tools.EraserWhiteCircles;
    }
}, {
    name: "Slip-Sliding Away",
    imgSrc: "img/tool-submenu-eraser-185.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-guy-smile");
        KiddoPaint.Current.tool = KiddoPaint.Tools.Doorbell;
    }
}, {
    name: "#$%!*!!",
    imgSrc: "img/tool-submenu-eraser-186.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-guy-smile");
        KiddoPaint.Current.tool = KiddoPaint.Tools.EraserLetters;
    }
}, {
    name: "Fade Away",
    imgSrc: "img/tool-submenu-eraser-187.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-guy-smile");
        KiddoPaint.Current.tool = KiddoPaint.Tools.EraserFadeAway;
    }
}, {
    name: "Black Hole",
    imgSrc: "img/tool-submenu-eraser-189.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-crosshair");
        KiddoPaint.Current.tool = KiddoPaint.Tools.Eraser;
        KiddoPaint.Sounds.unimpl();
    }
}, {
    name: "Count Down",
    imgSrc: "img/tool-submenu-eraser-190.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-crosshair");
        KiddoPaint.Current.tool = KiddoPaint.Tools.Eraser;
        KiddoPaint.Sounds.unimpl();
    }
} ];

KiddoPaint.Submenu.flood = [ {
    name: "Texture 1",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Solid);
    },
    handler: function() {
        KiddoPaint.Tools.Flood.gcop = "destination-in";
        KiddoPaint.Tools.Flood.texture = function() {
            return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 2",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Partial1);
    },
    handler: function() {
        KiddoPaint.Tools.Flood.gcop = "destination-in";
        KiddoPaint.Tools.Flood.texture = function() {
            return KiddoPaint.Textures.Partial1(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 3",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Partial2);
    },
    handler: function() {
        KiddoPaint.Tools.Flood.gcop = "destination-in";
        KiddoPaint.Tools.Flood.texture = function() {
            return KiddoPaint.Textures.Partial2(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 4",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Partial3);
    },
    handler: function() {
        KiddoPaint.Tools.Flood.gcop = "destination-in";
        KiddoPaint.Tools.Flood.texture = function() {
            return KiddoPaint.Textures.Partial3(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 6",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.PartialArtifactAlias);
    },
    handler: function() {
        KiddoPaint.Tools.Flood.gcop = "destination-in";
        KiddoPaint.Tools.Flood.texture = function() {
            return KiddoPaint.Textures.PartialArtifactAlias(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 7",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Speckles);
    },
    handler: function() {
        KiddoPaint.Tools.Flood.gcop = "destination-in";
        KiddoPaint.Tools.Flood.texture = function() {
            return KiddoPaint.Textures.Speckles(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 7",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Stripes);
    },
    handler: function() {
        KiddoPaint.Tools.Flood.gcop = "destination-in";
        KiddoPaint.Tools.Flood.texture = function() {
            return KiddoPaint.Textures.Stripes(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 7",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Thatch);
    },
    handler: function() {
        KiddoPaint.Tools.Flood.gcop = "destination-in";
        KiddoPaint.Tools.Flood.texture = function() {
            return KiddoPaint.Textures.Thatch(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 7",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Shingles);
    },
    handler: function() {
        KiddoPaint.Tools.Flood.gcop = "destination-in";
        KiddoPaint.Tools.Flood.texture = function() {
            return KiddoPaint.Textures.Shingles(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 8",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Bubbles);
    },
    handler: function() {
        KiddoPaint.Tools.Flood.gcop = "destination-in";
        KiddoPaint.Tools.Flood.texture = function() {
            return KiddoPaint.Textures.Bubbles(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 9",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Diamond);
    },
    handler: function() {
        KiddoPaint.Tools.Flood.gcop = "destination-in";
        KiddoPaint.Tools.Flood.texture = function() {
            return KiddoPaint.Textures.Diamond(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 9",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Ribbon);
    },
    handler: function() {
        KiddoPaint.Tools.Flood.gcop = "destination-in";
        KiddoPaint.Tools.Flood.texture = function() {
            return KiddoPaint.Textures.Ribbon(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 10",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Sand);
    },
    handler: function() {
        KiddoPaint.Tools.Flood.gcop = "destination-in";
        KiddoPaint.Tools.Flood.texture = function() {
            return KiddoPaint.Textures.Sand(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 11",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Brick);
    },
    handler: function() {
        KiddoPaint.Tools.Flood.gcop = "destination-in";
        KiddoPaint.Tools.Flood.texture = function() {
            return KiddoPaint.Textures.Brick(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 11",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Chevron);
    },
    handler: function() {
        KiddoPaint.Tools.Flood.gcop = "destination-in";
        KiddoPaint.Tools.Flood.texture = function() {
            return KiddoPaint.Textures.Chevron(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 11",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Stairs);
    },
    handler: function() {
        KiddoPaint.Tools.Flood.gcop = "destination-in";
        KiddoPaint.Tools.Flood.texture = function() {
            return KiddoPaint.Textures.Stairs(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 11",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Cross);
    },
    handler: function() {
        KiddoPaint.Tools.Flood.gcop = "destination-in";
        KiddoPaint.Tools.Flood.texture = function() {
            return KiddoPaint.Textures.Cross(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 11",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.DiagBrick);
    },
    handler: function() {
        KiddoPaint.Tools.Flood.gcop = "destination-in";
        KiddoPaint.Tools.Flood.texture = function() {
            return KiddoPaint.Textures.DiagBrick(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 12",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.CornerStair);
    },
    handler: function() {
        KiddoPaint.Tools.Flood.gcop = "destination-in";
        KiddoPaint.Tools.Flood.texture = function() {
            return KiddoPaint.Textures.CornerStair(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 13",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Houndstooth);
    },
    handler: function() {
        KiddoPaint.Tools.Flood.gcop = "destination-in";
        KiddoPaint.Tools.Flood.texture = function() {
            return KiddoPaint.Textures.Houndstooth(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture ?",
    imgSrc: "img/tool-unknown.png",
    handler: function() {
        KiddoPaint.Tools.Flood.gcop = "source-atop";
        KiddoPaint.Tools.Flood.texture = function() {
            return KiddoPaint.Textures.RainbowGrad({
                _x: 0,
                _y: 0
            }, {
                _x: 0,
                _y: KiddoPaint.Display.main_canvas.height
            });
        };
    }
} ];

KiddoPaint.Submenu.jumble = [ {
    name: "Invert",
    imgSrc: "img/tool-submenu-wacky-mixer-164.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-guy-smile");
        KiddoPaint.Current.tool = KiddoPaint.Tools.ElectricMixerInvert;
    }
}, {
    name: "Raindrops",
    imgSrc: "img/tool-submenu-wacky-mixer-165.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-guy-smile");
        KiddoPaint.Current.tool = KiddoPaint.Tools.AnimBrush;
        KiddoPaint.Tools.AnimBrush.reset();
        KiddoPaint.Tools.AnimBrush.animInterval = 50;
        KiddoPaint.Tools.AnimBrush.postprocess = function() {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add("cursor-guy-smile");
        };
        KiddoPaint.Tools.AnimBrush.texture = function(step, distancePrev) {
            KiddoPaint.Display.canvas.classList = "";
            KiddoPaint.Display.canvas.classList.add("cursor-guy-wow");
            KiddoPaint.Sounds.bubblepops();
            let color = KiddoPaint.Colors.randomAllColor();
            return KiddoPaint.Brushes.Raindrops(color);
        };
    }
}, {
    name: "Checkerboard",
    imgSrc: "img/tool-submenu-wacky-mixer-166.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-guy-smile");
        KiddoPaint.Current.tool = KiddoPaint.Tools.WackyMixerCheckerboard;
    }
}, {
    name: "Wallpaper",
    imgSrc: "img/tool-submenu-wacky-mixer-167.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-guy-smile");
        KiddoPaint.Current.tool = KiddoPaint.Tools.WackyMixerWallpaper;
    }
}, {
    name: "Venetian Blinds",
    imgSrc: "img/tool-submenu-wacky-mixer-168.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-guy-smile");
        KiddoPaint.Current.tool = KiddoPaint.Tools.WackyMixerVenetianBlinds;
    }
}, {
    name: "The Outliner",
    imgSrc: "img/tool-submenu-wacky-mixer-169.png",
    handler: function() {
        KiddoPaint.Sounds.unimpl();
    }
}, {
    name: "Shadow Boxes",
    imgSrc: "img/tool-submenu-wacky-mixer-170.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-guy-smile");
        KiddoPaint.Current.tool = KiddoPaint.Tools.WackyMixerShadowBoxes;
    }
}, {
    name: "Zoom In",
    imgSrc: "img/tool-submenu-wacky-mixer-171.png",
    handler: function() {
        KiddoPaint.Sounds.unimpl();
    }
}, {
    name: "Broken Glass",
    imgSrc: "img/tool-submenu-wacky-mixer-172.png",
    handler: function() {
        KiddoPaint.Sounds.unimpl();
    }
}, {
    name: "Picture In A Picture",
    imgSrc: "img/tool-submenu-wacky-mixer-173.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-guy-smile");
        KiddoPaint.Current.tool = KiddoPaint.Tools.ElectricMixerPip;
    }
}, {
    name: "The Highlighter",
    imgSrc: "img/tool-submenu-wacky-mixer-174.png",
    handler: function() {
        KiddoPaint.Sounds.unimpl();
    }
}, {
    name: "Pattern Maker",
    imgSrc: "img/tool-submenu-wacky-mixer-175.png",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-guy-smile");
        KiddoPaint.Current.tool = KiddoPaint.Tools.WackyMixerPattern;
    }
}, {
    name: "Wrap Around",
    imgSrc: "img/tool-submenu-wacky-mixer-176.png",
    handler: function() {
        KiddoPaint.Sounds.unimpl();
    }
}, {
    name: "Swirl",
    emoji: "🍭",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-lollipop");
        KiddoPaint.Tools.WholeCanvasEffect.effect = JumbleFx.SWIRL;
        KiddoPaint.Current.tool = KiddoPaint.Tools.WholeCanvasEffect;
    }
}, {
    name: "Pancake Stack",
    emoji: "🥞",
    handler: function() {
        KiddoPaint.Display.canvas.classList = "";
        KiddoPaint.Display.canvas.classList.add("cursor-pancakes");
        KiddoPaint.Tools.WholeCanvasEffect.effect = JumbleFx.PANCAKE;
        KiddoPaint.Current.tool = KiddoPaint.Tools.WholeCanvasEffect;
    }
} ];

KiddoPaint.Submenu.line = [ {
    name: "Size 1",
    imgSrc: "img/pw1.png",
    handler: function() {
        KiddoPaint.Tools.Line.size = 1;
    }
}, {
    name: "Size 5",
    imgSrc: "img/pw2.png",
    handler: function() {
        KiddoPaint.Tools.Line.size = 5;
    }
}, {
    name: "Size 10",
    imgSrc: "img/pw3.png",
    handler: function() {
        KiddoPaint.Tools.Line.size = 9;
    }
}, {
    name: "Size 25",
    imgSrc: "img/pw4.png",
    handler: function() {
        KiddoPaint.Tools.Line.size = 13;
    }
}, {
    name: "Size 100",
    imgSrc: "img/pw5.png",
    handler: function() {
        KiddoPaint.Tools.Line.size = 17;
    }
}, {
    name: "Size 100",
    imgSrc: "img/pw6.png",
    handler: function() {
        KiddoPaint.Tools.Line.size = 25;
    }
}, {
    name: "spacer",
    invisible: true,
    handler: true
}, {
    name: "Texture 1",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Solid);
    },
    handler: function() {
        KiddoPaint.Tools.Line.stomp = true;
        KiddoPaint.Tools.Line.texture = function() {
            return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 2",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Partial1);
    },
    handler: function() {
        KiddoPaint.Tools.Line.stomp = true;
        KiddoPaint.Tools.Line.texture = function() {
            return KiddoPaint.Textures.Partial1(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 3",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Partial2);
    },
    handler: function() {
        KiddoPaint.Tools.Line.stomp = true;
        KiddoPaint.Tools.Line.texture = function() {
            return KiddoPaint.Textures.Partial2(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 4",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Partial3);
    },
    handler: function() {
        KiddoPaint.Tools.Line.stomp = true;
        KiddoPaint.Tools.Line.texture = function() {
            return KiddoPaint.Textures.Partial3(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 6",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.PartialArtifactAlias);
    },
    handler: function() {
        KiddoPaint.Tools.Line.stomp = true;
        KiddoPaint.Tools.Line.texture = function() {
            return KiddoPaint.Textures.PartialArtifactAlias(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 7",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Speckles);
    },
    handler: function() {
        KiddoPaint.Tools.Line.stomp = true;
        KiddoPaint.Tools.Line.texture = function() {
            return KiddoPaint.Textures.Speckles(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 7",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Stripes);
    },
    handler: function() {
        KiddoPaint.Tools.Line.stomp = true;
        KiddoPaint.Tools.Line.texture = function() {
            return KiddoPaint.Textures.Stripes(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 7",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Thatch);
    },
    handler: function() {
        KiddoPaint.Tools.Line.stomp = true;
        KiddoPaint.Tools.Line.texture = function() {
            return KiddoPaint.Textures.Thatch(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 7",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Shingles);
    },
    handler: function() {
        KiddoPaint.Tools.Line.stomp = true;
        KiddoPaint.Tools.Line.texture = function() {
            return KiddoPaint.Textures.Shingles(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 8",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Bubbles);
    },
    handler: function() {
        KiddoPaint.Tools.Line.stomp = true;
        KiddoPaint.Tools.Line.texture = function() {
            return KiddoPaint.Textures.Bubbles(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 9",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Diamond);
    },
    handler: function() {
        KiddoPaint.Tools.Line.stomp = true;
        KiddoPaint.Tools.Line.texture = function() {
            return KiddoPaint.Textures.Diamond(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 9",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Ribbon);
    },
    handler: function() {
        KiddoPaint.Tools.Line.stomp = true;
        KiddoPaint.Tools.Line.texture = function() {
            return KiddoPaint.Textures.Ribbon(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 10",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Sand);
    },
    handler: function() {
        KiddoPaint.Tools.Line.stomp = true;
        KiddoPaint.Tools.Line.texture = function() {
            return KiddoPaint.Textures.Sand(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 11",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Brick);
    },
    handler: function() {
        KiddoPaint.Tools.Line.stomp = true;
        KiddoPaint.Tools.Line.texture = function() {
            return KiddoPaint.Textures.Brick(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 11",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Chevron);
    },
    handler: function() {
        KiddoPaint.Tools.Line.stomp = true;
        KiddoPaint.Tools.Line.texture = function() {
            return KiddoPaint.Textures.Chevron(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 11",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Stairs);
    },
    handler: function() {
        KiddoPaint.Tools.Line.stomp = true;
        KiddoPaint.Tools.Line.texture = function() {
            return KiddoPaint.Textures.Stairs(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 11",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Cross);
    },
    handler: function() {
        KiddoPaint.Tools.Line.stomp = true;
        KiddoPaint.Tools.Line.texture = function() {
            return KiddoPaint.Textures.Cross(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 11",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.DiagBrick);
    },
    handler: function() {
        KiddoPaint.Tools.Line.stomp = true;
        KiddoPaint.Tools.Line.texture = function() {
            return KiddoPaint.Textures.DiagBrick(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 12",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.CornerStair);
    },
    handler: function() {
        KiddoPaint.Tools.Line.stomp = true;
        KiddoPaint.Tools.Line.texture = function() {
            return KiddoPaint.Textures.CornerStair(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 13",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Houndstooth);
    },
    handler: function() {
        KiddoPaint.Tools.Line.stomp = true;
        KiddoPaint.Tools.Line.texture = function() {
            return KiddoPaint.Textures.Houndstooth(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Rainbow",
    imgSrc: "img/tool-unknown.png",
    handler: function() {
        KiddoPaint.Tools.Line.stomp = false;
        KiddoPaint.Tools.Line.texture = function() {
            return KiddoPaint.Textures.RSolid();
        };
    }
} ];

KiddoPaint.Submenu.pencil = [ {
    name: "Size 1",
    imgSrc: "img/tool-submenu-pencil-size-1.png",
    handler: function() {
        KiddoPaint.Tools.Pencil.size = 1;
    }
}, {
    name: "Size 5",
    imgSrc: "img/tool-submenu-pencil-size-2.png",
    handler: function() {
        KiddoPaint.Tools.Pencil.size = 5;
    }
}, {
    name: "Size 10",
    imgSrc: "img/tool-submenu-pencil-size-3.png",
    handler: function() {
        KiddoPaint.Tools.Pencil.size = 9;
    }
}, {
    name: "Size 25",
    imgSrc: "img/tool-submenu-pencil-size-4.png",
    handler: function() {
        KiddoPaint.Tools.Pencil.size = 13;
    }
}, {
    name: "Size 100",
    imgSrc: "img/tool-submenu-pencil-size-5.png",
    handler: function() {
        KiddoPaint.Tools.Pencil.size = 17;
    }
}, {
    name: "Size 100",
    imgSrc: "img/tool-submenu-pencil-size-6.png",
    handler: function() {
        KiddoPaint.Tools.Pencil.size = 25;
    }
}, {
    name: "spacer",
    invisible: true,
    handler: true
}, {
    name: "Solid",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Solid);
    },
    handler: function() {
        KiddoPaint.Tools.Pencil.texture = function(color) {
            return KiddoPaint.Textures.Solid(color);
        };
    }
}, {
    name: "Partial 1",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Partial1);
    },
    handler: function() {
        KiddoPaint.Tools.Pencil.texture = function(color) {
            return KiddoPaint.Textures.Partial1(color);
        };
    }
}, {
    name: "Partial 2",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Partial2);
    },
    handler: function() {
        KiddoPaint.Tools.Pencil.texture = function(color) {
            return KiddoPaint.Textures.Partial2(color);
        };
    }
}, {
    name: "Partial 3",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Partial3);
    },
    handler: function() {
        KiddoPaint.Tools.Pencil.texture = function(color) {
            return KiddoPaint.Textures.Partial3(color);
        };
    }
}, {
    name: "Partial Artifact",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.PartialArtifactAlias);
    },
    handler: function() {
        KiddoPaint.Tools.Pencil.texture = function(color) {
            return KiddoPaint.Textures.PartialArtifactAlias(color);
        };
    }
}, {
    name: "Speckles",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Speckles);
    },
    handler: function() {
        KiddoPaint.Tools.Pencil.texture = function(color) {
            return KiddoPaint.Textures.Speckles(color);
        };
    }
}, {
    name: "Stripes",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Stripes);
    },
    handler: function() {
        KiddoPaint.Tools.Pencil.texture = function(color) {
            return KiddoPaint.Textures.Stripes(color);
        };
    }
}, {
    name: "Thatch",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Thatch);
    },
    handler: function() {
        KiddoPaint.Tools.Pencil.texture = function(color) {
            return KiddoPaint.Textures.Thatch(color);
        };
    }
}, {
    name: "Shingles",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Shingles);
    },
    handler: function() {
        KiddoPaint.Tools.Pencil.texture = function(color) {
            return KiddoPaint.Textures.Shingles(color);
        };
    }
}, {
    name: "Bubbles",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Bubbles);
    },
    handler: function() {
        KiddoPaint.Tools.Pencil.texture = function(color) {
            return KiddoPaint.Textures.Bubbles(color);
        };
    }
}, {
    name: "Diamond",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Diamond);
    },
    handler: function() {
        KiddoPaint.Tools.Pencil.texture = function(color) {
            return KiddoPaint.Textures.Diamond(color);
        };
    }
}, {
    name: "Ribbon",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Ribbon);
    },
    handler: function() {
        KiddoPaint.Tools.Pencil.texture = function(color) {
            return KiddoPaint.Textures.Ribbon(color);
        };
    }
}, {
    name: "Sand",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Sand);
    },
    handler: function() {
        KiddoPaint.Tools.Pencil.texture = function(color) {
            return KiddoPaint.Textures.Sand(color);
        };
    }
}, {
    name: "Brick",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Brick);
    },
    handler: function() {
        KiddoPaint.Tools.Pencil.texture = function(color) {
            return KiddoPaint.Textures.Brick(color);
        };
    }
}, {
    name: "Chevron",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Chevron);
    },
    handler: function() {
        KiddoPaint.Tools.Pencil.texture = function(color) {
            return KiddoPaint.Textures.Chevron(color);
        };
    }
}, {
    name: "Stairs",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Stairs);
    },
    handler: function() {
        KiddoPaint.Tools.Pencil.texture = function(color) {
            return KiddoPaint.Textures.Stairs(color);
        };
    }
}, {
    name: "Cross",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Cross);
    },
    handler: function() {
        KiddoPaint.Tools.Pencil.texture = function(color) {
            return KiddoPaint.Textures.Cross(color);
        };
    }
}, {
    name: "Diagonal Brick",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.DiagBrick);
    },
    handler: function() {
        KiddoPaint.Tools.Pencil.texture = function(color) {
            return KiddoPaint.Textures.DiagBrick(color);
        };
    }
}, {
    name: "Corner Stair",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.CornerStair);
    },
    handler: function() {
        KiddoPaint.Tools.Pencil.texture = function(color) {
            return KiddoPaint.Textures.CornerStair(color);
        };
    }
}, {
    name: "Houndstooth",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Houndstooth);
    },
    handler: function() {
        KiddoPaint.Tools.Pencil.texture = function(color) {
            return KiddoPaint.Textures.Houndstooth(color);
        };
    }
}, {
    name: "Rainbow",
    imgSrc: "img/tool-unknown.png",
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
        };
    }
} ];

KiddoPaint.Submenu.spray = [ {
    name: "Spray Paint 2",
    imgJs: function() {
        return KiddoPaint.Textures.SprayPaint2().toDataURL();
    },
    handler: function() {
        KiddoPaint.Tools.SpritePlacer.image = KiddoPaint.Textures.SprayPaint2(KiddoPaint.Current.color);
        KiddoPaint.Tools.SpritePlacer.soundBefore = function() {};
        KiddoPaint.Tools.SpritePlacer.soundDuring = function() {};
        KiddoPaint.Current.tool = KiddoPaint.Tools.SpritePlacer;
    }
}, {
    name: "Spray Paint 3",
    imgJs: function() {
        return KiddoPaint.Textures.SprayPaint3().toDataURL();
    },
    handler: function() {
        KiddoPaint.Tools.SpritePlacer.image = KiddoPaint.Textures.SprayPaint3(KiddoPaint.Current.color);
        KiddoPaint.Current.tool = KiddoPaint.Tools.SpritePlacer;
    }
}, {
    name: "Spray Paint 4",
    imgJs: function() {
        return KiddoPaint.Textures.SprayPaint4().toDataURL();
    },
    handler: function() {
        KiddoPaint.Tools.SpritePlacer.image = KiddoPaint.Textures.SprayPaint4(KiddoPaint.Current.color);
        KiddoPaint.Current.tool = KiddoPaint.Tools.SpritePlacer;
    }
}, {
    name: "Spray Paint 5",
    imgJs: function() {
        return KiddoPaint.Textures.SprayPaint5().toDataURL();
    },
    handler: function() {
        KiddoPaint.Tools.SpritePlacer.image = KiddoPaint.Textures.SprayPaint5(KiddoPaint.Current.color);
        KiddoPaint.Current.tool = KiddoPaint.Tools.SpritePlacer;
    }
}, {
    name: "Spray Paint 6",
    imgJs: function() {
        return KiddoPaint.Textures.SprayPaint6().toDataURL();
    },
    handler: function() {
        KiddoPaint.Tools.SpritePlacer.image = KiddoPaint.Textures.SprayPaint6(KiddoPaint.Current.color);
        KiddoPaint.Current.tool = KiddoPaint.Tools.SpritePlacer;
    }
}, {
    name: "Spray Paint 7",
    imgJs: function() {
        return KiddoPaint.Textures.SprayPaint7().toDataURL();
    },
    handler: function() {
        KiddoPaint.Tools.SpritePlacer.image = KiddoPaint.Textures.SprayPaint7(KiddoPaint.Current.color);
        KiddoPaint.Current.tool = KiddoPaint.Tools.SpritePlacer;
    }
}, {
    name: "spacer",
    invisible: true,
    handler: true
} ];

KiddoPaint.Submenu.sprites = [];

KiddoPaint.Sprite.sheetPage = 0;

KiddoPaint.Sprite.sheets = [ "img/kidpix-spritesheet-0.png", "img/kidpix-spritesheet-0b.png", "img/kidpix-spritesheet-1.png", "img/kidpix-spritesheet-2.png", "img/kidpix-spritesheet-3.png", "img/kidpix-spritesheet-4.png", "img/kidpix-spritesheet-5.png", "img/kidpix-spritesheet-6.png", "img/kidpix-spritesheet-7.png", "img/kidpix-spritesheet-8.png" ];

KiddoPaint.Sprite.nextSprite = function() {
    const maxrow = KiddoPaint.Sprite.sheets.length - 1;
    KiddoPaint.Sprite.sheetPage += 1;
    if (KiddoPaint.Sprite.sheetPage > maxrow) {
        KiddoPaint.Sprite.sheetPage = 0;
    }
};

KiddoPaint.Sprite.prevSprite = function() {
    const maxrow = KiddoPaint.Sprite.sheets.length - 1;
    KiddoPaint.Sprite.sheetPage -= 1;
    if (KiddoPaint.Sprite.sheetPage < 0) {
        KiddoPaint.Sprite.sheetPage = maxrow;
    }
};

KiddoPaint.Sprite.nextPage = function() {
    const maxrow = 7;
    KiddoPaint.Sprite.page += 1;
    if (KiddoPaint.Sprite.page > maxrow) {
        KiddoPaint.Sprite.page = 0;
    }
};

KiddoPaint.Sprite.prevPage = function() {
    const maxrow = 7;
    KiddoPaint.Sprite.page -= 1;
    if (KiddoPaint.Sprite.page < 0) {
        KiddoPaint.Sprite.page = maxrow;
    }
};

function init_sprites_submenu() {
    let sheet = KiddoPaint.Sprite.sheets[KiddoPaint.Sprite.sheetPage];
    const maxcols = 14;
    let row = KiddoPaint.Sprite.page;
    KiddoPaint.Submenu.sprites = [];
    for (let j = 0; j < maxcols; j++) {
        let individualSprite = {
            name: "Sprite",
            spriteSheet: sheet,
            spriteRow: row,
            spriteCol: j,
            handler: function(e) {
                var img = new Image();
                img.src = sheet;
                img.crossOrigin = "anonymous";
                img.onload = function() {
                    KiddoPaint.Tools.SpritePlacer.image = scaleImageDataCanvasAPIPixelated(extractSprite(img, 32, j, row, 0), 2);
                    KiddoPaint.Tools.SpritePlacer.soundBefore = function() {
                        KiddoPaint.Sounds.stamp();
                    };
                    KiddoPaint.Tools.SpritePlacer.soundDuring = function() {};
                    KiddoPaint.Current.tool = KiddoPaint.Tools.SpritePlacer;
                };
            }
        };
        KiddoPaint.Submenu.sprites.push(individualSprite);
    }
    KiddoPaint.Submenu.sprites.push({
        name: "Next Page",
        emoji: "↪",
        handler: function(e) {
            e.type == "contextmenu" ? KiddoPaint.Sprite.prevPage() : KiddoPaint.Sprite.nextPage();
            init_sprites_submenu();
            show_generic_submenu("sprites");
        }
    });
    KiddoPaint.Submenu.sprites.push({
        name: "Next Stamp Pack",
        emoji: "➡️",
        handler: function(e) {
            e.type == "contextmenu" ? KiddoPaint.Sprite.prevSprite() : KiddoPaint.Sprite.nextSprite();
            init_sprites_submenu();
            show_generic_submenu("sprites");
        }
    });
}

KiddoPaint.Submenu.square = [ {
    name: "Texture 1",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.None);
    },
    handler: function() {
        KiddoPaint.Tools.Square.texture = function() {
            return KiddoPaint.Textures.None(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 1",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Solid);
    },
    handler: function() {
        KiddoPaint.Tools.Square.texture = function() {
            return KiddoPaint.Textures.Solid(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 2",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Partial1);
    },
    handler: function() {
        KiddoPaint.Tools.Square.texture = function() {
            return KiddoPaint.Textures.Partial1(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 3",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Partial2);
    },
    handler: function() {
        KiddoPaint.Tools.Square.texture = function() {
            return KiddoPaint.Textures.Partial2(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 4",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Partial3);
    },
    handler: function() {
        KiddoPaint.Tools.Square.texture = function() {
            return KiddoPaint.Textures.Partial3(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 6",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.PartialArtifactAlias);
    },
    handler: function() {
        KiddoPaint.Tools.Square.texture = function() {
            return KiddoPaint.Textures.PartialArtifactAlias(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 7",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Speckles);
    },
    handler: function() {
        KiddoPaint.Tools.Square.texture = function() {
            return KiddoPaint.Textures.Speckles(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 7",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Stripes);
    },
    handler: function() {
        KiddoPaint.Tools.Square.texture = function() {
            return KiddoPaint.Textures.Stripes(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 7",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Thatch);
    },
    handler: function() {
        KiddoPaint.Tools.Square.texture = function() {
            return KiddoPaint.Textures.Thatch(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 7",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Shingles);
    },
    handler: function() {
        KiddoPaint.Tools.Square.texture = function() {
            return KiddoPaint.Textures.Shingles(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 8",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Bubbles);
    },
    handler: function() {
        KiddoPaint.Tools.Square.texture = function() {
            return KiddoPaint.Textures.Bubbles(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 9",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Diamond);
    },
    handler: function() {
        KiddoPaint.Tools.Square.texture = function() {
            return KiddoPaint.Textures.Diamond(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 9",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Ribbon);
    },
    handler: function() {
        KiddoPaint.Tools.Square.texture = function() {
            return KiddoPaint.Textures.Ribbon(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 10",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Sand);
    },
    handler: function() {
        KiddoPaint.Tools.Square.texture = function() {
            return KiddoPaint.Textures.Sand(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 11",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Brick);
    },
    handler: function() {
        KiddoPaint.Tools.Square.texture = function() {
            return KiddoPaint.Textures.Brick(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 11",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Chevron);
    },
    handler: function() {
        KiddoPaint.Tools.Square.texture = function() {
            return KiddoPaint.Textures.Chevron(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 11",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Stairs);
    },
    handler: function() {
        KiddoPaint.Tools.Square.texture = function() {
            return KiddoPaint.Textures.Stairs(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 11",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Cross);
    },
    handler: function() {
        KiddoPaint.Tools.Square.texture = function() {
            return KiddoPaint.Textures.Cross(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 11",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.DiagBrick);
    },
    handler: function() {
        KiddoPaint.Tools.Square.texture = function() {
            return KiddoPaint.Textures.DiagBrick(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 12",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.CornerStair);
    },
    handler: function() {
        KiddoPaint.Tools.Square.texture = function() {
            return KiddoPaint.Textures.CornerStair(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture 13",
    imgJs: function() {
        return makeIcon(KiddoPaint.Textures.Houndstooth);
    },
    handler: function() {
        KiddoPaint.Tools.Square.texture = function() {
            return KiddoPaint.Textures.Houndstooth(KiddoPaint.Current.color);
        };
    }
}, {
    name: "Texture ?",
    imgSrc: "img/tool-unknown.png",
    handler: function() {
        KiddoPaint.Tools.Square.texture = function(start, end) {
            return KiddoPaint.Textures.RainbowGrad(start, end);
        };
    }
} ];

KiddoPaint.Submenu.stickers = [ {
    name: "Kid Pix Sticker 1",
    imgSrc: "img/kp-sticker-1.png",
    handler: function(e) {
        var img = new Image();
        img.src = "img/kp-sticker-1.png";
        img.crossOrigin = "anonymous";
        img.onload = function() {
            KiddoPaint.Tools.Placer.image = img;
            KiddoPaint.Tools.Placer.size = {
                width: img.width,
                height: img.height
            };
            KiddoPaint.Current.tool = KiddoPaint.Tools.Placer;
        };
    }
}, {
    name: "Kid Pix Sticker 2",
    imgSrc: "img/kp-sticker-2.png",
    handler: function(e) {
        var img = new Image();
        img.src = "img/kp-sticker-2.png";
        img.crossOrigin = "anonymous";
        img.onload = function() {
            KiddoPaint.Tools.Placer.image = img;
            KiddoPaint.Tools.Placer.size = {
                width: img.width,
                height: img.height
            };
            KiddoPaint.Current.tool = KiddoPaint.Tools.Placer;
        };
    }
}, {
    name: "Kid Pix Sticker 3",
    imgSrc: "img/kp-sticker-3.png",
    handler: function(e) {
        var img = new Image();
        img.src = "img/kp-sticker-3.png";
        img.crossOrigin = "anonymous";
        img.onload = function() {
            KiddoPaint.Tools.Placer.image = img;
            KiddoPaint.Tools.Placer.size = {
                width: img.width,
                height: img.height
            };
            KiddoPaint.Current.tool = KiddoPaint.Tools.Placer;
        };
    }
}, {
    name: "Kid Pix Sticker 4",
    imgSrc: "img/kp-sticker-4.png",
    handler: function(e) {
        var img = new Image();
        img.src = "img/kp-sticker-4.png";
        img.crossOrigin = "anonymous";
        img.onload = function() {
            KiddoPaint.Tools.Placer.image = img;
            KiddoPaint.Tools.Placer.size = {
                width: img.width,
                height: img.height
            };
            KiddoPaint.Current.tool = KiddoPaint.Tools.Placer;
        };
    }
}, {
    name: "Kid Pix Sticker 5",
    imgSrc: "img/kp-sticker-5.png",
    handler: function(e) {
        var img = new Image();
        img.src = "img/kp-sticker-5.png";
        img.crossOrigin = "anonymous";
        img.onload = function() {
            KiddoPaint.Tools.Placer.image = img;
            KiddoPaint.Tools.Placer.size = {
                width: img.width,
                height: img.height
            };
            KiddoPaint.Current.tool = KiddoPaint.Tools.Placer;
        };
    }
}, {
    name: "Kid Pix Sticker 6",
    imgSrc: "img/kp-sticker-6.png",
    handler: function(e) {
        var img = new Image();
        img.src = "img/kp-sticker-6.png";
        img.crossOrigin = "anonymous";
        img.onload = function() {
            KiddoPaint.Tools.Placer.image = img;
            KiddoPaint.Tools.Placer.size = {
                width: img.width,
                height: img.height
            };
            KiddoPaint.Current.tool = KiddoPaint.Tools.Placer;
        };
    }
} ];

KiddoPaint.Submenu.truck = [ {
    name: "Truck 1",
    imgSrc: "img/tool-submenu-truck-192.png",
    handler: function() {
        KiddoPaint.Tools.Cut.length = 50;
        KiddoPaint.Tools.Cut.width = 50;
    }
}, {
    name: "Truck 2",
    imgSrc: "img/tool-submenu-truck-193.png",
    handler: function() {
        KiddoPaint.Tools.Cut.length = 25;
        KiddoPaint.Tools.Cut.width = 25;
    }
}, {
    name: "Truck 2",
    imgSrc: "img/tool-submenu-truck-194.png",
    handler: function() {
        KiddoPaint.Tools.Cut.length = 10;
        KiddoPaint.Tools.Cut.width = 10;
    }
}, {
    name: "Truck 2",
    imgSrc: "img/tool-submenu-truck-195.png",
    handler: function() {
        KiddoPaint.Tools.Cut.length = 5;
        KiddoPaint.Tools.Cut.width = 5;
    }
}, {
    name: "Truck 2",
    imgSrc: "img/tool-submenu-truck-196.png",
    handler: function() {
        KiddoPaint.Tools.Cut.length = 1;
        KiddoPaint.Tools.Cut.width = 1;
    }
}, {
    name: "Truck 2",
    imgSrc: "img/tool-submenu-truck-197.png",
    handler: function() {
        KiddoPaint.Tools.Cut.length = 50;
        KiddoPaint.Tools.Cut.width = 25;
    }
}, {
    name: "Truck 2",
    imgSrc: "img/tool-submenu-truck-198.png",
    handler: function() {
        KiddoPaint.Tools.Cut.length = 25;
        KiddoPaint.Tools.Cut.width = 10;
    }
}, {
    name: "Truck 2",
    imgSrc: "img/tool-submenu-truck-199.png",
    handler: function() {
        KiddoPaint.Tools.Cut.length = 10;
        KiddoPaint.Tools.Cut.width = 5;
    }
}, {
    name: "Truck 2",
    imgSrc: "img/tool-submenu-truck-200.png",
    handler: function() {
        KiddoPaint.Tools.Cut.length = 5;
        KiddoPaint.Tools.Cut.width = 2;
    }
}, {
    name: "Truck 2",
    imgSrc: "img/tool-submenu-truck-201.png",
    handler: function() {
        KiddoPaint.Tools.Cut.length = 25;
        KiddoPaint.Tools.Cut.width = 50;
    }
}, {
    name: "Truck 2",
    imgSrc: "img/tool-submenu-truck-202.png",
    handler: function() {
        KiddoPaint.Tools.Cut.length = 10;
        KiddoPaint.Tools.Cut.width = 25;
    }
}, {
    name: "Truck 2",
    imgSrc: "img/tool-submenu-truck-203.png",
    handler: function() {
        KiddoPaint.Tools.Cut.length = 5;
        KiddoPaint.Tools.Cut.width = 10;
    }
}, {
    name: "Truck 2",
    imgSrc: "img/tool-submenu-truck-204.png",
    handler: function() {
        KiddoPaint.Tools.Cut.length = 2;
        KiddoPaint.Tools.Cut.width = 5;
    }
}, {
    name: "Truck 2",
    imgSrc: "img/tool-submenu-truck-205.png",
    handler: function() {
        KiddoPaint.Sounds.unimpl();
    }
} ];

KiddoPaint.Brushes.Bubbles = function(color1) {
    color1 = color1 || "black";
    var canvasBrush = document.createElement("canvas");
    var size = 20 * KiddoPaint.Current.scaling;
    canvasBrush.width = size * 2;
    canvasBrush.height = size * 2;
    var contextBrush = canvasBrush.getContext("2d");
    for (let i = -(size / 2); i < size / 2; i += 4) {
        for (let j = -(size / 2); j < size / 2; j += 4) {
            if (Math.random() > .5) {
                contextBrush.beginPath();
                contextBrush.arc(size + i, size + j, 4, 0, Math.PI * 2);
                contextBrush.strokeStyle = color1;
                contextBrush.lineWidth = 1;
                contextBrush.stroke();
                if (Math.random() > .35) {
                    contextBrush.fillStyle = color1;
                } else {
                    contextBrush.fillStyle = "white";
                }
                contextBrush.fill();
                contextBrush.closePath();
            }
        }
    }
    return {
        brush: canvasBrush,
        offset: size
    };
};

KiddoPaint.Brushes.Circles = function() {
    var flip = 0;
    return function(color1, color2, alwaysFill) {
        color1 = color1 || "black";
        color2 = color2 || color1;
        alwaysFill = alwaysFill || false;
        let size = 20 * KiddoPaint.Current.scaling;
        var canvasBrush = document.createElement("canvas");
        canvasBrush.width = size * 2;
        canvasBrush.height = size * 2;
        var contextBrush = canvasBrush.getContext("2d");
        contextBrush.beginPath();
        contextBrush.arc(size, size, size / 2, 0, 2 * Math.PI);
        if (alwaysFill || flip % 2 == 0) {
            contextBrush.fillStyle = color1;
            contextBrush.fill();
        }
        contextBrush.lineWidth = 2;
        contextBrush.strokeStyle = color2;
        contextBrush.stroke();
        contextBrush.closePath();
        flip++;
        return {
            brush: canvasBrush,
            offset: size
        };
    };
}();

KiddoPaint.Brushes.RCircles = function() {
    var color1 = KiddoPaint.Colors.randomColor();
    var color2 = KiddoPaint.Colors.randomColor();
    return KiddoPaint.Brushes.Circles(color1, color2, true);
};

KiddoPaint.Brushes.Concentric = function(color1, step) {
    color1 = color1 || "black";
    var canvasBrush = document.createElement("canvas");
    var size = (step % 7 * 5 + 5) * KiddoPaint.Current.scaling;
    canvasBrush.width = size * 2 + 10;
    canvasBrush.height = size * 2 + 10;
    var contextBrush = canvasBrush.getContext("2d");
    contextBrush.beginPath();
    contextBrush.arc(size + 5, size + 5, size, 0, Math.PI * 2);
    contextBrush.strokeStyle = color1;
    contextBrush.lineWidth = 1;
    contextBrush.stroke();
    if (KiddoPaint.Current.modifiedMeta) {
        contextBrush.fill();
    }
    contextBrush.closePath();
    return {
        brush: canvasBrush,
        offset: size
    };
};

KiddoPaint.Brushes.ConnectTheDots = function(color1, step) {
    color1 = color1 || "black";
    var canvasBrush = document.createElement("canvas");
    canvasBrush.width = canvasBrush.height = 150;
    var contextBrush = canvasBrush.getContext("2d");
    contextBrush.font = "16px sans-serif";
    contextBrush.textBaseline = "middle";
    contextBrush.textAlign = "center";
    contextBrush.fillStyle = color1;
    let dotandnumber = "• " + step;
    let textsize = contextBrush.measureText(dotandnumber);
    contextBrush.fillText(dotandnumber, 16, 16, canvasBrush.width);
    return {
        brush: trimCanvas3(canvasBrush),
        offset: 0
    };
};

KiddoPaint.Brushes.Dumbbell = function(color1, color2) {
    color1 = color1 || "black";
    color2 = color2 || "black";
    var radius = 25 * KiddoPaint.Current.scaling * KiddoPaint.Current.multiplier;
    var density = 128 * KiddoPaint.Current.scaling * KiddoPaint.Current.multiplier;
    var canvasBrush = document.createElement("canvas");
    canvasBrush.width = radius * 2;
    canvasBrush.height = radius * 2;
    var contextBrush = canvasBrush.getContext("2d");
    contextBrush.fillStyle = color1;
    function bar() {
        var rr = ziggurat() * radius;
        var ra = Math.random() * 2 * Math.PI;
        var x = Math.cos(ra) * rr;
        var y = Math.sin(ra) * rr / 11;
        contextBrush.fillRect(radius + x, radius + y, .7, .7);
    }
    for (var i = 0; i < density; i++) {
        contextBrush.globalAlpha = Math.random() / 2;
        bar();
    }
    return {
        brush: canvasBrush,
        offset: radius
    };
};

KiddoPaint.Brushes.FollowingSine = function(color1, step) {
    color1 = color1 || "black";
    var interval = 50;
    step = step % interval / interval;
    var canvasBrush = document.createElement("canvas");
    var size = 33 * KiddoPaint.Current.scaling;
    canvasBrush.width = size * 2;
    canvasBrush.height = size * 2;
    var contextBrush = canvasBrush.getContext("2d");
    contextBrush.fillStyle = color1;
    for (var i = 0, s = step; i < 6; i++, s += 10 / interval) {
        x = size + size * Math.cos(2 * Math.PI * s);
        y = size + size * Math.sin(2 * Math.PI * s);
        contextBrush.fillRect(Math.round(x), Math.round(y), 3, 3);
    }
    return {
        brush: canvasBrush,
        offset: size,
        inplace: true
    };
};

KiddoPaint.Brushes.Icy = function(color1) {
    color1 = color1 || "black";
    var radius = 32 * KiddoPaint.Current.scaling * KiddoPaint.Current.multiplier;
    var density = clamp(0, 2e3, 600 * KiddoPaint.Current.scaling * KiddoPaint.Current.multiplier);
    var canvasBrush = document.createElement("canvas");
    canvasBrush.width = 32;
    canvasBrush.height = 400;
    var contextBrush = canvasBrush.getContext("2d");
    contextBrush.fillStyle = color1;
    function delicatespray() {
        var px = .4 * (KiddoPaint.Current.multiplier < 6 ? 1 : 2);
        var x = randn_bm(-5, 5, 1);
        var y = randn_bm(-radius, radius, 5);
        contextBrush.fillRect(x, radius + y, px, px);
    }
    for (var i = 0; i < density; i++) {
        contextBrush.globalAlpha = Math.random() / 2;
        delicatespray();
    }
    return {
        brush: canvasBrush,
        offset: 0
    };
};

KiddoPaint.Brushes.LeakyPen = function() {
    var prevSize = 3;
    var baseSize = 3;
    var maxSize = Math.PI * baseSize * Math.E;
    return function(color1, distPrev) {
        color1 = color1 || "black";
        if (distPrev < 2) {
            if (prevSize < maxSize) {
                prevSize += .15;
            }
        } else {
            prevSize = baseSize;
        }
        let size = prevSize * KiddoPaint.Current.scaling;
        var canvasBrush = document.createElement("canvas");
        canvasBrush.width = size * 4.5;
        canvasBrush.height = size * 4.5;
        var contextBrush = canvasBrush.getContext("2d");
        contextBrush.beginPath();
        contextBrush.ellipse(size * 1.5, size * 1.5, size, size, Math.PI / 4, 0, 2 * Math.PI);
        contextBrush.fillStyle = color1;
        contextBrush.fill();
        contextBrush.closePath();
        return {
            brush: canvasBrush,
            offset: canvasBrush.width / 2
        };
    };
}();

KiddoPaint.Brushes.MeanStreak = function(step) {
    var canvasBrush = document.createElement("canvas");
    var size = 32 * KiddoPaint.Current.scaling;
    canvasBrush.width = size * 2;
    canvasBrush.height = size * 2;
    var contextBrush = canvasBrush.getContext("2d");
    var transforms = [ "source-in", "source-out", "destination-atop", "screen", "overlay", "soft-light", "lighter", "exclusion", "luminosity" ];
    var c = makeComposite(transforms[KiddoPaint.Current.multiplier]);
    contextBrush.translate(size / 2, size / 2);
    contextBrush.rotate(step % 360 * (Math.PI / 180));
    contextBrush.translate(-size / 2, -size / 2);
    contextBrush.drawImage(c, 0, 0, c.width, c.height, 0, 0, size, size);
    return {
        brush: canvasBrush,
        offset: size / 2
    };
};

KiddoPaint.Brushes.Pies = function(color1) {
    color1 = color1 || "black";
    var canvasBrush = document.createElement("canvas");
    var size = 20 * KiddoPaint.Current.scaling;
    canvasBrush.width = size * 2;
    canvasBrush.height = size * 2;
    var contextBrush = canvasBrush.getContext("2d");
    contextBrush.beginPath();
    contextBrush.arc(size, size, size, 0, Math.PI * 2);
    contextBrush.fillStyle = color1;
    if (KiddoPaint.Current.modifiedMeta) {
        contextBrush.stroke();
    } else {
        contextBrush.fill();
    }
    contextBrush.closePath();
    contextBrush.globalCompositeOperation = "destination-out";
    contextBrush.beginPath();
    contextBrush.fillStyle = color1;
    offset = Math.random() * 2 * Math.PI;
    contextBrush.arc(size, size, size + 2, 0 + offset, (.5 + Math.random() - .5) * Math.PI + offset);
    contextBrush.lineTo(size, size);
    contextBrush.fill();
    return {
        brush: canvasBrush,
        offset: size
    };
};

KiddoPaint.Brushes.RainbowBall = function(step) {
    var canvas = document.createElement("canvas");
    var size = 100 * KiddoPaint.Current.scaling;
    canvas.width = size * 2;
    canvas.height = size * 2;
    var ctx = canvas.getContext("2d");
    var g1 = ctx.createRadialGradient(45, 45, 10, 52, 50, 30);
    g1.addColorStop(0, "#A7D30C");
    g1.addColorStop(.9, "#019F62");
    g1.addColorStop(1, "rgba(1,159,98,0)");
    var g2 = ctx.createRadialGradient(125, 45, 20, 132, 50, 30);
    g2.addColorStop(0, "#FF5F98");
    g2.addColorStop(.75, "#FF0188");
    g2.addColorStop(1, "rgba(255,1,136,0)");
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, size, size);
    return {
        brush: canvas,
        offset: size / 2
    };
};

KiddoPaint.Brushes.RainbowBar = function(step) {
    var canvas = document.createElement("canvas");
    var size = 35 * KiddoPaint.Current.scaling;
    canvas.width = size * 2.25;
    canvas.height = size * 2.25;
    var ctx = canvas.getContext("2d");
    var gradient = ctx.createLinearGradient(10, 0, size * 2, 0);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(1 / 6, "orange");
    gradient.addColorStop(2 / 6, "yellow");
    gradient.addColorStop(3 / 6, "green");
    gradient.addColorStop(4 / 6, "blue");
    gradient.addColorStop(5 / 6, "indigo");
    gradient.addColorStop(1, "violet");
    ctx.fillStyle = gradient;
    ctx.rotate(20 * Math.PI / 180);
    ctx.fillRect(7, 0, size * 2, 16);
    return {
        brush: canvas,
        offset: size / 2
    };
};

KiddoPaint.Brushes.RainbowDoughnut = function(step) {
    var canvas = document.createElement("canvas");
    var size = 32 * KiddoPaint.Current.scaling;
    canvas.width = size * 2;
    canvas.height = size * 2;
    var ctx = canvas.getContext("2d");
    function drawMultiRadiantCircle(xc, yc, r, radientColors) {
        var partLength = 2 * Math.PI / radientColors.length;
        var start = 0;
        var gradient = null;
        var startColor = null, endColor = null;
        for (var i = 0; i < radientColors.length; i++) {
            startColor = radientColors[i];
            endColor = radientColors[(i + 1) % radientColors.length];
            var xStart = xc + Math.cos(start) * r;
            var xEnd = xc + Math.cos(start + partLength) * r;
            var yStart = yc + Math.sin(start) * r;
            var yEnd = yc + Math.sin(start + partLength) * r;
            ctx.beginPath();
            gradient = ctx.createLinearGradient(xStart, yStart, xEnd, yEnd);
            gradient.addColorStop(0, startColor);
            gradient.addColorStop(1, endColor);
            ctx.strokeStyle = gradient;
            ctx.arc(xc, yc, r, start, start + partLength);
            ctx.lineWidth = size / 4;
            ctx.stroke();
            ctx.closePath();
            start += partLength;
        }
    }
    var someColors = [];
    someColors.push("#0F0");
    someColors.push("#0FF");
    someColors.push("#F00");
    someColors.push("#FF0");
    someColors.push("#F0F");
    drawMultiRadiantCircle(size / 2, size / 2, size / 3, someColors);
    return {
        brush: canvas,
        offset: size / 2
    };
};

KiddoPaint.Brushes.Raindrops = function(color1) {
    color1 = color1 || "black";
    let size = (5 + 100 * Math.random()) * KiddoPaint.Current.scaling;
    var canvasBrush = document.createElement("canvas");
    canvasBrush.width = size * 2;
    canvasBrush.height = size * 2;
    var contextBrush = canvasBrush.getContext("2d");
    contextBrush.beginPath();
    contextBrush.arc(size, size, size / 2, 0, 2 * Math.PI);
    contextBrush.fillStyle = color1;
    contextBrush.fill();
    contextBrush.closePath();
    return {
        brush: canvasBrush,
        abspos: {
            x: getRandomFloat(-5, KiddoPaint.Display.canvas.width + 5),
            y: getRandomFloat(-5, KiddoPaint.Display.canvas.width + 5)
        }
    };
};

KiddoPaint.Brushes.Rose = function(color1, step) {
    color1 = color1 || "black";
    var interval = 257;
    var fraction = interval / 7;
    var k = 5;
    step = step % interval / interval;
    var canvasBrush = document.createElement("canvas");
    var size = 50 * KiddoPaint.Current.scaling;
    canvasBrush.width = size * 2;
    canvasBrush.height = size * 2;
    var contextBrush = canvasBrush.getContext("2d");
    contextBrush.fillStyle = color1;
    contextBrush.strokeStyle = color1;
    for (var i = 0, s = step; i < 6; i++, s += fraction / interval) {
        x = size + size * Math.cos(k * 2 * Math.PI * s) * Math.cos(2 * Math.PI * s);
        y = size + size * Math.cos(k * 2 * Math.PI * s) * Math.sin(2 * Math.PI * s);
        contextBrush.lineTo(x, y);
    }
    contextBrush.stroke();
    return {
        brush: canvasBrush,
        offset: size,
        inplace: true
    };
};

KiddoPaint.Brushes.RotatingPentagon = function(color1, step) {
    color1 = color1 || "black";
    var interval = 50;
    step = step % interval / interval;
    var canvasBrush = document.createElement("canvas");
    var size = 33 * KiddoPaint.Current.scaling;
    canvasBrush.width = size * 2;
    canvasBrush.height = size * 2;
    var contextBrush = canvasBrush.getContext("2d");
    contextBrush.fillStyle = color1;
    contextBrush.strokeStyle = color1;
    contextBrush.lineWidth = 1;
    for (var i = 0, s = step; i < 6; i++, s += 10 / interval) {
        x = size + size * Math.cos(2 * Math.PI * s);
        y = size + size * Math.sin(2 * Math.PI * s);
        contextBrush.lineTo(x, y);
    }
    contextBrush.stroke();
    return {
        brush: canvasBrush,
        offset: size,
        inplace: true
    };
};

KiddoPaint.Brushes.Splatters = function() {
    let size = 27 * KiddoPaint.Current.scaling;
    var canvasBrush = document.createElement("canvas");
    canvasBrush.width = size * 2;
    canvasBrush.height = size * 2;
    var contextBrush = canvasBrush.getContext("2d");
    for (let i = 0; i < 2 + getRandomInt(1, 3); i++) {
        let csize = getRandomFloat(1, 7);
        contextBrush.beginPath();
        contextBrush.arc(size + getRandomFloat(-size / 2, size / 2), size + getRandomFloat(-size / 2, size / 2), csize, 0, 2 * Math.PI);
        contextBrush.fillStyle = KiddoPaint.Colors.randomAllColor();
        contextBrush.fill();
        contextBrush.closePath();
    }
    return {
        brush: canvasBrush,
        offset: size / 2
    };
};

KiddoPaint.Brushes.Spray = function(color1, color2) {
    color1 = color1 || "black";
    color2 = color2 || "black";
    var radius = 10 * KiddoPaint.Current.scaling * KiddoPaint.Current.multiplier;
    var density = 128 * KiddoPaint.Current.scaling * KiddoPaint.Current.multiplier;
    var canvasBrush = document.createElement("canvas");
    canvasBrush.width = radius * 2;
    canvasBrush.height = radius * 2;
    var contextBrush = canvasBrush.getContext("2d");
    contextBrush.fillStyle = color1;
    function ring() {
        var theta = Math.random() * 2 * Math.PI;
        var r1 = radius;
        var r2 = radius * .75;
        var rp = Math.random() + .33;
        var dist = Math.sqrt(Math.abs(ziggurat()) * (r1 * r1 - r2 * r2) + r2 * r2);
        var xr = dist * Math.cos(theta);
        var yr = dist * Math.sin(theta);
        contextBrush.fillRect(radius + xr, radius + yr, rp, rp);
    }
    function disc() {
        var rr = ziggurat() * radius * 1.1;
        var ra = Math.random() * 2 * Math.PI;
        var rp = Math.random();
        var x = Math.cos(ra) * rr;
        var y = Math.sin(ra) * rr;
        contextBrush.fillRect(radius + x, radius + y, rp, rp);
    }
    function experiment() {
        var pts = boxmuller();
        contextBrush.fillRect(radius + pts[0] * radius, radius + pts[1] * radius, .7, .7);
    }
    for (var i = 0; i < density; i++) {
        if (KiddoPaint.Current.modifiedToggle) {
            contextBrush.fillStyle = color1;
            if (KiddoPaint.Current.modifiedMeta) {
                contextBrush.globalAlpha = Math.random() / 4;
            } else {
                contextBrush.globalAlpha = Math.random() / 2;
            }
            ring();
            if (KiddoPaint.Current.modifiedMeta) {
                contextBrush.globalAlpha = Math.random() / 3;
                contextBrush.fillStyle = color2;
                disc();
            }
        } else {
            contextBrush.globalAlpha = Math.random() / 2;
            disc();
        }
    }
    return {
        brush: canvasBrush,
        offset: radius
    };
};

KiddoPaint.Brushes.Triangles = function() {
    let size = 35 * KiddoPaint.Current.scaling;
    var canvasBrush = document.createElement("canvas");
    canvasBrush.width = size * 2;
    canvasBrush.height = size * 2;
    var contextBrush = canvasBrush.getContext("2d");
    for (let i = 0; i < 1 + getRandomInt(1, 3); i++) {
        contextBrush.beginPath();
        contextBrush.moveTo(getRandomFloat(0, size), getRandomFloat(0, size));
        contextBrush.lineTo(getRandomFloat(0, size), getRandomFloat(0, size));
        contextBrush.lineTo(getRandomFloat(0, size), getRandomFloat(0, size));
        contextBrush.closePath();
        contextBrush.fillStyle = KiddoPaint.Colors.randomAllColor();
        contextBrush.fill();
    }
    return {
        brush: canvasBrush,
        offset: size / 2
    };
};

KiddoPaint.Brushes.Twirly = function(color1, step) {
    color1 = color1 || "black";
    step = step % 24 / 24;
    var canvasBrush = document.createElement("canvas");
    var size = 25 * KiddoPaint.Current.scaling;
    canvasBrush.width = size * 2;
    canvasBrush.height = size * 2;
    var contextBrush = canvasBrush.getContext("2d");
    contextBrush.beginPath();
    contextBrush.moveTo(size, size);
    x = size + size * Math.cos(2 * Math.PI * step);
    y = size + size * Math.sin(2 * Math.PI * step);
    contextBrush.lineTo(x, y);
    contextBrush.strokeStyle = color1;
    contextBrush.lineWidth = 1;
    contextBrush.stroke();
    contextBrush.closePath();
    return {
        brush: canvasBrush,
        offset: size,
        inplace: true
    };
};

KiddoPaint.Builders.Arrow = function(color1, angle) {
    jitter = function() {
        let baseJitter = 10;
        return baseJitter + Math.random() * baseJitter;
    };
    color1 = color1 || "black";
    angle = angle || 0;
    var canvasBrush = document.createElement("canvas");
    canvasBrush.width = 50;
    canvasBrush.height = 50;
    var contextBrush = canvasBrush.getContext("2d");
    contextBrush.beginPath();
    contextBrush.translate(21, 21);
    contextBrush.rotate(angle);
    contextBrush.translate(-10.5, -15.5);
    contextBrush.strokeStyle = color1;
    for (let i = 0; i < 5; i++) {
        contextBrush.moveTo(10 + jitter() / 2, 0 + jitter() / 2);
        contextBrush.lineTo(0 + jitter(), 23 + jitter());
        contextBrush.moveTo(10 + jitter(), 0 + jitter());
        contextBrush.lineTo(20 + jitter(), 20 + jitter());
    }
    contextBrush.stroke();
    return canvasBrush;
};

KiddoPaint.Builders.Prints = function(color1, print, angle) {
    color1 = color1 || "black";
    angle = angle || 0;
    var canvasBrush = document.createElement("canvas");
    canvasBrush.width = 150 * KiddoPaint.Current.scaling;
    canvasBrush.height = 150 * KiddoPaint.Current.scaling;
    var contextBrush = canvasBrush.getContext("2d");
    contextBrush.save();
    contextBrush.translate(50 * KiddoPaint.Current.scaling, 50 * KiddoPaint.Current.scaling);
    contextBrush.rotate(angle);
    contextBrush.translate(-25 * KiddoPaint.Current.scaling, 0);
    contextBrush.font = 36 * KiddoPaint.Current.scaling + "px sans-serif";
    contextBrush.textBaseline = "middle";
    contextBrush.textAlign = "center";
    contextBrush.fillText(print, 0, 0);
    contextBrush.restore();
    contextBrush.globalCompositeOperation = "source-atop";
    contextBrush.fillStyle = color1;
    contextBrush.fillRect(0, 0, canvasBrush.width, canvasBrush.height);
    return {
        brush: trimCanvas3(canvasBrush),
        offset: 0
    };
};

KiddoPaint.Builders.Rail = function(color1, angle) {
    color1 = color1 || "black";
    angle = angle || 0;
    var canvasBrush = document.createElement("canvas");
    canvasBrush.width = 43;
    canvasBrush.height = 43;
    var contextBrush = canvasBrush.getContext("2d");
    contextBrush.beginPath();
    contextBrush.translate(21, 21);
    contextBrush.rotate(angle);
    contextBrush.translate(-15.5, -15.5);
    contextBrush.fillStyle = "rgb(190, 190, 190)";
    contextBrush.fillRect(.5, 0, 3, 40);
    contextBrush.fillRect(30.5, 0, 2.5, 40);
    contextBrush.fillStyle = "rgb(128, 128, 128)";
    contextBrush.fillRect(3.5, 0, 2.5, 40);
    contextBrush.fillRect(27.5, 0, 2.5, 40);
    for (var i = 0; i < 4; i++) {
        var offset = 8 * i;
        contextBrush.fillStyle = "rgb(136, 104, 67)";
        contextBrush.fillRect(0, 5.5 + offset, 35, 2);
        contextBrush.fillStyle = "rgb(73, 61, 38)";
        contextBrush.fillRect(0, 7 + offset, 35, 1.5);
    }
    return canvasBrush;
};

KiddoPaint.Builders.Road = function(color1, color2, angle) {
    color1 = color1 || "black";
    color2 = color2 === color1 ? "yellow" : color2;
    angle = angle || 0;
    var canvasBrush = document.createElement("canvas");
    canvasBrush.width = 43;
    canvasBrush.height = 43;
    var contextBrush = canvasBrush.getContext("2d");
    contextBrush.beginPath();
    contextBrush.translate(21, 21);
    contextBrush.rotate(angle);
    contextBrush.translate(-15.5, -15.5);
    contextBrush.fillStyle = color1;
    contextBrush.fillRect(0, 0, 30, 40);
    contextBrush.fillStyle = color2;
    contextBrush.fillRect(13.5, 7.5, 3, 23);
    return canvasBrush;
};

KiddoPaint.Alphabet.english = {
    face: "sans-serif",
    pages: 2,
    character1: {
        letters: [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ]
    },
    character2: {
        letters: [ "!", "?", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "<", ">", "$", "%", "^", "&", "@", "*", "(", ")", "~", "|" ]
    }
};

KiddoPaint.Alphabet.wingdings = {
    face: "sans-serif",
    pages: 4,
    character1: {
        letters: [ "✗", "◎", "✘", "❍", "✖︎", "⚬", "✕", "✧" ]
    },
    character2: {
        letters: [ "❖", "◎", "◉", "⦿", "✢", "✣", "✤", "✥", "✦", "✧", "★", "☆", "✯", "✩", "✪", "✫", "✬", "✭", "✮", "✶", "✷", "✵", "✸", "✹", "✺", "❊", "✻", "✽", "✼", "❉", "✱", "✲", "✾", "❃", "❋", "✳", "✴", "❇", "❈", "※", "❅", "❆", "❄", "✿", "❀", "❁", "❂", "☙", "❧", "❦" ]
    },
    character3: {
        letters: [ "♠", "♣", "♥", "♦" ]
    },
    character4: {
        letters: [ "◭", "⧑", "◮", "⧒", "⧖", "◹", "⬣", "◩", "◁", "⊙", "⊖", "▩", "◵", "⬕", "◫", "⬔", "⋄", "◔", "◱", "▹", "◯", "⦶", "❏", "◷", "⬘", "⊘", "⊚", "⧨", "◀", "❐", "◰", "⬖", "⊿", "⦿", "△", "◊", "⧋", "◈", "◺", "⧊", "◿", "◶", "◸", "▪", "◎", "⬚", "⟁", "◤", "▵", "▨", "▷", "◓", "◇", "⬠", "◅", "▴", "▸", "◂", "◃", "◉", "◨", "◪", "⬙", "⬡", "◬", "⬒", "∆", "⌔", "⊝", "▣", "◣", "❍", "◒", "◥", "▰", "⊜", "◳", "▻", "⎔", "◴", "⦸", "⬢", "∇", "⬗", "▼", "▾", "◆", "⬓", "⧩", "⧫", "◧", "◕", "▧", "⊠", "❑", "⊛", "⧗", "◐", "▦", "❒", "◢", "⦾", "▿", "◑", "⟐", "▶", "▤", "▲", "◲", "⧓", "◼", "▥", "▽" ]
    }
};

KiddoPaint.Alphabet.nextPage = function() {
    KiddoPaint.Alphabet.page += 1;
    if (KiddoPaint.Alphabet.page > KiddoPaint.Alphabet.english.pages) {
        KiddoPaint.Alphabet.page = 1;
    }
};

KiddoPaint.Alphabet.nextWingding = function(page) {
    var idx = 0;
    return function(page) {
        if (idx >= KiddoPaint.Alphabet.wingdings["character" + page].letters.length) {
            idx = 0;
        }
        var ret = KiddoPaint.Alphabet.wingdings["character" + page].letters[idx];
        idx += 1;
        return ret;
    };
}();

KiddoPaint.Stamps.stamp = function(stamp, alt, ctrl, size, shiftAmount, color) {
    stamp = stamp || "";
    var canvasBrush = document.createElement("canvas");
    canvasBrush.width = Math.max(size + size * .05, 24);
    canvasBrush.height = Math.max(size + size * .05, 24);
    canvasBrush.height += .15 * canvasBrush.height;
    var contextBrush = canvasBrush.getContext("2d");
    contextBrush.font = size + "px " + KiddoPaint.Stamps.currentFace;
    if (color) {
        contextBrush.fillStyle = color;
    }
    contextBrush.save();
    if (ctrl && alt) {
        contextBrush.scale(-1, 1);
        contextBrush.scale(1, -1);
        contextBrush.translate(-size, -size);
        contextBrush.fillText(stamp, 0, size - .15 * canvasBrush.height);
    } else if (ctrl) {
        contextBrush.scale(1, -1);
        contextBrush.fillText(stamp, 0, -.15 * canvasBrush.height);
    } else if (alt) {
        contextBrush.translate(size, size);
        contextBrush.scale(-1, 1);
        contextBrush.fillText(stamp, 0, 0);
    } else {
        contextBrush.fillText(stamp, 0, size);
    }
    contextBrush.restore();
    if (shiftAmount != 0) {
        hueShift(canvasBrush, contextBrush, shiftAmount);
    }
    return canvasBrush;
};

KiddoPaint.Stamps.nextPage = function() {
    KiddoPaint.Stamps.page += 1;
    if (KiddoPaint.Stamps.page > KiddoPaint.Stamps.grouping.pages) {
        KiddoPaint.Stamps.page = 1;
    }
};

KiddoPaint.Stamps.prevPage = function() {
    KiddoPaint.Stamps.page -= 1;
    if (KiddoPaint.Stamps.page < 1) {
        KiddoPaint.Stamps.page = KiddoPaint.Stamps.grouping.pages;
    }
};

KiddoPaint.Sounds.Library = {};

KiddoPaint.Sounds.Library.enabled = true;

KiddoPaint.Sounds.Library.explosion = [ new Audio("sndmp3/kidpix-tool-eraser-tnt-explosion.wav.mp3") ];

KiddoPaint.Sounds.Library.oops = [ new Audio("sndmp3/oops0.wav.mp3"), new Audio("sndmp3/oops1.wav.mp3"), new Audio("sndmp3/oops2.wav.mp3"), new Audio("sndmp3/oops3.wav.mp3") ];

KiddoPaint.Sounds.Library.bubblepops = [ new Audio("sndmp3/bubble-pop-2WAVSOUND.R_0004edd3.wav.mp3"), new Audio("sndmp3/bubble-pop-3WAVSOUND.R_0004fccd.wav.mp3"), new Audio("sndmp3/bubble-pop-4WAVSOUND.R_0004f480.wav.mp3"), new Audio("sndmp3/bubble-pop-WAVSOUND.R_00050452.wav.mp3"), new Audio("sndmp3/bubble-pop-WAVSOUND.R_000031f6.wav.mp3") ];

KiddoPaint.Sounds.Library.pencil = [ new Audio("sndmp3/kidpix-tool-pencil.wav.mp3") ];

KiddoPaint.Sounds.Library.stamp = [ new Audio("sndmp3/stamp0.wav.mp3") ];

KiddoPaint.Sounds.Library.flood = [ new Audio("sndmp3/flood0.wav.mp3") ];

KiddoPaint.Sounds.Library.mainmenu = [ new Audio("sndmp3/kidpix-menu-click-main-tools.wav.mp3") ];

KiddoPaint.Sounds.Library.submenucolor = [ new Audio("sndmp3/kidpix-menu-click-submenu-color.wav.mp3") ];

KiddoPaint.Sounds.Library.submenuoption = [ new Audio("sndmp3/kidpix-menu-click-submenu-options.wav.mp3") ];

KiddoPaint.Sounds.Library.box = [ new Audio("sndmp3/kidpix-tool-box-during-approx.wav.mp3") ];

KiddoPaint.Sounds.Library.circle = [ new Audio("sndmp3/kidpix-tool-circle-during-approx.wav.mp3") ];

KiddoPaint.Sounds.Library.eraserfade = [ new Audio("sndmp3/eraser-tool-fade-2WAVSOUND.R_0002f58b.wav.mp3") ];

KiddoPaint.Sounds.Library.doordingdong = [ new Audio("sndmp3/kidpix-eraser-doorbell-ding-dong.wav.mp3") ];

KiddoPaint.Sounds.Library.doorcreak = [ new Audio("sndmp3/kidpix-eraser-doorbell-door-creak.wav.mp3") ];

KiddoPaint.Sounds.Library.doorwow = [ new Audio("sndmp3/kidpix-eraser-doorbell-wwoooowwww.wav.mp3") ];

KiddoPaint.Sounds.Library.brushbubbly = [ new Audio("sndmp3/kidpix-submenu-brush-bubbly.wav.mp3") ];

KiddoPaint.Sounds.Library.brushleakypen = [ new Audio("sndmp3/kidpix-submenu-brush-leaky-pen.wav.mp3") ];

KiddoPaint.Sounds.Library.brushzigzag = [ new Audio("sndmp3/kidpix-submenu-brush-zigzag.wav.mp3") ];

KiddoPaint.Sounds.Library.brushdots = [ new Audio("sndmp3/kidpix-submenu-brush-dots.wav.mp3") ];

KiddoPaint.Sounds.Library.brushpies = [ new Audio("sndmp3/kidpix-submenu-brush-pies.wav.mp3") ];

KiddoPaint.Sounds.Library.brushecho = [ new Audio("sndmp3/kidpix-submenu-brush-owl.wav.mp3") ];

KiddoPaint.Sounds.Library.brushnorthern = [ new Audio("sndmp3/kidpix-submenu-brush-northern.wav.mp3") ];

KiddoPaint.Sounds.Library.brushfuzzer = [ new Audio("sndmp3/kidpix-submenu-brush-fuzzer.wav.mp3") ];

KiddoPaint.Sounds.Library.brushzoom = [ new Audio("sndmp3/kidpix-submenu-brush-zoom.wav.mp3") ];

KiddoPaint.Sounds.Library.brushpines = [ new Audio("sndmp3/kidpix-submenu-brush-pines.wav.mp3") ];

KiddoPaint.Sounds.Library.brushtwirly = [ new Audio("sndmp3/kidpix-submenu-brush-twirly.wav.mp3") ];

KiddoPaint.Sounds.Library.brushkaliediscope = [ new Audio("sndmp3/kidpix-submenu-brush-kaliediscope.wav.mp3") ];

KiddoPaint.Sounds.Library.brushrollingdots = [ new Audio("sndmp3/kidpix-submenu-brush-rollingdots.wav.mp3") ];

KiddoPaint.Sounds.Library.brushinvert = [ new Audio("sndmp3/kidpix-submenu-brush-inverter.wav.mp3") ];

KiddoPaint.Sounds.Library.brushguil = [ new Audio("sndmp3/kidpix-submenu-brush-guilloche.wav.mp3") ];

KiddoPaint.Sounds.Library.brushtree = [ new Audio("sndmp3/kidpix-submenu-brush-tree.wav.mp3") ];

KiddoPaint.Sounds.Library.brushstars = [ new Audio("sndmp3/kidpix-submenu-brush-stars.wav.mp3") ];

KiddoPaint.Sounds.Library.brushxos = [ new Audio("sndmp3/kidpix-submenu-brush-xos.wav.mp3") ];

KiddoPaint.Sounds.Library.brushcards = [ new Audio("sndmp3/kidpix-submenu-brush-cards.wav.mp3") ];

KiddoPaint.Sounds.Library.brushshapes = [ new Audio("sndmp3/kidpix-submenu-brush-shapes.wav.mp3") ];

KiddoPaint.Sounds.Library.brushprints = [ new Audio("sndmp3/kidpix-submenu-brush-prints.wav.mp3") ];

KiddoPaint.Sounds.Library.brushspraypaint = [ new Audio("sndmp3/kidpix-submenu-brush-spraypaint.wav.mp3") ];

KiddoPaint.Sounds.Library.mixerwallpaper = [ new Audio("sndmp3/electric-mixer-wallpaper-jitter-boingo-WAVSOUND.R_00024fcc.wav.mp3") ];

KiddoPaint.Sounds.Library.mixerinvert = [ new Audio("sndmp3/electric-mixer-inverter-rolling-sound-WAVSOUND.R_0001fcfa.wav.mp3") ];

KiddoPaint.Sounds.Library.mixervenetian = [ new Audio("sndmp3/electric-mixer-venetian-WAVSOUND.R_0001df56.wav.mp3") ];

KiddoPaint.Sounds.Library.mixershadowbox = [ new Audio("sndmp3/electric-mixer-shadow-boxes-WAVSOUND.R_0002a07a.wav.mp3") ];

KiddoPaint.Sounds.Library.mixerpip = [ new Audio("sndmp3/electric-mixer-pip-drum-crash-1WAVSOUND.R_0002d96e.wav.mp3") ];

KiddoPaint.Sounds.Library.mixerframe = [ new Audio("sndmp3/western-gun-shot-twirl-WAVSOUND.R_0005ed70.wav.mp3") ];

KiddoPaint.Sounds.Library.unimpl = [ new Audio("sndmp3/chord.wav.mp3") ];

KiddoPaint.Sounds.Library.line = [ new Audio("sndmp3/kidpix-tool-line-start.wav.mp3"), new Audio("sndmp3/kidpix-tool-line-start.wav.mp3"), new Audio("sndmp3/kidpix-tool-line-end.wav.mp3") ];

KiddoPaint.Sounds.Library.truck = [ new Audio("sndmp3/kidpix-truck-truckin.wav.mp3"), new Audio("sndmp3/kidpix-truck-truckin-go.wav.mp3"), new Audio("sndmp3/kidpix-truck-skid.wav.mp3") ];

KiddoPaint.Sounds.Library.xy = [ new Audio("sndmp3/kidpix-submenu-brush-xy-start.wav.mp3"), new Audio("sndmp3/kidpix-submenu-brush-xy-during.wav.mp3"), new Audio("sndmp3/kidpix-submenu-brush-xy-end.wav.mp3") ];

KiddoPaint.Sounds.Library.english = {
    A: "sndmp3/english/alpha-a-WAVSOUND.R_0007d8f2.wav.mp3",
    B: "sndmp3/english/alpha-b-WAVSOUND.R_0007ee1f.wav.mp3",
    C: "sndmp3/english/alpha-c-WAVSOUND.R_000803fc.wav.mp3",
    D: "sndmp3/english/alpha-d-WAVSOUND.R_000815df.wav.mp3",
    E: "sndmp3/english/alpha-e-WAVSOUND.R_00082fcc.wav.mp3",
    F: "sndmp3/english/alpha-f-WAVSOUND.R_00084629.wav.mp3",
    G: "sndmp3/english/alpha-g-WAVSOUND.R_000853d0.wav.mp3",
    H: "sndmp3/english/alpha-h-WAVSOUND.R_00086213.wav.mp3",
    I: "sndmp3/english/alpha-i-WAVSOUND.R_00087a00.wav.mp3",
    J: "sndmp3/english/alpha-j-WAVSOUND.R_00088ced.wav.mp3",
    K: "sndmp3/english/alpha-k-WAVSOUND.R_0008a72e.wav.mp3",
    L: "sndmp3/english/alpha-l-WAVSOUND.R_0008bda3.wav.mp3",
    M: "sndmp3/english/alpha-m-WAVSOUND.R_0008d0f8.wav.mp3",
    N: "sndmp3/english/alpha-n-WAVSOUND.R_0008e695.wav.mp3",
    O: "sndmp3/english/alpha-o-WAVSOUND.R_0008fcaa.wav.mp3",
    P: "sndmp3/english/alpha-p-WAVSOUND.R_00091bdb.wav.mp3",
    Q: "sndmp3/english/alpha-q-WAVSOUND.R_00092aee.wav.mp3",
    R: "sndmp3/english/alpha-r-WAVSOUND.R_0009639f.wav.mp3",
    S: "sndmp3/english/alpha-s-WAVSOUND.R_00097948.wav.mp3",
    T: "sndmp3/english/alpha-t-WAVSOUND.R_00099085.wav.mp3",
    U: "sndmp3/english/alpha-u-WAVSOUND.R_0009a406.wav.mp3",
    V: "sndmp3/english/alpha-v-WAVSOUND.R_0009bbcf.wav.mp3",
    W: "sndmp3/english/alpha-w-WAVSOUND.R_0009d8cc.wav.mp3",
    X: "sndmp3/english/alpha-x-WAVSOUND.R_0009ff1d.wav.mp3",
    Y: "sndmp3/english/alpha-y-WAVSOUND.R_000a177a.wav.mp3",
    Z: "sndmp3/english/alpha-z-WAVSOUND.R_000a2fe7.wav.mp3",
    0: "sndmp3/english/number-0-WAVSOUND.R_000a7832.wav.mp3",
    1: "sndmp3/english/number-1-WAVSOUND.R_000a9f1f.wav.mp3",
    2: "sndmp3/english/number-2-WAVSOUND.R_000ab58c.wav.mp3",
    3: "sndmp3/english/number-3-WAVSOUND.R_000aca17.wav.mp3",
    4: "sndmp3/english/number-4-WAVSOUND.R_000ae7a4.wav.mp3",
    5: "sndmp3/english/number-5-WAVSOUND.R_000afbb1.wav.mp3",
    6: "sndmp3/english/number-6-WAVSOUND.R_000b205a.wav.mp3",
    7: "sndmp3/english/number-7-WAVSOUND.R_000b43e7.wav.mp3",
    8: "sndmp3/english/number-8-WAVSOUND.002_000555ac.wav.mp3",
    9: "sndmp3/english/number-9-WAVSOUND.R_000b7db1.wav.mp3",
    "&": "sndmp3/english/number-ampersand-WAVSOUND.R_000be96f.wav.mp3",
    "=": "sndmp3/english/number-equals-WAVSOUND.R_000bce22.wav.mp3",
    "-": "sndmp3/english/number-minus-WAVSOUND.R_000bb0e5.wav.mp3",
    "+": "sndmp3/english/number-plus-WAVSOUND.R_000b9a58.wav.mp3",
    "?": "sndmp3/english/number-question-mark-WAVSOUND.R_000a661d.wav.mp3",
    "!": "sndmp3/english/number-eclamation-WAVSOUND.R_000a5774.wav.mp3"
};

KiddoPaint.Sounds.Library.playRand = function(sound) {
    if (KiddoPaint.Sounds.Library.enabled && KiddoPaint.Sounds.Library[sound]) {
        var idx = Math.floor(Math.random() * KiddoPaint.Sounds.Library[sound].length);
        var s = KiddoPaint.Sounds.Library[sound][idx];
        if (s) {
            s.play();
        }
    }
};

KiddoPaint.Sounds.Library.playKey = function(key) {
    if (KiddoPaint.Sounds.Library.enabled && KiddoPaint.Sounds.Library.english[key]) {
        var s = KiddoPaint.Sounds.Library.english[key];
        if (s) {
            let a = new Audio(s);
            a.play();
        }
    }
};

KiddoPaint.Sounds.Library.playIdx = function(sound, idx) {
    if (KiddoPaint.Sounds.Library.enabled && KiddoPaint.Sounds.Library[sound] && idx < KiddoPaint.Sounds.Library[sound].length) {
        var s = KiddoPaint.Sounds.Library[sound][idx];
        if (s) {
            s.play();
        }
    }
};

KiddoPaint.Sounds.Library.playSingle = function(sound) {
    if (KiddoPaint.Sounds.Library.enabled && KiddoPaint.Sounds.Library[sound]) {
        var s = KiddoPaint.Sounds.Library[sound][0];
        if (s) {
            s.play();
        }
    }
};

KiddoPaint.Sounds.Library.pplaySingle = async function(sound) {
    if (KiddoPaint.Sounds.Library.enabled && KiddoPaint.Sounds.Library[sound]) {
        var s = KiddoPaint.Sounds.Library[sound][0];
        if (s) {
            await pplayAudio(s);
        }
    }
};

function pplayAudio(audio) {
    return new Promise(res => {
        audio.play();
        audio.onended = res;
    });
}

KiddoPaint.Sounds.explosion = function() {
    KiddoPaint.Sounds.Library.playRand("explosion");
};

KiddoPaint.Sounds.oops = function() {
    KiddoPaint.Sounds.Library.playRand("oops");
};

KiddoPaint.Sounds.bubblepops = function() {
    KiddoPaint.Sounds.Library.playRand("bubblepops");
};

KiddoPaint.Sounds.lineStart = function() {
    KiddoPaint.Sounds.Library.playIdx("line", 0);
};

KiddoPaint.Sounds.lineDuring = function() {
    KiddoPaint.Sounds.Library.playIdx("line", 1);
};

KiddoPaint.Sounds.lineEnd = function() {
    KiddoPaint.Sounds.Library.playIdx("line", 2);
};

KiddoPaint.Sounds.truckStart = function() {
    KiddoPaint.Sounds.Library.playIdx("truck", 0);
};

KiddoPaint.Sounds.truckDuring = function() {
    KiddoPaint.Sounds.Library.playIdx("truck", 1);
};

KiddoPaint.Sounds.truckEnd = function() {
    KiddoPaint.Sounds.Library.playIdx("truck", 2);
};

KiddoPaint.Sounds.xyStart = function() {
    KiddoPaint.Sounds.Library.playIdx("xy", 0);
};

KiddoPaint.Sounds.xyDuring = function() {
    KiddoPaint.Sounds.Library.playIdx("xy", 1);
};

KiddoPaint.Sounds.xyEnd = function() {
    KiddoPaint.Sounds.Library.playIdx("xy", 2);
};

KiddoPaint.Sounds.pencil = function() {
    KiddoPaint.Sounds.Library.playSingle("pencil");
};

KiddoPaint.Sounds.box = function() {
    KiddoPaint.Sounds.Library.playSingle("box");
};

KiddoPaint.Sounds.circle = function() {
    KiddoPaint.Sounds.Library.playSingle("circle");
};

KiddoPaint.Sounds.stamp = function() {
    KiddoPaint.Sounds.Library.playSingle("stamp");
};

KiddoPaint.Sounds.flood = function() {
    KiddoPaint.Sounds.Library.playSingle("flood");
};

KiddoPaint.Sounds.mainmenu = function() {
    KiddoPaint.Sounds.Library.playSingle("mainmenu");
};

KiddoPaint.Sounds.submenucolor = function() {
    KiddoPaint.Sounds.Library.playSingle("submenucolor");
};

KiddoPaint.Sounds.submenuoption = function() {
    KiddoPaint.Sounds.Library.playSingle("submenuoption");
};

KiddoPaint.Sounds.unimpl = function() {
    KiddoPaint.Sounds.Library.playSingle("unimpl");
};

KiddoPaint.Sounds.brushzigzag = function() {
    KiddoPaint.Sounds.Library.playSingle("brushzigzag");
};

KiddoPaint.Sounds.brushleakypen = function() {
    KiddoPaint.Sounds.Library.playSingle("brushleakypen");
};

KiddoPaint.Sounds.brushbubbly = function() {
    KiddoPaint.Sounds.Library.playSingle("brushbubbly");
};

KiddoPaint.Sounds.brushdots = function() {
    KiddoPaint.Sounds.Library.playSingle("brushdots");
};

KiddoPaint.Sounds.brushpies = function() {
    KiddoPaint.Sounds.Library.playSingle("brushpies");
};

KiddoPaint.Sounds.brushecho = function() {
    KiddoPaint.Sounds.Library.playSingle("brushecho");
};

KiddoPaint.Sounds.brushnorthern = function() {
    KiddoPaint.Sounds.Library.playSingle("brushnorthern");
};

KiddoPaint.Sounds.brushfuzzer = function() {
    KiddoPaint.Sounds.Library.playSingle("brushfuzzer");
};

KiddoPaint.Sounds.brushzoom = function() {
    KiddoPaint.Sounds.Library.playSingle("brushzoom");
};

KiddoPaint.Sounds.brushpines = function() {
    KiddoPaint.Sounds.Library.playSingle("brushpines");
};

KiddoPaint.Sounds.brushtwirly = function() {
    KiddoPaint.Sounds.Library.playSingle("brushtwirly");
};

KiddoPaint.Sounds.brushkaliediscope = function() {
    KiddoPaint.Sounds.Library.playSingle("brushkaliediscope");
};

KiddoPaint.Sounds.brushrollingdots = function() {
    KiddoPaint.Sounds.Library.playSingle("brushrollingdots");
};

KiddoPaint.Sounds.brushinvert = function() {
    KiddoPaint.Sounds.Library.playSingle("brushinvert");
};

KiddoPaint.Sounds.brushguil = function() {
    KiddoPaint.Sounds.Library.playSingle("brushguil");
};

KiddoPaint.Sounds.brushtree = function() {
    KiddoPaint.Sounds.Library.playSingle("brushtree");
};

KiddoPaint.Sounds.brushstars = function() {
    KiddoPaint.Sounds.Library.playSingle("brushstars");
};

KiddoPaint.Sounds.brushxos = function() {
    KiddoPaint.Sounds.Library.playSingle("brushxos");
};

KiddoPaint.Sounds.brushcards = function() {
    KiddoPaint.Sounds.Library.playSingle("brushcards");
};

KiddoPaint.Sounds.brushshapes = function() {
    KiddoPaint.Sounds.Library.playSingle("brushshapes");
};

KiddoPaint.Sounds.brushprints = function() {
    KiddoPaint.Sounds.Library.playSingle("brushprints");
};

KiddoPaint.Sounds.brushspraypaint = function() {
    KiddoPaint.Sounds.Library.playSingle("brushspraypaint");
};

KiddoPaint.Sounds.mixerwallpaper = function() {
    KiddoPaint.Sounds.Library.playSingle("mixerwallpaper");
};

KiddoPaint.Sounds.mixerinvert = function() {
    KiddoPaint.Sounds.Library.playSingle("mixerinvert");
};

KiddoPaint.Sounds.mixervenetian = function() {
    KiddoPaint.Sounds.Library.playSingle("mixervenetian");
};

KiddoPaint.Sounds.mixershadowbox = function() {
    KiddoPaint.Sounds.Library.playSingle("mixershadowbox");
};

KiddoPaint.Sounds.mixerpip = function() {
    KiddoPaint.Sounds.Library.playSingle("mixerpip");
};

KiddoPaint.Sounds.mixerframe = function() {
    KiddoPaint.Sounds.Library.playSingle("mixerframe");
};

KiddoPaint.Sounds.eraserfadea = function() {
    KiddoPaint.Sounds.Library.playSingle("eraserfade");
};

KiddoPaint.Sounds.eraserfadeb = function() {
    KiddoPaint.Sounds.Library.playSingle("mixerpip");
};
// Sun Aug 15 21:52:14 PDT 2021
