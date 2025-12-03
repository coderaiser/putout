function createImportExpression(path, printer, semantics, {source = 'source'} = {}) {
    const {print} = printer;
    print(`__${source}`);
}
