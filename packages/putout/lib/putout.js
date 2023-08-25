'use strict';

const {traverse, types} = require('@putout/babel');

const loader = require('@putout/engine-loader');
const runner = require('@putout/engine-runner');

const {
    parse,
    print,
    generate,
    template,
} = require('@putout/engine-parser');

const {cutShebang, mergeShebang} = require('./shebang');

const {
    putoutAsync,
    transformAsync,
    findPlacesAsync,
} = require('./putout-async');

const isString = (a) => typeof a === 'string';

const defaultOpts = (opts = {}) => {
    const {
        parser = 'babel',
        printer = opts.printer || 'putout',
        fix = true,
        fixCount = 2,
        loadPlugins = loader.loadPlugins,
        runPlugins = runner.runPlugins,
    } = opts;
    
    return {
        ...opts,
        parser,
        printer,
        fix,
        fixCount,
        loadPlugins,
        runPlugins,
    };
};

module.exports = (source, opts) => {
    check(source);
    opts = defaultOpts(opts);
    
    const {
        parser,
        isTS,
        isFlow,
        isJSX,
        sourceFileName,
        sourceMapName,
        printer,
    } = opts;
    
    const [clearSource, shebang] = cutShebang(source);
    
    const ast = parse(clearSource, {
        sourceFileName,
        parser,
        isTS,
        isFlow,
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
        sourceMapName,
        printer,
    });
    
    const code = mergeShebang(shebang, printed);
    
    return {
        code,
        places,
    };
};

module.exports.putoutAsync = putoutAsync;
module.exports.findPlacesAsync = findPlacesAsync;
module.exports.transformAsync = transformAsync;
module.exports.findPlaces = (ast, source, opts) => {
    return transform(ast, source, {
        ...opts,
        fix: false,
    });
};

// why we pass 'source' to 'transform()'?
// because we need to calculate position in a right way
// and determine is shebang is exists
//
// 25     return {¬
// 26         line: shebang ? line + 1 : line,¬
// 27         column,¬
// 28     };¬
//
module.exports.transform = transform;
function transform(ast, source, opts) {
    opts = defaultOpts(opts);
    
    const {
        plugins: pluginNames,
        cache,
        rules,
        fix,
        fixCount,
        loadPlugins,
        runPlugins,
    } = opts;
    
    const [, shebang] = cutShebang(source);
    
    const plugins = loadPlugins({
        pluginNames,
        cache,
        rules,
    });
    
    const places = runPlugins({
        ast,
        shebang,
        fix,
        fixCount,
        plugins,
    });
    
    return places;
}

module.exports.parse = parse;
module.exports.print = print;
module.exports.traverse = traverse;
module.exports.types = types;
module.exports.template = template;
module.exports.generate = generate;
module.exports.initReport = require('./cli/report');

module.exports.operator = {
    ...require('@putout/operate'),
    ...require('@putout/compare'),
    ...require('@putout/traverse'),
    ...require('@putout/operator-declare'),
    ...require('@putout/operator-regexp'),
    ...require('@putout/operator-add-args'),
};

module.exports.ignores = require('./ignores');
module.exports.codeframe = require('./codeframe');

function check(source) {
    if (!isString(source))
        throw Error(`☝️ Looks like 'source' has type '${typeof source}', expected: 'string'`);
}
