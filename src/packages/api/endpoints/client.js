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
        url: "/h/client/phone",
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

const getClientRents = ({ clientId }) => {
    return makeHttpRequest({
        url: "/widget/client/rents",
        method: "GET",
        params: {
            client_id: clientId,
        },
    });
};

const editClient = (clientData, clientId) => {
    return makeHttpRequest({
        url: "/client/" + clientId,
        method: "PUT",
        data: clientData,
    });
};

export const getClients = async (phone) => {
    const response = (
        await makeHttpRequest({
            url: "/human/client",
            method: "GET",
            params: {
                search: phone,
                page: 1,
                per_page: 1,
            },
        })
    ).data;

    return response.data;
};

export const createClient = async (client) => {
    const response = (
        await makeHttpRequest({
            url: "/human/client",
            method: "POST",
            data: client,
        })
    ).data;

    return response;
};

const DEFAULT_INCLUDE = "balance,media,attraction,passport,companies,discounts";
const DEFAULT_WITH = "balance,companies";

const getClient = (clientId) => {
    return makeHttpRequest({
        url: "/client/" + clientId,
        method: "GET",
    });
};

export { checkOrCreateClient, getClientRents, editClient, getClient };
