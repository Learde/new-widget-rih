import { makeHttpRequest } from "..";

const DEFAULT_INCLUDE = "";

const DEFAULT_PARAMS = {
    include: DEFAULT_INCLUDE,
};

const getPoints = ({ include } = DEFAULT_PARAMS) => {
    return makeHttpRequest({
        url: "/point",
        method: "GET",
        data: {
            page: 1,
            per_page: 9999,
        },
    });
};

export { getPoints };
