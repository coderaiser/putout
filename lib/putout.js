'use strict';

const recast = require('recast');
const alignSpaces = require('align-spaces');
const cherow = require('cherow');
const toBabel = require('estree-to-babel');

const cutShebang = require('./cut-shebang');
const getPlugins = require('./get-plugins');

const parser = {
    parse(source) {
        return toBabel(cherow.parse(source, {
            loc: true,
        }));
    },
};

const getOpts = () => ({
    plugins: getPlugins(),
});

module.exports = (source, opts = getOpts()) => {
    const [clearSource, shebang] = cutShebang(source);
    
    const ast = parse(clearSource);
    
    const errors = [];
    for (const plugin of opts.plugins) {
        const {message} = plugin;
        const places = plugin(ast);
        
        if (!places.length)
            continue;
        
        for (const place of places) {
            errors.push({
                message,
                ...place,
            });
        }
    }
    
    const {code} = recast.print(ast);
    const aligned = alignSpaces(code);
    
    return {
        code: `${shebang}${aligned}`,
        places: errors,
    };
};

module.exports.parse = parse;
function parse(source) {
    const ast = recast.parse(source, {
        parser,
        tokens: false,
    });
    
    return ast;
}

