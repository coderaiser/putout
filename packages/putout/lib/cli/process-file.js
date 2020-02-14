'use strict';

const {resolve, dirname} = require('path');

const {
    readFileSync,
    writeFileSync,
} = require('fs');

const tryCatch = require('try-catch');
const once = require('once');

const putout = require('../..');
const {ignores} = putout;

const cwd = process.cwd();

const report = require('../report')();
const parseOptions = require('../parse-options');
const eslint = require('../eslint');

const getFormatter = once(_getFormatter);

function getOptions({noOptions, name, rulesdir}) {
    if (noOptions)
        return {
            formatter: 'dump',
            dir: dirname(name),
        };
    
    return parseOptions({
        name,
        rulesdir,
    });
}

module.exports = ({fix, fileCache, fixCount, rulesdir, format, isFlow, isJSX, ruler, logError, raw, exit, noOptions}) => (name, index, {length}) => {
    const resolvedName = resolve(name)
        .replace(/^\./, cwd);
    
    const options = getOptions({
        name: resolvedName,
        rulesdir,
        
        noOptions,
    });
    
    const {
        dir,
        formatter,
    } = options;
    
    const currentFormat = getFormatter(format || formatter, exit);
    
    if (ignores(dir, resolvedName, options)) {
        const line = report(currentFormat, {
            name: resolvedName,
            places: [],
            index,
            count: length,
            source: '',
        });
        
        process.stdout.write(line || '');
        return null;
    }
    
    const source = readFileSync(name, 'utf8');
    const isTS = /\.ts$/.test(name);
    
    if (fileCache.canUseCache({fix, options, name: resolvedName})) {
        const places = fileCache.getPlaces(resolvedName);
        
        const line = report(currentFormat, {
            name: resolvedName,
            places,
            index,
            count: length,
            source,
        });
        
        process.stdout.write(line || '');
        return places;
    }
    
    const [e, result] = tryCatch(putout, source, {
        fix,
        fixCount,
        isTS,
        isFlow,
        isJSX,
        ...options,
    });
    
    const allPlaces = parseError(e);
    
    if (!e) {
        const {code, places} = result;
        allPlaces.push(...places);
        
        if (ruler.disable || ruler.enable || ruler.disableAll || ruler.enableAll)
            return places;
        
        const rawOrFixed = fix ? code : source;
        const [newCode, newPlaces] = eslint({
            name,
            code: rawOrFixed,
            fix,
        });
        
        allPlaces.push(...newPlaces);
        fileCache.setInfo(resolvedName, allPlaces, options);
        
        if (fix && source !== newCode) {
            fileCache.removeEntry(resolvedName);
            return writeFileSync(name, newCode);
        }
    }
    
    const line = report(currentFormat, {
        name: resolvedName,
        places: allPlaces,
        index,
        count: length,
        source,
    });
    
    process.stdout.write(line || '');
    
    e && raw && logError(e);
    
    return allPlaces;
};

module.exports._getFormatter = _getFormatter;
function _getFormatter(name, exit) {
    let e;
    let reporter;
    
    [e, reporter] = tryCatch(require, `@putout/formatter-${name}`);
    
    if (!e)
        return reporter;
    
    [e, reporter] = tryCatch(require, `putout-formatter-${name}`);
    
    if (e)
        exit(e);
    
    return reporter;
}

const cutBrackets = (a) => a.slice(0, a.lastIndexOf('('));

function parseError(e) {
    if (!e)
        return [];
    
    const {
        line,
        column,
    } = e.loc || {
        line: 'x',
        column: 'x',
    };
    
    const {message} = e;
    
    return [{
        message: cutBrackets(message),
        rule: 'parser',
        position: {
            line,
            column,
        },
    }];
}
