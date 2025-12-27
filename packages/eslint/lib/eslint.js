'use strict';

const {join} = require('node:path');
const process = require('node:process');
const tryToCatch = require('try-to-catch');

const {simpleImport: _simpleImport} = require('./simple-import.js');
const {isIgnored} = require('./ignore');

const {keys} = Object;
const eslintId = ' (eslint)';

const {env} = process;
const isNoESLint = () => env.NO_ESLINT;
const isNoESLintWarnings = () => env.NO_ESLINT_WARNINGS;

const dir = process.cwd();
const overrideConfigFile = () => parseOverride(dir, env.ESLINT_CONFIG_FILE);

const NO_FLAT_CONFIG_FOUND = 'Could not find config file.';
const WARNING = 1;

const noConfigFound = (config, configError) => {
    if (configError && configError.messageTemplate === 'no-config-found')
        return true;
    
    if (configError?.message === NO_FLAT_CONFIG_FOUND)
        return true;
    
    if (configError)
        return false;
    
    if (!config)
        return true;
    
    if (!config.rules)
        return true;
    
    return !keys(config.rules).length;
};

module.exports.eslint = async (overrides = {}) => {
    const {
        name,
        code,
        fix,
        config,
        putout = false,
        simpleImport = _simpleImport,
    } = overrides;
    const noChanges = [
        code,
        [],
    ];
    
    if (isNoESLint())
        return noChanges;
    
    const [, ESLint] = await tryToCatch(simpleImport, './get-eslint.mjs');
    
    if (!ESLint)
        return noChanges;
    
    const {getESLint} = ESLint;
    
    const eslint = await getESLint({
        name,
        fix,
        config,
        overrideConfigFile: overrideConfigFile(),
    });
    
    const [configError, finalConfig] = await tryToCatch(eslint.calculateConfigForFile, name);
    
    if (noConfigFound(finalConfig, configError))
        return noChanges;
    
    if (configError) {
        const places = [
            convertToPlace(parseError(configError)),
        ];
        
        return [code, places];
    }
    
    // that's right, we disabled "putout" rules in "config"
    // and now it located in eslint's cache
    !putout && disablePutout(finalConfig);
    
    const results = await eslint.lintText(code, {
        filePath: name,
    });
    
    if (!results.length)
        return noChanges;
    
    const [report] = results;
    const {output = code} = report;
    
    const places = report.messages
        .map(convertToPlace)
        .filter(Boolean);
    
    return [output, places];
};

module.exports._noConfigFound = noConfigFound;

const parseRule = (rule) => rule || 'parser';

module.exports.convertToPlace = convertToPlace;
function convertToPlace({ruleId = 'parser', message, line = 0, column = 0, severity}) {
    const rule = `${parseRule(ruleId)}${eslintId}`;
    
    if (severity === WARNING && isNoESLintWarnings())
        return null;
    
    if (isIgnored(message))
        return null;
    
    return {
        rule,
        message: replaceControlChars(message),
        position: {
            line,
            column,
        },
    };
}

function disablePutout(config) {
    if (!config.rules['putout/putout'])
        return;
    
    config.rules['putout/putout'] = 'off';
}

// when eslint config got errors, table formatter used for reporting
// can't show control characters and crash
//
// https://stackoverflow.com/questions/26741455/how-to-remove-control-characters-from-string
const replaceControlChars = (a) => a.replace(/[\x00-\x1F]/g, '. ');

function parseError(e) {
    const {
        messageTemplate,
        messageData,
        message,
    } = e;
    
    if (messageTemplate !== 'plugin-missing')
        return {
            message: replaceControlChars(message),
        };
    
    return {
        message: `Plugin missing: ${messageData.pluginName}`,
    };
}

function parseOverride(dir, configFilePath) {
    if (!configFilePath)
        return configFilePath;
    
    return join(dir, configFilePath);
}
