'use strict';

const {
    types,
    operate,
} = require('putout');

const {isIdentifier} = types;
const {compareAny} = operate;

const isBind = (name) => (path) => path.scope.bindings[name];
const getKey = ({key}) => key;
const getKeyName = (a) => a.node.key.name;

module.exports.report = ({path, name}) => {
    const {key} = path.node;
    const message = `"${key.name}\" is useless argument of a function "${name}"`;
    
    return message;
};

module.exports.fix = ({path}) => {
    path.remove();
};

module.exports.exclude = () => [
    '__.__()',
];

module.exports.traverse = ({push}) => {
    return {
        '__({})'(path) {
            const {name} = path.node.callee;
            const [argument] = path.get('arguments');
            const argProps = argument.get('properties');
            
            const refPath = path.findParent(isBind(name));
            
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
            
            const propKeys = properties.map(getKey);
            const propsToRemove = [];
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
