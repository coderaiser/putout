export const report = () => `Avoid useless space: 'montag\` ' -> 'montag\`'`;

export const match = () => ({
    'montag`__a`': ({__a}) => {
        return __a.value.raw.startsWith(' ');
    },
});

export const replace = () => ({
    'montag`__a`': ({__a}, path) => {
        const {raw} = __a.value;
        
        __a.value.raw = raw.slice(1);
        
        return path;
    },
});
