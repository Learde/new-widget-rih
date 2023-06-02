import { filterProps } from "./filterProps.js";

const initFilterPropsStore = (props) => {
    Object.keys(filterProps).forEach((key) => {
        if (key === "requiredFilters")
            filterProps[key] = props[key]?.split(",") ?? [];
        else if (props[key] !== undefined) filterProps[key] = props[key];
    });
};

export { initFilterPropsStore };
