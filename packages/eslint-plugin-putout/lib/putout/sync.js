import process from 'node:process';
import {tryCatch} from 'try-catch';
import {ignores} from 'putout/ignores';
import {parseOptions} from 'putout/parse-options';
import {
    findPlaces,
    transform,
    print,
    parse,
} from 'putout';
import {parseError} from './parse-error.js';

const cwd = process.cwd();
const EMPTY_VISITORS = {};

export const putoutSync = ({context, options}) => {
    const name = context.filename;
    const resultOptions = parseOptions({
        name,
        options,
    });
    
    if (ignores(cwd, name, resultOptions))
        return EMPTY_VISITORS;
    
    const source = context.sourceCode;
    const {text} = source;
    const node = source.ast;
    
    const [errorParser, ast] = tryCatch(parse, text, {
        isTS: true,
    });
    
    if (errorParser) {
        context.report({
            message: `${parseError(errorParser)} (parser)`,
            node,
        });
        
        return EMPTY_VISITORS;
    }
    
    const [error, places = []] = tryCatch(findPlaces, ast, text, resultOptions);
    
    if (error) {
        context.report({
            message: `${parseError(error)} (putout)`,
            node,
        });
        
        return EMPTY_VISITORS;
    }
    
    for (const {rule, message, position} of places) {
        context.report({
            message: `${message} (${rule})`,
            fix: fix({
                ast,
                text,
                node,
                source,
                resultOptions,
            }),
            loc: {
                start: position,
                end: position,
            },
        });
    }
    
    return EMPTY_VISITORS;
};

const fix = ({ast, text, node, source, resultOptions}) => (fixer) => {
    const includeComments = true;
    const lastToken = source.getLastToken(node, {
        includeComments,
    });
    
    transform(ast, text, resultOptions);
    
    const [, last] = lastToken.range;
    const code = print(ast);
    
    return fixer.replaceTextRange([0, last], code);
};
