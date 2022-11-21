import { makeHttpRequest } from "..";

const DEFAULT_CATEGORY_ID = [];
const DEFAULT_POINT_ID = [];
const DEFAULT_LIMIT = 9;
const DEFAULT_OFFSET = 0;
const DEFAULT_INVENTORIES_INCLUDE = "";
const DEFAULT_FREE_PERIOD = {
    time_start: null,
    time_end: null,
};

const DEFAULT_INVENTORIES_PARAMS = {
    category_id: DEFAULT_CATEGORY_ID,
    point_id: DEFAULT_POINT_ID,
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET,
    include: DEFAULT_INVENTORIES_INCLUDE,
    free_period: DEFAULT_FREE_PERIOD,
};

const getInventories = ({
    category_id,
    point_id,
    limit,
    offset,
    include,
    free_period,
} = DEFAULT_INVENTORIES_PARAMS) => {
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
