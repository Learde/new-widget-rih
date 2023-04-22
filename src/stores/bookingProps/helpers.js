import { bookingProps } from "./bookingProps.js";

export const initBookingPropsStore = (props) => {
    Object.keys(bookingProps).forEach((key) => {
        if (props[key] !== undefined) bookingProps[key] = props[key];
    });
};
