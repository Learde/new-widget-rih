import makeHttpRequest from "../../makeHttpRequest.js";

export const prepareRent = async (timeStart = null, timeEnd = null) => {
    const response = await makeHttpRequest({
        url: "/rent/builder/prepare",
        method: "POST",
        data: {
            time_start: timeStart,
            time_end: timeEnd,
            currency_id: null,
            rent_state_id: null,
        },
    });

    return response;
};
