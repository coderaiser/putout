'use strict';

const {operator} = require('putout');
const {getTemplateValues} = operator;
const FN = 'const __a = function __a(__args) {__body}';

module.exports.report = (path) => {
    const {__a} = getTemplateValues(path, FN);
    return `Avoid duplicate declaration of '${__a.name}'`;
};

module.exports.replace = () => ({
    'const __a = function __a(__args) {__body}': 'function __a(__args){__body}',
});
