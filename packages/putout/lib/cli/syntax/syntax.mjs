import tryCatch from 'try-catch';
import parseError from '../parse-error.js';

export const lintSyntax = async (source, {fix, isTS}) => {
    if (fix)
        return await syntaxFix(source);
    
    return await syntaxLint(source, {
        isTS,
    });
};

async function syntaxFix(source) {
    const {compile, keywords} = await import('goldstein');
    const {
        keywordArrow,
        keywordIf,
        keywordBrokenString,
    } = keywords;
    
    const [error, code] = tryCatch(compile, source, {
        keywords: {
            keywordArrow,
            keywordIf,
            keywordBrokenString,
        },
    });
    
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
