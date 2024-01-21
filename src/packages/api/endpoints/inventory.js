import { makeHttpRequest } from "..";

const DEFAULT_PER_PAGE = 12;
const DEFAULT_PAGE = 0;

const getInventories = async ({
    category_id,
    point_id,
    perPage = DEFAULT_PER_PAGE,
    page = DEFAULT_PAGE,
    include,
    free_period,
}) => {
    // const page = offset / limit;
    // const perPage = limit;

    return (
        await makeHttpRequest({
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
        })
    ).data;
};

const DEFAULT_INVENTORY_INCLUDE = "media,buy_date,buy_price,option";

const getInventory = ({ id, include = DEFAULT_INVENTORY_INCLUDE }) => {
    return makeHttpRequest({
        url: `/inventory/${id}`,
        method: "GET",
    });
};

export { getInventories, getInventory };
