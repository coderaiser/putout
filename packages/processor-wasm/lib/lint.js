import tryCatch from 'try-catch';

import {traverse} from '@webassemblyjs/ast';
import {parse} from '@webassemblyjs/wast-parser';
import {print} from '@webassemblyjs/wast-printer';

import {rules} from './rules/index.js';

export const lint = (source, {fix} = {}) => {
    const [error, ast] = tryCatch(parse, source);
    
    if (error)
        return {
            places: [
                parseError(error),
            ],
        };
    
    const allPlaces = [];
    
    for (const [rule, plugin] of rules) {
        const places = [];
        const push = places.push.bind(places);
        
        traverse(ast, plugin.traverse({push}));
        
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

function parseError({message}) {
    return {
        rule: 'wasm-parser-error (wasm)',
        message,
        position: {
            line: 1,
            column: 0,
        },
    };
}

function convertPlaces(rule, rawPlaces, plugin) {
    const places = [];
    
    for (const path of rawPlaces) {
        const {line, column} = path.node.loc.start;
        
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
