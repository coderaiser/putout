'use strict';

module.exports.report = () => `Avoid empty array used as 'process()' argument`;

module.exports.replace = () => ({
    'await process(__a, [])': 'await process(__a)',
});
