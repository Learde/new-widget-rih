import { bookingProps } from "./bookingProps.js";

export const initBookingPropsStore = (props) => {
    Object.keys(bookingProps).forEach((key) => {
        if (key === "limitDays" && typeof props[key] === "number")
            bookingProps[key] = props[key] - 1;
        else if (props[key] !== undefined) bookingProps[key] = props[key];
    });
};
