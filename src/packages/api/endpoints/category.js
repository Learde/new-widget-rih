import { makeHttpRequest } from "..";

const DEFAULT_INCLUDE = "children";

const DEFAULT_PARAMS = {
    include: DEFAULT_INCLUDE,
};

const getCategories = ({ include } = DEFAULT_PARAMS) => {
    return makeHttpRequest({
        url: "/category/inventory",
        method: "GET",
        // params: {
        //     page: 1,
        //     per_page: 9999,
        // },
    });
};

export { getCategories };
