// hack to unlock audios for safari: https://curtisrobinson.medium.com/how-to-auto-play-audio-in-safari-with-javascript-21d50b0a2765
// hack 2: https://stackoverflow.com/a/68107904
// hack 3: https://stackoverflow.com/a/31351186
// XXX FIXME TODO: switch everything to lazy load; too many audios() throws error in chrome

KiddoPaint.Sounds.Library = {}
KiddoPaint.Sounds.Library.enabled = true;

// array to randomize
KiddoPaint.Sounds.Library.explosion = [new Audio('sndmp3/kidpix-tool-eraser-tnt-explosion.wav.mp3')];
KiddoPaint.Sounds.Library.oops = [new Audio('sndmp3/oops0.wav.mp3'), new Audio('sndmp3/oops1.wav.mp3'), new Audio('sndmp3/oops2.wav.mp3'), new Audio('sndmp3/oops3.wav.mp3')];
KiddoPaint.Sounds.Library.bubblepops = [new Audio('sndmp3/bubble-pop-2WAVSOUND.R_0004edd3.wav.mp3'), new Audio('sndmp3/bubble-pop-3WAVSOUND.R_0004fccd.wav.mp3'), new Audio('sndmp3/bubble-pop-4WAVSOUND.R_0004f480.wav.mp3'), new Audio('sndmp3/bubble-pop-WAVSOUND.R_00050452.wav.mp3'), new Audio('sndmp3/bubble-pop-WAVSOUND.R_000031f6.wav.mp3')];


// single sounds
KiddoPaint.Sounds.Library.pencil = [new Audio('sndmp3/kidpix-tool-pencil.wav.mp3')];
KiddoPaint.Sounds.Library.stamp = [new Audio('sndmp3/stamp0.wav.mp3')];
KiddoPaint.Sounds.Library.flood = [new Audio('sndmp3/flood0.wav.mp3')];
KiddoPaint.Sounds.Library.mainmenu = [new Audio('sndmp3/kidpix-menu-click-main-tools.wav.mp3')];
KiddoPaint.Sounds.Library.submenucolor = [new Audio('sndmp3/kidpix-menu-click-submenu-color.wav.mp3')];
KiddoPaint.Sounds.Library.submenuoption = [new Audio('sndmp3/kidpix-menu-click-submenu-options.wav.mp3')];
KiddoPaint.Sounds.Library.box = [new Audio('sndmp3/kidpix-tool-box-during-approx.wav.mp3')];
KiddoPaint.Sounds.Library.circle = [new Audio('sndmp3/kidpix-tool-circle-during-approx.wav.mp3')];

// KiddoPaint.Sounds.Library. = [new Audio('sndmp3/')];

KiddoPaint.Sounds.Library.eraserfade = [new Audio('sndmp3/eraser-tool-fade-2WAVSOUND.R_0002f58b.wav.mp3')];
KiddoPaint.Sounds.Library.doordingdong = [new Audio('sndmp3/kidpix-eraser-doorbell-ding-dong.wav.mp3')];
KiddoPaint.Sounds.Library.doorcreak = [new Audio('sndmp3/kidpix-eraser-doorbell-door-creak.wav.mp3')];
KiddoPaint.Sounds.Library.doorwow = [new Audio('sndmp3/kidpix-eraser-doorbell-wwoooowwww.wav.mp3')];
KiddoPaint.Sounds.Library.brushbubbly = [new Audio('sndmp3/kidpix-submenu-brush-bubbly.wav.mp3')];
KiddoPaint.Sounds.Library.brushleakypen = [new Audio('sndmp3/kidpix-submenu-brush-leaky-pen.wav.mp3')];
KiddoPaint.Sounds.Library.brushzigzag = [new Audio('sndmp3/kidpix-submenu-brush-zigzag.wav.mp3')];
KiddoPaint.Sounds.Library.brushdots = [new Audio('sndmp3/kidpix-submenu-brush-dots.wav.mp3')];
KiddoPaint.Sounds.Library.brushpies = [new Audio('sndmp3/kidpix-submenu-brush-pies.wav.mp3')];
KiddoPaint.Sounds.Library.brushecho = [new Audio('sndmp3/kidpix-submenu-brush-owl.wav.mp3')];
KiddoPaint.Sounds.Library.brushnorthern = [new Audio('sndmp3/kidpix-submenu-brush-northern.wav.mp3')];
KiddoPaint.Sounds.Library.brushfuzzer = [new Audio('sndmp3/kidpix-submenu-brush-fuzzer.wav.mp3')];
KiddoPaint.Sounds.Library.brushzoom = [new Audio('sndmp3/kidpix-submenu-brush-zoom.wav.mp3')];
KiddoPaint.Sounds.Library.brushpines = [new Audio('sndmp3/kidpix-submenu-brush-pines.wav.mp3')];
KiddoPaint.Sounds.Library.brushtwirly = [new Audio('sndmp3/kidpix-submenu-brush-twirly.wav.mp3')];
KiddoPaint.Sounds.Library.brushkaliediscope = [new Audio('sndmp3/kidpix-submenu-brush-kaliediscope.wav.mp3')];
KiddoPaint.Sounds.Library.brushrollingdots = [new Audio('sndmp3/kidpix-submenu-brush-rollingdots.wav.mp3')];
KiddoPaint.Sounds.Library.brushinvert = [new Audio('sndmp3/kidpix-submenu-brush-inverter.wav.mp3')];
KiddoPaint.Sounds.Library.brushguil = [new Audio('sndmp3/kidpix-submenu-brush-guilloche.wav.mp3')];
KiddoPaint.Sounds.Library.brushtree = [new Audio('sndmp3/kidpix-submenu-brush-tree.wav.mp3')];
KiddoPaint.Sounds.Library.brushstars = [new Audio('sndmp3/kidpix-submenu-brush-stars.wav.mp3')];
KiddoPaint.Sounds.Library.brushxos = [new Audio('sndmp3/kidpix-submenu-brush-xos.wav.mp3')];
KiddoPaint.Sounds.Library.brushcards = [new Audio('sndmp3/kidpix-submenu-brush-cards.wav.mp3')];
KiddoPaint.Sounds.Library.brushshapes = [new Audio('sndmp3/kidpix-submenu-brush-shapes.wav.mp3')];
KiddoPaint.Sounds.Library.brushprints = [new Audio('sndmp3/kidpix-submenu-brush-prints.wav.mp3')];
KiddoPaint.Sounds.Library.brushspraypaint = [new Audio('sndmp3/kidpix-submenu-brush-spraypaint.wav.mp3')];

KiddoPaint.Sounds.Library.mixerwallpaper = [new Audio('sndmp3/electric-mixer-wallpaper-jitter-boingo-WAVSOUND.R_00024fcc.wav.mp3')];
KiddoPaint.Sounds.Library.mixerinvert = [new Audio('sndmp3/electric-mixer-inverter-rolling-sound-WAVSOUND.R_0001fcfa.wav.mp3')];
KiddoPaint.Sounds.Library.mixervenetian = [new Audio('sndmp3/electric-mixer-venetian-WAVSOUND.R_0001df56.wav.mp3')];
KiddoPaint.Sounds.Library.mixershadowbox = [new Audio('sndmp3/electric-mixer-shadow-boxes-WAVSOUND.R_0002a07a.wav.mp3')];
KiddoPaint.Sounds.Library.mixerpip = [new Audio('sndmp3/electric-mixer-pip-drum-crash-1WAVSOUND.R_0002d96e.wav.mp3')];
KiddoPaint.Sounds.Library.mixerframe = [new Audio('sndmp3/western-gun-shot-twirl-WAVSOUND.R_0005ed70.wav.mp3')];

KiddoPaint.Sounds.Library.unimpl = [new Audio('sndmp3/chord.wav.mp3')];

// multipart sounds; start, during, end
KiddoPaint.Sounds.Library.line = [new Audio('sndmp3/kidpix-tool-line-start.wav.mp3'), new Audio('sndmp3/kidpix-tool-line-start.wav.mp3'), new Audio('sndmp3/kidpix-tool-line-end.wav.mp3')];
KiddoPaint.Sounds.Library.truck = [new Audio('sndmp3/kidpix-truck-truckin.wav.mp3'), new Audio('sndmp3/kidpix-truck-truckin-go.wav.mp3'), new Audio('sndmp3/kidpix-truck-skid.wav.mp3')];
KiddoPaint.Sounds.Library.xy = [new Audio('sndmp3/kidpix-submenu-brush-xy-start.wav.mp3'), new Audio('sndmp3/kidpix-submenu-brush-xy-during.wav.mp3'), new Audio('sndmp3/kidpix-submenu-brush-xy-end.wav.mp3')];

KiddoPaint.Sounds.Library.english = {
    'A': 'sndmp3/english/alpha-a-WAVSOUND.R_0007d8f2.wav.mp3',
    'B': 'sndmp3/english/alpha-b-WAVSOUND.R_0007ee1f.wav.mp3',
    'C': 'sndmp3/english/alpha-c-WAVSOUND.R_000803fc.wav.mp3',
    'D': 'sndmp3/english/alpha-d-WAVSOUND.R_000815df.wav.mp3',
    'E': 'sndmp3/english/alpha-e-WAVSOUND.R_00082fcc.wav.mp3',
    'F': 'sndmp3/english/alpha-f-WAVSOUND.R_00084629.wav.mp3',
    'G': 'sndmp3/english/alpha-g-WAVSOUND.R_000853d0.wav.mp3',
    'H': 'sndmp3/english/alpha-h-WAVSOUND.R_00086213.wav.mp3',
    'I': 'sndmp3/english/alpha-i-WAVSOUND.R_00087a00.wav.mp3',
    'J': 'sndmp3/english/alpha-j-WAVSOUND.R_00088ced.wav.mp3',
    'K': 'sndmp3/english/alpha-k-WAVSOUND.R_0008a72e.wav.mp3',
    'L': 'sndmp3/english/alpha-l-WAVSOUND.R_0008bda3.wav.mp3',
    'M': 'sndmp3/english/alpha-m-WAVSOUND.R_0008d0f8.wav.mp3',
    'N': 'sndmp3/english/alpha-n-WAVSOUND.R_0008e695.wav.mp3',
    'O': 'sndmp3/english/alpha-o-WAVSOUND.R_0008fcaa.wav.mp3',
    'P': 'sndmp3/english/alpha-p-WAVSOUND.R_00091bdb.wav.mp3',
    'Q': 'sndmp3/english/alpha-q-WAVSOUND.R_00092aee.wav.mp3',
    'R': 'sndmp3/english/alpha-r-WAVSOUND.R_0009639f.wav.mp3',
    'S': 'sndmp3/english/alpha-s-WAVSOUND.R_00097948.wav.mp3',
    'T': 'sndmp3/english/alpha-t-WAVSOUND.R_00099085.wav.mp3',
    'U': 'sndmp3/english/alpha-u-WAVSOUND.R_0009a406.wav.mp3',
    'V': 'sndmp3/english/alpha-v-WAVSOUND.R_0009bbcf.wav.mp3',
    'W': 'sndmp3/english/alpha-w-WAVSOUND.R_0009d8cc.wav.mp3',
    'X': 'sndmp3/english/alpha-x-WAVSOUND.R_0009ff1d.wav.mp3',
    'Y': 'sndmp3/english/alpha-y-WAVSOUND.R_000a177a.wav.mp3',
    'Z': 'sndmp3/english/alpha-z-WAVSOUND.R_000a2fe7.wav.mp3',
    '0': 'sndmp3/english/number-0-WAVSOUND.R_000a7832.wav.mp3',
    '1': 'sndmp3/english/number-1-WAVSOUND.R_000a9f1f.wav.mp3',
    '2': 'sndmp3/english/number-2-WAVSOUND.R_000ab58c.wav.mp3',
    '3': 'sndmp3/english/number-3-WAVSOUND.R_000aca17.wav.mp3',
    '4': 'sndmp3/english/number-4-WAVSOUND.R_000ae7a4.wav.mp3',
    '5': 'sndmp3/english/number-5-WAVSOUND.R_000afbb1.wav.mp3',
    '6': 'sndmp3/english/number-6-WAVSOUND.R_000b205a.wav.mp3',
    '7': 'sndmp3/english/number-7-WAVSOUND.R_000b43e7.wav.mp3',
    '8': 'sndmp3/english/number-8-WAVSOUND.002_000555ac.wav.mp3',
    '9': 'sndmp3/english/number-9-WAVSOUND.R_000b7db1.wav.mp3',
    '&': 'sndmp3/english/number-ampersand-WAVSOUND.R_000be96f.wav.mp3',
    '=': 'sndmp3/english/number-equals-WAVSOUND.R_000bce22.wav.mp3',
    '-': 'sndmp3/english/number-minus-WAVSOUND.R_000bb0e5.wav.mp3',
    '+': 'sndmp3/english/number-plus-WAVSOUND.R_000b9a58.wav.mp3',
    '?': 'sndmp3/english/number-question-mark-WAVSOUND.R_000a661d.wav.mp3',
    '!': 'sndmp3/english/number-eclamation-WAVSOUND.R_000a5774.wav.mp3',
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
KiddoPaint.Sounds.bubblepops = function() {
    KiddoPaint.Sounds.Library.playRand('bubblepops');
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
KiddoPaint.Sounds.brushspraypaint = function() {
    KiddoPaint.Sounds.Library.playSingle('brushspraypaint');
}
KiddoPaint.Sounds.mixerwallpaper = function() {
    KiddoPaint.Sounds.Library.playSingle('mixerwallpaper');
}
KiddoPaint.Sounds.mixerinvert = function() {
    KiddoPaint.Sounds.Library.playSingle('mixerinvert');
}
KiddoPaint.Sounds.mixervenetian = function() {
    KiddoPaint.Sounds.Library.playSingle('mixervenetian');
}
KiddoPaint.Sounds.mixershadowbox = function() {
    KiddoPaint.Sounds.Library.playSingle('mixershadowbox');
}
KiddoPaint.Sounds.mixerpip = function() {
    KiddoPaint.Sounds.Library.playSingle('mixerpip');
}
KiddoPaint.Sounds.mixerframe = function() {
    KiddoPaint.Sounds.Library.playSingle('mixerframe');
}
KiddoPaint.Sounds.eraserfadea = function() {
    KiddoPaint.Sounds.Library.playSingle('eraserfade');
}
KiddoPaint.Sounds.eraserfadeb = function() {
    KiddoPaint.Sounds.Library.playSingle('mixerpip');
}