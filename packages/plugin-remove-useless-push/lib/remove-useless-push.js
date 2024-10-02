'use strict';

const {operator} = require('putout');
const {remove, getBinding} = operator;

module.exports.report = () => `Avoid useless 'push()' to array `;

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    '__a.push(__args)': (path) => {
        const __a = path.get('callee.object').node;
        const binding = getBinding(path, __a.name);
        
        if (!binding)
            return;
        
        if (!binding.path.isVariableDeclarator())
            return;
        
        const {referencePaths} = binding;
        
        if (referencePaths.length > 1)
            return;
        
        if (binding.path.get('id').isObjectPattern())
            return;
        
        push(path);
    },
});
