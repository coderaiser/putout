'use strict';

const {types} = require('putout');

const {isStringLiteral} = types;
const parseName = (a) => a.value.replace('@putout/', '');

module.exports.report = () => 'Set homepage';

module.exports.match = () => ({
    '__putout_processor_json(__a)': ({__a}) => {
        const {name, homepage} = parseProperties(__a);
        
        if (!name || !homepage)
            return false;
        
        if (!/^@putout/.test(name.value))
            return false;
        
        if (name.value.includes('codemod'))
            return false;
        
        if (name.value.includes('rule'))
            return false;
        
        const dir = parseName(name);
        
        if (homepage.value.includes(dir))
            return false;
        
        return true;
    },
});

module.exports.replace = () => ({
    '__putout_processor_json(__a)': ({__a}, path) => {
        const {name, homepage} = parseProperties(__a);
        const dir = parseName(name);
        homepage.value = `https://github.com/coderaiser/putout/tree/master/packages/${dir}`;
        return path;
    },
});

function parseProperties(node) {
    let name;
    let homepage;
    
    for (const {key, value} of node.properties) {
        if (isStringLiteral(key, {value: 'name'})) {
            name = value;
            continue;
        }
        
        if (isStringLiteral(key, {value: 'homepage'})) {
            homepage = value;
            continue;
        }
    }
    
    return {
        name,
        homepage,
    };
}
