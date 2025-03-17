'use strict';

const {operator} = require('putout');
const {compare} = operator;
const TYPES = {
    noReport: 'noReportWithOptions',
    report: 'noReport',
    noReportWithOptions: 'noReport',
};

module.exports.report = (path) => {
    const {name} = path.node.callee.property;
    
    if (compare(path, 't.noReport(__a, "__b")'))
        return `Use 't.noReport(__a)' instead of 't.noReport(__a, __b)'`;
    
    if (compare(path, 't.noReportWithOptions(__a, __b, __c)'))
        return `Use 't.noReportWithOptions(__a, __c)' instead of 't.noReportWithOptions(__a, __b, __c)'`;
    
    return `Use 't.${TYPES[name]}()' instead of 't.${name}()'`;
};

module.exports.replace = () => ({
    't.noReport(__a, __object)': 't.noReportWithOptions(__a, __object)',
    't.noReport(__a, __b)': 't.noReport(__a)',
    't.report(__a)': 't.noReport(__a)',
    't.noReportWithOptions(__a)': 't.noReport(__a)',
    't.noReportWithOptions(__a, __b, __c)': 't.noReportWithOptions(__a, __c)',
});
