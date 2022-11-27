import { makeHttpRequest } from "..";

const DEFAULT_LIMIT = 12;
const DEFAULT_OFFSET = 0;

const getInventories = ({
    category_id,
    point_id,
    limit = DEFAULT_LIMIT,
    offset = DEFAULT_OFFSET,
    include,
    free_period,
}) => {
    return makeHttpRequest({
        url: "v1/inventory/items",
        method: "POST",
        data: {
            category_id,
            point_id,
            limit,
            offset,
            include,
            free_period,
        },
    });
};

const DEFAULT_INVENTORY_INCLUDE = "media,buy_date,buy_price,option";

const getInventory = ({ id, include = DEFAULT_INVENTORY_INCLUDE }) => {
    return makeHttpRequest({
        url: `v1/inventory/item/${id}`,
        method: "POST",
        data: {
            include,
        },
    });
};

export { getInventories, getInventory };
