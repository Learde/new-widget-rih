import httpInstance from "./config";
import { token } from "./config";

const makeHttpRequest = ({
    url = "/",
    method = "get",
    params = {},
    data = {},
    headers = {},
    options = {},
}) => {
    if (token) {
        if (options.shouldSetTokenInHeaders)
            headers.authorization = "Bearer " + token;
        else params.get_token = token;
    }

    return httpInstance.request({
        url,
        method,
        headers,
        params,
        data,
    });
};

export default makeHttpRequest;
