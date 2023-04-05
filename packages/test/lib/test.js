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
const isObject = (a) => typeof a === 'object';
const {isArray} = Array;
const {keys, entries} = Object;

global.__putout_test_fs = {
    readFileSync,
    writeFileSync,
    existsSync,
    unlinkSync,
};

const isUpdate = () => Boolean(Number(process.env.UPDATE));
const getPrinter = () => process.env.PUTOUT_PRINTER;

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

const writeFixture = ({full, code, isTS}) => {
    writeSourceFixture({
        full: `${full}-fix`,
        code,
        isTS,
    });
};

const writeSourceFixture = ({full, code, isTS}) => {
    const {writeFileSync} = global.__putout_test_fs;
    
    if (!isTS)
        return writeFileSync(`${full}.js`, code);
    
    writeFileSync(`${full}.ts`, code);
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

const parsePlugin = (plugins) => {
    if (isArray(plugins))
        return plugins[0];
    
    return plugins;
};

function createTest(dir, maybeOptions) {
    const update = isUpdate();
    
    dir = join(dir, 'fixture');
    
    const options = parseOptions(maybeOptions);
    const plugin = parsePlugin(options.plugins);
    
    preTest(test, plugin);
    
    return test.extend({
        transform: transform(dir, options),
        noTransform: noTransform(dir, options),
        transformCode: transformCode(options),
        noTransformCode: noTransformCode(options),
        
        transformWithOptions: transformWithOptions(dir, options),
        noTransformWithOptions: noTransformWithOptions(dir, options),
        
        report: report(dir, options),
        noReport: noReport(dir, options),
        noReportAfterTransform: noReportAfterTransform(dir, options),
        reportWithOptions: reportWithOptions(dir, options),
        noReportWithOptions: noReportWithOptions(dir, options),
        reportCode: reportCode(options),
        
        formatSave: formatSave(dir, options),
        format: (update ? formatSave : format)(dir, options),
        formatManySave: formatManySave(dir, options),
        formatMany: (update ? formatManySave : formatMany)(dir, options),
        noFormat: noFormat(dir, options),
    });
}

const format = currify((dir, options, t) => async (formatter, name, formatterOptions = {}) => {
    const full = join(dir, name);
    const outputName = `${full}-format`;
    const [input, isTS] = readFixture(full);
    const [expected] = readFixture(outputName);
    
    const {places} = putout(input, {
        fixCount: 1,
        isTS,
        ...options,
    });
    
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

const noFormat = currify((dir, options, t) => async (formatter, name, formatterOptions = {}) => {
    const full = join(dir, name);
    const [input] = readFixture(full);
    const {places} = putout(input, options);
    
    const report = putout.initReport();
    const result = await report(formatter, {
        name,
        places,
        formatterOptions,
    });
    
    const {is, output} = t.equal(result, '', 'should not format');
    
    return {is, output, result};
});

const formatMany = currify((dir, options, t) => async (formatter, names, formatterOptions = {}) => {
    const joinTwo = (a) => (b) => join(a, b);
    
    if (!isArray(names))
        throw Error(`☝️ Looks like 'formatMany()' received 'names' with type: '${typeof names}', expected: 'array'`);
    
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
            ...options,
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

const formatManySave = currify((dir, options, t) => async (formatter, names, options = {}) => {
    const {
        existsSync,
        writeFileSync,
    } = global.__putout_test_fs;
    
    if (!isArray(names))
        throw Error(`☝️ Looks like 'formatManySave()' received 'names' with type: '${typeof names}', expected: 'array'`);
    
    const name = `${names.join('-')}-format.js`;
    const outputName = join(dir, name);
    
    if (!existsSync(outputName))
        writeFileSync(outputName, '');
    
    const runFormat = await formatMany(dir, options, t);
    const {result} = await runFormat(formatter, names, options);
    
    writeFileSync(outputName, result);
    
    return t.pass('fixed fixture updated');
});

const formatSave = currify((dir, options, t) => async (formatter, name, options = {}) => {
    const {
        existsSync,
        writeFileSync,
    } = global.__putout_test_fs;
    
    const full = join(dir, name);
    const outputName = `${full}-format.js`;
    
    if (!existsSync(outputName))
        writeFileSync(outputName, '');
    
    const runFormat = format(dir, options, t);
    const {result} = await runFormat(formatter, name, options);
    
    writeFileSync(outputName, result);
    
    return t.pass('fixed fixture updated');
});

const toObject = (array) => {
    const result = {};
    const first = parsePlugin(array);
    
    if (isObject(first) && !isArray(first)) {
        return first;
    }
    
    for (const [name, value] of array) {
        result[name] = value;
    }
    
    return result;
};

const transform = currify((dir, options, t, name, transformed = null, addons = {}) => {
    const {plugins} = options;
    const full = join(dir, name);
    const [input, isTS] = readFixture(full);
    const isStr = isString(transformed);
    
    const [output] = isStr ? [transformed] : readFixture(`${full}-fix`);
    
    if (!isStr)
        addons = transformed;
    
    addons = addons || {};
    
    const {code} = putout(input, {
        printer: getPrinter(),
        isTS,
        ...options,
        plugins: [{
            ...toObject(plugins),
            ...addons,
        }],
    });
    
    if (isUpdate() && isStr) {
        writeSourceFixture({
            full,
            code,
            isTS,
        });
        
        return t.pass('source fixture updated');
    }
    
    if (isUpdate() && !isStr) {
        writeFixture({
            full,
            code,
            isTS,
        });
        
        return t.pass('fixed fixture updated');
    }
    
    return t.equal(code, output);
});

const transformWithOptions = currify((dir, options, t, name, additionalOptions) => {
    const {writeFileSync} = global.__putout_test_fs;
    const full = join(dir, name);
    const [input, isTS] = readFixture(full);
    
    const [output] = readFixture(`${full}-fix`);
    const rule = parseRule(options);
    
    const rules = {
        [rule]: ['on', additionalOptions],
    };
    
    const {code} = putout(input, {
        printer: getPrinter(),
        isTS,
        rules,
        ...options,
    });
    
    if (isUpdate()) {
        writeFileSync(`${full}-fix.js`, code);
        return t.pass('fixed fixture updated');
    }
    
    return t.equal(code, output);
});

const parseRule = ({plugins}) => {
    const [plugin] = plugins;
    
    return plugin[0] || keys(plugin)[0];
};

const noTransformWithOptions = currify((dir, options, t, name, ruleOptions) => {
    const full = join(dir, name);
    const [input, isTS] = readFixture(full);
    
    rmFixture(`${full}-fix`);
    
    const rule = parseRule(options);
    
    const rules = {
        [rule]: ['on', ruleOptions],
    };
    
    const {code} = putout(input, {
        isTS,
        rules,
        ...options,
    });
    
    return t.equal(code, input);
});

const noTransform = currify((dir, options, t, name, addons = {}) => {
    const full = join(dir, name);
    const [fixture] = readFixture(full);
    
    rmFixture(`${full}-fix`);
    
    return transform(dir, options, t, name, fixture, addons);
});

const transformCode = currify((options, t, input, output, isTS = false) => {
    const {code} = putout(input, {
        isTS,
        ...options,
    });
    
    return t.equal(code, output);
});

const noTransformCode = currify((options, t, input) => {
    const {code} = putout(input, options);
    return t.equal(code, input);
});

const getMessage = ({message}) => message;

const report = currify((dir, options, t, name, message) => {
    const full = join(dir, name);
    const [source, isTS] = readFixture(full);
    
    return reportCode({isTS, ...options}, t, source, message);
});

const noReport = currify((dir, options, t, name) => {
    const full = join(dir, name);
    const [source, isTS] = readFixture(full);
    
    rmFixture(`${full}-fix`);
    
    return noReportCode({isTS, ...options}, t, source);
});
module.exports._createNoReport = noReport;

const noReportAfterTransform = currify((dir, options, t, name) => {
    const full = join(dir, name);
    const [source, isTS] = readFixture(full);
    
    return noReportCodeAfterTransform({isTS, ...options}, t, source);
});
module.exports._createNoReportAfterTransform = noReportAfterTransform;

const reportWithOptions = currify((dir, options, t, name, message, ruleOptions) => {
    const full = join(dir, name);
    const [source, isTS] = readFixture(full);
    
    const rule = parseRule(options);
    const rules = {
        [rule]: ['on', ruleOptions],
    };
    
    return reportCode({...options, rules, isTS}, t, source, message);
});

const noReportWithOptions = currify((dir, options, t, name, ruleOptions) => {
    const full = join(dir, name);
    const [source, isTS] = readFixture(full);
    
    rmFixture(`${full}-fix`);
    
    const rule = parseRule(options);
    const rules = {
        [rule]: ['on', ruleOptions],
    };
    
    return noReportCode({isTS, ...options, rules}, t, source);
});

const reportCode = currify((options, t, source, message) => {
    const {places} = putout(source, {
        fix: false,
        ...options,
    });
    
    const resultMessages = places.map(getMessage);
    
    if (isArray(message))
        return t.deepEqual(resultMessages, message);
    
    return t.equal(resultMessages[0], message);
});

const noReportCode = currify((options, t, source) => {
    const {places} = putout(source, {
        fix: false,
        ...options,
    });
    
    return t.deepEqual(places, [], 'should not report');
});

const noReportCodeAfterTransform = currify((options, t, source) => {
    const {places} = putout(source, {
        fix: true,
        ...options,
    });
    
    return t.deepEqual(places, [], 'should not report after transform');
});

function parseOptions(plugin) {
    if (!plugin.plugins)
        return {
            plugins: [plugin],
        };
    
    return plugin;
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
        declare,
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
    
    if (!declare)
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
            
            declare,
        });
        
        t.ok(result, 'should export "replace", "find", "traverse", "include", "exclude", or "declare" function');
        t.end();
    }, options);
}

