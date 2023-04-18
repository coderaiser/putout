'use strict';

module.exports.report = () => `Use 'maybeFn()'`;

module.exports.exclude = () => [
    'const maybeFn = isFn(__a) ? __a : noop',
    'const maybeFn = __',
];

module.exports.replace = () => ({
    'isFn(__a) ? __a : noop': 'maybeFn(__a)',
});
