'use strict';

const {operator} = require('putout');
const {
    traverse,
    setLiteralValue,
} = operator;

module.exports.report = () => `Add 'index.js' to nested import`;

module.exports.fix = (path) => {
    const {source} = path.node;
    const {value} = source;
    
    if (value.endsWith('js')) {
        setLiteralValue(source, value.replace('.js', '/index.js'));
        return;
    }
    
    setLiteralValue(source, `${value}/index.js`);
};

module.exports.traverse = ({push, listStore}) => ({
    'export const rules = __object': listStore,
    'Program': {
        exit: (path) => {
            const rules = listStore();
            
            if (!rules.length)
                return;
            
            traverse(path, {
                ImportDeclaration: createImportVisitor(push),
            });
        },
    },
});

const createImportVisitor = (push) => (path) => {
    const {value} = path.node.source;
    
    if (value.endsWith('index.js'))
        return;
    
    push(path);
};
