import { filterProps } from "./filterProps.js";

const initFilterPropsStore = (props) => {
    Object.keys(filterProps).forEach((key) => {
        if (props[key] !== undefined) filterProps[key] = props[key];
    });
};

export { initFilterPropsStore };
