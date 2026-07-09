export const ExportNamedDeclaration = (path, printer) => {
    const {
        print,
        write,
        traverse: traverse,
    } = printer;
    const {leadingComments} = path.node;
    
    traverse();
};
