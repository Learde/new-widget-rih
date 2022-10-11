import { makeHttpRequest } from "@/api";

const DEFAULT_LIMIT = 9;
const DEFAULT_OFFSET = 0;

const getInventories = ({
    category_id = [],
    point_id = [],
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET,
}) => {
    return makeHttpRequest({
        url: "v1/inventory/items",
        method: "POST",
        data: {
            category_id,
            point_id,
            limit,
            offset,
        },
    });
};

export { getInventories };
