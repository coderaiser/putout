'use strict';

const camelCase = require('just-camel-case');
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

const createFnDeclaration = template('const NAME1 = FN(NAME2)');
const createDeclaration = template('const NAME1 = NAME2.default');
const isPackage = ({value}) => /package(\.json)?$/.test(value);

module.exports.match = () => ({
    'const __a = require(__b)': ({__b}, path) => {
        if (path.scope.getBinding('require'))
            return false;
        
        const __bPath = path.get(__B);
        const {confident, value} = __bPath.evaluate();
        
        if (isPackage(__b))
            return false;
        
        return value && confident;
    },
    'require("__a")': (vars, path) => {
        if (!path.parentPath.parentPath.isProgram())
            return false;
        
        return true;
    },
    'const __a = __b(require(__c))': ({__a, __c}) => {
        return isIdentifier(__a) && isStringLiteral(__c);
    },
    'const __a = require("__b")(__args)': ({__b}, path) => {
        const name = camelCase(__b.value);
        return !path.scope.bindings[name];
    },
    'const __a = require("__b").__c(__args)': ({__b}, path) => {
        const name = camelCase(__b.value);
        return !path.scope.bindings[name];
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
        const declarationNode = createFnDeclaration({
            NAME1: __a,
            FN: __b,
            NAME2: Identifier(name),
        });
        
        path.insertBefore([
            importNode,
        ]);
        
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
    'const __a = require(__b).default': ({__a, __b}, path) => {
        const name = `_${__a.name}`;
        const importNode = createImport({
            name: Identifier(name),
            source: __b,
        });
        const declarationNode = createDeclaration({
            NAME1: __a,
            NAME2: Identifier(name),
        });
        
        path.insertBefore([
            importNode,
        ]);
        
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

