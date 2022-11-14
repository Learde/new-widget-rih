import { makeHttpRequest } from "..";

const DEFAULT_INCLUDE = "children";

const getCategories = ({ include = DEFAULT_INCLUDE } = {}) => {
    return makeHttpRequest({
        url: "/v1/category/inventory/items",
        method: "POST",
        data: {
            include,
        },
    });
};

export { getCategories };
