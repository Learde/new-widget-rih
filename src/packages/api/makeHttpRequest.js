import httpInstance from "./config";
import { token } from "./config";

const makeHttpRequest = ({
    url = "/",
    method = "get",
    params = {},
    data = {},
    headers = {},
}) => {
    if (token) params.token = token;

    return httpInstance.request({
        url,
        method,
        headers,
        params,
        data,
    });
};

export default makeHttpRequest;
