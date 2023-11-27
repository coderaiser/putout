const traverse = (baseOptions) => ({push, options}) => {
    const from = options.from || baseOptions.from;
    const to = options.to || baseOptions.to;
    const mask = options.mask || baseOptions.mask;

    if (!from || !to)
        return {};

    return {
        [__filesystem](path) {
            const files = findFile(path, mask || from);

            for (const file of files) {
                push({
                    path: file,
                    from,
                    to,
                    mask,
                });
            }
        },
    };
};
