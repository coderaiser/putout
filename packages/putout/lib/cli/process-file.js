'use strict';

const tryCatch = require('try-catch');

const putout = require('../..');

const eslint = require('./eslint');
const parseError = require('./parse-error');

const merge = require('../merge');
const parseMatch = require('../parse-options/parse-match');

const getMatchedOptions = (name, options) => {
    if (!name.includes('{'))
        return options;
    
    return merge(options, parseMatch(name, options.match));
};

module.exports = ({fix, fixCount, isFlow, isJSX, ruler = {}, logError, raw}) => async ({name, source, startLine, options}) => {
    const isTS = /\.tsx?$/.test(name) || /{ts}$/.test(name);
    const matchedOptions = getMatchedOptions(name, options);
    
    const [e, result] = tryCatch(putout, source, {
        fix,
        fixCount,
        isTS,
        isFlow,
        isJSX,
        ...matchedOptions,
    });
    
    if (e) {
        raw && logError(e);
    }
    
    const {code = source} = result || {};
    const allPlaces = result ? result.places : parseError(e);
    
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

function formatPlaces(line = 1, places) {
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

