export const report = () => `Add '\n' after montag`;

export const match = () => ({
    'montag`__a`': ({__a}) => !__a.value.raw.startsWith('\n'),
});

export const replace = () => ({
    'montag`__a`': ({__a}, path) => {
        const {raw} = __a.value;
        const {column} = path.node.loc.start;
        const indentBefore = Array(column + 4).join(' ');
        const indentAfter = Array(column).join(' ');
        
        __a.value.raw = `\n${indentBefore}${raw}\n${indentAfter}`;
        
        return path;
    },
});
