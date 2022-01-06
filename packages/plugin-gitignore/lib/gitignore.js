'use strict';

const {types} = require('putout');
const {StringLiteral} = types;
const getValue = ({value}) => value;

const names = [
    '.idea',
    '*.swp',
    'yarn-error.log',
    'coverage',
];

module.exports.report = () => `Dot files should be added to .gitignore`;

module.exports.match = ({options}) => {
    const {dismiss = []} = options;
    const newNames = filterNames(names, dismiss);
    
    return {
        '__putout_processor_ignore(__a)': ({__a}) => {
            const list = __a.elements.map(getValue);
            
            for (const name of newNames) {
                if (!list.includes(name))
                    return true;
            }
            
            return false;
        },
    };
};

module.exports.replace = ({options}) => {
    const {dismiss = []} = options;
    const newNames = filterNames(names, dismiss);
    
    return {
        '__putout_processor_ignore(__a)': ({__a}, path) => {
            const list = __a.elements.map(getValue);
            
            for (const name of newNames) {
                if (!list.includes(name))
                    __a.elements.push(StringLiteral(name));
            }
            
            return path;
        },
    };
};

function filterNames(names, dismiss) {
    const newNames = [];
    
    for (const name of names) {
        if (dismiss.includes(name))
            continue;
        
        newNames.push(name);
    }
    
    return newNames;
}

