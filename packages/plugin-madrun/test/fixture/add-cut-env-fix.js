const {
    run
} = require('madrun');

export default {
    'test': async () => [env, await run('test:only')],
    'test:only': () => 'npm test',
}
