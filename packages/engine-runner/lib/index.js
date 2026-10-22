import {traverse as defaultTraverse} from '@putout/babel';
import once from 'once';
import {clearWatermark} from '@putout/operator-watermark';
import {createDebug} from '#debug';
import {createProgress} from '#progress';
import runFix from './run-fix.js';
import mergeVisitors from './merge-visitors.js';
import superFind from './super-find.js';
import {tryThrowWithReason} from './try-throw-with-reason.js';
import {getPath, getPosition} from './get-position.js';
import {buildPlugin} from './builder/index.js';

const debug = createDebug('putout:runner:find');
const isRemoved = (a) => a?.removed;

export const runPlugins = ({ast, fix, fixCount = 2, plugins, progress = createProgress(), traverse = defaultTraverse}) => {
    let places = [];
    
    const merge = once(mergeVisitors);
    const {
        pluginsFind,
        pluginsTraverse,
    } = splitPlugins(plugins, {
        progress,
    });
    
    for (let i = 0; i < fixCount; i++) {
        places = run({
            ast,
            fix,
            pluginsFind,
            pluginsTraverse,
            merge,
            traverse,
        });
        
        progress.reset();
        
        if (!fix || !places.length)
            return places;
        
        const {program} = ast;
        
        clearWatermark(program);
    }
    
    return places;
};

export {
    getPosition,
};

const run = ({ast, fix, pluginsFind, pluginsTraverse, merge, traverse}) => [
    ...runWithoutMerge({
        ast,
        fix,
        pluginsFind,
        traverse,
    }),
    ...runWithMerge({
        ast,
        fix,
        pluginsTraverse,
        merge,
        traverse,
    }),
];

function runWithMerge({ast, fix, pluginsTraverse, merge, traverse}) {
    const {entries, visitor} = merge(pluginsTraverse, {
        fix,
    });
    
    tryThrowWithReason(traverse, ast, visitor);
    
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

function runWithoutMerge({ast, fix, pluginsFind, traverse}) {
    const places = [];
    
    for (const {rule, plugin, msg, options} of pluginsFind) {
        debug(`find: ${rule}`);
        
        const {report, find} = plugin;
        
        const items = tryThrowWithReason(superFind, {
            rule,
            find,
            ast,
            options,
            fix,
            traverse,
        });
        
        if (!items.length)
            continue;
        
        for (const item of items) {
            const message = msg || report(item);
            const {parentPath} = getPath(item);
            const position = getPosition(item);
            
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
                options,
            });
        }
    }
    
    return places;
}

function splitPlugins(plugins, {progress}) {
    const pluginsFind = [];
    const pluginsTraverse = [];
    
    for (const item of plugins) {
        const {plugin} = item;
        
        if (plugin.find) {
            pluginsFind.push(item);
            continue;
        }
        
        const result = buildPlugin(item, {
            progress,
        });
        
        if (result)
            pluginsTraverse.push(result);
    }
    
    return {
        pluginsFind,
        pluginsTraverse,
    };
}
