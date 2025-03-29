export const report = () => `'stub().withName(name)' should synced with variable name`;

export const match = () => ({
    'const __a = stub().withName(__b)': ({__a, __b}) => __b.value !== __a.name,
});

export const replace = () => ({
    'const __a = stub().withName(__b)': ({__a, __b}, path) => {
        __b.value = __a.name;
        return path;
    },
});
