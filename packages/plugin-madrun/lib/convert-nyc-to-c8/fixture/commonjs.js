const {run} = require('madrun');

module.exports = {
    'test': () => `tape 'test/*.js'`,
    'watch:test': async () => `nodemon -w lib -w test -x ${await run('test')}`,
    'lint': () => `putout .`,
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => `nyc ${await run('test')}`,
    'report': () => `nyc report --reporter=text-lcov | coveralls || true`,
};

