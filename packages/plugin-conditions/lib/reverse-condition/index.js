'use strict';

module.exports.report = () => `Avoid useless '!'`;

module.exports.replace = () => ({
    '!(__a > __b)': '__a <= __b',
});
