'use strict';

const {run} = require('madrun');

module.exports = {
    'test': () => `tape test/*.js 'lib/**/*.spec.js'`,
    'watch:test': () => `nodemon -w lib -w ${run('test')}`,
    'lint': () => `putout .`,
    'fix:lint': () => run('lint', '--fix'),
    'coverage': () => `nyc ${run('test')}`,
    'report': () => `nyc report --reporter=text-lcov | coveralls || true`,
};

