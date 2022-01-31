'use strict';

const applyTryCatch = require('../apply-try-catch');
module.exports.report = () => 'Use tryCatch instead of try-catch block';

module.exports.fix = applyTryCatch({
    camel: 'tryCatch',
    kebab: 'try-catch',
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

