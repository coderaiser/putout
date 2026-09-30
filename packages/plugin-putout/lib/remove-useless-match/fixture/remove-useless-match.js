export const match = () => ({
    'const [__a, {__b}] = __c(__d, __e)': () => true,
    'const [__a, {__b = {}} = {}] = __c(__d, __e)': () => true,
});
