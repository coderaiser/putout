export const traverse = () => ({
    'module.exports = __a': (path) => {
        console.log(path);
    },
});
