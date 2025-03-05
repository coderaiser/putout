export default {
    'coverage': async () => `c8 ${await run('test')}`,
};
