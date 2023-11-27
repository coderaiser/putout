module.exports.traverse = ({push}) => ({
    [__filesystem]: (path) => {
        findFile(path, '*.test.*').map(push);
    },
});
