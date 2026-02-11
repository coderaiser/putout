export default {
    'test': () => `tape 'lib/*.js'`,
    'coverage': async () => `c8 ${await run('test')}`,
};
