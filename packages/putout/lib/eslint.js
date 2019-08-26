'use strict';

const {CLIEngine, Linter} = require('eslint');
const once = require('once');
const tryCatch = require('try-catch');

const {entries} = Object;

const noConfigFound = (a) => a && a.messageTemplate === 'no-config-found';

const getCli = once(() => {
    const cli = new CLIEngine();
    
    return {
        getConfigForFile: cli.getConfigForFile.bind(cli),
        executeOnText: cli.executeOnText.bind(cli),
    };
});

const loadPlugin = (name, require) => {
    if (name.includes('@')) {
        name = name.replace('/', '/eslint-plugin-');
        return require(name);
    }
    
    return require(`eslint-plugin-${name}`);
};

const getPluginsStore = once(() => {
    const cache = {};
    
    return (name) => {
        if (cache[name])
            return cache[name];
        
        const {rules} = loadPlugin(name, require);
        
        cache[name] = {};
        for (const [rule, fn] of entries(rules)) {
            const fullRule = `${name}/${rule}`;
            
            cache[name][fullRule] = fn;
        }
        
        return cache[name];
    };
});

const getLinter = (plugins, parser) => {
    const linter = new Linter();
    const pluginsStore = getPluginsStore();
    
    if (parser)
        linter.defineParser(parser, require(parser));
    
    for (const name of plugins)
        linter.defineRules(pluginsStore(name));
    
    return linter;
};

module.exports = ({name, code, fix}) => {
    const noChanges = [
        code,
        [],
    ];
    
    const cli = getCli();
    const [configError, config] = tryCatch(cli.getConfigForFile, name);
    
    if (noConfigFound(configError))
        return noChanges;
    
    if (configError) {
        return [
            code,
            [convertToPlace(parseError(configError))],
        ];
    }
    
    disablePutout(config);
    
    if (fix) {
        const {plugins, parser} = config;
        const {output, messages} = getLinter(plugins, parser)
            .verifyAndFix(code, config);
        
        return [
            output,
            messages.map(convertToPlace),
        ];
    }
    
    const {results} = cli.executeOnText(code, name);
    
    if (!results.length)
        return noChanges;
    
    const [report] = results;
    const places = report.messages.map(convertToPlace);
    
    return [
        code,
        places,
    ];
};

module.exports._loadPlugin = loadPlugin;

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

function parseError(e) {
    if (!e)
        return false;
    
    const {
        messageTemplate,
        messageData,
        message,
    } = e;
    
    if (messageTemplate !== 'plugin-missing')
        return {
            message,
        };
    
    return {
        message: `Plugin missing: ${messageData.pluginName}`,
    };
}

