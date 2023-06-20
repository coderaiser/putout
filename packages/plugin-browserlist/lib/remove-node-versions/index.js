'use strict';

const getValue = ({value}) => value;

module.exports.report = () => 'remove node from .browserlist';

const LINE = 'maintained node versions';

module.exports.match = () => ({
    '__putout_processor_ignore(__a)': ({__a}) => {
        const list = __a.elements.map(getValue);
        
        let isBrowser = false;
        
        for (const item of list) {
            if (/Firefox|Chrome|Safari/.test(item)) {
                isBrowser = true;
                break;
            }
        }
        
        if (!isBrowser)
            return false;
        
        return list.includes(LINE);
    },
});

module.exports.replace = () => ({
    '__putout_processor_ignore(__a)': (vars, path) => {
        const elementsPath = path.get('arguments.0.elements');
        
        for (const elementPath of elementsPath) {
            if (elementPath.node.value === LINE) {
                elementPath.remove();
                break;
            }
        }
        
        return path;
    },
});
