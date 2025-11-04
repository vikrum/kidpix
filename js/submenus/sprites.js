KiddoPaint.Submenu.sprites = [];

KiddoPaint.Sprite.sheetPage = 0;
KiddoPaint.Sprite.sheets = [
  "img/stamp/kidpix-spritesheet-0.png",
  "img/stamp/kidpix-spritesheet-0b.png",
  "img/stamp/kidpix-spritesheet-1.png",
  "img/stamp/kidpix-spritesheet-2.png",
  "img/stamp/kidpix-spritesheet-3.png",
  "img/stamp/kidpix-spritesheet-4.png",
  "img/stamp/kidpix-spritesheet-5.png",
  "img/stamp/kidpix-spritesheet-6.png",
  "img/stamp/kidpix-spritesheet-7.png",
  "img/stamp/kidpix-spritesheet-8.png",
];

// Store stamp names data (loaded asynchronously)
KiddoPaint.Sprite.stampNames = null;
KiddoPaint.Sprite.searchQuery = "";

KiddoPaint.Sprite.nextSprite = function () {
  const maxrow = KiddoPaint.Sprite.sheets.length - 1;
  KiddoPaint.Sprite.sheetPage += 1;
  if (KiddoPaint.Sprite.sheetPage > maxrow) {
    KiddoPaint.Sprite.sheetPage = 0;
  }
};

KiddoPaint.Sprite.prevSprite = function () {
  const maxrow = KiddoPaint.Sprite.sheets.length - 1;
  KiddoPaint.Sprite.sheetPage -= 1;
  if (KiddoPaint.Sprite.sheetPage < 0) {
    KiddoPaint.Sprite.sheetPage = maxrow;
  }
};

KiddoPaint.Sprite.nextPage = function () {
  const maxrow = 7;
  KiddoPaint.Sprite.page += 1;
  if (KiddoPaint.Sprite.page > maxrow) {
    KiddoPaint.Sprite.page = 0;
  }
};

KiddoPaint.Sprite.prevPage = function () {
  const maxrow = 7;
  KiddoPaint.Sprite.page -= 1;
  if (KiddoPaint.Sprite.page < 0) {
    KiddoPaint.Sprite.page = maxrow;
  }
};

// Load stamp names data from JSON file
KiddoPaint.Sprite.loadStampNames = async function () {
  if (KiddoPaint.Sprite.stampNames) {
    return KiddoPaint.Sprite.stampNames; // Already loaded
  }

  try {
    const response = await fetch("/src/assets/data/stamp-names.json");
    if (!response.ok) {
      console.warn("Could not load stamp names, search will be disabled");
      return null;
    }
    const data = await response.json();
    KiddoPaint.Sprite.stampNames = data;
    return data;
  } catch (error) {
    console.error("Error loading stamp names:", error);
    return null;
  }
};

// Get filtered stamps based on search query
KiddoPaint.Sprite.getFilteredStamps = function (searchQuery) {
  if (!KiddoPaint.Sprite.stampNames || !searchQuery.trim()) {
    return null; // No filtering
  }

  const query = searchQuery.trim().toLowerCase();
  const queryWords = query.split(/\s+/);

  // Filter stamps by name or tags
  const filtered = KiddoPaint.Sprite.stampNames.stamps.filter((stamp) => {
    const nameLower = stamp.name.toLowerCase();
    const tagsLower = stamp.tags.map((tag) => tag.toLowerCase());

    return queryWords.some((word) => {
      if (nameLower.includes(word)) {
        return true;
      }
      return tagsLower.some((tag) => tag.includes(word));
    });
  });

  return filtered;
};

window.init_sprites_submenu = function init_sprites_submenu() {
  const sheet = KiddoPaint.Sprite.sheets[KiddoPaint.Sprite.sheetPage];
  const maxcols = 15;
  const row = KiddoPaint.Sprite.page;

  KiddoPaint.Submenu.sprites = [];

  // Get filtered stamps if there's a search query
  const filteredStamps = KiddoPaint.Sprite.getFilteredStamps(
    KiddoPaint.Sprite.searchQuery,
  );

  if (filteredStamps !== null && filteredStamps.length === 0) {
    // No results found - show message (handled in show_sprites_with_search)
    // Still add navigation buttons below
  } else if (filteredStamps !== null) {
    // Show only filtered stamps
    for (let i = 0; i < Math.min(filteredStamps.length, 60); i++) {
      // Limit to 60 stamps
      const stamp = filteredStamps[i];
      const stampSheet = KiddoPaint.Sprite.sheets[stamp.sheet];
      const individualSprite = {
        name: stamp.name || "Sprite",
        spriteSheet: stampSheet,
        spriteRow: stamp.row,
        spriteCol: stamp.col,
        handler: function (e) {
          var img = new Image();
          img.src = stampSheet;
          img.crossOrigin = "anonymous";
          img.onload = function () {
            KiddoPaint.Tools.SpritePlacer.image =
              scaleImageDataCanvasAPIPixelated(
                extractSprite(img, 32, stamp.col, stamp.row, 0),
                2,
              );
            KiddoPaint.Tools.SpritePlacer.soundBefore = function () {
              KiddoPaint.Sounds.stamp();
            };
            KiddoPaint.Tools.SpritePlacer.soundDuring = function () {};
            KiddoPaint.Current.tool = KiddoPaint.Tools.SpritePlacer;
          };
        },
      };
      KiddoPaint.Submenu.sprites.push(individualSprite);
    }
  } else {
    // No search query - show current row as usual
    for (let j = 0; j < maxcols; j++) {
      const individualSprite = {
        name: "Sprite",
        spriteSheet: sheet,
        spriteRow: row,
        spriteCol: j,
        handler: function (e) {
          var img = new Image();
          img.src = sheet;
          img.crossOrigin = "anonymous";
          img.onload = function () {
            KiddoPaint.Tools.SpritePlacer.image =
              scaleImageDataCanvasAPIPixelated(
                extractSprite(img, 32, j, row, 0),
                2,
              );
            KiddoPaint.Tools.SpritePlacer.soundBefore = function () {
              KiddoPaint.Sounds.stamp();
            };
            KiddoPaint.Tools.SpritePlacer.soundDuring = function () {};
            KiddoPaint.Current.tool = KiddoPaint.Tools.SpritePlacer;
          };
        },
      };

      KiddoPaint.Submenu.sprites.push(individualSprite);
    }
  }

  // Row navigation (within current stamp pack)
  KiddoPaint.Submenu.sprites.push({
    name: "prev row",
    emoji: "⏪",
    handler: function (e) {
      KiddoPaint.Sprite.prevPage();
      init_sprites_submenu();
      show_sprites_with_search();
    },
  });

  KiddoPaint.Submenu.sprites.push({
    name: "next row",
    emoji: "⏩",
    handler: function (e) {
      KiddoPaint.Sprite.nextPage();
      init_sprites_submenu();
      show_sprites_with_search();
    },
  });

  // Stamp pack navigation (between sprite sheets)
  KiddoPaint.Submenu.sprites.push({
    name: "prev stamp pack",
    emoji: "⏮️",
    handler: function (e) {
      KiddoPaint.Sprite.prevSprite();
      init_sprites_submenu();
      show_sprites_with_search();
    },
  });

  KiddoPaint.Submenu.sprites.push({
    name: "next stamp pack",
    emoji: "⏭️",
    handler: function (e) {
      KiddoPaint.Sprite.nextSprite();
      init_sprites_submenu();
      show_sprites_with_search();
    },
  });
};

// Show sprites submenu with search bar
window.show_sprites_with_search = function show_sprites_with_search() {
  // First show the generic submenu with stamps
  show_generic_submenu("sprites");

  // Now add search bar at the top
  const genericsubmenu = document.getElementById("genericsubmenu");

  // Create search container
  const searchContainer = document.createElement("div");
  searchContainer.className = "stamp-search-container";
  searchContainer.style.cssText =
    "position: absolute; top: 5px; left: 10px; right: 10px; z-index: 1000;";

  // Create search input
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search stamps...";
  searchInput.className = "stamp-search-input";
  searchInput.value = KiddoPaint.Sprite.searchQuery;
  searchInput.style.cssText =
    "width: 100%; padding: 5px 10px; border: 2px solid #333; border-radius: 4px; font-size: 14px; box-sizing: border-box; background: white;";

  // Debounce timer
  let debounceTimer = null;

  // Handle search input with debouncing
  searchInput.addEventListener("input", function (e) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      KiddoPaint.Sprite.searchQuery = e.target.value;
      init_sprites_submenu();
      show_sprites_with_search();
    }, 300);
  });

  searchContainer.appendChild(searchInput);

  // Insert search bar at the beginning
  genericsubmenu.insertBefore(searchContainer, genericsubmenu.firstChild);

  // Adjust submenu content to make room for search bar
  const buttons = genericsubmenu.getElementsByTagName("button");
  if (buttons.length > 0) {
    buttons[0].style.marginTop = "45px";
  }

  // Check if we should show "no results" message
  const filteredStamps = KiddoPaint.Sprite.getFilteredStamps(
    KiddoPaint.Sprite.searchQuery,
  );
  if (
    filteredStamps !== null &&
    filteredStamps.length === 0 &&
    KiddoPaint.Sprite.searchQuery.trim()
  ) {
    // Create "no results" message
    const noResultsMsg = document.createElement("div");
    noResultsMsg.className = "no-results-message";
    noResultsMsg.style.cssText =
      "position: absolute; top: 55px; left: 10px; right: 10px; text-align: center; padding: 20px; color: #666; font-size: 14px;";
    noResultsMsg.textContent = `No stamps found for "${KiddoPaint.Sprite.searchQuery}"`;

    genericsubmenu.insertBefore(
      noResultsMsg,
      genericsubmenu.children[1] || null,
    );
  }

  // Focus search input after a brief delay
  setTimeout(function () {
    searchInput.focus();
  }, 100);
};
