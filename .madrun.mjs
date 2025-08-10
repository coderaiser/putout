import {createRequire} from 'node:module';
import {run, cutEnv} from 'madrun';

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
    SUPERTAPE_TIME: 1,
    SUPERTAPE_TIME_STACK: 0,
    KEYPRESS: 1,
};

const envUpdate = {
    ...env,
    UPDATE: 1,
};

const eslintOffEnv = {
    ESLINT_CONFIG_FILE: './eslint-off.config.js',
};

const putoutOffEnv = {
    PUTOUT_CONFIG_FILE: './.putout-off.json',
};

const envBreaking = {
    BABEL_TYPES_8_BREAKING: 1,
};

export default {
    'test': () => [env, `tape -f time '${dirs}/*/test/*.*' '${dirs}/*/{bin,lib,rules}/**/*.spec.*'`],
    'test:break': async () => [envBreaking, await run('test')],
    'test:update': () => [envUpdate, `tape 'packages/{test,plugin,processor,engine}-*/test/*.*' 'packages/{test,plugin,processor,engine}-*/lib/**/*.spec.*'`],
    'test:inspect': () => [env, `node --inspect-brk --inspect=0.0.0.0 node_modules/.bin/${cutEnv('test')}`],
    'test:fail': async () => await run('test', '-f fail'),
    'coverage:ci': async () => [env, `c8 --no-skip-full ${await cutEnv('test')}`],
    'coverage': async () => [env, `c8 ${await cutEnv('test')}`],
    'lint:dot': () => 'putout .madrun.js',
    'lint-all': async () => `MADRUN_NAME=1 ${await run('lint:*')}`,
    'lint:frame': async () => await run('lint', '-f codeframe'),
    'lint:fresh': async () => await run('lint', '--fresh'),
    'lint:fresh:only:putout': async () => [eslintOffEnv, await run('lint:memory')],
    'lint:fresh:only:eslint': async () => [putoutOffEnv, await run('lint:memory', '--no-config')],
    'lint:memory': async () => await run('lint:fresh', '-f memory'),
    'lint:time': async () => await run('lint:fresh', '-f time'),
    'lint:only:putout': async () => [eslintOffEnv, await run('lint:memory')],
    'lint:only:eslint': async () => [putoutOffEnv, await run('lint:memory', '--no-config')],
    'fresh:lint': async () => await run('lint:fresh'),
    'fresh:fix': async () => await run('lint:fresh', '--fix'),
    'fresh': async () => await run(['lint:time', 'coverage']),
    'fresh:only:putout': async () => await run(['lint:only:putout', 'coverage']),
    'fresh:only:eslint': async () => await run(['lint:only:eslint', 'coverage']),
    'lint': () => `putout . --raw --rulesdir rules`,
    'prelint': () => `redlint fix`,
    'lint:mark': () => 'putout **/*.md',
    'memory': async () => await run('lint:fresh', '-f memory'),
    'time': async () => await run('lint:fresh', '-f time'),
    'fix:lint': async () => await run('lint', '--fix'),
    'fix:lint:fresh': async () => await run('fix:lint', '--fresh'),
    'fix:lint:cache': async () => await run('lint:cache', '--fix'),
    'bootstrap': () => 'npm install',
    'report': () => 'c8 report --reporter=lcov',
    'prepare': () => 'husky',
    'copy': () => 'node scripts/copy.js',
};

function getDirs(workspaces) {
    const dirs = workspaces.map(cutStar);
    return `{${dirs.join(',')}}`;
}
