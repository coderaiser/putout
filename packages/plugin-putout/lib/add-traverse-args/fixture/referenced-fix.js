export const traverse = ({push}) => ({
    [__filesystem]: (path) => {
        findFile(path, '*.spec.js').map(push);
    },
});
