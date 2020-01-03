'use strict';

const {resolve} = require('path');

const {
    readFileSync,
    writeFileSync,
} = require('fs');

const tryCatch = require('try-catch');
const once = require('once');

const putout = require('..');
const {ignores} = putout;

const cwd = process.cwd();

const report = require('../lib/report')();
const parseOptions = require('../lib/parse-options');
const eslint = require('../lib/eslint');

const getFormatter = once(_getFormatter);

module.exports = ({fix, fixCount, rulesdir, format, isFlow, isJSX, ruler, console, raw, exit}) => (name, index, {length}) => {
    const resolvedName = resolve(name)
        .replace(/^\./, cwd);
    
    const options = parseOptions({
        name: resolvedName,
        rulesdir,
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
        
        if (fix && source !== newCode)
            return writeFileSync(name, newCode);
    }
    
    const line = report(currentFormat, {
        name: resolvedName,
        places: allPlaces,
        index,
        count: length,
        source,
    });
    
    process.stdout.write(line || '');
    
    e && raw && console.error(e);
    
    return allPlaces;
};

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
