export const ExportNamedDeclaration = (path, printer, {traverse}) => {
    const {print, write} = printer;
    const {leadingComments} = path.node;
    
    traverse();
}
