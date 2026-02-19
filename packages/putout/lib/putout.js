import {parse, print} from '@putout/engine-parser';
import {defaultOptions} from './default-options.js';
import {transform, transformAsync} from './transform.js';

export const putout = (source, opts) => {
    check(source);
    opts = defaultOptions(opts);
    
    const {
        parser,
        isTS,
        isJSX,
        printer,
    } = opts;
    
    const ast = parse(source, {
        parser,
        isTS,
        isJSX,
        printer,
    });
    
    const places = transform(ast, opts);
    
    if (!opts.fix)
        return {
            code: source,
            places,
        };
    
    const code = print(ast, {
        printer,
        source,
    });
    
    return {
        code,
        places,
    };
};

export const putoutAsync = async (source, opts) => {
    check(source);
    opts = defaultOptions(opts);
    
    const {
        parser,
        isTS,
        isJSX,
        printer,
    } = opts;
    
    const ast = parse(source, {
        parser,
        isTS,
        isJSX,
        printer,
    });
    
    const places = await transformAsync(ast, opts);
    
    if (!opts.fix)
        return {
            code: source,
            places,
        };
    
    const code = print(ast, {
        printer,
    });
    
    return {
        code,
        places,
    };
};

const isString = (a) => typeof a === 'string';

function check(source) {
    if (!isString(source))
        throw Error(`☝️ Looks like 'source' has type '${typeof source}', expected: 'string'`);
}
