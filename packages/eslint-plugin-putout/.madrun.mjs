import {
    run,
    cutEnv,
} from 'madrun';

const SUPERTAPE_LOAD_LOOP_TIMEOUT = 70;
const MOCHA_TIMEOUT = 20_000;
const env = {
    SUPERTAPE_LOAD_LOOP_TIMEOUT,
};

const lintEnv = {
    ESLINT_CONFIG_FILE: '.eslintrc-safe.json',
};

export default {
    'wisdom': () => run(['lint:all', 'coverage']),
    'test': () => `tape 'test/**/*.mjs' 'lib/config/*.spec.*'`,
    'test:all': () => [env, `mocha --timeout ${MOCHA_TIMEOUT} 'test/**/*.mjs'  'lib/putout/*.spec.js' 'lib/**/*.spec.js'`],
    'watch:test': async () => `nodemon -w rules -x ${await run('test')}`,
    'lint': () => 'putout .',
    'lint:all': () => run(['lint', 'lint:safe']),
    'lint:safe': () => [lintEnv, 'putout eslint-fixture'],
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => [env, `c8 ${await cutEnv('test:all')}`],
    'debug': () => 'mocha --inspect-brk --inspect=0.0.0.0',
};
