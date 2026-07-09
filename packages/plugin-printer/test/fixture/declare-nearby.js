export const FunctionDeclaration = {
    print(path, printer, semantics) {
        const {
            print,
            write,
            traverse,
        } = printer;
        
        const {
            generator,
            returnType,
            leadingComments,
        } = path.node;
        
        indent();
    }
}
