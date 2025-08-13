const check = ({__a}) => !__a.raw.endsWith('g');
const transform = ({__a}, path) => {
    __a.raw += 'g';
    return path;
};

export const report = (path) => {
    const name = path.get('callee.property');
    return `Call '${name.node.name}()' with global 'RegExp'`;
};

export const match = () => ({
    '__.replaceAll(/__a/, __b)': check,
    '__.matchAll(/__a/)': check,
});

export const replace = () => ({
    '__.replaceAll(/__a/, __b)': transform,
    '__.matchAll(/__a/)': transform,
});
