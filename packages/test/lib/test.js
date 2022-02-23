'use strict';

const {join} = require('path');
const {
    readFileSync,
    writeFileSync,
    existsSync,
    unlinkSync,
} = require('fs');

const tryCatch = require('try-catch');
const test = require('supertape');
const putout = require('putout');
const currify = require('currify');

const isCorrectPlugin = require('./is-correct-plugin');

const isString = (a) => typeof a === 'string';
const {isArray} = Array;
const {keys, entries} = Object;

global.__putout_test_fs = {
    readFileSync,
    writeFileSync,
    existsSync,
    unlinkSync,
};

const isUpdate = () => Boolean(Number(process.env.UPDATE));

const TS = {
    ENABLED: true,
    DISABLED: false,
};

const readFixture = (name) => {
    const [e, data] = tryCatch(readFileSync, `${name}.ts`, 'utf8');
    
    if (!e)
        return [data, TS.ENABLED];
    
    return [readFileSync(`${name}.js`, 'utf8'), TS.DISABLED];
};

const rmFixture = (name) => {
    const {unlinkSync} = global.__putout_test_fs;
    
    if (!isUpdate())
        return;
    
    tryCatch(unlinkSync, `${name}.js`);
    tryCatch(unlinkSync, `${name}.ts`);
};

module.exports = createTest;
module.exports.createTest = createTest;

function createTest(dir, plugin, rules) {
    const update = isUpdate();
    
    dir = join(dir, 'fixture');
    const plugins = getPlugins(plugin);
    
    preTest(test, plugin);
    
    return test.extend({
        transform: transform({dir, plugins, rules}),
        noTransform: noTransform({dir, plugins, rules}),
        transformCode: transformCode({plugins, rules}),
        noTransformCode: noTransformCode({plugins, rules}),
        
        transformWithOptions: transformWithOptions({dir, plugins}),
        noTransformWithOptions: noTransformWithOptions({dir, plugins}),
        
        report: report({dir, plugins, rules}),
        noReport: noReport({dir, plugins, rules}),
        noReportAfterTransform: noReportAfterTransform({dir, plugins, rules}),
        reportWithOptions: reportWithOptions({dir, plugins}),
        noReportWithOptions: noReportWithOptions({dir, plugins}),
        reportCode: reportCode({
            plugins,
            rules,
        }),
        
        formatSave: formatSave({dir, plugins, rules}),
        format: (update ? formatSave : format)({dir, plugins, rules}),
        formatManySave: formatManySave({dir, plugins, rules}),
        formatMany: (update ? formatManySave : formatMany)({dir, plugins, rules}),
        noFormat: noFormat({dir, plugins, rules}),
    });
}

const format = currify(({dir, plugins, rules}, t) => async (formatter, name, formatterOptions = {}) => {
    const full = join(dir, name);
    const outputName = `${full}-format`;
    const [input, isTS] = readFixture(full);
    const [expected] = readFixture(outputName);
    
    const {places} = putout(input, {fixCount: 1, isTS, plugins, rules});
    
    const report = putout.initReport();
    const result = await report(formatter, {
        formatterOptions,
        name,
        source: input,
        places,
    });
    
    const {is, output} = t.equal(result, expected);
    
    return {is, output, result};
});

const noFormat = currify(({dir, plugins, rules}, t) => async (formatter, name, formatterOptions = {}) => {
    const full = join(dir, name);
    const [input] = readFixture(full);
    
    const {places} = putout(input, {plugins, rules});
    
    const report = putout.initReport();
    const result = await report(formatter, {
        name,
        places,
        formatterOptions,
    });
    
    const {is, output} = t.equal(result, '', 'should not format');
    
    return {is, output, result};
});

const formatMany = currify(({dir, plugins, rules}, t) => async (formatter, names, formatterOptions = {}) => {
    const joinTwo = (a) => (b) => join(a, b);
    const fullNames = names.map(joinTwo(dir));
    
    let result = '';
    
    const count = names.length;
    const report = putout.initReport();
    for (let index = 0; index < count; index++) {
        const name = names[index];
        const full = fullNames[index];
        const [input] = readFixture(full);
        
        const {places} = putout(input, {
            fixCount: 1,
            plugins,
            rules,
        });
        
        result += await report(formatter, {
            name,
            formatterOptions,
            source: input,
            places,
            index,
            count,
        });
    }
    
    const outputName = join(dir, `${names.join('-')}-format`);
    const [expected] = readFixture(outputName);
    
    const {is, output} = t.equal(result, expected);
    
    return {is, output, result};
});

const formatManySave = currify(({dir, plugins, rules}, t) => async (formatter, names, options = {}) => {
    const {
        existsSync,
        writeFileSync,
    } = global.__putout_test_fs;
    
    const name = `${names.join('-')}-format.js`;
    const outputName = join(dir, name);
    
    if (!existsSync(outputName))
        writeFileSync(outputName, '');
    
    const runFormat = await formatMany({dir, plugins, rules}, t);
    
    const {
        is,
        output,
        result,
    } = await runFormat(formatter, names, options);
    
    writeFileSync(outputName, result);
    
    return {is, output, result};
});

const formatSave = currify(({dir, plugins, rules}, t) => async (formatter, name, options = {}) => {
    const {
        existsSync,
        writeFileSync,
    } = global.__putout_test_fs;
    
    const full = join(dir, name);
    const outputName = `${full}-format.js`;
    
    if (!existsSync(outputName))
        writeFileSync(outputName, '');
    
    const runFormat = format({
        dir,
        plugins,
        rules,
    }, t);
    
    const {
        is,
        output,
        result,
    } = await runFormat(formatter, name, options);
    
    writeFileSync(outputName, result);
    
    return {
        is,
        output,
    };
});

const transform = currify(({dir, plugins, rules}, t, name, transformed = null, addons = {}) => {
    const {writeFileSync} = global.__putout_test_fs;
    
    const full = join(dir, name);
    const [input, isTS] = readFixture(full);
    const isStr = isString(transformed);
    
    const [output] = isStr ? [transformed] : readFixture(`${full}-fix`);
    
    if (!isStr)
        addons = transformed;
    
    addons = addons || {};
    
    const {code} = putout(input, {
        isTS,
        rules,
        plugins: [{
            ...plugins[0],
            ...addons,
        }],
    });
    
    if (isUpdate() && !isStr) {
        writeFileSync(`${full}-fix.js`, code);
    }
    
    return t.equal(code, output);
});

const transformWithOptions = currify(({dir, plugins}, t, name, options) => {
    const {writeFileSync} = global.__putout_test_fs;
    const full = join(dir, name);
    const [input, isTS] = readFixture(full);
    
    const [output] = readFixture(`${full}-fix`);
    const [plugin] = plugins;
    const [rule] = keys(plugin);
    
    const rules = {
        [rule]: ['on', options],
    };
    
    const {code} = putout(input, {isTS, plugins, rules});
    
    if (isUpdate())
        writeFileSync(`${full}-fix.js`, code);
    
    return t.equal(code, output);
});

const noTransformWithOptions = currify(({dir, plugins}, t, name, options) => {
    const full = join(dir, name);
    const [input, isTS] = readFixture(full);
    
    rmFixture(`${full}-fix`);
    
    const [plugin] = plugins;
    const [rule] = keys(plugin);
    
    const rules = {
        [rule]: ['on', options],
    };
    
    const {code} = putout(input, {isTS, plugins, rules});
    
    return t.equal(code, input);
});

const noTransform = currify(({dir, plugins, rules}, t, name, addons = {}) => {
    const full = join(dir, name);
    const [fixture] = readFixture(full);
    
    rmFixture(`${full}-fix`);
    
    return transform({dir, plugins, rules}, t, name, fixture, addons);
});

const transformCode = currify(({plugins, rules}, t, input, output, isTS = false) => {
    const {code} = putout(input, {isTS, plugins, rules});
    return t.equal(code, output);
});

const noTransformCode = currify(({plugins, rules}, t, input) => {
    const {code} = putout(input, {plugins, rules});
    return t.equal(code, input);
});

const getMessage = ({message}) => message;

const report = currify(({dir, plugins, rules}, t, name, message) => {
    const full = join(dir, name);
    const [source, isTS] = readFixture(full);
    
    return reportCode({plugins, rules, isTS}, t, source, message);
});

const noReport = currify(({dir, plugins, rules}, t, name) => {
    const full = join(dir, name);
    const [source, isTS] = readFixture(full);
    
    rmFixture(`${full}-fix`);
    
    return noReportCode({plugins, rules, isTS}, t, source);
});
module.exports._createNoReport = noReport;

const noReportAfterTransform = currify(({dir, plugins, rules}, t, name) => {
    const full = join(dir, name);
    const [source, isTS] = readFixture(full);
    
    return noReportCodeAfterTransform({plugins, rules, isTS}, t, source);
});
module.exports._createNoReportAfterTransform = noReportAfterTransform;

const reportWithOptions = currify(({dir, plugins}, t, name, message, options) => {
    const full = join(dir, name);
    const [source, isTS] = readFixture(full);
    
    const [plugin] = plugins;
    const [rule] = keys(plugin);
    
    const rules = {
        [rule]: ['on', options],
    };
    
    return reportCode({plugins, rules, isTS}, t, source, message);
});

const noReportWithOptions = currify(({dir, plugins}, t, name, options) => {
    const full = join(dir, name);
    const [source, isTS] = readFixture(full);
    
    rmFixture(`${full}-fix`);
    
    const [plugin] = plugins;
    const [rule] = keys(plugin);
    
    const rules = {
        [rule]: ['on', options],
    };
    
    return noReportCode({plugins, rules, isTS}, t, source);
});

const reportCode = currify(({plugins, rules, isTS}, t, source, message) => {
    const fix = false;
    const {places} = putout(source, {
        fix,
        isTS,
        rules,
        plugins,
    });
    
    const resultMessages = places.map(getMessage);
    
    if (isArray(message))
        return t.deepEqual(resultMessages, message, 'should equal');
    
    return t.equal(resultMessages[0], message);
});

const noReportCode = currify(({plugins, rules, isTS}, t, source) => {
    const fix = false;
    const {places} = putout(source, {
        fix,
        isTS,
        rules,
        plugins,
    });
    
    return t.deepEqual(places, [], 'should not report');
});

const noReportCodeAfterTransform = currify(({plugins, rules, isTS}, t, source) => {
    const fix = true;
    const {places} = putout(source, {
        fix,
        isTS,
        rules,
        plugins,
    });
    
    return t.deepEqual(places, [], 'should not report after transform');
});

function getPlugins(plugin) {
    return [
        plugin,
    ].filter(Boolean);
}

function preTest(test, plugin) {
    const [name, {
        report,
        find,
        traverse,
        include,
        exclude,
        fix,
        rules,
        replace,
        filter,
        match,
    }] = entries(plugin).pop();
    
    const options = {
        checkDuplicates: false,
    };
    
    if (rules) {
        test(`${name}: rules is an object`, (t) => {
            t.equal(typeof rules, 'object', 'should export "rules" object');
            t.end();
        }, options);
        
        const entries = Object.entries(rules);
        for (const [entryName, plugin] of entries) {
            preTest(test, {
                [`${name}/${entryName}`]: plugin,
            });
        }
        
        return;
    }
    
    test(`${name}: report: is function`, (t) => {
        t.equal(typeof report, 'function', 'should export "report" function');
        t.end();
    }, options);
    
    test(`${name}: plugins should be of type: replace, template, traverse or find`, (t) => {
        const result = isCorrectPlugin({
            find,
            fix,
            
            traverse,
            
            include,
            exclude,
            
            filter,
            match,
            replace,
        });
        
        t.ok(result, 'should export "replace", "find", "traverse", "include", "exclude" function');
        t.end();
    }, options);
}

