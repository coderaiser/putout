'use strict';

const getPath = (item) => item.path || item;
const runFix = require('./run-fix');

const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');

module.exports = ({ast, shebang, fix, fixCount, plugins}) => {
    let places = [];
    
    for (let i = 0; i < fixCount; i++) {
        places = run({
            ast,
            fix,
            shebang,
            plugins,
        });
        
        if (!fix || !places.length)
            return places;
    }
    
    return places;
};

function run({ast, fix, shebang, plugins}) {
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
            
            runFix(fix, plugin.fix, {
                path: item,
                position,
            });
        }
    }
    
    return places;
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

function superFind(find, ast) {
    const pushItems = [];
    const push = (a) => {
        pushItems.push(a);
    };
    
    const returnItems = find(ast, {
        traverse,
        generate,
        types,
        push,
    });
    
    return [
        ...pushItems,
        ...(returnItems || []),
    ];
}

