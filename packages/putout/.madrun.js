'use strict';

const {run} = require('madrun');

const env = {
    FORCE_COLOR: 3,
    CI: 1,
};

module.exports = {
    'wisdom': () => run(['lint', 'coverage']),
    'test:raw': () => `tape 'test/*.js' 'lib/**/*.spec.js' -f progress-bar`,
    'test': async () => await run('test:raw', '', env),
    
    'watch:test': async () => `nodemon -w bin -w lib -w test -x "${await run('test')}"`,
    'lint': () => `bin/putout.js .`,
    'fix:lint': () => run('lint', '--fix'),
    'fix:lint:fresh': () => run('fix:lint', '--fresh'),
    'lint:progress': () => run('lint', '--fix'),
    'lint:fresh': () => run('lint', '--fresh'),
    'coverage:raw': async () => `nyc ${await run('test:raw')}`,
    'coverage': async () => await run('coverage:raw', '', env),
    'report': () => `nyc report --reporter=text-lcov | coveralls`,
};

