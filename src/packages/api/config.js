import axios from "axios";

const BASE_URL = window.BASE_URL ?? "https://api.rentinhand.ru/v2";
let token = null;

const httpInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    },
});
httpInstance.defaults.trailingSlash = true;

const setHeaders = (headers) => {
    httpInstance.defaults.headers = headers;
};

const addHeaders = (headers) => {
    httpInstance.defaults.headers = {
        ...httpInstance.defaults.headers,
        ...headers,
    };
};

const setBaseUrl = (url) => {
    httpInstance.defaults.baseURL = url;
};

const setToken = (t) => {
    token = t;
};

export default httpInstance;
export { setHeaders, addHeaders, setBaseUrl, setToken, token };
