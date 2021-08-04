#!/bin/bash

set -e

echo [clean] Removing old app.
rm -f js/app.js

echo [format] Format JS and CSS.
node_modules/js-beautify/js/bin/js-beautify.js -r js/**/*
node_modules/js-beautify/js/bin/js-beautify.js -r css/*


echo -n [build] Building JS Kid Pix app.js..

# node_modules/uglify-js/bin/uglifyjs -b -o js/app.js \
#node_modules/uglify-js/bin/uglifyjs -c -m -o js/app.js \
#node_modules/uglify-es/bin/uglifyjs -c -m -o js/app.js \
node_modules/uglify-es/bin/uglifyjs -bo js/app.js \
  js/init/* \
  js/util/* \
  js/tools/* \
  js/textures/* \
  js/submenus/* \
  js/brushes/* \
  js/builders/* \
  js/stamps/* \
  js/sounds/* \

echo "" >> js/app.js
echo "// $(date)" >> js/app.js

echo . done.
