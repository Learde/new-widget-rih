import makeHttpRequest from "../../makeHttpRequest.js";

export const addClientToRent = async (clientId, sessionKey) => {
    const response = (
        await makeHttpRequest({
            url: `/rent/builder/${sessionKey}/add/client/${clientId}`,
            method: "PUT",
        })
    ).data;

    return response.data;
};
