'use strict';

const tryCatch = require('try-catch');

const putout = require('../..');

const eslint = require('./eslint');
const {parseError} = require('./parse-error');

module.exports = ({fix, debug, fixCount, isFlow, isJSX, ruler = {}, logError, raw}) => async ({name, source, startLine, options}) => {
    const isTS = /\.tsx?$/.test(name) || /\{ts\}$/.test(name);
    const [e, result] = tryCatch(putout, source, {
        fix,
        fixCount,
        isTS,
        isFlow,
        isJSX,
        ...options,
    });
    
    if (e) {
        raw && logError(e);
    }
    
    const {code = source} = result || {};
    const allPlaces = result ? result.places : parseError(e, {
        debug,
    });
    
    if (ruler.disable || ruler.enable || ruler.disableAll || ruler.enableAll)
        return {
            places: formatPlaces(startLine, allPlaces),
            code,
        };
    
    const [newCode, newPlaces] = await eslint({
        name,
        code,
        fix,
    });
    
    allPlaces.push(...newPlaces);
    
    const places = formatPlaces(startLine, allPlaces);
    
    return {
        places,
        code: newCode,
    };
};

function formatPlaces(line, places) {
    const newPlaces = [];
    
    for (const place of places) {
        const {position} = place;
        
        newPlaces.push({
            ...place,
            position: {
                ...position,
                line: line + position.line,
            },
        });
    }
    
    return newPlaces;
}

