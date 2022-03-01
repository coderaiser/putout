export default {
    'test': () => [env, 'test:only'],
    'test:only': () => 'npm test',
}
