export const match = () => ({
    [__ignore]: ({__array}) => {
        const list = __array.elements.map(getValue);
    },
    [__filesystem]: ({__object}) => {
        const list = __object.elements.map(getValue);
    },
});
