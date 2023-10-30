export default {
    'time': async () => await run([
        'lint:fresh',
        `-f time`,
    ]),
    'memory': async () => await run('lint:fresh', f()),
};
