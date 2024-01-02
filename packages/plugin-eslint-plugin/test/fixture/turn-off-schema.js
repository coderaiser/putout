function getMeta(plugin) {
    const {
        type = 'layout',
        recommended = true,
        fixable = 'whitespace',
    } = plugin;

    return {
        type,
        docs: {
            recommended,
        },
        schema: {},
        fixable,
    };
}