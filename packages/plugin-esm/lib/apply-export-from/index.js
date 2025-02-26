'use strict';

const {types, operator} = require('putout');

const {
    compare,
    getTemplateValues,
    remove,
} = operator;

const {ExportNamespaceSpecifier} = types;

module.exports.report = () => `Use 'export *' instead of 'import/export'`;

const IMPORT = 'import * as __a from "__b"';

module.exports.fix = ({path, current}) => {
    const {exported} = current.node.specifiers[0];
    
    current.node.source = path.node.source;
    
    delete current.node.local;
    delete current.node.exported;
    
    current.node.specifiers = [
        ExportNamespaceSpecifier(exported),
    ];
    
    remove(path);
};

module.exports.traverse = ({push}) => ({
    [IMPORT]: (path) => {
        const {__a} = getTemplateValues(path, IMPORT);
        const {name} = __a;
        
        for (const current of path.parentPath.get('body')) {
            if (compare(current, `export {${name} as __b}`))
                push({
                    path,
                    current,
                });
        }
    },
});
