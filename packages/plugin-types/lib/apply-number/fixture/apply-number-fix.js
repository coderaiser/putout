const a = {
    BooleanLiteral(node) {
        return {
            value: Number(node.value),
        };
    },
};
