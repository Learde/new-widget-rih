import { makeHttpRequest } from "..";

const authClient = async ({ phone, password }) => {
    const response = (
        await makeHttpRequest({
            url: "/widget/auth",
            method: "POST",
            data: {
                contact: phone,
                password,
            },
        })
    ).data;

    return response.data;
};

export { authClient };
