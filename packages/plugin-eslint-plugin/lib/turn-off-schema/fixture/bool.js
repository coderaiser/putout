function getMeta2(plugin) {
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
        schema: false,
        fixable,
    };
}
