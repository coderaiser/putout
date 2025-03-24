import {run, cutEnv} from 'madrun';

const SUPERTAPE_LOAD_LOOP_TIMEOUT = 70;
const MOCHA_TIMEOUT = 20_000;

const env = {
    SUPERTAPE_LOAD_LOOP_TIMEOUT,
    SUPERTAPE_PROGRESS_BAR_MIN: 10,
};

const lintEnv = {
    ESLINT_CONFIG_FILE: 'eslint-safe.config.js',
};

export default {
    'wisdom': () => run(['lint:all', 'coverage']),
    'test': () => [env, `tape 'test/**/*.mjs' 'lib/config/*.spec.*'`],
    'test:all': () => [env, `mocha --timeout ${MOCHA_TIMEOUT} 'test/**/*.mjs' 'lib/putout/*.spec.js' 'lib/**/*.spec.js'`],
    'watch:test': async () => [env, `nodemon -w rules -x "${await cutEnv('test')}"`],
    'lint': () => 'putout .',
    'lint:all': () => run(['lint', 'lint:safe']),
    'lint:safe': () => [lintEnv, 'putout eslint-fixture'],
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => [env, `c8 ${await cutEnv('test:all')}`],
    'debug': () => 'mocha --inspect-brk --inspect=0.0.0.0',
};
