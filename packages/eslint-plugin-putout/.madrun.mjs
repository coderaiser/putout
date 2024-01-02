import {
    run,
    cutEnv,
} from 'madrun';

const SUPERTAPE_LOAD_LOOP_TIMEOUT = 70;
const env = {
    SUPERTAPE_LOAD_LOOP_TIMEOUT,
    ESLINT_MOCHA_TIMEOUT: 20_000,
};

export default {
    'wisdom': () => run(['lint:all', 'coverage']),
    'test': () => `tape 'test/**/*.mjs' 'lib/config/*.spec.*'`,
    'test:all': () => [env, `mocha 'test/**/*.mjs'  'lib/putout/*.spec.js' 'lib/**/*.spec.js'`],
    'watch:test': async () => `nodemon -w rules -x ${await run('test')}`,
    'lint': () => 'putout .',
    'lint:all': () => run(['lint', 'lint:safe']),
    'lint:safe': () => 'eslint -c .eslintrc-safe.json eslint-fixture',
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => [env, `c8 ${await cutEnv('test:all')}`],
    'debug': () => 'mocha --inspect-brk --inspect=0.0.0.0',
};
