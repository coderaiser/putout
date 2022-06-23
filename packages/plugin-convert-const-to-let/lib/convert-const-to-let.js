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
                return;
            
            if (binding.path.isVariableDeclarator() && binding.path.parentPath.node.kind === 'const') {
                push(binding.path.parentPath);
            }
        }
    },
});

