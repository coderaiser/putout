'use strict';

const {types} = require('putout');

const {
    isStringLiteral,
    isIdentifier,
    isObjectPattern,
} = types;

module.exports.report = () => 'ESM should be used insted of Commonjs';

module.exports.replace = () => ({
    'const __a = require("__b")': ({__a, __b}, skip) => {
        if (!isStringLiteral(__b))
            return skip;
        
        let {value} = __b;
        
        if (value.includes('./'))
            value += '.js';
        
        if (isIdentifier(__a))
            return `import ${__a.name} from "${value}"`;
        
        if (isObjectPattern(__a)) {
            const imports = [];
            
            for (const {key, value} of __a.properties) {
                imports.push(`${key.name} as ${value.name}`);
            }
            
            const importsStr = imports.join(',');
            
            return `import {${importsStr}} from "${value}"`;
        }
        
        return skip;
    },
});
