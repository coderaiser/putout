'use strict';

const {types} = require('putout');

const {isObjectPattern} = types;

module.exports.report = () => 'ESM should be used insted of Commonjs';

const __b = 'declarations.0.init.arguments.0';

module.exports.filter = (path) => {
    return path.get(__b).isStringLiteral();
};

module.exports.replace = () => ({
    'const __a = require("__b")': ({__a, __b}) => {
        let {value} = __b;
        
        if (value.includes('./') && !/\.js(on)?$/.test(value))
            value += '.js';
        
        const isJSON = /\.json$/.test(value);
        const assertion = !isJSON ? '' : 'assert { type: "json" }';
        
        if (isObjectPattern(__a)) {
            const imports = [];
            
            for (const {key, value} of __a.properties) {
                imports.push(`${key.name} as ${value.name}`);
            }
            
            const importsStr = imports.join(',');
            
            return `import {${importsStr}} from "${value}" ${assertion}`;
        }
        
        return `import __a from "${value}" ${assertion}`;
    },
});
