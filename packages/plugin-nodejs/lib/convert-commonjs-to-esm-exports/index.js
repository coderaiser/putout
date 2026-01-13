import {
    types,
    operator,
    template,
} from 'putout';

const {
    exportSpecifier,
    isIdentifier,
    isImportSpecifier,
    exportNamedDeclaration,
    isObjectExpression,
    isStringLiteral,
    isImportDefaultSpecifier,
    exportNamespaceSpecifier,
    isSpreadElement,
    isObjectMethod,
    isFunction,
} = types;

const {replaceWith} = operator;
const createFn = template('export const NAME = (PARAMS) => BODY');

export const report = () => `Use 'ESM' instead of 'CommonJS'`;

export const exclude = () => [
    '__, __',
    '__ && __',
];

export const match = () => ({
    'module.exports = __a': ({__a}) => {
        if (!isObjectExpression(__a))
            return true;
        
        for (const property of __a.properties) {
            if (isSpreadElement(property))
                return false;
        }
        
        return true;
    },
    'module.exports.__a = __b': ({__a, __b}, path) => {
        const {name} = __a;
        
        if (isIdentifier(__a) && /^import|export$/.test(__a.name))
            return false;
        
        if (isIdentifier(__b)) {
            const {name} = __b;
            const binding = path.scope.bindings[name];
            
            if (!binding)
                return false;
        }
        
        if (isIdentifier(__b, {name}))
            return true;
        
        return !path.scope.bindings[__a.name];
    },
});

function createDeclaration(name, value) {
    return `export const ${name} = ${value};`;
}

export const replace = () => ({
    'module.exports = __a': ({__a}, path) => {
        if (!isObjectExpression(__a) || isStringLiteral(__a.properties[0].key))
            return 'export default __a';
        
        const result = ['export {'];
        const declarations = [];
        const programPath = path.scope.getProgramParent().path;
        
        for (const [index, property] of __a.properties.entries()) {
            const {key, value} = property;
            
            if (isObjectMethod(property)) {
                const {params, body} = property;
                
                declareFunction({
                    object: __a,
                    property,
                    index,
                    programPath,
                    params,
                    body,
                });
                continue;
            }
            
            if (isFunction(value)) {
                const {params, body} = property.value;
                
                declareFunction({
                    object: __a,
                    property,
                    index,
                    programPath,
                    params,
                    body,
                });
                continue;
            }
            
            if (!isIdentifier(value)) {
                declarations.push(createDeclaration(key.name, value.value));
                continue;
            }
            
            if (key.name === value.name) {
                result.push(`${key.name},`);
                continue;
            }
            
            result.push(`${key.name} as ${value.name}`);
        }
        
        result.push('};');
        
        if (!declarations.length)
            return result.join('\n');
        
        if (declarations.length === __a.properties.length)
            return `{
                 ${declarations.join('')}
             }`;
        
        return `{
             ${declarations.join('\n')}
             ${result.join('\n')}
         }`;
    },
    'module.exports.__a = __b': ({__a, __b}, path) => {
        const {name} = __a;
        
        if (isIdentifier(__b, {name}))
            return addExportToBinding(__b.name, path);
        
        return 'export const __a = __b';
    },
});

function addExportToBinding(name, path) {
    const {scope} = path;
    const binding = scope.bindings[name];
    const bindingPath = parseBindingPath(binding.path);
    
    if (isImportSpecifier(bindingPath)) {
        const {imported} = bindingPath.node;
        
        return exportNamedDeclaration(null, [exportSpecifier(imported, imported)]);
    }
    
    if (binding.references > 1)
        return '';
    
    if (isImportDefaultSpecifier(bindingPath)) {
        const {local} = bindingPath.node;
        const {source} = bindingPath.parentPath.node;
        const specifiers = [
            exportNamespaceSpecifier(local),
        ];
        
        const exportNode = exportNamedDeclaration(null, specifiers, source);
        
        replaceWith(bindingPath.parentPath, exportNode);
        return '';
    }
    
    const exportNode = exportNamedDeclaration(bindingPath.node);
    
    replaceWith(bindingPath, exportNode);
    
    return '';
}

function parseBindingPath(path) {
    if (path.isVariableDeclarator())
        return path.parentPath;
    
    return path;
}

function declareFunction({index, property, object, params, body, programPath}) {
    const {key} = property;
    const fnNode = createFn({
        NAME: key,
        PARAMS: params,
        BODY: body,
    });
    
    delete object.properties[index];
    programPath.node.body.push(fnNode);
}
