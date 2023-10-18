const a = {
    'lint:fresh:only:putout': async () => [eslintOffEnv, await run('lint:memory')]
};
