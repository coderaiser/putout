'use strict';

const alignSpaces = require('align-spaces');
const alignedMap = new Map();

module.exports.report = () => 'Keep whitespaces in blank lines';

module.exports.include = () => ['Program'];

module.exports.fix = ({text}) => {
    return alignedMap.get(text);
};

module.exports.filter = ({text}) => {
    const aligned = alignSpaces(text);
    
    if (text === aligned)
        return false;
    
    alignedMap.set(text, aligned);
    
    return true;
};
