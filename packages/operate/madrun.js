'use strict';

const {run} = require('madrun');

module.exports = {
    'test': () => `tape 'test/*.js' 'lib/**/*.spec.js'`,
    'watch:test': () => `nodemon -w lib -w test -x ${run('test')}`,
    'lint': () => `putout madrun.js lib test`,
    'fix:lint': () => run('lint', '--fix'),
    'putout': () => `putout lib test madrun.js`,
    'coverage': () => `nyc ${run('test')}`,
    'report': () => `nyc report --reporter=text-lcov | coveralls || true`,
};

