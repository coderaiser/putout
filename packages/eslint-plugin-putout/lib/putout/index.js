'use strict';

const {
    ignores,
    findPlaces,
    transform,
    print,
} = require('putout');

const v8 = require('v8');
const toBabel = require('estree-to-babel');

const parseOptions = require('putout/lib/parse-options');

const cwd = process.cwd();
const getContextOptions = ({options}) => {
    const [allContextOptions = {}] = options;
    return allContextOptions;
};

const copyAST = (a) => v8.deserialize(v8.serialize(a));

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
        return {
            Program(node) {
                const name = context.getFilename();
                const options = getContextOptions(context);
                const resultOptions = parseOptions({
                    name,
                    options,
                });
                
                if (ignores(cwd, name, resultOptions))
                    return;
                
                const source = context.getSourceCode();
                const {text} = source;
                
                if (!text)
                    return;
                
                const ast = toBabel(copyAST(node));
                const places = findPlaces(ast, text, resultOptions);
                
                const includeComments = true;
                const lastToken = source.getLastToken(node, {
                    includeComments,
                });
                
                const [, last] = lastToken.range;
                
                for (const {rule, message, position} of places) {
                    context.report({
                        message: `${message} (${rule})`,
                        
                        loc: {
                            start: position,
                            end: position,
                        },
                        
                        fix(fixer) {
                            transform(ast, text, resultOptions);
                            const code = print(ast);
                            
                            return fixer.replaceTextRange([0, last], code);
                        },
                    });
                }
            },
        };
    },
};

