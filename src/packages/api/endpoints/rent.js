import { makeHttpRequest } from "..";
import { generalProps, bookingProps } from "@stores";

const openRent = async (rentObject) => {
    if (generalProps.mail) {
        rentObject.needs_send = true;
    }

    if (generalProps.payable) {
        if (typeof bookingProps.paymentCoefficient === "number") {
            rentObject.sum_multiplier = bookingProps.paymentCoefficient;
        }
        const response = await openPayment(rentObject);

        if (response.data?.payment_url)
            location.href = response.data.payment_url;
        return response;
    }

    return await createRent(rentObject);
};

const createRent = (rentObject) => {
    return makeHttpRequest({
        url: "/rent/edit",
        method: "PUT",
        data: rentObject,
    });
};

const openPayment = (rentObject) => {
    return makeHttpRequest({
        url: "/widget/payment/new",
        method: "POST",
        data: rentObject,
    });
};

export { openRent };
