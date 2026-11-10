import {run, cutEnv} from 'madrun';

const env = {
    PUTOUT_INSTRUMENT: 1,
};

export default {
    'wisdom': () => run(['lint', 'coverage']),
    'test': () => [env, `tape 'lib/**/*.spec.js' test/*.js`],
    'watch:test': async () => [env, `nodemon -w lib -w test -x "${await cutEnv('test')}"`],
    'lint': () => `putout .`,
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => [env, `c8 ${await cutEnv('test')}`],
    'coverage:html': async () => [env, `c8 --reporter=lcov ${await cutEnv('test')}`],
    'report': () => 'c8 report --reporter=lcov',
};
