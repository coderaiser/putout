export const traverse = () => ({
    TSUnionType() {
        console.log(path);
    }
});


module.exports.traverse = () => ({
    TSUnionType() {
        console.log(path);
    }
});


module.exports.traverse = () => ({
    [`export const traverse = ${TRAVERSE}`]: traverseMethods({
        where: 'declaration.declarations.0.init',
        push,
    }),
});