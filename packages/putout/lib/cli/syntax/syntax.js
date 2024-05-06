'use strict';

const tryCatch = require('try-catch');
const parseError = require('../parse-error');

module.exports.lintSyntax = async (source, {fix, isTS}) => {
    if (fix)
        return await syntaxFix(source);
    
    return await syntaxLint(source, {
        isTS,
    });
};

async function syntaxFix(source) {
    const {compile} = await import('goldstein');
    const [error, code] = tryCatch(compile, source);
    
    if (error)
        return {
            code: source,
            places: parseError(error),
        };
    
    return {
        code,
        places: [],
    };
}

async function syntaxLint(source, {isTS}) {
    const {default: quickLint} = await import('@putout/quick-lint');
    
    const quickLintPlaces = await quickLint(source, {
        isTS,
        isJSX: true,
    });
    
    return {
        places: quickLintPlaces,
        code: source,
    };
}
