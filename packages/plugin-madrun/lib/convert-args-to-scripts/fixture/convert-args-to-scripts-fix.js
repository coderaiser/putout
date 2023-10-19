export default {
    'build': () => 'tsup',
    'test': () => 'tape *.spec.js',
    'test:dts': () => 'check-dts',
    'wisdom': () => run(['build', 'test', 'test:dts']),
};

const a = {
    'build': () => 'tsup',
    'wisdom': () => run('build1', 'test', 'test:dts'),
};

const c = {
    'build': () => 'tsup',
    'lint': () => 'putout .',
    'test:dts': () => 'check-dts',
    'wisdom': () => run('build', '--test', 'test:dts'),
    'fix:lint': async () => await run('lint', '--fix'),
    'watch:test': async () => `nodemon -w lib -x ${await run('test')}`,
};

const d = {
    build: () => 'tsup',
    'test:dts': () => 'check-dts',
    test: () => 'tape *.spec.js',
    wisdom: () => run(['build', 'test', 'test:dts']),
};
