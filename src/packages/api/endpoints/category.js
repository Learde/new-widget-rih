import { makeHttpRequest } from "..";

const DEFAULT_INCLUDE = "children";

const DEFAULT_PARAMS = {
    include: DEFAULT_INCLUDE,
};

const getCategories = ({ include } = DEFAULT_PARAMS) => {
    return makeHttpRequest({
        url: "/v1/category/inventory/items",
        method: "POST",
        data: {
            include,
        },
    });
};

export { getCategories };
