import {generate} from '@putout/babel';
import {alignSpaces as align} from 'align-spaces';

const defaultOptions = {
    alignSpaces: true,
};

export const print = (ast, options) => {
    const {source, alignSpaces} = {
        ...defaultOptions,
        ...options,
    };
    
    let {code} = generate(
        ast,
        source && {
            experimental_preserveFormat: true,
            retainLines: true,
        },
        source,
    );
    
    if (code[0] === '\n')
        code = code.trimStart();
    
    code += '\n';
    
    if (!alignSpaces)
        return code;
    
    return align(code);
};
