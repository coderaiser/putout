'use strict';

const {
    types,
    operator,
} = require('putout');

const {
    isIdentifier,
    isObjectProperty,
} = types;
const {
    compareAny,
    findBinding,
} = operator;

const getKey = ({key}) => key;

module.exports.report = ({path, name}) => {
    const {key} = path.node;
    const message = `"${key.name}" is useless argument of a function "${name}"`;
    
    return message;
};

module.exports.fix = ({path}) => {
    path.remove();
};

module.exports.traverse = ({push}) => {
    return {
        '__(__object)'(path) {
            const {name} = path.node.callee;
            const [argument] = path.get('arguments');
            const argProps = argument.get('properties')
                .filter(isObjectProperty);
            
            const refPath = findBinding(path, name);
            
            if (!refPath)
                return;
            
            const binding = refPath.scope.bindings[name];
            const params = getParams(binding.path);
            
            if (!params.length)
                return;
            
            const [param] = params;
            
            if (!param.isObjectPattern())
                return;
            
            const {properties} = param.node;
            
            for (const prop of properties) {
                if (!isIdentifier(prop.value))
                    return;
            }
            
            const propKeys = properties
                .map(getKey);
            
            for (const propPath of argProps) {
                const {key} = propPath.node;
                const is = compareAny(key, propKeys);
                
                if (!is)
                    push({
                        name,
                        path: propPath,
                    });
            }
        },
    };
};

function getParams(path) {
    if (path.isFunction())
        return path.get('params');
    
    let fnPath;
    path.traverse({
        Function(path) {
            fnPath = path;
            path.stop();
        },
    });
    
    if (!fnPath)
        return [];
    
    return fnPath.get('params');
}
