import httpInstance from "@/api/config";

const makeHttpRequest = ({
    url = "/",
    method = "get",
    params = {},
    data = {},
    headers = {},
}) => {
    return httpInstance.request({
        url,
        method,
        headers,
        params,
        data,
    });
};

export default makeHttpRequest;
