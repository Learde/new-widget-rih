import { makeHttpRequest } from "..";

const authClient = ({ phone, password }) => {
    return makeHttpRequest({
        url: "/widget/client/auth",
        method: "POST",
        data: {
            phone,
            password,
        },
    });
};

export { authClient };
