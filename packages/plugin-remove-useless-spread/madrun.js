'use strict';

const {run} = require('madrun');

module.exports = {
    'publishOnly': () => run('lint:all'),
    'test': () => `tape 'test/*.js'`,
    'watch:test': () => `nodemon -w lib -w test -x ${run('test')}`,
    'lint': () => 'putout -um',
    'lint:all': () => `putout lib test madrun.js`,
    'fix:lint': () => run('lint', '--fix'),
    'fix:lint:all': () => run('lint:all', '--fix'),
    'putout': () => `putout lib test`,
    'coverage': () => `nyc ${run('test')}`,
    'report': () => `nyc report --reporter=text-lcov | coveralls || true`,
};

