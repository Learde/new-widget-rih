import { makeHttpRequest } from "..";

const DEFAULT_CATEGORY_ID = [];
const DEFAULT_POINT_ID = [];
const DEFAULT_LIMIT = 9;
const DEFAULT_OFFSET = 0;
const DEFAULT_INCLUDE = "";

const DEFAULT_PARAMS = {
    category_id: DEFAULT_CATEGORY_ID,
    point_id: DEFAULT_POINT_ID,
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET,
    include: DEFAULT_INCLUDE,
};

const getInventories = ({
    category_id,
    point_id,
    limit,
    offset,
    include,
} = DEFAULT_PARAMS) => {
    return makeHttpRequest({
        url: "v1/inventory/items",
        method: "POST",
        data: {
            category_id,
            point_id,
            limit,
            offset,
            include,
        },
    });
};

export { getInventories };
