'use strict';

module.exports.syntaxFix = async (source) => {
    const {parse, print} = await import('goldstein');
    
    const code = print(parse(source));
    
    return {
        code,
        places: [],
    };
};
