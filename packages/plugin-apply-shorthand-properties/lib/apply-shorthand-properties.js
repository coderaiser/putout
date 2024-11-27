import {operator} from 'putout';

const {findBinding, rename} = operator;

export const report = () => `Use shorthand properties`;

export const fix = ({path, from, to, toRename}) => {
    if (toRename)
        rename(path, from, to);
    
    path.node.shorthand = true;
};

export const traverse = ({push, options}) => ({
    '__object'(path) {
        for (const propPath of path.get('properties')) {
            const {shorthand} = propPath.node;
            
            if (shorthand)
                continue;
            
            const valuePath = propPath.get('value');
            const keyPath = propPath.get('key');
            
            const {rename, ignore = []} = options;
            
            const from = getName(valuePath);
            const to = getName(keyPath);
            
            if (!to)
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
    
    return '';
}
