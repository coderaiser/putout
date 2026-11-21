import {run, cutEnv} from 'madrun';

const env = {
    PUTOUT_INSTRUMENT: 1,
};

export default {
    'wisdom': () => run(['lint', 'coverage']),
    'test': () => [env, `putout-test 'test/*.js' 'lib/**/*.spec.js'`],
    'watch:test': async () => [env, `nodemon -w lib -x "${await cutEnv('test')}"`],
    'lint': () => 'putout .',
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => [env, `c8 ${await cutEnv('test')}`],
    'report': () => 'c8 report --reporter=lcov',
};
