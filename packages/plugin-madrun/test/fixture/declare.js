export default {
    'coverage': async () => [env, `c8 ${await cutEnv('test')}`],
};
