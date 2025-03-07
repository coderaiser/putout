'use strict';

const process = require('node:process');
const tryToCatch = require('try-to-catch');
const eslint = require('@putout/eslint');
const {parseMatch} = require('putout/parse-match');
const {mergeOptions} = require('putout/merge-options');
const parseError = require('putout/parse-error');
const {putoutAsync} = require('putout');
const once = require('once');

const {simpleImport: _simpleImport} = require('./simple-import');

const getMatchedOptions = (name, options) => {
    if (!name.includes('{'))
        return options;
    
    return mergeOptions(options, parseMatch(name, options.match));
};

const getEnv = once(() => process.env);

module.exports = ({fix, fixCount, logError, raw}) => async function processFile(overrides) {
    const {
        name = '<input>',
        source,
        startLine,
        options = {},
        again,
        env = getEnv(),
        simpleImport = _simpleImport,
    } = overrides;
    
    const {configurePrinter} = await import('./printer/printer.mjs');
    const isTS = /\.tsx?$/.test(name) || /{tsx?}$/.test(name);
    const {printer, ...matchedOptions} = getMatchedOptions(name, options);
    
    const [e, result] = await tryToCatch(putoutAsync, source, {
        fix,
        fixCount,
        isTS,
        ...matchedOptions,
        printer: configurePrinter(name, printer),
    });
    
    e && raw && logError(e);
    
    const {FLATLINT} = env;
    
    if (FLATLINT || !again && e && e.reason === 'parse') {
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

function formatPlaces(line = 0, places) {
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
