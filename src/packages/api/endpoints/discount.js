import { makeHttpRequest } from "..";

const searchDiscount = ({ checkPromocode }) => {
    return makeHttpRequest({
        url: "v1/my/settings/discount/items",
        method: "POST",
        data: {
            check_promocode: checkPromocode,
        },
    });
};

export { searchDiscount };
