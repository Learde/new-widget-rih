import makeHttpRequest from "../../makeHttpRequest";

export const setRentTime = async (timeStart, timeEnd, sessionKey) => {
    const response = (
        await makeHttpRequest({
            url: `/rent/builder/${sessionKey}/add/time`,
            method: "PUT",
            data: {
                time_start: timeStart,
                time_end: timeEnd,
            },
        })
    ).data;

    return response.data;
};
