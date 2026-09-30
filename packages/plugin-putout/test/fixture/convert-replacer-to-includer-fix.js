export const fix = () => {};
export const include = () => [
    'const [__a, {__b}] = __c(__d, __e)',
    'const [__a, {__b = {}} = {}] = __c(__d, __e)',
];
