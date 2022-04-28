export default {
    'test': () => [env, 'npm test'],
    'coverage': async () => [env, `c8 ${await cutEnv('test')}`],
}
