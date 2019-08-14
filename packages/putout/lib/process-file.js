'use strict';

const {resolve} = require('path');

const {
    readFileSync,
    writeFileSync,
} = require('fs');

const {
    red,
    grey,
} = require('chalk');

const cwd = process.cwd();

const tryCatch = require('try-catch');
const once = require('once');

const putout = require('..');
const {ignores} = putout;

const report = require('../lib/report')();
const parseOptions = require('../lib/parse-options');
const eslint = require('../lib/eslint');

const getFormatter = once(_getFormatter);

module.exports = ({fix, fixCount, rulesdir, format, isFlow, isJSX}) => (name, index, {length}) => {
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
    
    const currentFormat = getFormatter(format || formatter);
    
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
    
    const input = readFileSync(name, 'utf8');
    const isTS = /\.ts$/.test(name);
    
    const [e, result] = tryCatch(putout, input, {
        fix,
        fixCount,
        isTS,
        isFlow,
        isJSX,
        ...options,
    });
    
    if (e) {
        const {
            line,
            column,
        } = e.position || {
            line: 'x',
            column: 'x',
        };
        
        e.message = `${grey(`${line}:${column}`)} ${red(e.message)}`;
        return null;
    }
    
    const {code, places} = result;
    const rawOrFixed = fix ? code : input;
    const [newCode, newPlaces] = eslint({
        name,
        code: rawOrFixed,
        fix,
    });
    
    //if (argv.disable || argv.enable || argv.disableAll || argv.enableAll)
    //    return places;
    
    if (fix && input !== newCode)
        return writeFileSync(name, newCode);
    
    const allPlaces = [
        ...places,
        ...newPlaces,
    ];
    
    const line = report(currentFormat, {
        name: resolvedName,
        places: allPlaces,
        index,
        count: length,
        source: input,
    });
    
    process.stdout.write(line || '');
    
    return allPlaces;
};

function exit(e) {
    !e;
    
    if (typeof e === 'number')
        return;
}

function _getFormatter(name) {
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

