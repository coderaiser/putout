'use strict';

const applyTryCatch = require('../apply-try-catch');

module.exports.report = () => 'Use await tryToCatch instead of try-to-catch block';

module.exports.fix = applyTryCatch({
    camel: 'tryToCatch',
    kebab: 'try-to-catch',
});

module.exports.include = () => [
    'TryStatement',
];

module.exports.filter = ({node}) => {
    const {
        block,
        handler,
    } = node;
    const {length} = block.body;
    
    if (length !== 1)
        return false;
    
    if (!handler.param)
        return false;
    
    return true;
};

