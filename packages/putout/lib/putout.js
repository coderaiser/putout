'use strict';

const traverse = require('@babel/traverse').default;
const types = require('@babel/types');

const loader = require('@putout/engine-loader');
const runner = require('@putout/engine-runner');
const {
    parse,
    print,
    generate,
    template,
} = require('@putout/engine-parser');

const cutShebang = require('./cut-shebang');
const isString = (a) => typeof a === 'string';

const defaultOpts = (opts = {}) => {
    const {
        parser = 'babel',
        fix = true,
        fixCount = 2,
        loadPlugins = loader.loadPlugins,
        runPlugins = runner.runPlugins,
    } = opts;
    
    return {
        ...opts,
        parser,
        fix,
        fixCount,
        loadPlugins,
        runPlugins,
    };
};

/**
    based on @putout/engine-parser/lib/custom-parser.js

    @typedef {any} AST

    @typedef {{
        parse: (
            source: string,
            options?: {
                isTS: boolean,
                isFlow: boolean,
                isJSX: boolean,
            }
        ) => AST
    }} ParserObject

    @typedef {
        "babel" |
        "espree" |
        "acorn" |
        "esprima" |
        "tenko" |
        "hermes"
    } ParserName

    @typedef {string} RequirePath

    @typedef {{
        parser?: ParserName | ParserObject | RequirePath,
        fix?: boolean = true,
        fixCount?: number = 2,
        isTS?: boolean,
        isFlow?: boolean,
        isJSX?: boolean,
        sourceFileName?: string,
        sourceMapName?: string,
    }} PutoutOptions
*/

// TODO type places

/**
    putout: transform a source string

    @param {string} source

    @param {PutoutOptions} [opts]

    @return {{
        code: string,
        places: any,
    }}
*/

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
    } = opts;
    
    const [clearSource, shebang] = cutShebang(source);
    const ast = parse(clearSource, {
        sourceFileName,
        parser,
        isTS,
        isFlow,
        isJSX,
    });
    
    const places = transform(ast, source, opts);
    
    if (!opts.fix)
        return {
            code: source,
            places,
        };
    
    const printed = print(ast, {
        sourceMapName,
    });
    const code = `${shebang}${printed}`;
    
    return {
        code,
        places,
    };
};

module.exports.findPlaces = (ast, source, opts) => {
    return transform(ast, source, {
        ...opts,
        fix: false,
    });
};

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
