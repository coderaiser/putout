'use strict';

const traverse = require('@babel/traverse').default;
const once = require('once');
const debug = require('debug')('putout:runner:find');

const runFix = require('./run-fix');
const mergeVisitors = require('./merge-visitors');
const superFind = require('./super-find');
const include = require('./include');
const replace = require('./replace');

const {
    getPath,
    getPosition,
} = require('./get-position');

const isRemoved = (a) => a && a.removed;

module.exports.runPlugins = ({ast, shebang, fix, fixCount, plugins, template = require('./template')}) => {
    let places = [];
    
    const merge = once(mergeVisitors);
    const {
        pluginsFind,
        pluginsTraverse,
    } = splitPlugins(plugins, {
        template,
    });
    
    for (let i = 0; i < fixCount; i++) {
        places = run({
            ast,
            fix,
            shebang,
            pluginsFind,
            pluginsTraverse,
            merge,
            template,
        });
        
        if (!fix || !places.length)
            return places;
    }
    
    return places;
};

module.exports.getPosition = getPosition;

function run({ast, fix, shebang, pluginsFind, pluginsTraverse, template, merge}) {
    return [
        ...runWithoutMerge({ast, fix, shebang, template, pluginsFind}),
        ...runWithMerge({ast, fix, shebang, template, pluginsTraverse, merge}),
    ];
}

function runWithMerge({ast, fix, shebang, template, pluginsTraverse, merge}) {
    const {entries, visitor} = merge(pluginsTraverse, {
        fix,
        shebang,
        template,
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

function runWithoutMerge({ast, fix, shebang, template, pluginsFind}) {
    const places = [];
    
    for (const {rule, plugin, msg, options} of pluginsFind) {
        debug(`find: ${rule}`);
        const {
            report,
            find,
        } = plugin;
        
        const items = superFind({
            rule,
            find,
            ast,
            options,
            fix,
            shebang,
            template,
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
                rule,
                position,
            });
        }
    }
    
    return places;
}

function splitPlugins(plugins, {template}) {
    const pluginsFind = [];
    const pluginsTraverse = [];
    
    for (const item of plugins) {
        const {plugin} = item;
        
        if (plugin.find)
            pluginsFind.push(item);
        
        if (plugin.traverse)
            pluginsTraverse.push(item);
        
        if (plugin.replace) {
            pluginsTraverse.push(include(replace(item, {
                template,
            })));
            continue;
        }
        
        if (plugin.include) {
            pluginsTraverse.push(include(item));
            continue;
        }
    }
    
    return {
        pluginsFind,
        pluginsTraverse,
    };
}

