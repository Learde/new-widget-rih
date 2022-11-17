import { makeHttpRequest } from "..";

const DEFAULT_INCLUDE = "";

const DEFAULT_PARAMS = {
    include: DEFAULT_INCLUDE,
};

const getPoints = ({ include } = DEFAULT_PARAMS) => {
    return makeHttpRequest({
        url: "/v1/point/items",
        method: "POST",
        data: {
            include,
        },
    });
};

export { getPoints };
