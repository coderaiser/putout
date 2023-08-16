'use strict';

module.exports.report = () => `Use 'if condition' instead of 'ternary expression'`;

module.exports.fix = (path) => {
    path.node.specifiers[0].type = 'ImportNamespaceSpecifier';
};

module.exports.traverse = ({push}) => ({
    ImportDeclaration(path) {
        const {value} = path.node.source;
        
        if (value === './index.js') {
            push(path);
            return;
        }
        
        if (value === '../lib/index.js')
            push(path);
    },
});
