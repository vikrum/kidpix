KiddoPaint.Alphabet.english = {
    face: 'sans-serif',
    pages: 2,
    character1: {
        letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    },
    character2: {
        letters: ['!', '?', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '<', '>', '$', '%', '^', '&', '@', '*', '(', ')', '~', '|']
    }
}

KiddoPaint.Alphabet.wingdings = {
    face: 'sans-serif',
    pages: 2,
    character1: {
        letters: ['☃', '☼', '☂', '☁', '♠', '♣', '♥', '♦', '♚', '♛', '♜', '♝', '♞', '♟', '✂', '✇', '✈', '♨', '♆', '✠', '☯', '⚇']
    },
    character2: {
        letters: ['❖', '◎', '◉', '⦿', '✢', '✣', '✤', '✥', '✦', '✧', '★', '☆', '✯', '✩', '✪', '✫', '✬', '✭', '✮', '✶', '✷', '✵', '✸', '✹', '✺', '❊', '✻', '✽', '✼', '❉', '✱', '✲', '✾', '❃', '❋', '✳', '✴', '❇', '❈', '※', '❅', '❆', '❄', '✿', '❀', '❁', '❂', '☙', '❧', '❦']
    },
    character3: {
        letters: ['♠', '♣', '♥', '♦']
    },
    character4: {
        letters: ['◭', '⧑', '◮', '⧒', '⧖', '◹', '⬣', '◩', '◁', '⊙', '⊖', '▩', '◵', '⬕', '◫', '⬔', '⋄', '◔', '◱', '▹', '◯', '⦶', '❏', '◷', '⬘', '⊘', '⊚', '⧨', '◀', '❐', '◰', '⬖', '⊿', '⦿', '△', '◊', '⧋', '◈', '◺', '⧊', '◿', '◶', '◸', '▪', '◎', '⬚', '⟁', '◤', '▵', '▨', '▷', '◓', '◇', '⬠', '◅', '▴', '▸', '◂', '◃', '◉', '◨', '◪', '⬙', '⬡', '◬', '⬒', '∆', '⌔', '⊝', '▣', '◣', '❍', '◒', '◥', '▰', '⊜', '◳', '▻', '⎔', '◴', '⦸', '⬢', '∇', '⬗', '▼', '▾', '◆', '⬓', '⧩', '⧫', '◧', '◕', '▧', '⊠', '❑', '⊛', '⧗', '◐', '▦', '❒', '◢', '⦾', '▿', '◑', '⟐', '▶', '▤', '▲', '◲', '⧓', '◼', '▥', '▽']
    }
}

KiddoPaint.Alphabet.nextPage = function() {
    KiddoPaint.Alphabet.page += 1;
    if (KiddoPaint.Alphabet.page > KiddoPaint.Alphabet.english.pages) {
        KiddoPaint.Alphabet.page = 1;
    }
}

KiddoPaint.Alphabet.nextWingding = function(page) {
    var idx = 0;
    return function(page) {
        if (idx >= KiddoPaint.Alphabet.wingdings['character' + page].letters.length) {
            idx = 0;
        }
        var ret = KiddoPaint.Alphabet.wingdings['character' + page].letters[idx];
        idx += 1;
        return ret;
    }
}();