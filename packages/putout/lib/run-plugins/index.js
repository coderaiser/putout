'use strict';

const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');
const once = require('once');

const runFix = require('./run-fix');
const mergeVisitors = require('./merge-visitors');

const {
    getPath,
    getPosition,
} = require('./get-position');

const isRemoved = (a) => a && a.removed;

module.exports = ({ast, shebang, fix, fixCount, plugins}) => {
    let places = [];
    
    const merge = once(mergeVisitors);
    for (let i = 0; i < fixCount; i++) {
        places = run({
            ast,
            fix,
            shebang,
            plugins,
            merge,
        });
        
        if (!fix || !places.length)
            return places;
    }
    
    return places;
};

module.exports.getPosition = getPosition;

function run({ast, fix, shebang, plugins, merge}) {
    return [
        ...runWithoutMerge({ast, fix, shebang, plugins}),
        ...runWithMerge({ast, fix, shebang, plugins, merge}),
    ];
}

const isFind = ({plugin}) => plugin.find;
const isTraverse = ({plugin}) => plugin.traverse;

function runWithMerge({ast, fix, shebang, plugins, merge}) {
    const pluginsToMerge = plugins.filter(isTraverse);
    const {entries, visitor} = merge(pluginsToMerge, {
        fix,
        shebang,
    });
    
    traverse(ast, visitor);
    
    const places = [];
    for (const [rule, pull] of entries) {
        const items = pull();
        for (const {message, position} of items) {
            places.push({
                rule,
                message,
                position,
            });
        }
    }
    
    return places;
}

function runWithoutMerge({ast, fix, shebang, plugins}) {
    const places = [];
    const pluginsNotToMerge = plugins.filter(isFind);
    
    for (const {rule, plugin, msg, options} of pluginsNotToMerge) {
        const {
            report,
            find,
        } = plugin;
        
        const items = superFind({
            find,
            ast,
            options,
        });
        
        if (!items.length)
            continue;
        
        for (const item of items) {
            const message = msg || report(item);
            const {parentPath} = getPath(item);
            const position = getPosition(item, shebang);
            
            places.push({
                rule,
                message,
                position,
            });
            
            if (isRemoved(parentPath))
                continue;
            
            runFix(fix, plugin.fix, {
                path: item,
                position,
            });
        }
    }
    
    return places;
}

function superFind({find, ast, options}) {
    const pushItems = [];
    const push = (a) => {
        pushItems.push(a);
    };
    
    const returnItems = find(ast, {
        traverse,
        generate,
        types,
        push,
        options,
    });
    
    return [
        ...pushItems,
        ...returnItems || [],
    ];
}

