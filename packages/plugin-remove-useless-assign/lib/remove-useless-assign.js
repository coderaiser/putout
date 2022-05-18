'use strict';

module.exports.report = () => `Avoid useless 'Object.assign()'`;

module.exports.replace = () => ({
    'Object.assign(__a)': '__a',
    'Object.assign(__a, {})': '__a',
    'assign(__a)': '__a',
    'assign(__a, {})': '__a',
});

