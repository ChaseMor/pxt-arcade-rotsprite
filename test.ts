scene.setBackgroundColor(1)
showRotations(sprites.castle.princess2Left1, 8, 8);
showRotations(sprites.duck.duck1, 7, 24);
showRotations(sprites.castle.heroWalkFront1, 6, 40);
showRotations(sprites.castle.skellyAttackFront1, 10, 56);
showRotations(sprites.food.smallPizza, 5, 72);
showRotations(sprites.space.spaceAsteroid0, 9, 88);
showRotations(sprites.castle.rock0, 7, 104);


function showRotations(orig: Image, n: number, y?: number) {
    for (let i = 0; i < n / 2 - 1; i++) {
        let sprite: Sprite = sprites.create(orig);
        sprite.x = (i + 0.5) * (screen.width) / n;
        if (y) {
            sprite.y = y;
        }
        rotsprite.rotSprite(sprite, i * 2 * Math.PI / n);
    }
    for (let i = 0; i < n / 2 - 1; i++) {
        let sprite: Sprite = sprites.create(orig);
        sprite.x = screen.width - ((i + 0.5) * (screen.width) / n);
        if (y) {
            sprite.y = y;
        }
        rotateNormal(sprite, i * 2 * Math.PI / n);
    }
}


function rotateNormal(sprite: Sprite, angle: number) {

    const original: Image = sprite.image;
    let rotated: Image = image.create(original.width, original.height);

    const centerX = rotated.width >> 1;
    const centerY = rotated.height >> 1;

    for (let x = 0; x < rotated.width; x++) {
        for (let y = 0; y < rotated.height; y++) {
            let dir = Math.atan2(y - centerY, x - centerX);
            let mag = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

            dir = dir - angle;

            let origX = Math.round((centerX) + mag * Math.cos(dir));
            let origY = Math.round((centerY) + mag * Math.sin(dir));

            if (origX >= 0 && origX < original.width &&
                origY >= 0 && origY < original.height) {
                rotated.setPixel(x, y, original.getPixel(origX, origY));
            }
        }
    }
    sprite.setImage(rotated);
} 