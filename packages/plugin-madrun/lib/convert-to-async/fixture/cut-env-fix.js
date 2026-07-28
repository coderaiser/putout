import {run, cutEnv} from 'madrun';

const env = {
    NODE_OPTIONS: `"--no-experimental-webstorage"`,
};

export default {
    'test': () => [env, 'vitest'],
    'coverage': async () => [env, await cutEnv('test', 'run --coverage')],
    'async:coverage': async () => [env, await cutEnv('test', 'run --coverage')],
};
