// Kiddo Paint Applications
// Use global KiddoPaint object initialized in main entry file

window.init_kiddo_paint = function init_kiddo_paint() {
  document.addEventListener(
    "contextmenu",
    function (e) {
      e.preventDefault();
    },
    false,
  );

  var canvas = document.getElementById("kiddopaint");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d", { willReadFrequently: true });
    // sets proper offset due to css canvas positioning and kiddopaint buttons
    canvas.width = canvas.width;
    canvas.height = canvas.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;

    var container = canvas.parentNode;

    window.bnimCanvas = document.createElement("canvas");
    bnimCanvas.id = "bnimCanvas";
    bnimCanvas.width = canvas.width;
    bnimCanvas.height = canvas.height;
    bnimCanvas.className = "pixelated";
    container.appendChild(bnimCanvas);
    window.bnimContext = bnimCanvas.getContext("2d");
    bnimContext.imageSmoothingEnabled = false;
    bnimContext.clearRect(0, 0, canvas.width, canvas.height);

    window.animCanvas = document.createElement("canvas");
    animCanvas.id = "animCanvas";
    animCanvas.width = canvas.width;
    animCanvas.height = canvas.height;
    animCanvas.className = "pixelated";
    container.appendChild(animCanvas);
    window.animContext = animCanvas.getContext("2d");
    animContext.imageSmoothingEnabled = false;
    animContext.clearRect(0, 0, canvas.width, canvas.height);

    window.previewCanvas = document.createElement("canvas");
    previewCanvas.id = "previewCanvas";
    previewCanvas.width = canvas.width;
    previewCanvas.height = canvas.height;
    previewCanvas.className = "pixelated";
    container.appendChild(previewCanvas);
    window.previewContext = previewCanvas.getContext("2d");
    previewContext.imageSmoothingEnabled = false;
    previewContext.clearRect(0, 0, canvas.width, canvas.height);

    window.tmpCanvas = document.createElement("canvas");
    tmpCanvas.id = "tmpCanvas";
    tmpCanvas.width = canvas.width;
    tmpCanvas.height = canvas.height;
    tmpCanvas.className = "pixelated";
    container.appendChild(tmpCanvas);
    window.tmpContext = tmpCanvas.getContext("2d");
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

    // Load undo/redo state from localStorage (persistent across page reloads)
    KiddoPaint.Display.loadUndoRedoFromLocalStorage();

    // Add beforeunload listener for lazy persistence backup
    window.addEventListener("beforeunload", function () {
      KiddoPaint.Display.saveUndoRedoToLocalStorage();
    });

    init_kiddo_defaults();
    init_listeners(tmpCanvas);
    init_tool_bar();
    init_subtool_bars();
    init_color_selector();
  }
};

function init_kiddo_defaults() {
  KiddoPaint.Current.color = KiddoPaint.Colors.currentPalette()[0];
  KiddoPaint.Current.altColor = KiddoPaint.Colors.currentPalette()[0];
  KiddoPaint.Current.terColor = KiddoPaint.Colors.currentPalette()[0];
  KiddoPaint.Current.tool = KiddoPaint.Tools.Pencil;

  // Highlight the initially selected tool
  highlightSelectedTool("pencil");

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
  KiddoPaint.Text.page = 1;
  KiddoPaint.Stamps.page = 0;
  KiddoPaint.Sprite.page = 0;
  KiddoPaint.Current.multiplier = 1;
  KiddoPaint.Current.prevEv = null;
  KiddoPaint.Current.prevEvTs = Date.now();
  KiddoPaint.Current.velocity = 0;
  KiddoPaint.Current.velocityMultiplier = 1;
  reset_ranges();
}

window.reset_ranges = function reset_ranges() {
  KiddoPaint.Current.multiplier = 1;
  KiddoPaint.Current.modifiedRange = 0;
  KiddoPaint.Current.modifiedAltRange = 0;
  KiddoPaint.Current.modifiedCtrlRange = 0;
  KiddoPaint.Current.modifiedToggle = false;
  KiddoPaint.Current.velToggle = false;
  KiddoPaint.Current.modifiedMeta = false;
  KiddoPaint.Current.modifiedTilde = false;
};

function init_listeners(canvas) {
  canvas.addEventListener("mousedown", ev_canvas);
  canvas.addEventListener("mousemove", ev_canvas);
  canvas.addEventListener("mouseup", ev_canvas);

  // Set up touch events for mobile, etc
  canvas.addEventListener(
    "touchstart",
    function (e) {
      var touch = e.touches[0];
      var mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvas.dispatchEvent(mouseEvent);
      e.preventDefault();
    },
    false,
  );
  canvas.addEventListener(
    "touchend",
    function (e) {
      var touch = e.changedTouches[0];
      var mouseEvent = new MouseEvent("mouseup", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvas.dispatchEvent(mouseEvent);
      e.preventDefault();
    },
    false,
  );
  canvas.addEventListener(
    "touchmove",
    function (e) {
      var touch = e.touches[0];
      var mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvas.dispatchEvent(mouseEvent);
      e.preventDefault();
    },
    false,
  );

  canvas.addEventListener("mouseleave", function () {
    // we force a mouse up - this fixes a bug with some effects in which a clearPrev wipes the whole canvas
    KiddoPaint.Current.tool.mouseup(KiddoPaint.Current.ev);
    KiddoPaint.Display.clearPreview();
    KiddoPaint.Display.clearAnim();
    KiddoPaint.Display.clearBnim();
  });
  canvas.addEventListener("mousewheel", mouse_wheel);
  canvas.addEventListener(
    "dragover",
    function (ev) {
      if (ev.preventDefault) {
        ev.preventDefault();
      }
      ev.returnValue = false;
      return false;
    },
    false,
  );
  canvas.addEventListener("drop", image_upload);

  // Keyboard shortcuts - modifier keys always work, single-key shortcuts only when enabled
  document.onkeydown = function checkKey(e) {
    // Modifier keys ALWAYS work regardless of keyboard shortcuts setting
    if (e.keyCode == 16) {
      // Shift key
      KiddoPaint.Current.scaling = 2;
      KiddoPaint.Current.modified = true;
      return;
    } else if (e.keyCode == 91 || e.keyCode == 93) {
      // Left/Right Command key (⌘) on Mac
      KiddoPaint.Current.modifiedCtrl = true;
      return;
    } else if (e.keyCode == 18) {
      // Alt/Option key
      KiddoPaint.Current.modifiedAlt = true;
      return;
    } else if (e.keyCode == 17) {
      // Control key (actual Ctrl)
      KiddoPaint.Current.modifiedMeta = true;
      return;
    } else if (e.keyCode == 192) {
      // Tilde key (~)
      KiddoPaint.Current.modifiedTilde = true;
      return;
    }

    // '?' key - Show keyboard shortcuts help (always works, even when shortcuts disabled)
    if (e.keyCode === 191 && e.shiftKey) {
      // '?' is Shift + '/' (keyCode 191)
      e.preventDefault();
      KiddoPaint.KeyboardHelp.toggle();
      return;
    }

    // Single-key shortcuts - only work when enabled
    if (!KiddoPaint.Settings.isKeyboardShortcutsEnabled()) {
      return; // Exit early if shortcuts disabled
    }

    if (e.keyCode == 78) {
      // 'n' key - cycle to next color
      var c = KiddoPaint.Colors.nextAllColor();
      // keep them in sync
      KiddoPaint.Current.color = c;
      KiddoPaint.Current.altColor = c;
      KiddoPaint.Current.terColor = c;
      document.getElementById("currentColor").style = "background-color: " + c;
    } else if (e.keyCode == 67) {
      // 'c' key - cycle to next color palette
      KiddoPaint.Colors.nextPalette();
      set_colors_to_current_palette();
    } else if (e.keyCode == 82) {
      // 'r' key - randomize colors
      var c = KiddoPaint.Colors.randomAllColor();
      KiddoPaint.Current.color = c;
      document.getElementById("currentColor").style = "background-color: " + c;
      KiddoPaint.Current.altColor = KiddoPaint.Colors.randomAllColor();
      KiddoPaint.Current.terColor = KiddoPaint.Colors.randomAllColor();
    } else if (e.keyCode == 83) {
      // 's' key - save to file
      save_to_file();
    } else if (e.keyCode > 48 && e.keyCode < 58) {
      // Number keys 1-9 - set multiplier
      KiddoPaint.Current.multiplier = e.keyCode - 48;
    } else if (e.keyCode == 32) {
      // Spacebar - toggle modified state
      e.stopPropagation();
      e.preventDefault();
      KiddoPaint.Current.modifiedToggle = !KiddoPaint.Current.modifiedToggle;
    } else if (e.keyCode == 86) {
      // 'v' key - toggle velocity state
      KiddoPaint.Current.velToggle = !KiddoPaint.Current.velToggle;
    } else if (e.ctrlKey && e.key === "z") {
      // Ctrl+Z or Cmd+Z - undo
      KiddoPaint.Sounds.mainmenu();
      KiddoPaint.Sounds.oops();
      KiddoPaint.Display.undo(!KiddoPaint.Current.modifiedAlt);
    }
  };

  // Modifier key release handlers - always work
  document.onkeyup = function checkKey(e) {
    if (e.keyCode == 16) {
      // Shift key released - reset scaling and modified state
      KiddoPaint.Current.scaling = 1;
      KiddoPaint.Current.modified = false;
    } else if (e.keyCode == 91 || e.keyCode == 93) {
      // Left/Right Command key (⌘) released on Mac
      KiddoPaint.Current.modifiedCtrl = false;
    } else if (e.keyCode == 17) {
      // Control key (actual Ctrl) released
      KiddoPaint.Current.modifiedMeta = false;
    } else if (e.keyCode == 192) {
      // Tilde key (~) released
      KiddoPaint.Current.modifiedTilde = false;
    } else if (e.keyCode == 18) {
      // Alt/Option key released
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
    document.getElementById("currentColor").style =
      "background-color:" + colorSelected;
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
  
  // Update palette name display
  var paletteNameElement = document.getElementById("palette-name");
  if (paletteNameElement) {
    paletteNameElement.textContent = KiddoPaint.Colors.currentPaletteName();
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
  document.getElementById("currentColor").style =
    "background-color:" + KiddoPaint.Current.color;
  init_color_paging();
}

function init_color_paging() {
  document
    .getElementById("colorprev")
    .addEventListener("mousedown", function () {
      KiddoPaint.Sounds.submenucolor();
      KiddoPaint.Colors.prevPalette();
      set_colors_to_current_palette();
    });
  document
    .getElementById("colornext")
    .addEventListener("mousedown", function () {
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

function highlightSelectedTool(selectedToolId) {
  // Clear all tool highlights
  document.getElementById("pencil").style = "";
  document.getElementById("line").style = "";
  document.getElementById("square").style = "";
  document.getElementById("circle").style = "";
  document.getElementById("brush").style = "";
  document.getElementById("stamp").style = "";
  document.getElementById("text").style = "";
  document.getElementById("paintcan").style = "";
  document.getElementById("eraser").style = "";
  document.getElementById("truck").style = "";
  document.getElementById("jumble").style = "";
  document.getElementById("colorpicker").style = "";
  // Highlight selected tool
  document.getElementById(selectedToolId).style =
    "border-color:red; border-width: 5px";
}

function init_tool_bar() {
  document.getElementById("save").addEventListener("mousedown", function () {
    KiddoPaint.Sounds.mainmenu();
    save_to_file();
  });

  document.getElementById("pencil").addEventListener("mousedown", function () {
    highlightSelectedTool("pencil");
    KiddoPaint.Sounds.mainmenu();
    show_generic_submenu("pencil");
    KiddoPaint.Current.tool = KiddoPaint.Tools.Pencil;
    KiddoPaint.Display.canvas.classList = "";
    KiddoPaint.Display.canvas.classList.add("cursor-pencil");

    // Highlight default pencil subtools
    setTimeout(function () {
      var buttons = document
        .getElementById("genericsubmenu")
        .getElementsByTagName("button");
      // Highlight first size button (Size 1)
      if (buttons[0]) {
        buttons[0].style = "border-color:red; border-width: 5px";
      }
      // Highlight Solid texture button (after spacer, so around index 7)
      if (buttons[7]) {
        buttons[7].style = "border-color:red; border-width: 5px";
      }
    }, 0);
  });

  document.getElementById("line").addEventListener("mousedown", function () {
    highlightSelectedTool("line");
    KiddoPaint.Sounds.mainmenu();
    show_generic_submenu("line");
    KiddoPaint.Current.tool = KiddoPaint.Tools.Line;
    KiddoPaint.Display.canvas.classList = "";
    KiddoPaint.Display.canvas.classList.add("cursor-crosshair");

    // Highlight default line subtools
    setTimeout(function () {
      var buttons = document
        .getElementById("genericsubmenu")
        .getElementsByTagName("button");
      // Highlight default size (Size 5, index 1)
      if (buttons[1]) {
        buttons[1].style = "border-color:red; border-width: 5px";
      }
      // Highlight default texture (Solid, index 7 - first after spacer)
      if (buttons[7]) {
        buttons[7].style = "border-color:red; border-width: 5px";
      }
    }, 0);
  });

  document.getElementById("square").addEventListener("mousedown", function () {
    highlightSelectedTool("square");
    KiddoPaint.Sounds.mainmenu();
    show_generic_submenu("rectangle");
    KiddoPaint.Current.tool = KiddoPaint.Tools.Rectangle;
    KiddoPaint.Display.canvas.classList = "";
    KiddoPaint.Display.canvas.classList.add("cursor-crosshair");

    // Highlight default square subtools
    setTimeout(function () {
      var buttons = document
        .getElementById("genericsubmenu")
        .getElementsByTagName("button");
      // Highlight default thickness (index 1)
      if (buttons[1]) {
        buttons[1].style = "border-color:red; border-width: 5px";
      }
      // Highlight default texture (None, index 7 after thickness controls)
      if (buttons[7]) {
        buttons[7].style = "border-color:red; border-width: 5px";
      }
    }, 0);
  });

  document.getElementById("circle").addEventListener("mousedown", function () {
    highlightSelectedTool("circle");
    KiddoPaint.Sounds.mainmenu();
    show_generic_submenu("oval");
    KiddoPaint.Current.tool = KiddoPaint.Tools.Oval;
    KiddoPaint.Display.canvas.classList = "";
    KiddoPaint.Display.canvas.classList.add("cursor-crosshair");

    // Highlight default circle subtools
    setTimeout(function () {
      var buttons = document
        .getElementById("genericsubmenu")
        .getElementsByTagName("button");
      // Highlight default thickness (index 1)
      if (buttons[1]) {
        buttons[1].style = "border-color:red; border-width: 5px";
      }
      // Highlight default texture (None, index 7 after thickness controls)
      if (buttons[7]) {
        buttons[7].style = "border-color:red; border-width: 5px";
      }
    }, 0);
  });

  document.getElementById("brush").addEventListener("mousedown", function () {
    highlightSelectedTool("brush");
    KiddoPaint.Sounds.mainmenu();
    reset_ranges();
    show_generic_submenu("brush");
    KiddoPaint.Submenu.brush[0].handler();

    // Highlight default brush subtool
    setTimeout(function () {
      var buttons = document
        .getElementById("genericsubmenu")
        .getElementsByTagName("button");
      // Highlight first brush (index 0)
      if (buttons[0]) {
        buttons[0].style = "border-color:red; border-width: 5px";
      }
    }, 0);
  });

  document.getElementById("stamp").addEventListener("mousedown", function () {
    highlightSelectedTool("stamp");
    KiddoPaint.Sounds.mainmenu();
    reset_ranges();
    KiddoPaint.Display.canvas.classList = "";
    KiddoPaint.Display.canvas.classList.add("cursor-none");
    if (KiddoPaint.Current.modifiedCtrl) {
      show_generic_submenu("stickers");
    } else {
      // Load stamp names data if not already loaded
      if (!KiddoPaint.Sprite.stampNames) {
        KiddoPaint.Sprite.loadStampNames().then(function () {
          init_sprites_submenu();
          show_sprites_with_search();
          KiddoPaint.Tools.Stamp.useColor = false;
          if (KiddoPaint.Submenu.sprites[0]) {
            KiddoPaint.Submenu.sprites[0].handler();
          }
        });
      } else {
        init_sprites_submenu();
        show_sprites_with_search();
        KiddoPaint.Tools.Stamp.useColor = false;
        if (KiddoPaint.Submenu.sprites[0]) {
          KiddoPaint.Submenu.sprites[0].handler();
        }
      }
    }
  });

  document.getElementById("text").addEventListener("mousedown", function () {
    highlightSelectedTool("text");
    KiddoPaint.Sounds.mainmenu();
    init_text_bar("character" + KiddoPaint.Text.page);
    show_sub_toolbar("texttoolbar");
    KiddoPaint.Tools.Stamp.useColor = true;
    KiddoPaint.Current.tool = KiddoPaint.Tools.Stamp;
    KiddoPaint.Stamps.currentFace = KiddoPaint.Text.english.face;
    KiddoPaint.Display.canvas.classList = "";
    KiddoPaint.Display.canvas.classList.add("cursor-none");
  });

  document
    .getElementById("paintcan")
    .addEventListener("mousedown", function () {
      highlightSelectedTool("paintcan");
      KiddoPaint.Sounds.mainmenu();
      show_generic_submenu("paintcan");
      KiddoPaint.Current.tool = KiddoPaint.Tools.PaintCan;
      KiddoPaint.Display.canvas.classList = "";
      KiddoPaint.Display.canvas.classList.add("cursor-bucket");

      // Highlight default paintcan subtools
      setTimeout(function () {
        var buttons = document
          .getElementById("genericsubmenu")
          .getElementsByTagName("button");
        // Highlight default texture (Solid, index 0)
        if (buttons[0]) {
          buttons[0].style = "border-color:red; border-width: 5px";
        }
      }, 0);
    });

  document.getElementById("eraser").addEventListener("mousedown", function () {
    highlightSelectedTool("eraser");
    KiddoPaint.Sounds.mainmenu();
    KiddoPaint.Current.tool = KiddoPaint.Tools.Eraser;
    KiddoPaint.Display.canvas.classList = "";
    KiddoPaint.Display.canvas.classList.add("cursor-crosshair");
    show_generic_submenu("eraser");

    // Highlight default eraser subtool
    setTimeout(function () {
      var buttons = document
        .getElementById("genericsubmenu")
        .getElementsByTagName("button");
      // Highlight first size (index 0)
      if (buttons[0]) {
        buttons[0].style = "border-color:red; border-width: 5px";
      }
    }, 0);
  });

  document.getElementById("truck").addEventListener("mousedown", function () {
    highlightSelectedTool("truck");
    KiddoPaint.Sounds.mainmenu();
    show_generic_submenu("truck");
    KiddoPaint.Current.tool = KiddoPaint.Tools.Cut;
    KiddoPaint.Display.canvas.classList = "";
    KiddoPaint.Display.canvas.classList.add("cursor-crosshair");

    // Highlight default truck subtool
    setTimeout(function () {
      var buttons = document
        .getElementById("genericsubmenu")
        .getElementsByTagName("button");
      // Highlight first size (index 0)
      if (buttons[0]) {
        buttons[0].style = "border-color:red; border-width: 5px";
      }
    }, 0);
  });

  document
    .getElementById("colorpicker")
    .addEventListener("mousedown", function () {
      highlightSelectedTool("colorpicker");
      KiddoPaint.Sounds.mainmenu();
      show_generic_submenu("colorpicker");
      KiddoPaint.Current.tool = KiddoPaint.Tools.ColorPicker;
      KiddoPaint.Display.canvas.classList = "";
      KiddoPaint.Display.canvas.classList.add("cursor-crosshair");

      // Highlight default colorpicker subtool
      setTimeout(function () {
        var buttons = document
          .getElementById("genericsubmenu")
          .getElementsByTagName("button");
        // Highlight the single eyedropper subtool (index 0)
        if (buttons[0]) {
          buttons[0].style = "border-color:red; border-width: 5px";
        }
      }, 0);
    });

  document.getElementById("undo").addEventListener("mousedown", function () {
    KiddoPaint.Sounds.mainmenu();
    KiddoPaint.Sounds.oops();
    KiddoPaint.Display.undo(); // holding opt makes undo button not work; remove modifier
  });
  document.getElementById("redo").addEventListener("mousedown", function () {
    KiddoPaint.Sounds.mainmenu();
    KiddoPaint.Sounds.oops();
    KiddoPaint.Display.redo();
  });

  document.getElementById("alnext").addEventListener("mousedown", function () {
    KiddoPaint.Sounds.submenuoption();
    KiddoPaint.Text.nextPage();
    init_text_bar("character" + KiddoPaint.Text.page);
  });

  //    document.getElementById('stnext').addEventListener('mousedown', function(e) {
  //        KiddoPaint.Sounds.submenuoption();
  //        (e.which == 1) ? KiddoPaint.Stamps.nextPage(): KiddoPaint.Stamps.prevPage(); // left click is 1, right click is 3
  //        init_stamp_bar('stamp' + KiddoPaint.Stamps.page);
  //    });

  document.getElementById("jumble").addEventListener("mousedown", function () {
    highlightSelectedTool("jumble");
    KiddoPaint.Sounds.mainmenu();
    show_generic_submenu("jumble");
    KiddoPaint.Display.canvas.classList = "";
    KiddoPaint.Display.canvas.classList.add("cursor-guy-smile");
    KiddoPaint.Tools.WholeCanvasEffect.effect = JumbleFx.INVERT;
    KiddoPaint.Current.tool = KiddoPaint.Tools.WholeCanvasEffect;

    // Highlight default mixer subtool
    setTimeout(function () {
      var buttons = document
        .getElementById("genericsubmenu")
        .getElementsByTagName("button");
      // Highlight first effect (index 0)
      if (buttons[0]) {
        buttons[0].style = "border-color:red; border-width: 5px";
      }
    }, 0);
  });
}

function init_text_bar(textgroup) {
  var texttoolbar = KiddoPaint.Text.english[textgroup].letters;
  // first letter / number / symbol is selected when the bar is created:
  KiddoPaint.Tools.Stamp.stamp = texttoolbar[0];
  // clear out old buttons and hide all initially:
  var alphaselect = document.querySelectorAll('*[id^="xal"]');
  for (var i = 0; i < alphaselect.length; i++) {
    var b = alphaselect[i];
    b.style = "display: none;"; // Hide all buttons initially
    b.removeAllChildren();
  }
  // add new buttons and show only the ones we need:
  for (var i = 0; i < texttoolbar.length; i++) {
    var buttonValue = "<h1>" + texttoolbar[i] + "</h1>";
    var button = document.getElementById("xal" + i);
    button.innerHTML = buttonValue;
    // Show this button and apply appropriate styling
    if (i == 0) {
      button.style = "display: block; border-color:red; border-width: 5px";
    } else {
      button.style = "display: block;";
    }
  }
}

function init_subtool_bars() {
  init_pencil_subtoolbar();
  init_text_subtoolbar();
}

function init_pencil_subtoolbar() {
  // this is the default, so we show show it
  show_generic_submenu("pencil");
  KiddoPaint.Display.canvas.classList = "";
  KiddoPaint.Display.canvas.classList.add("cursor-pencil");

  // Highlight default subtools with red outline
  setTimeout(function () {
    var buttons = document
      .getElementById("genericsubmenu")
      .getElementsByTagName("button");
    // Highlight first size button (Size 1)
    if (buttons[0]) {
      buttons[0].style = "border-color:red; border-width: 5px";
    }
    // Highlight Solid texture button (after spacer, so around index 7)
    if (buttons[7]) {
      buttons[7].style = "border-color:red; border-width: 5px";
    }
  }, 0);
}

function init_text_subtoolbar() {
  var alphaselect = document.querySelectorAll('*[id^="xal"]');
  for (var i = 0; i < alphaselect.length; i++) {
    var alphaButton = alphaselect[i];
    alphaButton.addEventListener("mousedown", function (ev) {
      reset_ranges();
      var src = ev.srcElement || ev.target;
      // if button has no child, it's a blank button -> do nothing.
      if (src.firstChild == null) {
        console.log("empty button, no-op.");
        return;
      }
      KiddoPaint.Tools.Stamp.stamp = src.firstChild.nodeValue;
      KiddoPaint.Sounds.Library.playKey(KiddoPaint.Tools.Stamp.stamp);
      const alphaselect2 = document.querySelectorAll('*[id^="xal"]');
      for (var j = 0; j < alphaselect2.length; j++) {
        var b = alphaselect2[j];
        // Only reset styling for visible buttons (those with content)
        if (b.firstChild != null) {
          b.style = "display: block;";
        }
      }
      src.parentNode.style = "border-color:red; border-width: 5px";
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
  if (!KiddoPaint.Current.prevEv) return;

  var dist = distanceBetween(KiddoPaint.Current.prevEv, ev);
  var tsdelta = Date.now() - KiddoPaint.Current.prevEvTs + 1;
  var velocity = ((1.0 * dist) / tsdelta) * 1000.0;
  KiddoPaint.Current.velocity = velocity;
  KiddoPaint.Current.velocityMultiplier =
    velocity > 1000 ? velocity / 1000 : 1.0;
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
  // jpp - always crop saved png, and remove its transparency.
  var canvasToSave = trimAndFlattenCanvas(KiddoPaint.Display.main_canvas);
  // orig:
  // var canvasToSave = KiddoPaint.Current.modifiedAlt ? trimAndFlattenCanvas(KiddoPaint.Display.main_canvas) : KiddoPaint.Display.main_canvas;

  var image = canvasToSave.toDataURL("image/png");

  // nice format for timestamp in filename
  // https://chat.openai.com/c/926c6bbf-c626-456e-9832-08e5088ecf2b
  const d = new Date();
  const formattedDate = [
    d.getFullYear(),
    (d.getMonth() + 1).toString().padStart(2, "0"),
    d.getDate().toString().padStart(2, "0"),
    d.getHours().toString().padStart(2, "0"),
    d.getMinutes().toString().padStart(2, "0"),
    d.getSeconds().toString().padStart(2, "0"),
  ].join("-");
  // old:
  // const formattedDate = Date.now();

  var a = document.createElement("a");
  a.href = image;
  a.download = "kidpix-" + formattedDate + ".png";
  a.click();
}

function image_upload(ev) {
  var files = ev.dataTransfer.files;
  if (files.length > 0) {
    var file = files[0];
    if (typeof FileReader !== "undefined") {
      var reader = new FileReader();
      reader.onload = function (evt) {
        var img = new Image();
        img.onload = function () {
          if (KiddoPaint.Current.modifiedAlt) {
            KiddoPaint.Display.context.drawImage(img, 0, 0);
            KiddoPaint.Display.saveMain();
          } else {
            KiddoPaint.Tools.Placer.image = img;
            KiddoPaint.Tools.Placer.size = {
              width: img.width,
              height: img.height,
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
