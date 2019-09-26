'use strict';

module.exports.report = () => `Shorthand properties should be used`;

module.exports.fix = ({path, from, to}) => {
    path.scope.rename(from, to);
    path.node.shorthand = true;
};

module.exports.traverse = ({push}) => {
    return {
        '({__:__})'(path) {
            for (const propPath of path.get('properties')) {
                const {shorthand} = propPath.node;
                
                if (shorthand)
                    continue;
                
                const valuePath = propPath.get('value');
                const keyPath = propPath.get('key');
                
                const from = getName(valuePath);
                const to = getName(keyPath);
                
                if (!to)
                    continue;
                
                const bindingPath = getBinding(propPath, from);
                
                if (!bindingPath)
                    continue;
                
                const {
                    references,
                    path,
                } = bindingPath.scope.bindings[from];
                
                if (path.isObjectPattern() || path.get('id').isObjectPattern())
                    continue;
                
                if (references > 1)
                    continue;
                
                push({
                    path: propPath,
                    from,
                    to,
                });
            }
        },
    };
};

const checkName = (name) => (path) => path.scope.bindings[name];
function getBinding(path, name) {
    return path.findParent(checkName(name));
}

function getName(path) {
    const {node} = path;
    
    if (path.isIdentifier())
        return node.name;
    
    return '';
}

