import x from 'x';

export const match = {
    '*.d.ts': {
        'no-var': 'off',
    },
    '*.spec.*': {
        'node/no-extraneous-import': 'off',
    },
};
export default [
    ...safeAlign,
    ...matchToFlat(match),
];
