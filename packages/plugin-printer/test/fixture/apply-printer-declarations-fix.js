export const ExportNamedDeclaration = (path, printer) => {
    const {
        print,
        write,
        indent: indent,
    } = printer;
    const {leadingComments} = path.node;
    
    indent();
};
