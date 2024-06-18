export const traverse = ({listStore}) => ({
    ImportDeclaration(path) {
        listStore(path);
    },
});
