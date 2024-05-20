module.exports.traverse = ({push, store}) => ({
    ImportDeclaration(path) {
        const {node} = path;
        const {name} = node.specifiers[0].local;
        store('name', name);
    },
});
