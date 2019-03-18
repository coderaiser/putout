'use strict';

const getPath = (item) => item.path || item;
const runFix = require('./run-fix');

const traverse = require('@babel/traverse').default;
const types = require('@babel/types');

module.exports = ({ast, fix, fixCount, plugins}) => {
    let places = [];
    
    for (let i = 0; i < fixCount; i++) {
        places = run({
            ast,
            fix,
            plugins,
        });
        
        if (!fix || !places.length)
            return places;
    }
    
    return places;
};

function run({ast, fix, plugins}) {
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
            const position = getPosition(path);
            
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

function getPosition(path) {
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
        line,
        column,
    };
}

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

