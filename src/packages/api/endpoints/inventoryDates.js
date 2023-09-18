import { makeHttpRequest } from "..";

const getRentsOfInventory = ({ inventory_id, month, year }) => {
    return makeHttpRequest({
        url: "/widget/inventory_dates",
        method: "POST",
        data: {
            inventory_id,
            month,
            year,
        },
    });
};

export { getRentsOfInventory };
