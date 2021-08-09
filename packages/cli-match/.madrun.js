import {
    run,
    cutEnv,
} from 'madrun';

const NODE_OPTIONS = '"--loader mock-import --no-warnings"';

const env = {
    NODE_OPTIONS,
};

export default {
    'test': () => [env, `tape 'lib/*.spec.js'`],
    'watch:test': async () => [env, `nodemon -w lib -x ${await cutEnv('test')}`],
    'lint': () => `putout .`,
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => [env, `c8 ${await cutEnv('test')}`],
    'report': () => 'c8 report --reporter=lcov',
};

