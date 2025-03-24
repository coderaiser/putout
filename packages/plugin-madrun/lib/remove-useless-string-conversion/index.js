export const report = () => `Remove useless String conversion`;

export const replace = () => ({
    '[__a, String(await __b(__args))]': '[__a, await __b(__args)]',
});
