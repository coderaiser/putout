'use strict';

const {
    parse,
    print,
    transform,
} = require('putout');

const {parseOptions} = require('putout/parse-options');

module.exports = () => {
    let code = '';
    
    return {
        visitor: {
            Program(path, {filename, opts}) {
                const options = parseOptions({
                    filename,
                    options: opts,
                });
                
                transform(path.container, code, options);
            },
        },
        
        parserOverride(source) {
            code = source;
            return parse(source);
        },
        
        generatorOverride(ast) {
            const code = print(ast, {});
            
            return {
                code,
            };
        },
    };
};
