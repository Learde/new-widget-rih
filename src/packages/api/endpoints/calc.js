import { makeHttpRequest } from "..";

const DEFAULT_PAYLOAD = {
    inventories: [
        {
            brokens: [],
            can_kit_id: [],
            count: 1,
            finished: false,
            inventory: null,
            inventory_id: null,
            kit_id: null,
            kit_number: 0,
            max: 1,
            price: null,
            price_id: null,
            services: [],
            sum: 0,
            sum_amount_payment: 0,
            sum_broken: 0,
            sum_discount: 0,
            sum_inventory: 0,
            sum_one: 0,
            sum_total: 0,
            time_end: null,
            time_start: null,
        },
    ],
    kits: [],
    need_calc_breaking: 1,
    need_calc_rent_delay: 0,
    payed: 0,
    payments: [],
    products: [],
    source_attraction_id: null,
    sum: 0,
    sum_additional_service: 0,
    sum_deposit: 0,
    sum_discount: 0,
    sum_product: 0,
    sum_real: 0,
    sum_rental: 0,
    sum_total: 0,
    time_end: null,
    time_start: null,
};

const calculateRent = ({
    inventory,
    inventoryId,
    price,
    priceId,
    timeEnd,
    timeStart,
    closePoint = null,
    closePointId = null,
    openPoint = null,
    openPointId = null,
    discount = null,
    discountId = null,
}) => {
    const payload = JSON.parse(JSON.stringify(DEFAULT_PAYLOAD));
    payload.inventories[0].inventory = inventory;
    payload.inventories[0].inventory_id = inventoryId;
    payload.inventories[0].price = price;
    payload.inventories[0].price_id = priceId;
    payload.inventories[0].time_end = timeEnd;
    payload.inventories[0].time_start = timeStart;
    payload.time_end = timeEnd;
    payload.time_start = timeStart;
    if (closePoint && closePointId) {
        payload.close_point = closePoint;
        payload.close_point_id = closePointId;
    }
    if (openPoint && openPointId) {
        payload.open_point = openPoint;
        payload.open_point_id = openPointId;
    }
    if (discount && discountId) {
        payload.discounts = [
            {
                discount: discount,
                discount_id: discountId,
            },
        ];
    }

    return makeHttpRequest({
        url: "/v1/rent/recalc",
        method: "POST",
        data: payload,
    });
};

export { calculateRent };
