'use strict';

const {
    ignores,
    findPlaces,
    transform,
    print,
    parse,
    parseOptions,
} = require('putout');

const {isArray} = Array;
const cwd = process.cwd();
const getContextOptions = ({options}) => {
    const [allContextOptions = {}] = options;
    
    if (!isArray(allContextOptions))
        return allContextOptions;
    
    const [, contextOptions = {}] = allContextOptions;
    
    return contextOptions;
};

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
                
                const text = context
                    .getSourceCode()
                    .getText(node);
                
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

