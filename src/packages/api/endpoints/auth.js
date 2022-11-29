import { makeHttpRequest } from "..";

const authClient = ({ phone, password }) => {
    return makeHttpRequest({
        url: "/v2/widget/client/auth",
        method: "POST",
        data: {
            phone,
            password,
        },
    });
};

export { authClient };
