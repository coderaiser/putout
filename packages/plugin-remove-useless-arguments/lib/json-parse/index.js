'use strict';

module.exports.report = () => `Avoid useless arguments in 'JSON.parse()'`;

module.exports.replace = () => ({
    'JSON.parse(__a, null, __b)': 'JSON.parse(__a)',
});
