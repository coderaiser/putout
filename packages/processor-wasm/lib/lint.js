import {tryCatch} from 'try-catch';
import {parse} from '@webassemblyjs/wast-parser';
import {print} from '@webassemblyjs/wast-printer';
import {traverse} from './traverser.js';
import {find} from './finder.js';

const {entries} = Object;
const {isArray} = Array;

export const lint = (source, overrides = {}) => {
    const {fix = true, plugins} = overrides;
    const [error, ast] = tryCatch(parse, source);
    
    if (error)
        return {
            places: [
                parseError(error),
            ],
        };
    
    const allPlaces = [];
    
    for (const [rule, plugin] of parsePlugins(plugins)) {
        const places = [];
        const push = places.push.bind(places);
        
        run(ast, plugin, {
            push,
        });
        
        if (!places.length)
            continue;
        
        if (fix) {
            for (const place of places)
                plugin.fix(place);
            
            continue;
        }
        
        allPlaces.push(...convertPlaces(rule, places, plugin));
    }
    
    return {
        places: allPlaces,
        code: print(ast),
    };
};

function run(ast, plugin, {push}) {
    if (plugin.traverse)
        return traverse(ast, plugin, {
            push,
        });
    
    return find(ast, plugin, {
        push,
        traverse,
    });
}

function parsePlugins(plugins) {
    const result = [];
    
    for (const plugin of plugins) {
        if (isArray(plugin)) {
            result.push(plugin);
            continue;
        }
        
        result.push(...entries(plugin));
    }
    
    return result;
}

const parseError = ({message}) => ({
    rule: 'wasm-parser-error (wasm)',
    message,
    position: {
        line: 1,
        column: 1,
    },
});

const parsePath = (path) => path.path || path;

function convertPlaces(rule, rawPlaces, plugin) {
    const places = [];
    
    for (const path of rawPlaces) {
        const currentPath = parsePath(path);
        
        const {line, column} = currentPath.node.loc?.start || {
            line: 0,
            column: 1,
        };
        
        places.push({
            rule: `${rule} (wasm)`,
            message: plugin.report(path),
            position: {
                line,
                column,
            },
        });
    }
    
    return places;
}
