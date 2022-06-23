'use strict';

const {values} = Object;

module.exports.report = () => `Use 'let' when reassign`;

module.exports.fix = (path) => {
    path.node.kind = 'let';
    path.__putout_convert_const_to_let = true;
};

module.exports.traverse = ({push}) => ({
    VariableDeclaration: (path) => {
        if (path.__putout_convert_const_to_let)
            return;
        for (const binding of values(path.scope.bindings)) {
            if (binding.constant)
                continue;
            
            if (binding.path.isVariableDeclarator() && binding.kind === 'const')
                push(binding.path.parentPath);
        }
    },
});

