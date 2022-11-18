const stringEscape = (str, len) => {
    return str?.substring(0, len) + (str.length > len ? "..." : "");
};

export { stringEscape };
