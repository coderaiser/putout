export const match = () => ({
    'nemesis.getChar()': () => {
        return path.parentPath.isExpressionStatement();
    },
    'getChar()': ({__a}) => {
        return path.parentPath.isExpressionStatement();
    }
});
