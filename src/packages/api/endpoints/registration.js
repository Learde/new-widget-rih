import { makeHttpRequest } from "..";

const registerClient = async ({
    phone,
    password,
    passwordConfirm,
    surname,
    name,
    email,
    ...rest
}) => {
    const additionFields = {};
    if (rest.passport_series)
        additionFields.passport_serial = rest.passport_series;
    if (rest.passport_number)
        additionFields.passport_number = rest.passport_number;
    if (rest.passport_take) additionFields.passport_take = rest.passport_take;
    if (rest.passport_code) additionFields.passport_code = rest.passport_code;
    if (rest.passport_take_date)
        additionFields.passport_take_date = rest.passport_take_date;

    const response = (
        await makeHttpRequest({
            url: "/widget/register",
            method: "POST",
            data: {
                surname,
                name,
                password,
                password_confirmation: passwordConfirm,
                email,
                phone,
                ...additionFields,
            },
        })
    ).data;

    return response.data;
};
export { registerClient };
