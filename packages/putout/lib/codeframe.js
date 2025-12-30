import {codeFrameColumns} from '@putout/babel';

export const codeframe = ({source, error, highlightCode = true}) => {
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
