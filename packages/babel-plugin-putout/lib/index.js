import {
    parse,
    print,
    transform,
} from 'putout';
import {parseOptions} from 'putout/parse-options';

export default () => {
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
