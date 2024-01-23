import { makeHttpRequest } from "..";

const restorePassword = async ({ phone, email }) => {
    const response = (
        await makeHttpRequest({
            url: "/widget/send-code",
            method: "POST",
            data: {
                phone,
                email,
            },
        })
    ).data;

    return response;
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

const restoreChange = async ({ password, passwordConfirm, code }) => {
    const response = (
        await makeHttpRequest({
            url: "/widget/restore-password",
            method: "PUT",
            data: {
                password,
                password_confirmation: passwordConfirm,
                code,
            },
        })
    ).data;

    return response;
};

export { restorePassword, restoreCode, restoreChange };
