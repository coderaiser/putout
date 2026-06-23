import {run} from 'madrun';

const env = {
    SUPERC8_RESPONSIVE: 1,
};

export default {
    'test': () => `tape 'test/*.js' 'lib/**/*.spec.js' 'rules/**/*.spec.js'`,
    'watch:test': async () => `nodemon -w lib -w test -x "${await run('test')}"`,
    'lint': () => `putout . --rulesdir transforms`,
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => [env, `c8 ${await run('test')}`],
    'report': () => 'c8 report --reporter=lcov',
};
