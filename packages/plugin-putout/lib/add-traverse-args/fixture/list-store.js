export const traverse = () => ({
    ImportDeclaration(path) {
        listStore(path);
    }
});
