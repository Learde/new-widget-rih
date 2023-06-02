import { makeHttpRequest } from "@api";

export const getMinRent = async () => {
    const response = await makeHttpRequest({
        url: "/v1/my/settings/base",
        method: "GET",
    });

    return response.data?.min_rent_time;
};
