module.exports.match = {
    'bin/**': {
        'no-process-exit': 'off',
    },
};

module.exports = [
    ...safeAlign, {
        'rules': {
            'node/no-unsupported-features/node-builtins': 'off',
        },
    },
    ...matchToFlat(match),
];