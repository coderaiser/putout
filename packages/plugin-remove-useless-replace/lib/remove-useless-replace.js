'use strict';

module.exports.report = () => `Avoid useless 'replace()'`;

module.exports.replace = () => ({
    '__a.replace(__b, __b)': '__a',
});

