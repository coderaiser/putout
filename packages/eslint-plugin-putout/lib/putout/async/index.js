'use strict';

const tryCatch = require('try-catch');
const {createSyncFn} = require('synckit');

const {
    ignores,
    print,
    parse,
} = require('putout');

const parseOptions = require('putout/parse-options');
const {parseError} = require('../parse-error');

const cwd = process.cwd();

const findPlacesSync = createSyncFn(require.resolve('./find-places'));
const transformSync = createSyncFn(require.resolve('./transform'));

const EMPTY_VISITORS = {};

module.exports = ({context, options}) => {
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
            message: `${parseError(errorParser)} (putout)`,
            node,
        });
        
        return EMPTY_VISITORS;
    }
    
    const [error, places = []] = findPlacesSync({
        name,
        options,
        ast,
        text,
    });
    
    if (error) {
        context.report({
            message: `${parseError(error)} (putout)`,
            node,
        });
        
        return EMPTY_VISITORS;
    }
    
    const rules = getRules(places);
    
    for (const {rule, message, position} of places) {
        context.report({
            message: `${message} (${rule})`,
            fix: fix({
                ast,
                text,
                name,
                node,
                source,
                options,
                rules,
            }),
            loc: {
                start: position,
                end: position,
            },
        });
    }
    
    return EMPTY_VISITORS;
};

const fix = ({name, ast, text, node, options, source, rules}) => (fixer) => {
    const lastToken = source.getLastToken(node, {
        includeComments: true,
    });
    
    ast = transformSync({
        name,
        options,
        ast,
        text,
        rules,
    });
    
    const [, last] = lastToken.range;
    const code = print(ast);
    
    return fixer.replaceTextRange([0, last], code);
};

function getRules(places) {
    const rules = [];
    
    for (const {rule} of places) {
        rules.push(rule);
    }
    
    return [...new Set(rules)];
}
