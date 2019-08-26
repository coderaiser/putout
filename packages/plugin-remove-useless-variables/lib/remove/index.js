'use strict';

module.exports.report = ({idName}) => `Useless variable declaration with name "${idName}"`;

module.exports.fix = ({path, bindingPath}) => {
    const {init} = bindingPath.node;
    path.node.init = init;
    bindingPath.remove();
};

module.exports.traverse = ({push}) => {
    return {
        VariableDeclarator(path) {
            const initPath = path.get('init');
            
            if (!initPath.isIdentifier())
                return;
            
            const {name} = initPath.node;
            
            if (name === 'React')
                return;
            
            const binding = initPath.scope.bindings[name];
            
            if (!binding)
                return;
            
            if (binding.references > 1)
                return;
            
            if (!binding.path.isVariableDeclarator())
                return;
            
            if (!binding.path.get('id').isIdentifier())
                return;
            
            const idName = binding.path.node.id.name;
            push({
                path,
                idName,
                bindingPath: binding.path,
            });
        },
    };
};

