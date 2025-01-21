export const match = () => ({
    'const a = 3': (vars, path) => {
        return path.getPrev();
    },
});

module.exports.match = () => ({
    'const a = 3': ({__a}, path) => {
        path.getNext();
    },
});

const x = (path) => {
    return path.getNext();
};
