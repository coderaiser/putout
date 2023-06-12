module.exports = {
    'coverage:long': async () => await run('coverage:base', await run('test:base'), env),
};
