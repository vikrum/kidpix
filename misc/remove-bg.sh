#!/bin/bash 
# B9 June 2017

# mktrans 
# This is similar to ImageMagick's bg_removal script, but much higher
# quality. (It's also faster and simpler to use.) 
#
# For a sample, run these commands:
#    convert logo: logo.png
#    mktrans logo.png
#    display logo-transparent.png


# Fuzz is how far off the background color can be (in percent).
# This is important for getting good antialiasing.
defaultfuzz=20

usage() {
    cat <<EOF
mktrans: Convert images into shaped transparent pngs by floodfilling
	 the background with transparency (antialiased alpha channel).
	 Unless a different starting pixel is specified, the top left
	 pixel is used as the "background" color to remove and
	 floodfill starts from all four image edges,
Typical usage: 
	mktrans foo.jpg		(creates foo-transparent.png)
Usage: mktrans  [-f <fuzz>]  [-s|-S]  [-p <x>,<y>]  [-v]  <files ... >
	-f <fuzz>: How loosely to match the background color (default $defaultfuzz%)
    	   	   Advanced options:
	       -s: Use speedy antialiasing (much faster, slightly less acurate) 
	       -S: Supress antialiasing completely. (Useful for repeated runs)
	p <x>,<y>: Floodfill from pixel at x,y instead of 0,0
	       -v: Verbose
EOF

# * Side note: This creates an antialiased (blurred) alpha channel
#   that is also eroded by half a pixel to avoid halos. ImageMagick's
#   morphological operations don't (yet?) work at the subpixel level,
#   so I'm blowing up the alpha channel to 200% before eroding. Since
#   this can be slow on large images, consider using the '-s' option
#   which uses a faster, lower quality antialiasing.

# * Running this script on an image that already has transparency will
#   erode the image due to the antialiasing. Using -S is a workaround,
#   but is not very satisfactory. Perhaps this script should remove any
#   existing transparency before manipulating the image and then add it
#   back in at the end. But then again, how often are people going to
#   want to do that? The only use I can think of is when using -p.

# * Because of the previous bug, if you do use -p to fill lots of
#   lagoons, you'll probably want to use -A at the same time.

# * Finding the coordinates for -p is a pain. It'd be nice if there was
#   a -P option which let the user click on a point (or multiple points)
#   in the image to start the floodfill.

    exit 0
}

fuzz=$defaultfuzz
pixelcomma="0,0"
pixelplus="+0+0"

while getopts f:sAShp:v name; do
    case $name in
        f) fuzz=$OPTARG
           ;;
        s) sflag=True
           ;;
        S|A) noantialias=True
           ;;
        v) vflag=True
           ;;
        h) usage
           ;;
        p) pixelcomma=$OPTARG
           pixelplus=+${OPTARG%,*}+${OPTARG#*,}
           pflag=True
           ;;
        *) usage
           ;;
    esac
done

shift $((OPTIND-1))
[[ "$#" != 0 ]] || usage


for filename; do
    # Get color of 0,0 (top left) pixel
    color=$(convert "$filename" -format "%[pixel:p{$pixelcomma}]" info:-)
    if [[ "$color" == *rgba*",0)" ]]; then
	color="${color%,0)},1)"	# Floodfill only works with opaque colors.
    fi
    if [[ "$color" == "none" ]]; then
	echo "Error: $filename: pixel at $pixelcomma is completely transparent. Cannot floodfill." >&2
	continue
    fi

    options=""
    if [ -z "$pflag" ]; then
	# Add a 1 pixel border so we'll fill from the bottom and sides as well.
	options+=" -bordercolor $color -border 1 "
    fi
    # In a new stack, make a copy of the image
    options+=" ( +clone "
    # [copy] floodfill with transparency ("none") starting at top-left
    options+="		-fill none -floodfill $pixelplus $color"
    # [copy] extract just the transparency (alpha channel)
    options+="		-alpha extract"

    # [copy] end the stack.
    options+=" ) "
    # Compose the original image and the copy's alpha channel.
    options+=" -compose CopyOpacity -composite"
    if [ -z "$pflag" ]; then
	# Remove the 1 pixel border we added
	options+=" -shave 1"
    fi
    
    [ "$vflag" ] && echo convert "$filename" $options "${filename%.*}-transparent.png"

    convert "$filename" $options "${filename%.*}-transparent.png"
done
