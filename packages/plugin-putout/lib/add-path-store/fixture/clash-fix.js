const MATCH = 'module.exports.match = __object';

export const report = () => `Use 'if condition' instead of 'ternary expression'`;

export const fix = () => {};

export const traverse = ({pathStore, push}) => ({
    [MATCH]: pathStore,
    'module.exports = __a': pathStore,
    Program: {
        exit() {
            const [a, b] = pathStore();
            
            if (compare(MATCH, a) && a.node.loc.start > b.node.loc.start)
                return;
            
            push(a);
        },
    },
});
