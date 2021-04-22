'use strict';

const {
    types,
    operator,
    template,
} = require('putout');

const {replaceWith} = operator;

const {
    isFunction,
    isObjectPattern,
    isIdentifier,
    isStringLiteral,
    AwaitExpression,
    ImportDeclaration,
    ImportDefaultSpecifier,
    Identifier,
} = types;

module.exports.report = () => 'ESM should be used insted of Commonjs';

const __B = 'declarations.0.init.arguments.0';

const createImport = ({name, source}) => {
    const specifiers = [
        ImportDefaultSpecifier(name),
    ];
    
    return ImportDeclaration(specifiers, source);
};

const createDeclaration = template('const NAME1 = FN(NAME2)');

module.exports.match = () => ({
    'const __a = require(__b)': (vars, path) => {
        if (path.scope.getBinding('require'))
            return false;
        
        const __bPath = path.get(__B);
        return __bPath.evaluate().confident;
    },
    'require("__a")': (vars, path) => {
        return path.parentPath.parentPath.isProgram();
    },
    'const __a = __b(require(__c))': ({__a, __c}) => {
        return isIdentifier(__a) && isStringLiteral(__c);
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
    'const __a = __b(require(__c))': ({__a, __b, __c}, path) => {
        const name = `_${__a.name}`;
        const importNode = createImport({
            name: Identifier(name),
            source: __c,
        });
        const declarationNode = createDeclaration({
            NAME1: __a,
            FN: __b,
            NAME2: Identifier(name),
        });
        
        path.insertBefore([
            importNode,
        ]);
        
        /*
        return BlockStatement([
            importNode,
            declarationNode,
        ]);
        */
        
        return declarationNode;
    },
});

function applyDynamicImport(path) {
    const initPath = path.get('declarations.0.init');
    const {node} = initPath;
    
    initPath.node.callee.name = 'import';
    replaceWith(initPath, AwaitExpression(node));
    
    return path;
}

