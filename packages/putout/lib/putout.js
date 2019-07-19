'use strict';

const recast = require('recast');
const toBabel = require('estree-to-babel');
const traverse = require('@babel/traverse').default;
const template = require('@babel/template').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');

const cutShebang = require('./cut-shebang');
const getPlugins = require('./get-plugins');

const customParser = require('./custom-parser');
const runPlugins = require('./run-plugins');
const runBabelPlugins = require('./run-babel-plugins');

const isUndefined = (a) => typeof a === 'undefined';
const {assign} = Object;

const getParser = ({parser, isTS, isFlow, isJSX}) => ({
    parse(source) {
        return toBabel(customParser(source, {
            parser,
            isTS,
            isFlow,
            isJSX,
        }));
    },
});

const defaultOpts = (opts = {}) => {
    const newOpts = {
        ...opts,
    };
    
    if (isUndefined(opts.fix))
        assign(newOpts, {
            fix: true,
        });
    
    if (isUndefined(opts.fixCount))
        assign(newOpts, {
            fixCount: 2,
        });
    
    return newOpts;
};

module.exports = (source, opts) => {
    opts = defaultOpts(opts);
    const {
        parser,
        isTS,
        isFlow,
        isJSX,
    } = opts;
    
    const [clearSource, shebang] = cutShebang(source);
    const ast = parse(clearSource, {
        parser,
        isTS,
        isFlow,
        isJSX,
    });
    
    const places = transform(ast, source, opts);
    const printed = print(ast);
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
        babelPlugins = [],
        rules,
        fix,
        fixCount,
    } = opts;
    
    const [, shebang] = cutShebang(source);
    const plugins = getPlugins({
        pluginNames,
        rules,
    });
    
    const places = [
        ...runBabelPlugins({
            ast,
            fix,
            source,
            babelPlugins,
        }),
        ...runPlugins({
            ast,
            shebang,
            fix,
            fixCount,
            plugins,
        }),
    ];
    
    return places;
}

const fixStrictMode = (a) => {
    return a.replace(`\n\n\n'use strict'`, `\n\n'use strict'`);
};

module.exports.parse = parse;
function parse(source, {parser = 'babel', isTS, isFlow, isJSX} = {}) {
    const ast = recast.parse(source, {
        parser: getParser({
            parser,
            isTS,
            isFlow,
            isJSX,
        }),
    });
    
    return ast;
}

module.exports.print = print;
function print(ast) {
    const printOptions = {
        quote: 'single',
        objectCurlySpacing: false,
    };
    
    const printed = recast.print(ast, printOptions).code;
    const code = fixStrictMode(printed);
    
    return code;
}

module.exports.traverse = traverse;
module.exports.types = types;
module.exports.template = template;
module.exports.generate = generate;
module.exports.initReport = require('./report');
module.exports.operate = require('@putout/operate');

module.exports.merge = require('./merge');
module.exports.ignores = require('./ignores');
module.exports.parseMatch = require('./parse-match');

