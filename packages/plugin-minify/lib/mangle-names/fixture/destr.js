const {
    readOptions,
    hello: world,
    [m]: z,
} = await import('../lib/read-options.mjs');
await tryToCatch(readOptions);
