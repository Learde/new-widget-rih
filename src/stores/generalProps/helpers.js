import { generalProps } from "./generalProps.js";

const initGeneralPropsStore = (props) => {
    Object.keys(generalProps).forEach((key) => {
        if (key === "hiddenCategories" && typeof props[key] === "string")
            generalProps[key] = props[key].split(",");
        else if (props[key] !== undefined) generalProps[key] = props[key];
    });
};

export { initGeneralPropsStore };
