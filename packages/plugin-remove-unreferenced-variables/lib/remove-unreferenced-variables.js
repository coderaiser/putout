'use strict';

module.exports.report = () => `Unreferenced variables should be avoided`;

module.exports.fix = (path) => path.remove();

module.exports.traverse = ({push}) => {
    return {
        '__identifier = __a'(path) {
            const {name} = path.node.left;
            const binding = path.scope.bindings[name];
            
            if (!binding)
                return;
            
            const {referenced} = binding;
            
            if (!referenced) {
                push(path);
                push(binding.path);
            }
        },
    };
};
