'use strict';

const {run} = require('madrun');
const {workspaces} = require('./package');

const cutStar = (a) => a.replace('/*', '');
const dirs = getDirs(workspaces);

module.exports = {
    'test': async () => `CI=1 FORCE_COLOR=3 ${await run('test:fast')}`,
    'test:fail': async () => `${await run('test')} -f fail`,
    'test:fast': () => `tape '${dirs}/*/test/*.js' '${dirs}/*/lib/**/*.spec.js'`,
    'test:slow': () => 'FORCE_COLOR=3 lerna run test',
    'coverage:long': async () => `FORCE_COLOR=3 nyc --check-coverage ${await run('test:fast')}`,
    'coverage': async () => `CI=1 FORCE_COLOR=3 nyc --skip-full --check-coverage ${await run('test:fast')}`,
    'coverage:slow': () => 'FORCE_COLOR=3 lerna run coverage',
    'lint:slow': () => 'FORCE_COLOR=3 lerna run --no-bail lint',
    'lint:dot': () => 'putout .madrun.js',
    'lint-all': async () => `MADRUN_NAME=1 ${await run('lint:*')}`,
    'lint:frame': () => run('lint:ci', '-f codeframe'),
    'lint:fresh': () => run('lint', '--fresh'),
    'lint:memory': () => run('lint:fresh', '-f memory'),
    'fresh:lint': () => run('lint:fresh'),
    'fresh': () => run(['lint:memory', 'coverage']),
    'lint': () => `putout .`,
    'lint:mark': () => 'putout **/*.md',
    'memory': () => run(['lint:fresh', '-f memory']),
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
