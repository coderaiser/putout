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

const __B = 'declarations.0.init.arguments.0';

module.exports.match = () => ({
    'const __a = require(__b)': (vars, path) => {
        const bindings = path.scope.getAllBindings();
        
        if (bindings.require)
            return false;
        
        const __bPath = path.get(__B);
        return __bPath.evaluate().confident;
    },
    'require("__a")': (vars, path) => {
        return path.parentPath.parentPath.isProgram();
    },
});

module.exports.replace = () => ({
    'require("__a")': 'import("__a")',
    'const __a = require(__b)': ({__a}, path) => {
        let {value} = path.get(__B).evaluate();
        
        if (value.includes('./') && !/\.js(on)?$/.test(value))
            value += '.js';
        
        const isJSON = /\.json$/.test(value);
        const fnPath = path.findParent(isFunction);
        
        if (fnPath) {
            fnPath.node.async = true;
            return applyDynamicImport(path);
        }
        
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

function applyDynamicImport(path) {
    const initPath = path.get('declarations.0.init');
    const {node} = initPath;
    
    initPath.node.callee.name = 'import';
    replaceWith(initPath, AwaitExpression(node));
    
    return path;
}

