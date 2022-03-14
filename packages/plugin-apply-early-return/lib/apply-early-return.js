'use strict';

const {operator} = require('putout');
const {compare} = operator;

module.exports.report = () => `Apply early return`;

const FROM = `
    if (__a)
        __b = __c;
    else
        __b = __e;
`;

const TO = `{
    if (__a)
        return __c;
    
    return __e;
}`;

module.exports.match = () => ({
    [FROM]({__b}, path) {
        const nextNode = path.getNextSibling();
        return compare(nextNode, `return ${__b.name}`);
    },
});

module.exports.replace = () => ({
    [FROM]: (vars, path) => {
        path.getNextSibling().remove();
        return TO;
    },
});

