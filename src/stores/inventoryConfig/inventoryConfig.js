let imageSize = "contain";

/**
 * Sets the mode of stretching the image of cards
 * @param mode{string} - available values: cover, contain, auto, px, %, em
 */
const setImageCover = (mode) => {
    imageSize = mode;
};

export { imageSize, setImageCover };
