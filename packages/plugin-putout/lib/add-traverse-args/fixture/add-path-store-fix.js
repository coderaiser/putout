module.exports.traverse = ({push, pathStore}) => ({
    ImportDeclaration: pathStore,
});
