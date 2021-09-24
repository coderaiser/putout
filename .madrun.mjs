import {
    run,
    cutEnv,
} from 'madrun';

import {createCommons} from 'simport';

const {require} = createCommons(import.meta.url);
const {workspaces} = require('./package.json');

const cutStar = (a) => a.replace('/*', '');
const dirs = getDirs(workspaces);

const env = {
    SUPERTAPE_TIMEOUT: 7000,
    PUTOUT_PROGRESS_BAR: 0,
    FORCE_COLOR: 3,
    TEST: 1,
    CI: 1,
    SUPERTAPE_PROGRESS_BAR: 1,
    SUPERTAPE_PROGRESS_BAR_STACK: 0,
    SUPERTAPE_CHECK_SCOPES: 1,
    SUPERTAPE_CHECK_ASSERTIONS_COUNT: 1,
    KEYPRESS: 1,
};

export default {
    'test': () => [env, `tape '${dirs}/*/test/*.*' '${dirs}/*/{bin,lib}/**/*.spec.*'`],
    'test:fail': async () => await run('test', '-f fail'),
    'test:slow': () => 'FORCE_COLOR=3 lerna run test',
    'coverage:ci': async () => [env, `c8 --no-skip-full ${await cutEnv('test')}`],
    'coverage': async () => [env, `c8 ${await cutEnv('test')}`],
    'coverage:slow': () => 'FORCE_COLOR=3 lerna run coverage',
    'lint:slow': () => 'FORCE_COLOR=3 lerna run --no-bail lint',
    'lint:dot': () => 'putout .madrun.js',
    'lint-all': async () => `MADRUN_NAME=1 ${await run('lint:*')}`,
    'lint:frame': async () => await run('lint:ci', '-f codeframe'),
    'lint:fresh': async () => await run('lint', '--fresh'),
    'lint:memory': async () => await run('lint:fresh', '-f memory'),
    'fresh:lint': async () => await run('lint:fresh'),
    'fresh': async () => await run(['lint:memory', 'coverage']),
    'lint': () => `putout . --raw`,
    'lint:mark': () => 'putout **/*.md',
    'memory': async () => await run(['lint:fresh', '-f memory']),
    'fix:lint': async () => await run('lint', '--fix'),
    'fix:lint:fresh': async () => await run('fix:lint', '--fresh'),
    'fix:lint:cache': async () => await run('lint:cache', '--fix'),
    'fix:lint:slow': () => 'lerna run --no-bail fix:lint',
    'bootstrap': () => 'lerna bootstrap',
    'report': () => 'c8 report --reporter=lcov',
    'prepare': () => 'husky install',
};

function getDirs(workspaces) {
    const dirs = workspaces.map(cutStar);
    return `{${dirs.join(',')}}`;
}
