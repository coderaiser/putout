export const replace = () => ({
    ...convert('run(__args)'),
    ...convert('cutEnv(__args)'),
});
