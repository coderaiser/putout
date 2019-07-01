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

const isUndefined = (a) => typeof a === 'undefined';
const {assign} = Object;

const getParser = ({parser, isTS}) => ({
    parse(source) {
        return toBabel(customParser({source, parser, isTS}));
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
        fixCount,
        fix,
        isTS,
    } = opts;
    
    const [clearSource, shebang] = cutShebang(source);
    
    const ast = parse(clearSource, {parser, isTS});
    const plugins = getPlugins(opts);
    const places = runPlugins({
        ast,
        shebang,
        fix,
        fixCount,
        plugins,
    });
    
    const printed = print(ast);
    const code = fixStrictMode(`${shebang}${printed}`);
    
    return {
        code,
        places,
    };
};

const fixStrictMode = (a) => {
    return a
        .replace(`\n\n\n'use strict'`, `\n\n'use strict'`);
};

module.exports.parse = parse;
function parse(source, {parser = 'babel', isTS} = {}) {
    const ast = recast.parse(source, {
        parser: getParser({parser, isTS}),
    });
    
    return ast;
}

module.exports.print = print;
function print(ast) {
    const printOptions = {
        quote: 'single',
        objectCurlySpacing: false,
    };
    
    return recast
        .print(ast, printOptions)
        .code;
}

module.exports.traverse = traverse;
module.exports.types = types;
module.exports.template = template;
module.exports.generate = generate;
module.exports.initReport = require('./report');
module.exports.operate = require('@putout/operate');

