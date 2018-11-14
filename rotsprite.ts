namespace rotsprite {
    /**
     * Rotates the given sprite using the RotSprite Algorithm
     * @param sprite The sprite being rotated
     * @param angle The angle that the sprite is being rotated. (Clockwise in Radians)
     */
    export function rotSprite(sprite: Sprite, angle: number) {
        if (angle != 0) {
            let rotatedImage: Image = sprite.image.clone();

            rotatedImage = scale2xImage(rotatedImage);
            rotatedImage = scale2xImage(rotatedImage);
            rotatedImage = scale2xImage(rotatedImage);

            rotatedImage = rotateAndReduceImage(rotatedImage, angle);

            sprite.setImage(rotatedImage);
        }
    }

    /**
     * Doubles the size of the given image using the scale2x Algorithm
     * @param original The image being scaled
     * @returns The scaled image
     */
    function scale2xImage(original: Image) {
        let scaled: Image = image.create(original.width << 1, original.height << 1);
        for (let x = 0; x < original.width; x++) {
            for (let y = 0; y < original.height; y++) {
                const p: number = original.getPixel(x, y);
                const a: number = original.getPixel(x, y - 1);
                const b: number = original.getPixel(x + 1, y);
                const c: number = original.getPixel(x - 1, y);
                const d: number = original.getPixel(x, y + 1);
                if (c == a && c != d && a != b) {
                    scaled.setPixel((x << 1), (y << 1), a);
                } else {
                    scaled.setPixel((x << 1), (y << 1), p);
                }
                if (a == b && a != c && b != d) {
                    scaled.setPixel((x << 1) + 1, (y << 1), b);
                } else {
                    scaled.setPixel((x << 1) + 1, (y << 1), p);
                }
                if (d == c && d != b && c != a) {
                    scaled.setPixel((x << 1), (y << 1) + 1, c);
                } else {
                    scaled.setPixel((x << 1), (y << 1) + 1, p);
                }
                if (b == d && b != a && d != c) {
                    scaled.setPixel((x << 1) + 1, (y << 1) + 1, d);
                } else {
                    scaled.setPixel((x << 1) + 1, (y << 1) + 1, p);
                }
            }
        }
        return scaled;
    }
    /**
     * Rotates the image while also scaling it down by a factor of 8
     * @param original The image being rotated
     * @param angle The angle that the image is being rotated. (Clockwise in Radians)
     * @returns The scaled image
     */
    function rotateAndReduceImage(original: Image, angle: number) {

        let rotated: Image = image.create(original.width >> 3, original.height >> 3);

        const centerX = rotated.width >> 1;
        const centerY = rotated.height >> 1;

        for (let x = 0; x < rotated.width; x++) {
            for (let y = 0; y < rotated.height; y++) {
                let dir = Math.atan2(y - centerY, x - centerX);
                let mag = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) << 3;

                dir = dir - angle;

                let origX = Math.round((centerX << 3) + mag * Math.cos(dir));
                let origY = Math.round((centerY << 3) + mag * Math.sin(dir));

                if (origX >= 0 && origX < original.width &&
                    origY >= 0 && origY < original.height) {
                    rotated.setPixel(x, y, original.getPixel(origX, origY));
                }
            }
        }

        return rotated;
    }
}