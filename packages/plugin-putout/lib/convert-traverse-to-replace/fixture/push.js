module.exports.traverse = () => ({
    '__a.replace(/__b/g, __c)': (path) => {
        push(path);
    },
});
