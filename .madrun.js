'use strict';

const {run} = require('madrun');
const {workspaces} = require('./package');

const cutStar = (a) => a.replace('/*', '');
const dirs = getDirs(workspaces);

const env = {
    CI: 1,
    FORCE_COLOR: 3,
    PUTOUT_NO_PROGRESS_BAR: 1,
};

module.exports = {
    'test:base': () => `tape '${dirs}/*/test/*.js' '${dirs}/*/lib/**/*.spec.js'`,
    'test': async () => await run('test:base', '', env),
    'test:fail': async () => `${await run('test')} -f fail`,
    'test:slow': () => 'FORCE_COLOR=3 lerna run test',
    'coverage:base': async () => `nyc --check-coverage`,
    'coverage:long': async () => await run('coverage:base', await run('test:base'), env),
    'coverage': async () => await run(
        'coverage:base',
        `--skip-full ${await run('test:base')}`,
        env,
    ),
    'coverage:slow': () => 'FORCE_COLOR=3 lerna run coverage',
    'lint:slow': () => 'FORCE_COLOR=3 lerna run --no-bail lint',
    'lint:dot': () => 'putout .madrun.js',
    'lint-all': async () => `MADRUN_NAME=1 ${await run('lint:*')}`,
    'lint:frame': async () => await run('lint:ci', '-f codeframe'),
    'lint:fresh': async () => await run('lint', '--fresh'),
    'lint:memory': async () => await run('lint:fresh', '-f memory'),
    'fresh:lint': async () => await run('lint:fresh'),
    'fresh': async () => await run(['lint:memory', 'coverage']),
    'lint': () => `putout .`,
    'lint:mark': () => 'putout **/*.md',
    'memory': async () => await run(['lint:fresh', '-f memory']),
    'fix:lint': async () => await run('lint', '--fix'),
    'fix:lint:fresh': async () => await run('fix:lint', '--fresh'),
    'fix:lint:cache': async () => await run('lint:cache', '--fix'),
    'fix:lint:slow': () => 'lerna run --no-bail fix:lint',
    'bootstrap': () => 'lerna bootstrap',
    'report': () => `nyc report --reporter=text-lcov | coveralls`,
};

function getDirs(workspaces) {
    const dirs = workspaces.map(cutStar);
    return `{${dirs.join(',')}}`;
}
