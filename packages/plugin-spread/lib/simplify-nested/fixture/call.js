const mergedMatch = merge(...[
    customOptions,
    options,
    parseMatch(name, options.match),
]);
