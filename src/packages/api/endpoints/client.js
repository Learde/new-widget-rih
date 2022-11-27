import { makeHttpRequest } from "..";

const checkOrCreateClient = ({
    name,
    surname,
    phone,
    passportCode,
    passportNumber,
    passportSerial,
    passportTake,
    passportTakeDate,
}) => {
    return makeHttpRequest({
        url: "v1/h/client/phone",
        method: "POST",
        data: {
            name,
            surname,
            phone,
            passport_code: passportCode,
            passport_number: passportNumber,
            passport_serial: passportSerial,
            passport_take: passportTake,
            passport_take_date: passportTakeDate,
        },
    });
};

export { checkOrCreateClient };
