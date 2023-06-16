'use strict';

const {operator, types} = require('putout');

const {isFunction} = types;

const {findBinding, remove} = operator;

module.exports.report = ({node}) => {
    if (isFunction(node))
        return 'Avoid useless argument';
    
    return `Avoid useless argument '${node.name}'`;
};

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    '__(__args)': (path) => {
        const {name} = path.node.callee;
        const binding = findBinding(path, name);
        
        if (!binding)
            return false;
        
        let bindingPath = binding.path;
        
        if (bindingPath.isVariableDeclarator())
            bindingPath = bindingPath.get('init');
        
        if (!checkParams(bindingPath))
            return false;
        
        const params = bindingPath.get('params');
        const args = path.get('arguments');
        
        if (params.length >= args.length)
            return false;
        
        if (isArguments(bindingPath))
            return false;
        
        const count = args.length - params.length;
        
        args
            .slice(-count)
            .map(push);
    },
});

function checkParams(path) {
    if (!path.isFunction())
        return false;
    
    const params = path.get('params');
    
    if (!params.length)
        return true;
    
    const last = params.length - 1;
    
    return !params[last].isRestElement();
}

function isArguments(path) {
    let is = false;
    
    path.traverse({
        Identifier({node}) {
            const {name} = node;
            
            if (name === 'arguments')
                is = true;
            
            path.stop();
        },
    });
    
    return is;
}
