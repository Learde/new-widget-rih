import { IconRubleSign } from "@icons";
import { currencies } from "./currencyMeta";

let imageSize = "contain";

let currencyIcon = IconRubleSign;

/**
 * Sets the mode of stretching the image of cards
 * @param mode{string} - available values: cover, contain, auto, px, %, em
 */
const setImageCover = (mode) => {
    imageSize = mode;
};

const setCurrencyIcon = (iconConst) => {
    currencyIcon =
        currencies.find((currency) => currency.const === iconConst)?.icon ??
        IconRubleSign;
};

export { imageSize, currencyIcon, setImageCover, setCurrencyIcon };
