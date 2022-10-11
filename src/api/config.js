import axios from "axios";

const BASE_URL = window.BASE_URL ?? "https://api.rentinhand.ru/";

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

export default httpInstance;
export { setHeaders, addHeaders, setBaseUrl };
