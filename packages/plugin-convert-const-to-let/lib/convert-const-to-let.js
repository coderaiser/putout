'use strict';

const {values} = Object;

module.exports.report = () => `Use 'let' when reassign`;

module.exports.fix = (path) => {
    path.node.kind = 'let';
};

module.exports.traverse = ({push}) => ({
    VariableDeclaration: (path) => {
        for (const binding of values(path.scope.bindings)) {
            if (binding.constant)
                continue;
            
            if (binding.path.isVariableDeclarator() && binding.kind === 'const')
                push(binding.path.parentPath);
        }
    },
});

