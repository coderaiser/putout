export const traverse = () => ({
    [__filesystem]: (path) => {
        findFile(path, '*.spec.js').map(push);
    }
});
