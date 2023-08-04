'use strict';

const {codeFrameColumns} = require('@putout/babel');

module.exports = ({source, error, highlightCode = true}) => {
    const {message, loc} = error;
    
    if (!loc)
        return message;
    
    const location = {
        start: loc,
    };
    
    return codeFrameColumns(source, location, {
        highlightCode,
        message,
    });
};
