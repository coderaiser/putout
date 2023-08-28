const getValue = ({value}) => value;
const notLegacy = ({value}) => value !== 'legacy';

export const report = () => 'legacy should be removed from .gitignore';

export const match = () => ({
    '__putout_processor_ignore(__a)': ({__a}) => {
        const list = __a.elements.map(getValue);
        return list.includes('legacy');
    },
});

export const replace = () => ({
    '__putout_processor_ignore(__a)': ({__a}, path) => {
        __a.elements = __a.elements.filter(notLegacy);
        return path;
    },
});
