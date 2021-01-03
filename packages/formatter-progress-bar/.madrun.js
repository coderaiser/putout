'use strict';

const {run} = require('madrun');

module.exports = {
    'test:base': () => `tape 'test/*.js'`,
    
    'test': async () => await run('test:base', '', {
        PUTOUT_PROGRESS_BAR: 0,
    }),
    
    'watch:test': async () => `nodemon -w lib -w test -x ${await run('test')}`,
    'lint': () => `putout .`,
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage:base': async () => `nyc ${await run('test:base')}`,
    
    'coverage': async () => await run('coverage:base', '', {
        PUTOUT_PROGRESS_BAR: 0,
    }),
    
    'report': () => `nyc report --reporter=text-lcov | coveralls || true`,
};

