const sortRules = {
    report: noop,
    fix: noop,
    traverse: () => ({
        [__json]: (path) => {
            console.log('x');
        },
    }),
};
