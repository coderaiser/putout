import {parse, print} from '@putout/engine-parser';
import {cutShebang, mergeShebang} from './shebang.js';
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
    
    const [clearSource, shebang] = cutShebang(source);
    
    const ast = parse(clearSource, {
        parser,
        isTS,
        isJSX,
        printer,
    });
    
    const places = transform(ast, source, opts);
    
    if (!opts.fix)
        return {
            code: source,
            places,
        };
    
    const printed = print(ast, {
        printer,
        source,
    });
    
    const code = mergeShebang(shebang, printed);
    
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
    
    const [clearSource, shebang] = cutShebang(source);
    
    const ast = parse(clearSource, {
        parser,
        isTS,
        isJSX,
        printer,
    });
    
    const places = await transformAsync(ast, source, opts);
    
    if (!opts.fix)
        return {
            code: source,
            places,
        };
    
    const printed = print(ast, {
        printer,
    });
    
    const code = mergeShebang(shebang, printed);
    
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
