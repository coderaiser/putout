export const report = () => 'IO.createDirectory should be used instead of IO.write';

export const match = () => ({
    'IO.write("__a")': ({__a}) => {
        return __a.value.endsWith('?dir');
    },
    'IO.write(`__a`)': ({__a}) => {
        return __a.value.raw.endsWith('?dir');
    },
});

export const replace = () => ({
    'IO.write(`${__a}?dir`)': 'IO.createDirectory(__a)',
    'IO.write("__a")': ({__a}) => {
        const value = __a.value.replace(/\?dir$/, '');
        return `IO.createDirectory('${value}')`;
    },
    'IO.write(`__a`)': ({__a}) => {
        const value = __a.value.raw.replace(/\?dir$/, '');
        return `IO.createDirectory('${value}')`;
    },
});
