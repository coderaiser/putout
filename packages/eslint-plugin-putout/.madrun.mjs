import {
    run,
    cutEnv,
} from 'madrun';

const env = {
    ESLINT_CONFIG_FILE: '.eslintrc-test.json',
};

export default {
    'wisdom': () => run(['lint:all', 'coverage']),
    'test': () => [env, 'tape test/*.mjs'],
    'test:all': () => [env, `mocha 'lib/**/*.spec.js' test/*.mjs`],
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

