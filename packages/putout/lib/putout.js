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
    
    if (!opts.fix)
        return {
            code: source,
            places,
        };
    
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
        cache,
        rules,
        fix,
        fixCount,
        parser,
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
        parser,
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
};

module.exports.ignores = require('./ignores');
module.exports.codeframe = require('./codeframe');

