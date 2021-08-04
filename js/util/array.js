Array.prototype.random = function() {
    return this[Math.floor((Math.random() * this.length))];
}

// https://stackoverflow.com/a/25984542
function fisherYatesArrayShuffle(array) {
    var count = array.length,
        randomnumber, temp;
    while (count) {
        randomnumber = Math.random() * count-- | 0;
        temp = array[count];
        array[count] = array[randomnumber];
        array[randomnumber] = temp
    }
}