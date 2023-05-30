import { makeHttpRequest } from "@api";

export const getMinRent = async () => {
    const response = await makeHttpRequest({
        url: "/v1/my/settings/base/item",
        method: "POST",
    });

    return response.data?.array?.[0]?.min_rent_time;
};
