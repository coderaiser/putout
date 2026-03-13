import {operator, types} from 'putout';

const {
    isImportDeclaration,
    variableDeclaration,
    variableDeclarator,
    objectPattern,
    objectProperty,
    isImportNamespaceSpecifier,
} = types;

const {
    replaceWith,
    rename,
    remove,
} = operator;

export const report = ({path}) => {
    const {value} = path.node.source;
    return `Avoid 'imports' with duplicate 'source': '${value}'`;
};

export const fix = ({path, original}) => {
    const {specifiers} = path.node;
    const originalSpecifiers = original.node.specifiers;
    
    if (!originalSpecifiers.length) {
        remove(original);
        return;
    }
    
    const [firstOriginal] = originalSpecifiers;
    const [first] = specifiers;
    
    if (isImportNamespaceSpecifier(first) && firstOriginal.type === first.type) {
        const {name} = first.local;
        const originalName = firstOriginal.local.name;
        
        rename(path, name, originalName);
        remove(path);
        
        return;
    }
    
    if (isImportNamespaceSpecifier(first)) {
        convertImportToVariable(first.local, original);
        return;
    }
    
    if (isImportNamespaceSpecifier(firstOriginal)) {
        convertImportToVariable(firstOriginal.local, path);
        return;
    }
};

function convertImportToVariable(init, original) {
    const properties = [];
    
    for (const {local, imported} of original.node.specifiers) {
        properties.push(objectProperty(local, imported));
    }
    
    const id = objectPattern(properties);
    const declaration = variableDeclarator(id, init);
    const variable = variableDeclaration('const', [declaration]);
    
    replaceWith(original, variable);
}

export const traverse = ({push}) => ({
    Program(path) {
        const imports = path.get('body').filter(isImportDeclaration);
        const sources = new Map();
        
        for (const element of imports) {
            const {value} = element.node.source;
            
            if (!sources.has(value)) {
                sources.set(value, element);
                continue;
            }
            
            const original = sources.get(value);
            
            push({
                path: element,
                original,
            });
        }
    },
});
