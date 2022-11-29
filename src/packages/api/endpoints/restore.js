import { makeHttpRequest } from "..";

const restorePassword = ({ phone, email }) => {
    return makeHttpRequest({
        url: "/v2/widget/client/restore/code/send",
        method: "PUT",
        data: {
            phone,
            email,
        },
    });
};

const restoreCode = ({ code }) => {
    return makeHttpRequest({
        url: "/v2/widget/client/restore/code/check",
        method: "GET",
        data: {
            restore_code: code,
        },
    });
};

const restoreChange = ({ password, passwordConfirm, clientId }) => {
    return makeHttpRequest({
        url: "/v2/widget/client/restore",
        method: "GET",
        data: {
            password,
            password_confirmation: passwordConfirm,
            client_id: clientId,
        },
    });
};

export { restorePassword, restoreCode, restoreChange };
