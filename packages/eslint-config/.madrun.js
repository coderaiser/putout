import {run, cutEnv} from 'madrun';

const env = {
    SUPERTAPE_TIMEOUT: 7000,
};

export default {
    'lint': () => 'putout .',
    'test': () => [env, 'tape test/*.*'],
    'coverage': async () => [env, `c8 ${await cutEnv('test')}`],
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'prepublishOnly': () => run(['lint', 'coverage']),
};
