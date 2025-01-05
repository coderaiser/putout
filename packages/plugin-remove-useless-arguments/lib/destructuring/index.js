'use strict';

const {types, operator} = require('putout');

const {
    isIdentifier,
    isObjectProperty,
} = types;

const {findBinding, remove} = operator;

const getKey = ({key}) => key;

module.exports.report = ({path, name}) => {
    const {key} = path.node;
    
    return `Avoid useless argument '${key.name}' of a function '${name}()'`;
};

module.exports.fix = ({path}) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    '__(__object)': processUseless({
        push,
        index: 0,
    }),
    '__(__, __object)': processUseless({
        push,
        index: 1,
    }),
});

const processUseless = ({push, index}) => (path) => {
    const {
        is,
        name,
        argProps,
        param,
    } = getUseless({
        path,
        index,
    });
    
    if (!is)
        return;
    
    removeUseless({
        push,
        name,
        param,
        argProps,
    });
};

function getUseless({path, index}) {
    const NOT_OK = {
        is: false,
    };
    
    const {name} = path.node.callee;
    
    const argument = path.get('arguments').at(index);
    
    const argProps = argument.get('properties').filter(isObjectProperty);
    
    const refPath = findBinding(path, name);
    
    if (!refPath)
        return NOT_OK;
    
    const binding = refPath.scope.bindings[name];
    const params = getParams(binding.path);
    
    if (!params.length)
        return NOT_OK;
    
    if (params.length <= index)
        return NOT_OK;
    
    const param = params.at(index);
    
    return {
        is: true,
        name,
        param,
        argProps,
    };
}

function removeUseless({push, name, param, argProps}) {
    if (!param.isObjectPattern())
        return;
    
    const {properties} = param.node;
    
    for (const prop of properties) {
        if (!isIdentifier(prop.value))
            return;
    }
    
    const propKeys = properties.map(getKey);
    
    for (const propPath of argProps) {
        let is = false;
        
        const {key} = propPath.node;
        
        for (const {name} of propKeys) {
            if (name === key.name) {
                is = true;
                break;
            }
        }
        
        if (!is)
            push({
                name,
                path: propPath,
            });
    }
}

function getParams(path) {
    if (path.isFunction())
        return path.get('params');
    
    const fnPath = path.get('init');
    
    if (!fnPath.isFunction())
        return [];
    
    return fnPath.get('params');
}
