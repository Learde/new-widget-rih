import { makeHttpRequest } from "..";

const registerClient = ({
    phone,
    password,
    passwordConfirm,
    surname,
    name,
    email,
}) => {
    return makeHttpRequest({
        url: "/v2/widget/client/register",
        method: "POST",
        data: {
            phone,
            password,
            password_confirmation: passwordConfirm,
            name,
            surname,
            email,
        },
    });
};

export { registerClient };
