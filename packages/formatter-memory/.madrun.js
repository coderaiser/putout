'use strict';

const {run} = require('madrun');

module.exports = {
    'test:base': () => `tape 'test/*.js'`,
    'test': async () => await run('test:base', '', {
        PUTOUT_NO_PROGRESS_BAR: 1,
    }),
    'watch:test': async () => `nodemon -w lib -w test -x ${await run('test')}`,
    'lint': () => `putout .`,
    'fix:lint': () => run('lint', '--fix'),
    'coverage:base': async () => `nyc ${await run('test:base')}`,
    'coverage': async () => await run('coverage:base', '', {
        PUTOUT_NO_PROGRESS_BAR: 1,
    }),
    'report': () => `nyc report --reporter=text-lcov | coveralls || true`,
};

