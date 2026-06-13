const {traverse} = operator;

module.exports.traverse = () => ({
    [__markdown]: (path) => {
        superTraverse(path, {
            '__a(__b, __c)': (path) => {},
        });
    },
});
