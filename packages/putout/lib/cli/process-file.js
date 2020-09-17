'use strict';

const {resolve, dirname} = require('path');

const {
    readFile,
    writeFile,
} = require('fs').promises;

const tryCatch = require('try-catch');
const memo = require('nano-memoize');

const putout = require('../..');

const report = require('./report')();
const parseOptions = require('../parse-options');
const eslint = require('./eslint');
const {
    parseError,
    parseName,
} = require('./parse-error');
const buildPlugins = require('./build-plugins');

const {ignores} = putout;
const cwd = process.cwd();
const getFormatter = memo(require('./formatter').getFormatter);

const isParsingError = ({rule}) => rule === 'eslint/null';

function getOptions({noConfig, plugins, name, transform, rulesdir}) {
    const transformPlugins = buildPlugins(transform);
    
    if (noConfig)
        return {
            formatter: 'dump',
            dir: dirname(name),
            plugins: [
                ...plugins,
                ...transformPlugins,
            ],
        };
    
    const result = parseOptions({
        name,
        rulesdir,
    });
    
    return {
        ...result,
        plugins: [
            ...result.plugins,
            ...transformPlugins,
        ],
    };
}

module.exports = ({write, fix, debug, transform, fileCache, fixCount, rulesdir, format, isFlow, isJSX, ruler, logError, raw, exit, noConfig, plugins = []}) => async (name, index, {length}) => {
    const resolvedName = resolve(name)
        .replace(/^\./, cwd);
    
    const options = getOptions({
        name: resolvedName,
        rulesdir,
        noConfig,
        transform,
        plugins,
    });
    
    const {
        dir,
        formatter,
    } = options;
    
    const [currentFormat, formatterOptions] = getFormatter(format || formatter, exit);
    
    if (ignores(dir, resolvedName, options)) {
        const line = report(currentFormat, {
            formatterOptions,
            name: resolvedName,
            places: [],
            index,
            count: length,
            source: '',
        });
        
        write(line);
        return [];
    }
    
    const source = await readFile(name, 'utf8');
    const isTS = /\.tsx?$/.test(name);
    
    if (fileCache.canUseCache({fix,
        options,
        name: resolvedName})) {
        const places = fileCache.getPlaces(resolvedName);
        
        const line = report(currentFormat, {
            formatterOptions,
            name: resolvedName,
            places,
            index,
            count: length,
            source,
        });
        
        write(line);
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
    
    if (e) {
        raw && logError(e);
    }
    
    const {code = source} = result || {};
    const allPlaces = result ? result.places : parseError(e, {
        debug,
    });
    
    if (ruler.disable || ruler.enable || ruler.disableAll || ruler.enableAll)
        return allPlaces;
    
    const rawOrFixed = fix ? code : source;
    const [newCode, newPlaces] = await eslint({
        name,
        code: rawOrFixed,
        fix,
    });
    
    allPlaces.push(...newPlaces);
    
    const fixable = !newPlaces.filter(isParsingError).length;
    
    if (fixable)
        fileCache.setInfo(resolvedName, allPlaces, options);
    
    if (fix && source !== newCode) {
        fileCache.removeEntry(resolvedName);
        await writeFile(name, newCode);
    }
    
    const line = await makeReport(e, {
        debug,
        report,
        currentFormat,
        formatterOptions,
        name: resolvedName,
        source,
        places: allPlaces,
        index,
        count: length,
    });
    
    write(line || '');
    
    return allPlaces;
};

async function makeReport(e, {debug, formatterOptions, report, currentFormat, name, source, places, index, count}) {
    const parsed = parseName(e);
    const {loc} = e || {};
    const isDebug = parsed && !loc && debug;
    
    source = isDebug ? await readFile(parsed, 'utf8') : source;
    name = isDebug ? parsed : name;
    
    return report(currentFormat, {
        formatterOptions,
        name,
        places,
        index,
        count,
        source,
    });
}
