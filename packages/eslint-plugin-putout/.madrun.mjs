import {run} from 'madrun';

export default {
    'wisdom': () => run(['lint', 'coverage']),
    'test': () => `mocha 'lib/**/*.spec.js'`,
    'watch:test': async () => `nodemon -w rules -x ${await run('test')}`,
    'lint': () => 'putout .',
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => `c8 ${await run('test')}`,
    'debug': () => 'mocha --inspect-brk --inspect=0.0.0.0',
};

