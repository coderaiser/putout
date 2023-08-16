'use strict';

module.exports.report = () => `Use 'import * as plugin' instead of 'import plugin'`;

module.exports.fix = ({first}) => {
    first.node.type = 'ImportNamespaceSpecifier';
};

module.exports.traverse = ({push}) => ({
    ImportDeclaration(path) {
        const {value} = path.node.source;
        const first = path.get('specifiers.0');
        
        if (first.isImportNamespaceSpecifier()) {
            return;
        }
        
        if (value === './index.js') {
            push({
                path,
                first,
            });
            return;
        }
        
        if (value === '../lib/index.js') {
            push({
                path,
                first,
            });
            return;
        }
    },
});
