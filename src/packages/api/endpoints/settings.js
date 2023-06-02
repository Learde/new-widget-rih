import { makeHttpRequest } from "@api";

export const getSettings = async () => {
    const response = await makeHttpRequest({
        url: "/v1/my/settings/base",
        method: "GET",
    });

    return response.data;
};
