const noop = () => {};

export const report = () => `Use 'import * as plugin' instead of 'import plugin'`;

export const fix = ({first}) => {
    first.node.type = 'ImportNamespaceSpecifier';
};

export const traverse = ({push, listStore, pathStore}) => ({
    'export const rules = __object': listStore,
    'import {createTest} from "@putout/test"': listStore,
    ...createImportVisitor({
        pathStore,
        push,
        names: [
            '@putout/plugin-',
            './index.js',
        ],
    }),
    'Program': {
        exit(path) {
            const rules = listStore();
            
            if (rules.length !== 1)
                return;
            
            path.traverse(createImportVisitor({
                push,
                names: ['any'],
            }));
        },
    },
});

const createImportVisitor = ({push, names, pathStore = noop}) => ({
    ImportDeclaration(path) {
        pathStore(path);
        
        const {value} = path.node.source;
        
        if (value.endsWith('.js'))
            return;
        
        const [first] = path.get('specifiers');
        
        if (!first)
            return;
        
        if (first.isImportNamespaceSpecifier())
            return;
        
        if (first.isImportSpecifier())
            return;
        
        for (const name of names) {
            if (!value.replace('./', '').includes('/'))
                continue;
            
            if (value === name || value.startsWith(name) || name === 'any') {
                push({
                    path,
                    first,
                });
                return;
            }
        }
    },
});
