export default {
    'watch:test': async () => await run('watcher', `"${await run('test')}"`),
};

module.exports = {
    'watch:test': async () => await run('watcher', `"${await run('test')}"`),
};

x = {
    'watch:test': async () => await run('watcher', `"${await run('test')}"`),
};

y = {
    'watch:test': async () => `nodemon -w lib -x "${await run('test')}"`,
};

z = {
    'watch:test': async () => `nodemon -w lib -x "${await run('test')}" ${await run('x')}`,
};
