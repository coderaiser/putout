'use strict';

module.exports.parseError = ({message}) => {
    if (message.includes('buildError'))
        return 'Parser error';
    
    return message;
};
