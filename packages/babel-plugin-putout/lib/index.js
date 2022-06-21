'use strict';

const {
    parse,
    print,
    transform,
} = require('putout');

const parseOptions = require('putout/parse-options');

module.exports = () => {
    let code = '';
    
    return {
        name: 'putout',
        visitor: {
            Program(path, {filename, opts}) {
                const options = parseOptions({
                    filename,
                    options: opts,
                });
                
                transform(
                    path.container,
                    code,
                    options,
                );
            },
        },
        
        parserOverride(source) {
            code = source;
            return parse(source);
        },
        
        generatorOverride(ast) {
            ast.program.directives = [];
            const code = print(ast);
            
            return {code};
        },
    };
};

