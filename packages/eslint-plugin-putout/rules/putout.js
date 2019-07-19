'use strict';

const {resolve} = require('path');

const putout = require('putout');
const defaultOptions = require('putout/putout.json');

const {
    merge,
    parseMatch,
    ignores,
    findPlaces,
    transform,
    print,
    parse,
} = putout;
const cwd = process.cwd();

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
                const file = context.getFilename();
                const resolvedName = resolve(file)
                    .replace(/^\./, cwd);
                
                const [contextOptions = {}] = context.options;
                const options = merge(
                    defaultOptions,
                    contextOptions,
                );
                
                const match = parseMatch(options.match, resolvedName);
                
                if (ignores(cwd, resolvedName, options))
                    return;
                
                const text = context
                    .getSourceCode()
                    .getText(node);
                
                const resultOptions = merge(options, match);
                
                const ast = parse(text);
                const places = findPlaces(ast, text, resultOptions);
                
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
                            
                            return [
                                fixer.replaceText(node, code),
                            ];
                        },
                    });
                }
            },
        };
    },
};

