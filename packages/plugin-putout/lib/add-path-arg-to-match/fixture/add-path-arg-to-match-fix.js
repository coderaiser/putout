export const match = () => ({
    'nemesis.getChar()': (vars, path) => {
        return path.parentPath.isExpressionStatement();
    },
    'getChar()': ({__a}, path) => {
        return path.parentPath.isExpressionStatement();
    },
});
