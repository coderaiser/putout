'use strict';

const tryCatch = require('try-catch');

const {
    ignores,
    findPlaces,
    transform,
    print,
    parse,
} = require('putout');

const parseOptions = require('putout/parse-options');
const {parseError} = require('./parse-error');

const cwd = process.cwd();
const getContextOptions = ({options}) => {
    const [allContextOptions = {}] = options;
    return allContextOptions;
};

const EMPTY_VISITORS = {};

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Putout',
            category: 'putout',
            recommended: true,
        },
        fixable: 'code',
    },
    
    create(context) {
        const name = context.getFilename();
        const options = getContextOptions(context);
        const resultOptions = parseOptions({
            name,
            options,
        });
        
        if (ignores(cwd, name, resultOptions))
            return EMPTY_VISITORS;
        
        const source = context.getSourceCode();
        const {text} = source;
        const node = source.ast;
        
        const [errorParser, ast] = tryCatch(parse, text, {
            isTS: true,
        });
        
        if (errorParser) {
            context.report({
                message: `${parseError(errorParser)} (putout)`,
                node,
            });
            
            return EMPTY_VISITORS;
        }
        
        const places = findPlaces(ast, text, resultOptions);
        
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
    },
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

