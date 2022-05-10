import {run} from 'madrun';

export default {
    'lint': () => 'putout .',
    'test': () => 'tape test/*.mjs',
    'coverage': async () => `c8 ${await run('test')}`,
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'prepublishOnly': () => run(['lint', 'coverage']),
};

