const pushFontToHead = () => {
    const linkNode = document.createElement("link");
    linkNode.type = "text/css";
    linkNode.rel = "stylesheet";
    linkNode.href =
        "https://fonts.googleapis.com/css2?family=Manrope:wght@400;700&display=swap";
    document.head.appendChild(linkNode);
};

export { pushFontToHead };
