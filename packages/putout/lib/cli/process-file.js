'use strict';

const tryToCatch = require('try-to-catch');
const eslint = require('@putout/eslint');

const {putoutAsync} = require('../..');
const merge = require('../merge');
const parseMatch = require('../parse-options/parse-match');

const {simpleImport} = require('./simple-import');
const parseError = require('./parse-error');

const getMatchedOptions = (name, options) => {
    if (!name.includes('{'))
        return options;
    
    return merge(options, parseMatch(name, options.match));
};

module.exports = ({fix, fixCount, isFlow, logError, raw, printer}) => async function processFile({name, source, startLine, options, again}) {
    const {configurePrinter} = await import('./printer/printer.mjs');
    const isTS = /\.tsx?$/.test(name) || /{tsx?}$/.test(name);
    const matchedOptions = getMatchedOptions(name, options);
    
    const [e, result] = await tryToCatch(putoutAsync, source, {
        fix,
        fixCount,
        isTS,
        isFlow,
        ...matchedOptions,
        printer: configurePrinter(name, printer),
    });
    
    if (!again && e) {
        raw && logError(e);
        
        const {lint} = await simpleImport('samadhi');
        const [code, places] = await lint(source, {
            startLine,
            fix,
            isTS,
        });
        
        if (!fix && places.length)
            return {
                code,
                places,
            };
        
        if (fix && !places.length)
            return await processFile({
                again: true,
                name,
                source: code,
                startLine,
                options,
            });
    }
    
    const {code = source} = result || {};
    const allPlaces = result ? result.places : parseError(e);
    
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
