import {run} from 'madrun';

export default {
    'wisdom': () => run(['lint:all', 'coverage']),
    'test': () => 'tape test/*.mjs "lib/config/*.spec.*"',
    'test:all': () => `mocha 'lib/**/*.spec{.js,.mjs}' test/*.mjs`,
    'watch:test': async () => `nodemon -w rules -x ${await run('test')}`,
    'lint': () => 'putout .',
    'lint:all': () => run(['lint', 'lint:safe']),
    'lint:safe': () => 'eslint -c .eslintrc-safe.json eslint-fixture',
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => `c8 ${await run('test:all')}`,
    'debug': () => 'mocha --inspect-brk --inspect=0.0.0.0',
};

