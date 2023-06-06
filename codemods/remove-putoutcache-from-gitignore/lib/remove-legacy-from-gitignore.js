'use strict';

const getValue = ({value}) => value;
const notValue = (name) => ({value}) => value !== name;

module.exports.report = () => '.putoutcache should be removed from .gitignore';

module.exports.match = () => ({
    '__putout_processor_ignore(__a)': ({__a}) => {
        const list = __a.elements.map(getValue);
        
        if (list.includes('.putoutcache'))
            return true;
        
        return false;
    },
});

module.exports.replace = () => ({
    '__putout_processor_ignore(__a)': ({__a}, path) => {
        __a.elements = __a.elements.filter(notValue('.putoutcache'));
        
        return path;
    },
});
