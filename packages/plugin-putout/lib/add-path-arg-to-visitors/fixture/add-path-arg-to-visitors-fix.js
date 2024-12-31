export const traverse = () => ({
    TSUnionType(path) {
        console.log(path);
    },
});

module.exports.traverse = () => ({
    TSUnionType(path) {
        console.log(path);
    },
});

module.exports.traverse = () => ({
    [`export const traverse = ${TRAVERSE}`]: traverseMethods({
        where: 'declaration.declarations.0.init',
        push,
    }),
});
