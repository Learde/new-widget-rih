const stringEscape = (str, len) => {
    if (!str) {
        return str;
    }
    return str.substring(0, len) + (str.length > len ? "..." : "");
};

export { stringEscape };
