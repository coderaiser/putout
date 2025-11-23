import {types, operator} from 'putout';

const {
    findBinding,
    rename,
    replaceWith,
} = operator;

const {
    isImportSpecifier,
    identifier,
} = types;

export const report = () => `Use shorthand properties`;

export const fix = ({path, from, to, toRename}) => {
    if (isImportSpecifier(path)) {
        path.node.imported = path.node.local;
        return;
    }
    
    if (toRename)
        rename(path, from, to);
    
    path.node.shorthand = true;
    
    const keyPath = path.get('key');
    
    if (keyPath.isStringLiteral()) {
        replaceWith(keyPath, identifier(keyPath.node.value));
        path.node.computed = false;
    }
};

export const traverse = ({push, options}) => ({
    ImportSpecifier(path) {
        if (path.node.imported.value === path.node.local.name)
            push({
                path,
            });
    },
    '__object'(path) {
        for (const propPath of path.get('properties')) {
            const {computed, shorthand} = propPath.node;
            
            if (shorthand)
                continue;
            
            const valuePath = propPath.get('value');
            const keyPath = propPath.get('key');
            
            if (computed && !keyPath.isStringLiteral())
                continue;
            
            if (!computed && keyPath.isStringLiteral())
                continue;
            
            const {rename, ignore = []} = options;
            
            const from = getName(valuePath);
            const to = getName(keyPath);
            
            if (!from)
                continue;
            
            if (ignore.includes(from))
                continue;
            
            if (/^[A-Z].+$/.test(from))
                continue;
            
            if (!rename) {
                if (from === to)
                    push({
                        path: propPath,
                        from,
                        to,
                    });
                
                continue;
            }
            
            const bindingFrom = findBinding(propPath, from);
            const bindingTo = findBinding(propPath, to);
            
            if (bindingTo || !bindingFrom)
                continue;
            
            const {references, path} = bindingFrom;
            
            if (path.isImportDefaultSpecifier() || path.isImportSpecifier() || path.isObjectPattern() || path.get('id').isObjectPattern())
                continue;
            
            if (references > 1)
                continue;
            
            push({
                path: propPath,
                from,
                to,
                toRename: true,
            });
        }
    },
});

function getName(path) {
    const {node} = path;
    
    if (path.isIdentifier())
        return node.name;
    
    if (path.isStringLiteral())
        return node.value;
    
    return '';
}
