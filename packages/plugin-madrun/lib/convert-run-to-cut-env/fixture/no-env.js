export default {
    'test': () => [env, 'npm test'],
    'coverage': async () => `c8 ${await run('test')}`,
}
