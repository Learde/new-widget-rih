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
    const page = offset / limit;
    const perPage = limit;

    return makeHttpRequest({
        url: "/inventory",
        method: "GET",
        params: {
            category_id,
            point_id,
            page,
            per_page: perPage,
            include,
            free_period,
        },
    });
};

const DEFAULT_INVENTORY_INCLUDE = "media,buy_date,buy_price,option";

const getInventory = ({ id, include = DEFAULT_INVENTORY_INCLUDE }) => {
    return makeHttpRequest({
        url: `/inventory/${id}`,
        method: "GET",
    });
};

export { getInventories, getInventory };
