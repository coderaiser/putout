'use strict';

const {dirname} = require('path');

const {readFile} = require('fs').promises;

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

module.exports = ({write, fix, debug, transform, fileCache, fixCount, rulesdir, format, isFlow, isJSX, ruler, logError, raw, exit, noConfig, plugins = []}) => async ({name, source, index, length}) => {
    const options = getOptions({
        name,
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
    
    if (ignores(dir, name, options)) {
        const line = report(currentFormat, {
            formatterOptions,
            name,
            places: [],
            index,
            count: length,
            source: '',
        });
        
        write(line);
        
        return {
            places: [],
            code: source,
        };
    }
    
    if (fileCache.canUseCache({fix, options, name})) {
        const places = fileCache.getPlaces(name);
        const line = report(currentFormat, {
            formatterOptions,
            name,
            places,
            index,
            count: length,
            source,
        });
        
        write(line);
        
        return {
            places,
            code: source,
        };
    }
    
    const isTS = /\.tsx?$/.test(name);
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
            places: allPlaces,
            code,
        };
    
    const [newCode, newPlaces] = await eslint({
        name,
        code,
        fix,
    });
    
    allPlaces.push(...newPlaces);
    
    const fixable = !newPlaces.filter(isParsingError).length;
    
    if (fixable)
        fileCache.setInfo(name, allPlaces, options);
    
    if (fix && source !== newCode)
        fileCache.removeEntry(name);
    
    const line = await makeReport(e, {
        debug,
        report,
        currentFormat,
        formatterOptions,
        name,
        source,
        places: allPlaces,
        index,
        count: length,
    });
    
    write(line || '');
    
    return {
        places: allPlaces,
        code: newCode,
    };
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
