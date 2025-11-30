export const traverse = ({push, listStore}) => ({
    'export const rules = __object': listStore,
    Program: {
        exit: (path) => {
            const rules = listStore();
            
            if (!rules.length)
                return;
                  
            traverse(path, {
                ImportDeclaration: createImportVisitor(push),
            });
        }
    }
});

const createImportVisitor = (push) => (path) => {
    const {source} = path.node;
    const {value} = path.node.source;
    
    if (value.endsWith('index.js'))
        return;
    
    push(path);
}
