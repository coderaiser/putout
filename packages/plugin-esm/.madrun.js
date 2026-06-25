import {run} from 'madrun';

const env = {
    SUPERC8_RESPONSIVE: 1,
};

export default {
    'wisdom': () => run(['lint', 'test']),
    'test': () => `tape 'test/*.js' 'lib/**/*.spec.js'`,
    'watch:test': async () => `nodemon -w lib -x "${await run('test')}"`,
    'lint': () => 'putout .',
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => [env, `c8 ${await run('test')}`],
    'report': () => 'c8 report --reporter=lcov',
};
