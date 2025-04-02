import {types, operator} from 'putout';

const {
    compare,
    getTemplateValues,
    remove,
} = operator;

const {exportNamespaceSpecifier} = types;

export const report = () => `Use 'export *' instead of 'import/export'`;

const IMPORT = 'import * as __a from "__b"';

export const fix = ({path, current}) => {
    const {exported} = current.node.specifiers[0];
    
    current.node.source = path.node.source;
    
    delete current.node.local;
    delete current.node.exported;
    
    current.node.specifiers = [
        exportNamespaceSpecifier(exported),
    ];
    
    remove(path);
};

export const traverse = ({push}) => ({
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
