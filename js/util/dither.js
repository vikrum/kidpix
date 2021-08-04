// https://github.com/NielsLeenheer/CanvasDither
/**
 * Use the ImageData from a Canvas and turn the image in a 1-bit black and white image using dithering
 */
class CanvasDither {
    /**
     * Change the image to grayscale
     *
     * @param  {object}   image         The imageData of a Canvas 2d context
     * @return {object}                 The resulting imageData
     *
     */
    grayscale(image) {
        for (let i = 0; i < image.data.length; i += 4) {
            const luminance = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
            image.data.fill(luminance, i, i + 3);
        }

        return image;
    }

    /**
     * Change the image to blank and white using a simple threshold
     *
     * @param  {object}   image         The imageData of a Canvas 2d context
     * @param  {number}   threshold     Threshold value (0-255)
     * @return {object}                 The resulting imageData
     *
     */
    threshold(image, threshold) {
        for (let i = 0; i < image.data.length; i += 4) {
            const luminance = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);

            const value = luminance < threshold ? 0 : 255;
            image.data.fill(value, i, i + 3);
        }

        return image;
    }

    /**
     * Change the image to blank and white using the Bayer algorithm
     *
     * @param  {object}   image         The imageData of a Canvas 2d context
     * @param  {number}   threshold     Threshold value (0-255)
     * @return {object}                 The resulting imageData
     *
     */
    bayer(image, threshold) {
        const thresholdMapA = [
            [15, 135, 45, 165],
            [195, 75, 225, 105],
            [60, 180, 30, 150],
            [240, 120, 210, 90],
        ];

        const thresholdMapB = [
            [0, 8, 2, 10],
            [12, 4, 14, 6],
            [3, 11, 1, 9],
            [15, 7, 13, 5],
        ];

        const thresholdMapC = [
            [0, 48, 12, 60, 3, 51, 15, 63],
            [32, 16, 44, 28, 35, 19, 47, 31],
            [8, 56, 4, 52, 11, 59, 7, 55],
            [40, 24, 36, 20, 43, 27, 39, 23],
            [2, 50, 14, 62, 1, 49, 13, 61],
            [34, 18, 46, 30, 33, 17, 45, 29],
            [10, 58, 6, 54, 9, 57, 5, 53],
            [42, 26, 38, 22, 41, 25, 37, 21]

        ];

        const thresholdMap = thresholdMapA;


        var ret = KiddoPaint.Display.context.createImageData(image);

        for (let i = 0; i < image.data.length; i += 4) {
            const luminance = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
            const x = i / 4 % image.width;
            const y = Math.floor(i / 4 / image.width);
            const map = Math.floor((luminance + thresholdMap[x % 4][y % 4]) / 2);
            const value = map < threshold ? 0 : 255;
            ret.data.fill(value, i, i + 3);
            ret.data[i + 3] = image.data[i + 3];
        }
        return ret;
    }

    /**
     * Change the image to blank and white using the Floyd-Steinberg algorithm
     *
     * @param  {object}   image         The imageData of a Canvas 2d context
     * @return {object}                 The resulting imageData
     *
     */
    floydsteinberg(image) {
        const width = image.width;
        const luminance = new Uint8ClampedArray(image.width * image.height);

        for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
            luminance[l] = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
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

    /**
     * Change the image to blank and white using the Atkinson algorithm
     *
     * @param  {object}   image         The imageData of a Canvas 2d context
     * @return {object}                 The resulting imageData
     *
     */
    atkinson(image) {
        const width = image.width;
        const luminance = new Uint8ClampedArray(image.width * image.height);

        for (let l = 0, i = 0; i < image.data.length; l++, i += 4) {
            luminance[l] = (image.data[i] * 0.299) + (image.data[i + 1] * 0.587) + (image.data[i + 2] * 0.114);
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