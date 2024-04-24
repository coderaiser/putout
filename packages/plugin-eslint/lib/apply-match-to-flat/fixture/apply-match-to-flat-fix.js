import x from 'x';

const config = matchToFlat({
    '*.d.ts': {
        'no-var': 'off',
    },
    '*.spec.*': {
        'node/no-extraneous-import': 'off',
    },
});

export default [
    ...safeAlign,
    ...config,
];
