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
            
            const {parentPath} = binding.path;
            
            if (binding.path.isVariableDeclarator() && parentPath.node.kind === 'const') {
                push(binding.path.parentPath);
            }
        }
    },
});

