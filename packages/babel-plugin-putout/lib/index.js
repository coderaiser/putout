import {
    parse,
    print,
    transform,
} from 'putout';
import {parseOptions} from 'putout/parse-options';

export default () => ({
    visitor: {
        Program(path, {filename, opts}) {
            const options = parseOptions({
                filename,
                options: opts,
            });
            
            transform(path.container, options);
        },
    },
    
    parserOverride(source) {
        return parse(source);
    },
    
    generatorOverride(ast) {
        const code = print(ast);
        
        return {
            code,
        };
    },
});
