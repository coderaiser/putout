'use strict';

const {resolve} = require('path');

const {
    readFileSync,
    writeFileSync,
} = require('fs');

const {
    red,
    grey,
    underline,
} = require('chalk');

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
    
    if (e) {
        showError({
            e,
            raw,
            source,
            resolvedName,
            console,
        });
        
        return null;
    }
    
    const {code, places} = result;
    
    if (ruler.disable || ruler.enable || ruler.disableAll || ruler.enableAll)
        return places;
    
    const rawOrFixed = fix ? code : source;
    const [newCode, newPlaces] = eslint({
        name,
        code: rawOrFixed,
        fix,
    });
    
    if (fix && source !== newCode)
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
        source,
    });
    
    process.stdout.write(line || '');
    
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

function showError({e, raw, source, resolvedName, console}) {
    console.error(underline(resolvedName));
    
    const {
        line,
        column,
    } = e.loc;
    
    const {message} = e;
    
    if (!raw)
        return console.log(`${grey(`${line}:${column}`)} ${red(e.message)}`);
    
    const {codeFrameColumns} = require('@babel/code-frame');
    const location = {
        start: {
            line,
            column,
        },
    };
    
    const result = codeFrameColumns(source, location, {
        highlightCode: true,
        message,
    });
    
    console.log(result, '\n\n', e);
}

