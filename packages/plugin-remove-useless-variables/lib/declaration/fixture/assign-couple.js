const match = {
    '*.md{js}': {
        'n/no-deprecated-api': 'off',
    },
};

module.exports = [
    ...safeAlign,
    ...matchToFlat(match),
];

module.exports.match = match;
