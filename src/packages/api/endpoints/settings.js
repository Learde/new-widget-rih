import { makeHttpRequest } from "@api";

export const getSettings = async () => {
    const response = await makeHttpRequest({
        url: "/settings",
        method: "GET",
    });

    return response.data;
};
