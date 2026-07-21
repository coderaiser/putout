const a = {
    BooleanLiteral(node) {
        return {
            value: node.value ? 1 : 0,
        };
    },
}