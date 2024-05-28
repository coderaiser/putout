'use strict';

module.exports.report = () => `Avoid duplicate declaration`;

module.exports.replace = () => ({
    'const __a = function __a(__args) {__body}': 'function __a(__args){__body}',
});
