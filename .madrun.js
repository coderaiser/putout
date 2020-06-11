'use strict';

const {run} = require('madrun');
const {workspaces} = require('./package');

const cutStar = (a) => a.replace('/*', '');
const dirs = getDirs(workspaces);

module.exports = {
    'test': () => `FORCE_COLOR=3 ${run('test:fast')}`,
    'test:fail': () => `${run('test')} | tap-pessimist`,
    'test:fast': () => `tape '${dirs}/*/test/*.js' '${dirs}/*/lib/**/*.spec.js'`,
    'test:slow': () => 'FORCE_COLOR=3 lerna run test',
    'coverage:long': () => `FORCE_COLOR=3 nyc --check-coverage ${run('test:fast')}`,
    'coverage': () => `FORCE_COLOR=3 nyc --skip-full --check-coverage ${run('test:fast')}`,
    'coverage:slow': () => 'FORCE_COLOR=3 lerna run coverage',
    'lint:slow': () => 'FORCE_COLOR=3 lerna run --no-bail lint',
    'lint:dot': () => 'putout .madrun.js',
    'lint-all': () => `MADRUN_NAME=1 ${run('lint:*')}`,
    'lint': () => run('lint:ci', '-f progress --cache'),
    'lint:frame': () => run('lint:ci', '-f codeframe --cache'),
    'lint:fresh': () => run('lint', '--update-cache'),
    'lint:ci': () => `putout .madrun.js '${dirs}/*/{bin,lib,test,*.js,.*.js}'`,
    'lint:cache': () => run('lint', '--cache'),
    'fix:lint': () => run('lint', '--fix'),
    'fix:lint:fresh': () => run('fix:lint', '--fresh'),
    'fix:lint:cache': () => run('lint:cache', '--fix'),
    'fix:lint:slow': () => 'lerna run --no-bail fix:lint',
    'bootstrap': () => 'lerna bootstrap',
    'report': () => `nyc report --reporter=text-lcov | coveralls`,
};

function getDirs(workspaces) {
    const dirs = workspaces.map(cutStar);
    return `{${dirs.join(',')}}`;
}
