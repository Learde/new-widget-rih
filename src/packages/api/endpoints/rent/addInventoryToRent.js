import makeHttpRequest from "../../makeHttpRequest.js";

export const addInventoryToRent = async (inventory, sessionKey) => {
    const priceId = inventory.prices[0].id;
    const response = (
        await makeHttpRequest({
            url: `/rent/builder/${sessionKey}/add/inventory`,
            method: "PUT",
            data: {
                inventory_id: inventory.id,
                price_id: priceId,
            },
        })
    ).data;

    return response.data;
};
