module.exports.traverse = ({push}) => ({
    '__a.replace(/__b/g, __c)': (path) => {
        push(path);
    }
});
