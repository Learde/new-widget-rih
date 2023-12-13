import makeHttpRequest from "../../makeHttpRequest";

export const saveRent = async (sessionKey) => {
    const response = (
        await makeHttpRequest({
            method: "POST",
            url: `/rent/builder/${sessionKey}/save`,
        })
    ).data;

    return response;
};
