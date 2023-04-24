module.exports = {
    TSPropertySignature(path, {print}) {
        const {optional} = path.node;
        print('__key');
        maybe.print(optional, '?');
    },
};
