'use strict';

module.exports.parseError = ({code, message, name}) => {
    if (message.includes('buildError'))
        return 'Parser error';
    
    if (code === 'ERR_REQUIRE_ESM') {
        return `☝️ Looks like '${name}' is ESM, extend from 'plugin:putout/esm'`;
    }
    
    return message;
};
