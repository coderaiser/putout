'use strict';

const {traverse, types} = require('@putout/babel');
const {
    parse,
    print,
    generate,
    template,
} = require('@putout/engine-parser');

const {cutShebang, mergeShebang} = require('./shebang');
const {defaultOptions} = require('./default-options');
const {transform, transformAsync} = require('./transform');

const {
    findPlaces,
    findPlacesAsync,
} = require('./find-places');

const isString = (a) => typeof a === 'string';

module.exports = putout;
module.exports.putout = putout;

function putout(source, opts) {
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
}

module.exports.putoutAsync = async (source, opts) => {
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

module.exports.transform = transform;
module.exports.transformAsync = transformAsync;

module.exports.findPlaces = findPlaces;
module.exports.findPlacesAsync = findPlacesAsync;

module.exports.parse = parse;
module.exports.print = print;
module.exports.traverse = traverse;
module.exports.types = types;
module.exports.template = template;
module.exports.generate = generate;
module.exports.initReport = require('@putout/engine-reporter/report');

module.exports.operator = {
    ...require('@putout/operate'),
    ...require('@putout/compare'),
    ...require('@putout/traverse'),
    ...require('@putout/operator-json'),
    ...require('@putout/operator-declare'),
    ...require('@putout/operator-regexp'),
    ...require('@putout/operator-add-args'),
    ...require('@putout/operator-filesystem'),
    ...require('@putout/operator-keyword'),
    ...require('@putout/operator-match-files'),
    ...require('@putout/operator-rename-files'),
    ...require('@putout/operator-ignore'),
    ...require('@putout/operator-parens'),
};

module.exports.ignores = require('./ignores');
module.exports.codeframe = require('./codeframe');

function check(source) {
    if (!isString(source))
        throw Error(`☝️ Looks like 'source' has type '${typeof source}', expected: 'string'`);
}
