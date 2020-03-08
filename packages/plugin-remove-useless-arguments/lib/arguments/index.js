'use strict';

const {findBinding} = require('putout').operator;

module.exports.report = (path) => `Argument "${path.node.name}" is useless`;

module.exports.fix = (path) => {
    path.remove();
};

module.exports.traverse = ({push}) => ({
    '__(__args)': (path) => {
        const {name} = path.node.callee;
        const binding = findBinding(path, name);
        
        if (!binding)
            return false;
        
        const params = getParams(binding.path);
        
        if (!params)
            return false;
        
        const args = path.get('arguments');
        
        if (params.length >= args.length)
            return false;
        
        const count = args.length - params.length;
        args.slice(-count).map(push);
    },
});

function getParams(path) {
    if (path.isVariableDeclarator())
        path = path.get('init');
    
    if (!path.isFunction())
        return null;
    
    const params = path.get('params');
    
    if (!params.length)
        return null;
    
    const last = params.length - 1;
    
    if (params[last].isRestElement())
        return null;
    
    return params;
}
