import {createRequire} from 'module';
import {
    run,
    cutEnv,
} from 'madrun';

const require = createRequire(import.meta.url);
const {workspaces} = require('./package.json');

const cutStar = (a) => a.replace('/*', '');
const dirs = getDirs(workspaces);

const env = {
    TERM_PROGRAM: 0,
    TERMINAL_EMULATOR: 0,
    SUPERTAPE_TIMEOUT: 7000,
    PUTOUT_PROGRESS_BAR: 0,
    FORCE_COLOR: 3,
    TEST: 1,
    CI: 1,
    SUPERTAPE_PROGRESS_BAR: 1,
    SUPERTAPE_PROGRESS_BAR_STACK: 0,
    KEYPRESS: 1,
};

const eslintOffEnv = {
    ESLINT_CONFIG_FILE: './.eslintrc-off.json',
};

const putoutOffEnv = {
    PUTOUT_CONFIG_FILE: './.putout-off.json',
};

export default {
    'test': () => [env, `tape '${dirs}/*/test/*.*' '${dirs}/*/{bin,lib,rules}/**/*.spec.*'`],
    'test:inspect': () => [env, `node --inspect-brk --inspect=0.0.0.0 node_modules/.bin/${cutEnv('test')}`],
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
    'lint:fresh:only:putout': async () => [eslintOffEnv, await run('lint:memory')],
    'lint:fresh:only:eslint': async () => [putoutOffEnv, await run('lint:memory', '--no-config')],
    'lint:memory': async () => await run('lint:fresh', '-f memory'),
    'lint:only:putout': async () => [eslintOffEnv, await run('lint:memory')],
    'lint:only:eslint': async () => [putoutOffEnv, await run('lint:memory', '--no-config')],
    'fresh:lint': async () => await run('lint:fresh'),
    'fresh:fix': async () => await run('lint:fresh', '--fix'),
    'fresh': async () => await run(['lint:memory', 'coverage']),
    'fresh:only:putout': async () => await run(['lint:only:putout', 'coverage']),
    'fresh:only:eslint': async () => await run(['lint:only:eslint', 'coverage']),
    'lint': () => `putout . --raw --rulesdir rules`,
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
