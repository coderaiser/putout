import justCamelCase from 'just-camel-case';
import {
    types,
    operator,
    template,
} from 'putout';

const {
    awaitExpression,
    identifier,
    importDeclaration,
    isFunction,
    isObjectPattern,
    isArrayPattern,
    isIdentifier,
    isStringLiteral,
    importDefaultSpecifier,
    isProgram,
    isExportNamedDeclaration,
} = types;

const {
    replaceWith,
    insertBefore,
    getBinding,
} = operator;

const camelCase = (a) => justCamelCase(a.replace('@', ''));

export const report = () => `Use 'ESM' instead of 'CommonJS'`;

const __B = 'declarations.0.init.arguments.0';

const createImport = ({name, source}) => {
    const specifiers = [
        importDefaultSpecifier(name),
    ];
    
    return importDeclaration(specifiers, source);
};

const createFnDeclaration = template('const NAME1 = FN(NAME2)');

export const match = () => ({
    'require.resolve(__a)': (vars, path) => !getBinding(path, 'require'),
    'export const __a = require("__b")': ({__a}, path) => {
        if (!isIdentifier(__a))
            return true;
        
        return path.scope.bindings[__a.name].references === 1;
    },
    'const __a = require("__b").default': (vars, path) => {
        if (isProgram(path.parentPath))
            return true;
        
        return isProgram(path.parentPath.parentPath);
    },
    'const __a = require(__b)': (vars, path) => {
        if (isExportNamedDeclaration(path.parentPath))
            return false;
        
        if (getBinding(path, 'require'))
            return false;
        
        const __bPath = path.get(__B);
        
        const {confident, value} = __bPath.evaluate();
        
        return value && confident;
    },
    'require("__a")': (vars, path) => Boolean(path.parentPath.parentPath.isProgram()),
    'const __a = __b(require(__c))': ({__a, __c}) => {
        return isIdentifier(__a) && isStringLiteral(__c);
    },
    'const __a = require("__b")(__args)': checkCall,
    'const __a = require("__b").__c(__args)': checkCall,
});

export const replace = () => ({
    'require.resolve(__a)': 'fileURLToPath(import.meta.resolve(__a))',
    'const __a = require("__b").default': 'import __a from "__b"',
    'const __a = require(__b).__c': ({__a, __c}, path) => {
        const {name} = __c;
        const binding = path.scope.bindings[name];
        
        if (binding && isIdentifier(__a))
            return 'import {__c as __a} from "__b"';
        
        if (binding && isObjectPattern(__a))
            return 'const __a = __c';
        
        return `{
            const {__c} = require(__b);
            const __a = __c;
        }`;
    },
    'const __a = require(".")': 'import __a from "./index.js"',
    'require("__a")': 'import "__a"',
    'const __a = require(__b)': ({__a}, path) => {
        const {value} = path.get(__B).evaluate();
        const fnPath = path.findParent(isFunction);
        
        if (fnPath) {
            fnPath.node.async = true;
            return applyDynamicImport(path);
        }
        
        const isJSON = value.endsWith('.json');
        const assertion = !isJSON ? '' : 'with { type: "json" }';
        
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
            name: identifier(name),
            source: __c,
        });
        
        const declarationNode = createFnDeclaration({
            NAME1: __a,
            FN: __b,
            NAME2: identifier(name),
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
    'require("__b").__c(__args).__d(__args)': ({__b}) => {
        const name = camelCase(__b.value);
        
        return `{
            import ${name} from "__b";
            ${name}.__c(__args).__d(__args);
        }`;
    },
    'export const __a = require("__b")': ({__a}) => {
        if (isObjectPattern(__a))
            return 'export __a from "__b"';
        
        return 'export * as __a from "__b"';
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
    replaceWith(initPath, awaitExpression(node));
    
    return path;
}
