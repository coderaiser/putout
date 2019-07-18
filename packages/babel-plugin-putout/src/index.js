import {parse, print, transform, merge} from 'putout';
import defaultOptions from 'putout/putout.json';

export default function() {
    let code = '';
    let ast;
    
    return {
        name: 'putout',
        visitor: {
            Program(path, {opts}) {
                transform(path.container, code, merge(
                    defaultOptions,
                    opts,
                ));
            },
        },
        
        parserOverride(source) {
            code = source;
            return parse(source);
        },
        
        generatorOverride(ast) {
            const code = print(ast);
            return {code};
        },
    };
}

