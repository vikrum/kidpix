// hack to unlock audios for safari: https://curtisrobinson.medium.com/how-to-auto-play-audio-in-safari-with-javascript-21d50b0a2765
// hack 2: https://stackoverflow.com/a/68107904
// hack 3: https://stackoverflow.com/a/31351186
// XXX FIXME TODO: switch everything to lazy load; too many audios() throws error in chrome

KiddoPaint.Sounds.Library = {}
KiddoPaint.Sounds.Library.enabled = true;

// array to randomize
KiddoPaint.Sounds.Library.explosion = [new Audio('snd/kidpix-tool-eraser-tnt-explosion.wav')];
KiddoPaint.Sounds.Library.oops = [new Audio('snd/oops0.wav'), new Audio('snd/oops1.wav'), new Audio('snd/oops2.wav'), new Audio('snd/oops3.wav')];

// single sounds
KiddoPaint.Sounds.Library.pencil = [new Audio('snd/kidpix-tool-pencil.wav')];
KiddoPaint.Sounds.Library.stamp = [new Audio('snd/stamp0.wav')];
KiddoPaint.Sounds.Library.flood = [new Audio('snd/flood0.wav')];
KiddoPaint.Sounds.Library.mainmenu = [new Audio('snd/kidpix-menu-click-main-tools.wav')];
KiddoPaint.Sounds.Library.submenucolor = [new Audio('snd/kidpix-menu-click-submenu-color.wav')];
KiddoPaint.Sounds.Library.submenuoption = [new Audio('snd/kidpix-menu-click-submenu-options.wav')];
KiddoPaint.Sounds.Library.box = [new Audio('snd/kidpix-tool-box-during-approx.wav')];
KiddoPaint.Sounds.Library.circle = [new Audio('snd/kidpix-tool-circle-during-approx.wav')];

// KiddoPaint.Sounds.Library. = [new Audio('snd/')];

KiddoPaint.Sounds.Library.doordingdong = [new Audio('snd/kidpix-eraser-doorbell-ding-dong.wav')];
KiddoPaint.Sounds.Library.doorcreak = [new Audio('snd/kidpix-eraser-doorbell-door-creak.wav')];
KiddoPaint.Sounds.Library.doorwow = [new Audio('snd/kidpix-eraser-doorbell-wwoooowwww.wav')];
KiddoPaint.Sounds.Library.brushbubbly = [new Audio('snd/kidpix-submenu-brush-bubbly.wav')];
KiddoPaint.Sounds.Library.brushleakypen = [new Audio('snd/kidpix-submenu-brush-leaky-pen.wav')];
KiddoPaint.Sounds.Library.brushzigzag = [new Audio('snd/kidpix-submenu-brush-zigzag.wav')];
KiddoPaint.Sounds.Library.brushdots = [new Audio('snd/kidpix-submenu-brush-dots.wav')];
KiddoPaint.Sounds.Library.brushpies = [new Audio('snd/kidpix-submenu-brush-pies.wav')];
KiddoPaint.Sounds.Library.brushecho = [new Audio('snd/kidpix-submenu-brush-owl.wav')];
KiddoPaint.Sounds.Library.brushnorthern = [new Audio('snd/kidpix-submenu-brush-northern.wav')];
KiddoPaint.Sounds.Library.brushfuzzer = [new Audio('snd/kidpix-submenu-brush-fuzzer.wav')];
KiddoPaint.Sounds.Library.brushzoom = [new Audio('snd/kidpix-submenu-brush-zoom.wav')];
KiddoPaint.Sounds.Library.brushpines = [new Audio('snd/kidpix-submenu-brush-pines.wav')];
KiddoPaint.Sounds.Library.brushtwirly = [new Audio('snd/kidpix-submenu-brush-twirly.wav')];
KiddoPaint.Sounds.Library.brushkaliediscope = [new Audio('snd/kidpix-submenu-brush-kaliediscope.wav')];
KiddoPaint.Sounds.Library.brushrollingdots = [new Audio('snd/kidpix-submenu-brush-rollingdots.wav')];
KiddoPaint.Sounds.Library.brushinvert = [new Audio('snd/kidpix-submenu-brush-inverter.wav')];
KiddoPaint.Sounds.Library.brushguil = [new Audio('snd/kidpix-submenu-brush-guilloche.wav')];
KiddoPaint.Sounds.Library.brushtree = [new Audio('snd/kidpix-submenu-brush-tree.wav')];
KiddoPaint.Sounds.Library.brushstars = [new Audio('snd/kidpix-submenu-brush-stars.wav')];
KiddoPaint.Sounds.Library.brushxos = [new Audio('snd/kidpix-submenu-brush-xos.wav')];
KiddoPaint.Sounds.Library.brushcards = [new Audio('snd/kidpix-submenu-brush-cards.wav')];
KiddoPaint.Sounds.Library.brushshapes = [new Audio('snd/kidpix-submenu-brush-shapes.wav')];
KiddoPaint.Sounds.Library.brushprints = [new Audio('snd/kidpix-submenu-brush-prints.wav')];

KiddoPaint.Sounds.Library.mixerwallpaper = [new Audio('snd/electric-mixer-wallpaper-jitter-boingo-WAVSOUND.R_00024fcc.wav')];


KiddoPaint.Sounds.Library.unimpl = [new Audio('snd/chord.wav')];

// multipart sounds; start, during, end
KiddoPaint.Sounds.Library.line = [new Audio('snd/kidpix-tool-line-start.wav'), new Audio('snd/kidpix-tool-line-start.wav'), new Audio('snd/kidpix-tool-line-end.wav')];
KiddoPaint.Sounds.Library.truck = [new Audio('snd/kidpix-truck-truckin.wav'), new Audio('snd/kidpix-truck-truckin-go.wav'), new Audio('snd/kidpix-truck-skid.wav')];
KiddoPaint.Sounds.Library.xy = [new Audio('snd/kidpix-submenu-brush-xy-start.wav'), new Audio('snd/kidpix-submenu-brush-xy-during.wav'), new Audio('snd/kidpix-submenu-brush-xy-end.wav')];

KiddoPaint.Sounds.Library.english = {
    'A': 'snd/english/alpha-a-WAVSOUND.R_0007d8f2.wav',
    'B': 'snd/english/alpha-b-WAVSOUND.R_0007ee1f.wav',
    'C': 'snd/english/alpha-c-WAVSOUND.R_000803fc.wav',
    'D': 'snd/english/alpha-d-WAVSOUND.R_000815df.wav',
    'E': 'snd/english/alpha-e-WAVSOUND.R_00082fcc.wav',
    'F': 'snd/english/alpha-f-WAVSOUND.R_00084629.wav',
    'G': 'snd/english/alpha-g-WAVSOUND.R_000853d0.wav',
    'H': 'snd/english/alpha-h-WAVSOUND.R_00086213.wav',
    'I': 'snd/english/alpha-i-WAVSOUND.R_00087a00.wav',
    'J': 'snd/english/alpha-j-WAVSOUND.R_00088ced.wav',
    'K': 'snd/english/alpha-k-WAVSOUND.R_0008a72e.wav',
    'L': 'snd/english/alpha-l-WAVSOUND.R_0008bda3.wav',
    'M': 'snd/english/alpha-m-WAVSOUND.R_0008d0f8.wav',
    'N': 'snd/english/alpha-n-WAVSOUND.R_0008e695.wav',
    'O': 'snd/english/alpha-o-WAVSOUND.R_0008fcaa.wav',
    'P': 'snd/english/alpha-p-WAVSOUND.R_00091bdb.wav',
    'Q': 'snd/english/alpha-q-WAVSOUND.R_00092aee.wav',
    'R': 'snd/english/alpha-r-WAVSOUND.R_0009639f.wav',
    'S': 'snd/english/alpha-s-WAVSOUND.R_00097948.wav',
    'T': 'snd/english/alpha-t-WAVSOUND.R_00099085.wav',
    'U': 'snd/english/alpha-u-WAVSOUND.R_0009a406.wav',
    'V': 'snd/english/alpha-v-WAVSOUND.R_0009bbcf.wav',
    'W': 'snd/english/alpha-w-WAVSOUND.R_0009d8cc.wav',
    'X': 'snd/english/alpha-x-WAVSOUND.R_0009ff1d.wav',
    'Y': 'snd/english/alpha-y-WAVSOUND.R_000a177a.wav',
    'Z': 'snd/english/alpha-z-WAVSOUND.R_000a2fe7.wav',
    '0': 'snd/english/number-0-WAVSOUND.R_000a7832.wav',
    '1': 'snd/english/number-1-WAVSOUND.R_000a9f1f.wav',
    '2': 'snd/english/number-2-WAVSOUND.R_000ab58c.wav',
    '3': 'snd/english/number-3-WAVSOUND.R_000aca17.wav',
    '4': 'snd/english/number-4-WAVSOUND.R_000ae7a4.wav',
    '5': 'snd/english/number-5-WAVSOUND.R_000afbb1.wav',
    '6': 'snd/english/number-6-WAVSOUND.R_000b205a.wav',
    '7': 'snd/english/number-7-WAVSOUND.R_000b43e7.wav',
    '8': 'snd/english/number-8-WAVSOUND.002_000555ac.wav',
    '9': 'snd/english/number-9-WAVSOUND.R_000b7db1.wav',
    '&': 'snd/english/number-ampersand-WAVSOUND.R_000be96f.wav',
    '=': 'snd/english/number-equals-WAVSOUND.R_000bce22.wav',
    '-': 'snd/english/number-minus-WAVSOUND.R_000bb0e5.wav',
    '+': 'snd/english/number-plus-WAVSOUND.R_000b9a58.wav',
    '?': 'snd/english/number-question-mark-WAVSOUND.R_000a661d.wav',
    '!': 'snd/english/number-eclamation-WAVSOUND.R_000a5774.wav',
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
        audio.play()
        audio.onended = res
    })
}


// randomzied sounds
KiddoPaint.Sounds.explosion = function() {
    KiddoPaint.Sounds.Library.playRand('explosion');
}
KiddoPaint.Sounds.oops = function() {
    KiddoPaint.Sounds.Library.playRand('oops');
}

// multipart sounds
KiddoPaint.Sounds.lineStart = function() {
    KiddoPaint.Sounds.Library.playIdx('line', 0);
}

KiddoPaint.Sounds.lineDuring = function() {
    KiddoPaint.Sounds.Library.playIdx('line', 1);
}

KiddoPaint.Sounds.lineEnd = function() {
    KiddoPaint.Sounds.Library.playIdx('line', 2);
}

KiddoPaint.Sounds.truckStart = function() {
    KiddoPaint.Sounds.Library.playIdx('truck', 0);
}

KiddoPaint.Sounds.truckDuring = function() {
    KiddoPaint.Sounds.Library.playIdx('truck', 1);
}

KiddoPaint.Sounds.truckEnd = function() {
    KiddoPaint.Sounds.Library.playIdx('truck', 2);
}

KiddoPaint.Sounds.xyStart = function() {
    KiddoPaint.Sounds.Library.playIdx('xy', 0);
}

KiddoPaint.Sounds.xyDuring = function() {
    KiddoPaint.Sounds.Library.playIdx('xy', 1);
}

KiddoPaint.Sounds.xyEnd = function() {
    KiddoPaint.Sounds.Library.playIdx('xy', 2);
}

// single target sounds
KiddoPaint.Sounds.pencil = function() {
    KiddoPaint.Sounds.Library.playSingle('pencil');
}
KiddoPaint.Sounds.box = function() {
    KiddoPaint.Sounds.Library.playSingle('box');
}
KiddoPaint.Sounds.circle = function() {
    KiddoPaint.Sounds.Library.playSingle('circle');
}
KiddoPaint.Sounds.stamp = function() {
    KiddoPaint.Sounds.Library.playSingle('stamp');
}
KiddoPaint.Sounds.flood = function() {
    KiddoPaint.Sounds.Library.playSingle('flood');
}
KiddoPaint.Sounds.mainmenu = function() {
    KiddoPaint.Sounds.Library.playSingle('mainmenu');
}
KiddoPaint.Sounds.submenucolor = function() {
    KiddoPaint.Sounds.Library.playSingle('submenucolor');
}
KiddoPaint.Sounds.submenuoption = function() {
    KiddoPaint.Sounds.Library.playSingle('submenuoption');
}
KiddoPaint.Sounds.unimpl = function() {
    KiddoPaint.Sounds.Library.playSingle('unimpl');
}
KiddoPaint.Sounds.brushzigzag = function() {
    KiddoPaint.Sounds.Library.playSingle('brushzigzag');
}
KiddoPaint.Sounds.brushleakypen = function() {
    KiddoPaint.Sounds.Library.playSingle('brushleakypen');
}
KiddoPaint.Sounds.brushbubbly = function() {
    KiddoPaint.Sounds.Library.playSingle('brushbubbly');
}
KiddoPaint.Sounds.brushdots = function() {
    KiddoPaint.Sounds.Library.playSingle('brushdots');
}
KiddoPaint.Sounds.brushpies = function() {
    KiddoPaint.Sounds.Library.playSingle('brushpies');
}
KiddoPaint.Sounds.brushecho = function() {
    KiddoPaint.Sounds.Library.playSingle('brushecho');
}
KiddoPaint.Sounds.brushnorthern = function() {
    KiddoPaint.Sounds.Library.playSingle('brushnorthern');
}
KiddoPaint.Sounds.brushfuzzer = function() {
    KiddoPaint.Sounds.Library.playSingle('brushfuzzer');
}
KiddoPaint.Sounds.brushzoom = function() {
    KiddoPaint.Sounds.Library.playSingle('brushzoom');
}
KiddoPaint.Sounds.brushpines = function() {
    KiddoPaint.Sounds.Library.playSingle('brushpines');
}
KiddoPaint.Sounds.brushtwirly = function() {
    KiddoPaint.Sounds.Library.playSingle('brushtwirly');
}
KiddoPaint.Sounds.brushkaliediscope = function() {
    KiddoPaint.Sounds.Library.playSingle('brushkaliediscope');
}
KiddoPaint.Sounds.brushrollingdots = function() {
    KiddoPaint.Sounds.Library.playSingle('brushrollingdots');
}
KiddoPaint.Sounds.brushinvert = function() {
    KiddoPaint.Sounds.Library.playSingle('brushinvert');
}
KiddoPaint.Sounds.brushguil = function() {
    KiddoPaint.Sounds.Library.playSingle('brushguil');
}
KiddoPaint.Sounds.brushtree = function() {
    KiddoPaint.Sounds.Library.playSingle('brushtree');
}
KiddoPaint.Sounds.brushstars = function() {
    KiddoPaint.Sounds.Library.playSingle('brushstars');
}
KiddoPaint.Sounds.brushxos = function() {
    KiddoPaint.Sounds.Library.playSingle('brushxos');
}
KiddoPaint.Sounds.brushcards = function() {
    KiddoPaint.Sounds.Library.playSingle('brushcards');
}
KiddoPaint.Sounds.brushshapes = function() {
    KiddoPaint.Sounds.Library.playSingle('brushshapes');
}
KiddoPaint.Sounds.brushprints = function() {
    KiddoPaint.Sounds.Library.playSingle('brushprints');
}
KiddoPaint.Sounds.mixerwallpaper = function() {
    KiddoPaint.Sounds.Library.playSingle('mixerwallpaper');
}