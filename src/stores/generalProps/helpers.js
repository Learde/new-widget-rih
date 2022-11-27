import { generalProps } from "./generalProps.js";

const initGeneralPropsStore = (props) => {
    Object.keys(generalProps).forEach((key) => {
        if (props[key] !== undefined) generalProps[key] = props[key];
    });
};

export { initGeneralPropsStore };
