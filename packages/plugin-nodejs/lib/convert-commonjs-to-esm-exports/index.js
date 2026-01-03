import {types, operator} from 'putout';

const {
    exportSpecifier,
    isIdentifier,
    isImportSpecifier,
    exportNamedDeclaration,
    isObjectExpression,
    isStringLiteral,
    isImportDefaultSpecifier,
    exportNamespaceSpecifier,
} = types;

const {replaceWith} = operator;

export const report = () => `Use 'ESM' instead of 'CommonJS'`;

export const exclude = () => [
    '__, __',
    '__ && __',
];

export const match = () => ({
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
    'module.exports = __a': ({__a}) => {
        if (!isObjectExpression(__a) || isStringLiteral(__a.properties[0].key))
            return 'export default __a';
        
        const result = ['export {'];
        const declarations = [];
        
        for (const {key, value} of __a.properties) {
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
