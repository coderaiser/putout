'use strict';

const {operator, types} = require('putout');

const {isIdentifier} = types;
const {compare, remove} = operator;

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
    [FROM]: ({__b}, path) => {
        if (!isIdentifier(__b))
            return;
        
        const nextNode = path.getNextSibling();
        
        return compare(nextNode, `return ${__b.name}`);
    },
});

module.exports.replace = () => ({
    [FROM]: (vars, path) => {
        remove(path.getNextSibling());
        
        return TO;
    },
});
