'use strict';

const recast = require('recast');
const alignSpaces = require('align-spaces');
const espree = require('espree');
const toBabel = require('estree-to-babel');

const cutShebang = require('./cut-shebang');
const getPlugins = require('./get-plugins');
const fix = require('./fix');

const isUndefined = (a) => typeof a === 'undefined';

const parser = {
    parse(source) {
        return toBabel(espree.parse(source, {
            loc: true,
            comment: true,
            ecmaVersion: 2019,
        }));
    },
};

const defaultOpts = (opts = {}) => {
    if (isUndefined(opts.fix))
        return {
            ...opts,
            fix: true
        };
    
    return opts;
};

module.exports = (source, opts) => {
    opts = defaultOpts(opts);
    
    const [clearSource, shebang] = cutShebang(source);
    
    const ast = parse(clearSource);
    const plugins = getPlugins(opts);
    const places = [];
    
    for (const plugin of plugins) {
        const {message} = plugin;
        const items = plugin.find(ast);
        
        if (!items.length)
            continue;
        
        for (const item of items) {
            const path = getPath(item);
            const position = getPosition(path);
            
            places.push({
                message,
                position,
                ...item,
            });
            
            fix(opts.fix, plugin.fix, {
                path,
                position,
            });
        }
    }
    
    const printed = recast.print(ast).code;
    const aligned = alignSpaces(printed);
    const code = fixStrictMode(`${shebang}${aligned}`);
    
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
function parse(source) {
    const ast = recast.parse(source, {
        parser,
        tokens: false,
    });
    
    return ast;
}

function getPath(item) {
    return item.path || item;
}

function getPosition(path) {
    const {node} = path;
    
    const {
        line,
        column,
    } = node.loc.start;
    
    return {
        line,
        column,
    };
}

