module.exports.fix = () => {};
module.exports.replace = () => ({
    [__json]: (path) => {
        const __aPath = path.get('arguments.0');
        const {importsPath} = getProperties(__aPath, ['imports']);
    }
});
