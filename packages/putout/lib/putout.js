'use strict';

const recast = require('recast');
const toBabel = require('estree-to-babel');
const traverse = require('@babel/traverse').default;
const template = require('@babel/template').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');

const cutShebang = require('./cut-shebang');
const getPlugins = require('./get-plugins');
const fix = require('./fix');
const customParser = require('./custom-parser');

const isUndefined = (a) => typeof a === 'undefined';

const printOptions = {
    quote: 'single',
};

const getParser = (parser) => ({
    parse(source) {
        return toBabel(customParser(source, parser));
    },
});

const defaultOpts = (opts = {}) => {
    if (isUndefined(opts.fix))
        return {
            ...opts,
            fix: true,
        };
    
    return opts;
};

module.exports = (source, opts) => {
    opts = defaultOpts(opts);
    const {parser} = opts;
    
    const [clearSource, shebang] = cutShebang(source);
    
    const ast = parse(clearSource, parser);
    const plugins = getPlugins(opts);
    const places = [];
    
    for (const [rule, plugin] of plugins) {
        const {
            report,
            find,
        } = plugin;
        
        const items = superFind(find, ast);
        
        if (!items.length)
            continue;
        
        for (const item of items) {
            const path = getPath(item);
            const message = report(item);
            const position = getPosition(path, shebang);
            
            places.push({
                rule,
                message,
                position,
            });
            
            fix(opts.fix, plugin.fix, {
                path: item,
                position,
            });
        }
    }
    
    const {code: printed} = recast.print(ast, printOptions);
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

function superFind(find, ast) {
    const pushItems = [];
    const push = pushItems.push.bind(pushItems);
    const returnItems = find(ast, {
        traverse,
        types,
        push,
    });
    
    return [
        ...pushItems,
        ...(returnItems || []),
    ];
}

module.exports.parse = parse;
function parse(source, parser = 'babel') {
    const ast = recast.parse(source, {
        parser: getParser(parser),
    });
    
    return ast;
}

module.exports.traverse = traverse;
module.exports.types = types;
module.exports.template = template;
module.exports.generate = generate;
module.exports.prettify = require('./prettify');

function getPath(item) {
    return item.path || item;
}

function getPosition(path, shebang) {
    const {node} = path;
    const {loc} = node;
    
    if (!loc)
        return {
            line: 'x',
            column: 'x',
        };
    
    const {
        line,
        column,
    } = node.loc.start;
    
    return {
        line: shebang ? line + 1 : line,
        column,
    };
}

