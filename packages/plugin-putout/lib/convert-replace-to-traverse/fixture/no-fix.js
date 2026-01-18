export const replace = () => ({
    [__json]: (path) => {
        const __aPath = path.get('arguments.0');
        const {importsPath} = getProperties(__aPath, ['imports']);
    }
});
