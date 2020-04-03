'use strict';

const {ESLint} = require('eslint');
const once = require('once');
const tryToCatch = require('try-to-catch');

const {keys} = Object;
const overrideConfigFile = process.env.ESLINT_CONFIG_FILE;

const noConfigFound = (config, configError) => {
    if (configError && configError.messageTemplate === 'no-config-found')
        return true;
    
    if (configError)
        return false;
    
    if (!keys(config.rules).length)
        return true;
    
    return false;
};

const cutNewLine = ({message}) => ({
    message: message.replace(/\n.*/, ''),
});

const getESLint = once(({fix}) => {
    const eslint = new ESLint({
        fix,
        overrideConfig: {
            ignorePatterns: [
                '!.*',
            ],
        },
        ...overrideConfigFile && {
            overrideConfigFile,
            useEslintrc: false,
        },
    });
    
    return {
        calculateConfigForFile: eslint.calculateConfigForFile.bind(eslint),
        lintText: eslint.lintText.bind(eslint),
    };
});

module.exports = async ({name, code, fix}) => {
    const noChanges = [
        code,
        [],
    ];
    
    const [eslintError, eslint] = await tryToCatch(getESLint, {
        fix,
    });
    
    if (eslintError)
        return [
            code,
            [convertToPlace(cutNewLine(eslintError))],
        ];
    
    const [configError, config] = await tryToCatch(eslint.calculateConfigForFile, name);
    
    if (noConfigFound(config, configError))
        return noChanges;
    
    if (configError) {
        return [
            code,
            [convertToPlace(parseError(configError))],
        ];
    }
    
    disablePutout(config);
    
    // that's right, we disabled "putout" rules in "config"
    // and now it is in eslint's cache
    const results = await eslint.lintText(code, {
        filePath: name,
    });
    
    if (!results.length)
        return noChanges;
    
    const [report] = results;
    const {output} = report;
    const places = report.messages.map(convertToPlace);
    
    return [
        output || code,
        places,
    ];
};

module.exports._noConfigFound = noConfigFound;

function convertToPlace({ruleId = 'parser', message, line = 'x', column = 'x'}) {
    return {
        rule: `eslint/${ruleId}`,
        message,
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

