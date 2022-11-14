const normalizer = (node) => {
    return {
        id: node.id,
        label: node.title,
        children: node.children,
    };
};

export { normalizer };
