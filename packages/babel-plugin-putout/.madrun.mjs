import {run} from 'madrun';

export default {
    'test': () => 'tape test/*.js',
    'test:watch': () => run('test', '--watch'),
    'watch:test': async () => `nodemon -w src -w test -x ${await run('test')}`,
    'lint': () => 'putout .',
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => `c8 ${await run('test')}`,
    'report': () => 'c8 report --reporter=lcov',
};
