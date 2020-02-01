'use strict';

const {run} = require('madrun');
const {workspaces} = require('./package');

const cutStar = (a) => a.replace('/*', '');
const dirs = getDirs(workspaces);

module.exports = {
    'test': () => `FORCE_COLOR=3 ${run('test:clean')}`,
    'test:clean': () => `tape '${dirs}/*/test/*.js' '${dirs}/*/lib/**/*.spec.js'`,
    'test:slow': () => 'FORCE_COLOR=3 lerna run test',
    'coverage': () => `FORCE_COLOR=3 nyc ${run('test:clean')}`,
    'coverage:slow': () => 'FORCE_COLOR=3 lerna run coverage',
    'lint:slow': () => 'FORCE_COLOR=3 lerna run --no-bail lint',
    'lint:dot': () => 'putout .madrun.js',
    'lint-all': () => `MADRUN_NAME=1 ${run('lint:*')}`,
    'lint': () => `putout .madrun.js ${dirs}/*/{bin,lib,test,*.js,.*.js} -f progress`,
    'fix:lint': () => run('lint', '--fix'),
    'fix:lint:slow': () => 'lerna run --no-bail fix:lint',
    'bootstrap': () => 'lerna bootstrap',
    'report': () => `nyc report --reporter=text-lcov | coveralls`,
};

function getDirs(workspaces) {
    const dirs = workspaces.map(cutStar);
    return `{${dirs.join(',')}}`;
}
