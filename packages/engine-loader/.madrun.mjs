import {
    run,
    cutEnv,
} from 'madrun';

const env = {
    NODE_OPTIONS: '"--no-deprecation"',
};

export default {
    'test': () => [env, `tape test/*.js 'lib/**/*.spec.js'`],
    'watch:test': async () => `nodemon -w lib -w test -x ${await run('test')}`,
    'lint': () => `putout .`,
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => [env, `c8 ${await cutEnv('test')}`],
    'report': () => 'c8 report --reporter=lcov',
};

