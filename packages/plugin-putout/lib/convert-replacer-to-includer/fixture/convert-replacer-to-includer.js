export const replace = () => ({
    'const [__a, {__b}] = __c(__d, __e)': 'const [__a, {__b}] = __c(__d, __e)',
    'const [__a, {__b = {}} = {}] = __c(__d, __e)': 'const [__a, {__b = {}} = {}] = __c(__d, __e)',
});
