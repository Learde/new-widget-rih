import { makeHttpRequest } from "..";

const createRent = (rentObject) => {
    return makeHttpRequest({
        url: "v1/rent/edit",
        method: "PUT",
        data: rentObject,
    });
};

export { createRent };
