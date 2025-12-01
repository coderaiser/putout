const error = await validateArgs(args, [
    ...yargsConfig.boolean,
    ...yargsConfig.number,
]);
