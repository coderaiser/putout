'use strict';

const justCamelCase = require('just-camel-case');

const {
    types,
    operator,
    template,
} = require('putout');

const {replaceWith, insertBefore} = operator;

const {
    isFunction,
    isObjectPattern,
    isArrayPattern,
    isIdentifier,
    isStringLiteral,
    AwaitExpression,
    ImportDeclaration,
    ImportDefaultSpecifier,
    Identifier,
} = types;

const camelCase = (a) => justCamelCase(a.replace('@', ''));

module.exports.report = () => `Use 'ESM' instead of 'CommonJS'`;

const __B = 'declarations.0.init.arguments.0';

const createImport = ({name, source}) => {
    const specifiers = [
        ImportDefaultSpecifier(name),
    ];
    
    return ImportDeclaration(specifiers, source);
};

const createFnDeclaration = template('const NAME1 = FN(NAME2)');
const isPackage = ({value}) => /package(\.json)?$/.test(value);

module.exports.match = () => ({
    'const __a = require(__b)': ({__b}, path) => {
        // exclude jsons while not supported
        if (/\.json/.test(__b.value))
            return false;
        
        if (path.scope.getBinding('require'))
            return false;
        
        const __bPath = path.get(__B);
        
        const {confident, value} = __bPath.evaluate();
        
        if (isPackage(__b))
            return false;
        
        return value && confident;
    },
    'require("__a")': (vars, path) => Boolean(path.parentPath.parentPath.isProgram()),
    'const __a = __b(require(__c))': ({__a, __c}) => {
        return isIdentifier(__a) && isStringLiteral(__c);
    },
    'const __a = require("__b")(__args)': checkCall,
    'const __a = require("__b").__c(__args)': checkCall,
});

module.exports.replace = () => ({
    'const __a = require(".")': 'import __a from "./index.js"',
    'const __a = require(__b).default': 'import __a from "__b"',
    'const __a = require(__b).__c': `{
        const {__c} = require(__b);
        const __a = __c;
    }`,
    'require("__a")': 'import("__a")',
    'const __a = require(__b)': ({__a}, path) => {
        let {value} = path.get(__B).evaluate();
        
        if (value.includes('./') && !/\.m?js(on)?$/.test(value) && !value.endsWith('..'))
            value += '.js';
        
        const fnPath = path.findParent(isFunction);
        
        if (fnPath) {
            fnPath.node.async = true;
            return applyDynamicImport(path);
        }
        
        // disabled while not supported
        // https://babeljs.io/blog/2023/05/26/7.22.0#import-attributes-15536-15620
        //
        // const isJSON = /\.json$/.test(value);
        // const assertion = !isJSON ? '' : 'with { type: "json" }';
        const assertion = '';
        
        if (isObjectPattern(__a)) {
            const imports = [];
            
            for (const {key, value} of __a.properties)
                imports.push(`${key.name} as ${value.name}`);
            
            const importsStr = imports.join(',');
            
            return `import {${importsStr}} from "${value}" ${assertion}`;
        }
        
        if (isArrayPattern(__a)) {
            const imports = [];
            
            for (const [index, value] of __a.elements.entries()) {
                if (!value)
                    continue;
                
                imports.push(`'${index}' as ${value.name}`);
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
        
        const declarationNode = createFnDeclaration({
            NAME1: __a,
            FN: __b,
            NAME2: Identifier(name),
        });
        
        insertBefore(path, [importNode]);
        
        return declarationNode;
    },
    'const __a = require("__b")(__args)': ({__b}) => {
        const name = camelCase(__b.value);
        
        return `{
            import ${name} from "__b";
            const __a = ${name}(__args);
        }`;
    },
    'const __a = require("__b").__c(__args)': ({__b}) => {
        const name = camelCase(__b.value);
        
        return `{
            import ${name} from "__b";
            const __a = ${name}.__c(__args);
        }`;
    },
});

function checkCall({__b}, path) {
    const name = camelCase(__b.value);
    
    if (!name)
        return false;
    
    return !path.scope.bindings[name];
}

function applyDynamicImport(path) {
    const initPath = path.get('declarations.0.init');
    const {node} = initPath;
    
    initPath.node.callee.name = 'import';
    replaceWith(initPath, AwaitExpression(node));
    
    return path;
}
