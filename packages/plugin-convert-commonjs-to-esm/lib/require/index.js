'use strict';

const {
    types,
    operator,
} = require('putout');

const {replaceWith} = operator;

const {
    isFunction,
    isObjectPattern,
    AwaitExpression,
} = types;

module.exports.report = () => 'ESM should be used insted of Commonjs';

const __b = 'declarations.0.init.arguments.0';

module.exports.filter = (path) => {
    return path.get(__b).isStringLiteral();
};

module.exports.replace = () => ({
    'const __a = require("__b")': ({__a, __b}, path) => {
        let {value} = __b;
        
        if (value.includes('./') && !/\.js(on)?$/.test(value))
            value += '.js';
        
        const isJSON = /\.json$/.test(value);
        const assertion = !isJSON ? '' : 'assert { type: "json" }';
        
        const fnPath = path.findParent(isFunction);
        
        if (fnPath) {
            fnPath.node.async = true;
            return applyDynamicImport(path);
        }
        
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

function applyDynamicImport(path) {
    const initPath = path.get('declarations.0.init');
    const {node} = initPath;
    
    initPath.node.callee.name = 'import';
    replaceWith(initPath, AwaitExpression(node));
    
    return path;
}

