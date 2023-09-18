import { makeHttpRequest } from "..";

const restorePassword = ({ phone, email }) => {
    return makeHttpRequest({
        url: "/widget/client/restore/code/send",
        method: "PUT",
        data: {
            phone,
            email,
        },
    });
};

const restoreCode = ({ code }) => {
    return makeHttpRequest({
        url: "/widget/client/restore/code/check",
        method: "GET",
        params: {
            restore_code: code,
        },
    });
};

const restoreChange = ({ password, passwordConfirm, clientId }) => {
    return makeHttpRequest({
        url: "/widget/client/restore",
        method: "PUT",
        data: {
            password,
            password_confirmation: passwordConfirm,
            client_id: clientId,
        },
    });
};

export { restorePassword, restoreCode, restoreChange };
