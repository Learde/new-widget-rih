import { makeHttpRequest } from "..";

const registerClient = ({
    phone,
    password,
    passwordConfirm,
    surname,
    name,
    email,
    ...rest
}) => {
    const additionFields = {};
    if (rest.passport_number)
        additionFields.passport_number = rest.passport_number;
    if (rest.passport_code) additionFields.passport_code = rest.passport_code;
    if (rest.passport_series)
        additionFields.passport_series = rest.passport_series;
    if (rest.passport_take_date)
        additionFields.passport_take_date = rest.passport_take_date;
    if (rest.passport_take) additionFields.passport_take = rest.passport_take;

    return makeHttpRequest({
        url: "/v2/widget/client/register",
        method: "POST",
        data: {
            phone,
            password,
            password_confirmation: passwordConfirm,
            name,
            surname,
            mail: email,
            email,
            ...additionFields,
        },
    });
};
export { registerClient };
