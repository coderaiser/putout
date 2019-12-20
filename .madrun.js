'use strict';

const {run} = require('madrun');

module.exports = {
    'test': () => `FORCE_COLOR=3 ${run('test:clean')}`,
    'test:clean': () => 'tape \'packages/*/test/*.js\' \'packages/*/lib/**/*.spec.js\'',
    'test:slow': () => 'FORCE_COLOR=3 lerna run test',
    'coverage': () => `FORCE_COLOR=3 nyc ${run('test:clean')}`,
    'coverage:slow': () => 'FORCE_COLOR=3 lerna run coverage',
    'report': () => 'lerna run --no-bail report',
    'lint:slow': () => 'FORCE_COLOR=3 lerna run --no-bail lint',
    'lint:dot': () => 'putout .madrun.js',
    'lint': () => `MADRUN_NAME=1 ${run('lint:*')}`,
    'fix:lint': () => 'lerna run --no-bail fix:lint',
    'bootstrap': () => 'lerna bootstrap',
};

