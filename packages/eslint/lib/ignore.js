'use strict';

const MESSAGES = [
    `Parsing error: Cannot use keyword 'await' outside an async function`,
    `Parsing error: The keyword 'yield' is reserved`,
    `Parsing error: Unexpected reserved word 'await'`,
    `Parsing error: Unexpected reserved word 'yield'`,
];

module.exports.isIgnored = (message) => {
    for (const current of MESSAGES) {
        if (message.includes(current))
            return true;
    }
    
    return false;
};
