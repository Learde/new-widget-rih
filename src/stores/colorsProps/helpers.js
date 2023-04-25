import { colorsProps } from "./colorsProps.js";
import { pSBC } from "@helpers";

const initColorsPropsStore = (props) => {
    Object.keys(colorsProps).forEach((key) => {
        if (props[key] !== undefined) colorsProps[key] = props[key];
    });

    colorsProps.primaryColorHover = pSBC(-0.2, colorsProps.primaryColor);
    colorsProps.primaryColorLight = pSBC(0.55, colorsProps.primaryColor);
    colorsProps.primaryColorLightest = pSBC(0.8, colorsProps.primaryColor);
    colorsProps.primaryColorLightest2 = pSBC(0.88, colorsProps.primaryColor);

    const root = document
        .getElementById("rih-widget")
        .shadowRoot.getElementById("rih-widget");

    root.style.setProperty("--widget-primary", colorsProps.primaryColor);
    root.style.setProperty(
        "--widget-primary-hover",
        colorsProps.primaryColorHover
    );
    root.style.setProperty(
        "--widget-primary-light",
        colorsProps.primaryColorLight
    );
    root.style.setProperty(
        "--widget-primary-lightest",
        colorsProps.primaryColorLightest
    );
    root.style.setProperty(
        "--widget-primary-lightest2",
        colorsProps.primaryColorLightest2
    );
    root.style.setProperty("--widget-background", colorsProps.backgroundColor);
    root.style.setProperty(
        "--widget-background-second",
        colorsProps.backgroundSecondColor
    );
};

export { initColorsPropsStore };
