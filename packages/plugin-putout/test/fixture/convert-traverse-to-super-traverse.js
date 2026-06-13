module.exports.traverse = () => ({
    [__markdown]: (path) => {
        traverse(path, {
            '__a(__b, __c)': (path) => {
            }
        });
    }
});
