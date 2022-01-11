export default {
    'test': () => [env, 'npm test'],
    'test:only': () => 'npm test',
    'coverage': async () => [env, await cutEnv('test')],
    'coverage:only': async () => [env, await run('test:only')],
}
