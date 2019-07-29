'use strict';

const {CLIEngine, Linter} = require('eslint');
const once = require('once');
const tryCatch = require('try-catch');

const {entries} = Object;

const getCli = once(() => {
    const cli = new CLIEngine();
    
    return {
        getConfigForFile: cli.getConfigForFile.bind(cli),
        isPathIgnored: cli.isPathIgnored.bind(cli),
        executeOnText: cli.executeOnText.bind(cli),
    };
});

const getPluginsStore = once(() => {
    const cache = {};
    
    return (name) => {
        if (cache[name])
            return cache[name];
        
        const {rules} = require(`eslint-plugin-${name}`);
        
        cache[name] = {};
        for (const [rule, fn] of entries(rules)) {
            const fullRule = `${name}/${rule}`;
            
            cache[name][fullRule] = fn;
        }
        
        return cache[name];
    };
});

const getLinter = (plugins) => {
    const linter = new Linter();
    const pluginsStore = getPluginsStore();
    
    for (const name of plugins)
        linter.defineRules(pluginsStore(name));
    
    return linter;
};

module.exports = ({name, code, fix}) => {
    const same = [
        code,
        [],
    ];
    
    console.time('getCli');
    const cli = getCli();
    //console.timeEnd('getCli');
    
    console.time('getConfig');
    const [e, config] = tryCatch(cli.getConfigForFile, name);
    //console.timeEnd('getConfig');
    
    if (e)
        return same;
    
    disablePutout(config);
    
    console.time('isIgnored');
    /*
    if (cli.isPathIgnored(name)) {
        console.log('::::', name);
        return same;
    }
    */
    
    //console.timeEnd('isIgnored');
    
    if (fix) {
        const {plugins} = config;
        const {output, messages} = getLinter(plugins).verifyAndFix(code, config);
        
        return [
            output,
            messages.map(convertToPlace),
        ];
    }
    
    console.time('execute');
    const [report] = cli.executeOnText(code, name).results;
    //console.timeEnd('execute');
    if (!report)
        return same;
    
    const places = report.messages.map(convertToPlace);
    
    return [
        code,
        places,
    ];
};

function convertToPlace({ruleId, message, line, column}) {
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

