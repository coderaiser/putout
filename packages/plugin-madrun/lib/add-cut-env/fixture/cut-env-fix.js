export default {
    'test': () => [env, cutEnv('test:only')],
    'test:only': () => 'npm test',
}
