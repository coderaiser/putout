'use strict';

const getPath = (item) => item.path || item;
const runFix = require('./run-fix');

const traverse = require('@babel/traverse').default;
const {merge} = traverse.visitors;
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
    return [
        ...runWithoutMerge({ast, fix, shebang, plugins}),
        ...runWithMerge({ast, fix, shebang, plugins}),
    ];
}

function runWithMerge({ast, fix, shebang, plugins}) {
    const pluginsToMerge = plugins.filter(([, a]) => a.traverse);
    
    const mergeItems = [];
    const pushed = {};
    
    for (const [rule, plugin] of pluginsToMerge) {
        pushed[rule] = {
            items: [],
            plugin,
        };
        const push = (a) => {
            pushed[rule].items.push(a);
        };
        
        mergeItems.push(plugin.traverse({
            push,
            generate,
        }));
    }
    
    traverse(ast, merge(mergeItems));
    
    const places = [];
    const entries = Object.entries(pushed);
    
    for (const [rule, {items, plugin}] of entries) {
        for (const item of items) {
            const path = getPath(item);
            const message = plugin.report(item);
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

function runWithoutMerge({ast, fix, shebang, plugins}) {
    const places = [];
    const pluginsNotToMerge = plugins.filter(([, a]) => a.find);
    
    for (const [rule, plugin] of pluginsNotToMerge) {
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
        ...returnItems || [],
    ];
}

