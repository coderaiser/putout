'use strict';

const {run} = require('madrun');

module.exports = {
    'test': () => `tape 'lib/**/*.spec.js' 'test/*.js'`,
    'watch:test': () => `nodemon -w lib -w test -x ${run('test')}`,
    'lint': () => `putout lib test .madrun.js`,
    'fix:lint': () => run('lint', '--fix'),
    'coverage': () => `nyc ${run('test')}`,
    'report': () => `nyc report --reporter=text-lcov | coveralls || true`,
};

