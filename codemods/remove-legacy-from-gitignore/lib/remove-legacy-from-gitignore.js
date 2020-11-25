'use strict';

const getValue = ({value}) => value;
const notLegacy = ({value}) => value !== 'legacy';

module.exports.report = () => 'legacy should be removed from .gitignore';

module.exports.match = () => ({
    '__putout_processor_ignore(__a)': ({__a}) => {
        const list = __a.elements.map(getValue);
        return list.includes('legacy');
    },
});

module.exports.replace = () => ({
    '__putout_processor_ignore(__a)': ({__a}, path) => {
        __a.elements = __a.elements.filter(notLegacy);
        return path;
    },
});
