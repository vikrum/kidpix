KiddoPaint.Submenu.sprites = [];

KiddoPaint.Sprite.sheetPage = 0;
KiddoPaint.Sprite.sheets = [
    'img/kidpix-spritesheet-0.png',
    'img/kidpix-spritesheet-0b.png',
    'img/kidpix-spritesheet-1.png',
    'img/kidpix-spritesheet-2.png',
    'img/kidpix-spritesheet-3.png',
    'img/kidpix-spritesheet-4.png',
    'img/kidpix-spritesheet-5.png',
    'img/kidpix-spritesheet-6.png',
    'img/kidpix-spritesheet-7.png',
    'img/kidpix-spritesheet-8.png',
];

KiddoPaint.Sprite.nextSprite = function() {
    const maxrow = KiddoPaint.Sprite.sheets.length - 1;
    KiddoPaint.Sprite.sheetPage += 1;
    if (KiddoPaint.Sprite.sheetPage > maxrow) {
        KiddoPaint.Sprite.sheetPage = 0;
    }
}

KiddoPaint.Sprite.prevSprite = function() {
    const maxrow = KiddoPaint.Sprite.sheets.length - 1;
    KiddoPaint.Sprite.sheetPage -= 1;
    if (KiddoPaint.Sprite.sheetPage < 0) {
        KiddoPaint.Sprite.sheetPage = maxrow;
    }
}

KiddoPaint.Sprite.nextPage = function() {
    const maxrow = 7;
    KiddoPaint.Sprite.page += 1;
    if (KiddoPaint.Sprite.page > maxrow) {
        KiddoPaint.Sprite.page = 0;
    }
}

KiddoPaint.Sprite.prevPage = function() {
    const maxrow = 7;
    KiddoPaint.Sprite.page -= 1;
    if (KiddoPaint.Sprite.page < 0) {
        KiddoPaint.Sprite.page = maxrow;
    }
}


function init_sprites_submenu() {
    let sheet = KiddoPaint.Sprite.sheets[KiddoPaint.Sprite.sheetPage];
    const maxcols = 14;

    let row = KiddoPaint.Sprite.page;

    KiddoPaint.Submenu.sprites = [];

    for (let j = 0; j < maxcols; j++) {
        let individualSprite = {
            name: 'Sprite',
            spriteSheet: sheet,
            spriteRow: row,
            spriteCol: j,
            handler: function(e) {
                var img = new Image();
                img.src = sheet;
                img.crossOrigin = 'anonymous';
                img.onload = function() {
                    KiddoPaint.Tools.SpritePlacer.image = scaleImageDataCanvasAPIPixelated(extractSprite(img, 32, j, row, 0), 2);
                    KiddoPaint.Current.tool = KiddoPaint.Tools.SpritePlacer;
                };
            }
        }

        KiddoPaint.Submenu.sprites.push(individualSprite);
    }

    KiddoPaint.Submenu.sprites.push({
        name: 'Next Page',
        emoji: '↪',
        handler: function(e) {
            (e.type == 'contextmenu') ? KiddoPaint.Sprite.prevPage(): KiddoPaint.Sprite.nextPage();
            init_sprites_submenu();
            show_generic_submenu('sprites');
        }
    });

    KiddoPaint.Submenu.sprites.push({
        name: 'Next Stamp Pack',
        emoji: '➡️',
        handler: function(e) {
            (e.type == 'contextmenu') ? KiddoPaint.Sprite.prevSprite(): KiddoPaint.Sprite.nextSprite();
            init_sprites_submenu();
            show_generic_submenu('sprites');
        }
    });

}