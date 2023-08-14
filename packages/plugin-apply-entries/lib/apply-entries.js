'use strict';

module.exports.report = () => `Use 'entries()' instead of '.entries()`;

module.exports.replace = () => ({
    '__a.entries()': 'entries(__a)',
});
