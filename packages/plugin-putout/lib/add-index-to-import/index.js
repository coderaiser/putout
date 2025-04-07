import {operator} from 'putout';

const {setLiteralValue} = operator;

export const report = (path) => {
    const {value} = path.node.source;
    return `Add 'index.js' to import: '${value}' -> '${value}/index.js'`;
};

export const fix = (path) => {
    const {source} = path.node;
    const {value} = source;
    
    if (value.endsWith('.js')) {
        setLiteralValue(source, value.replace('.js', '/index.js'));
        return;
    }
    
    setLiteralValue(source, `${value}/index.js`);
};

export const traverse = ({push, listStore}) => ({
    'export const rules = __object': listStore,
    'Program': {
        exit: (path) => {
            const rules = listStore();
            
            if (!rules.length)
                return;
            
            operator.traverse(path, {
                ImportDeclaration: createImportVisitor(push),
            });
        },
    },
});

const createImportVisitor = (push) => (path) => {
    const {value} = path.node.source;
    
    if (value.endsWith('.cjs'))
        return;
    
    if (value.endsWith('index.js'))
        return;
    
    push(path);
};
