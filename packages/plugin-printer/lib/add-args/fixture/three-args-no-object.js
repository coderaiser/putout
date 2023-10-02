module.exports = {
    TSPropertySignature(path, semantics, printer) {
        const {print} = printer;
        const {optional} = path.node;
        print('__key');
        maybe.print(optional, '?');
    },
};
