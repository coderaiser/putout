export const match = () => ({
    '__putout_processor_ignore(__a)': ({__a}) => {
        const list = __a.elements.map(getValue);
    },
    '__putout_processor_filesystem(__a)': ({__a}) => {
        const list = __a.elements.map(getValue);
    }
});