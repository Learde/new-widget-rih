import { makeHttpRequest } from "..";

const searchDiscount = ({ checkPromocode }) => {
    return makeHttpRequest({
        url: "/discount",
        method: "POST",
        data: {
            check_promocode: checkPromocode,
        },
    });
};

export { searchDiscount };
