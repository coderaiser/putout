'use strict';

const process = require('node:process');
const {join} = require('node:path');
const {once} = require('node:events');

const {
    readFileSync,
    writeFileSync,
    existsSync,
    unlinkSync,
} = require('node:fs');

const tryCatch = require('try-catch');
const test = require('supertape');
const putout = require('putout');
const currify = require('currify');
const {createProgress} = require('@putout/engine-runner/progress');

const {createError} = require('./create-error');
const {preTest} = require('./pre-test');

const {isArray} = Array;
const isString = (a) => typeof a === 'string';
const isObject = (a) => typeof a === 'object';

const {keys} = Object;

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
    const {readFileSync} = global.__putout_test_fs;
    const [e, data] = tryCatch(readFileSync, `${name}.ts`, 'utf8');
    
    if (!e)
        return [
            data,
            TS.ENABLED,
        ];
    
    return [
        readFileSync(`${name}.js`, 'utf8'),
        TS.DISABLED,
    ];
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
    dir = join(dir, 'fixture');
    
    const options = parseOptions(maybeOptions);
    const plugin = parsePlugin(options.plugins);
    
    preTest(test, plugin);
    
    return test.extend({
        transform: transform(dir, options),
        noTransform: noTransform(dir, options),
        transformCode: transformCode(options),
        noTransformCode: noTransformCode(options),
        
        progress: progress(dir, options),
        progressWithOptions: progressWithOptions(dir, options),
        
        transformWithOptions: transformWithOptions(dir, options),
        noTransformWithOptions: noTransformWithOptions(dir, options),
        
        report: report(dir, options),
        noReport: noReport(dir, options),
        noReportAfterTransform: noReportAfterTransform(dir, options),
        noReportAfterTransformWithOptions: noReportAfterTransformWithOptions(dir, options),
        reportWithOptions: reportWithOptions(dir, options),
        noReportWithOptions: noReportWithOptions(dir, options),
        reportCode: reportCode(options),
        format: formatSave(dir, options),
        formatMany: formatManySave(dir, options),
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
    
    return {
        is,
        output,
        result,
    };
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
    
    return {
        is,
        output,
        result,
    };
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
    
    return {
        is,
        output,
        result,
    };
});

const formatManySave = currify((dir, options, t) => async (formatter, names, formatterOptions = {}) => {
    const runFormat = await formatMany(dir, options, t);
    
    if (!isUpdate())
        return await runFormat(formatter, names, formatterOptions);
    
    const {writeFileSync} = global.__putout_test_fs;
    
    if (!isArray(names))
        throw Error(`☝️ Looks like 'formatMany()' received 'names' with type: '${typeof names}', expected: 'array'`);
    
    const name = `${names.join('-')}-format.js`;
    const outputName = join(dir, name);
    
    const {result} = await runFormat(formatter, names, formatterOptions);
    
    writeFileSync(outputName, result);
    
    return t.pass('fixed fixture updated');
});

const formatSave = currify((dir, options, t) => async (formatter, name, formatterOptions = {}) => {
    const runFormat = format(dir, options, t);
    
    if (!isUpdate())
        return await runFormat(formatter, name, formatterOptions);
    
    const {writeFileSync} = global.__putout_test_fs;
    
    const full = join(dir, name);
    const outputName = `${full}-format.js`;
    
    const {result} = await runFormat(formatter, name, formatterOptions);
    
    writeFileSync(outputName, result);
    
    return t.pass('fixed fixture updated');
});

const toObject = (array) => {
    const result = {};
    const first = parsePlugin(array);
    
    if (isObject(first) && !isArray(first))
        return first;
    
    for (const [name, value] of array) {
        result[name] = value;
    }
    
    return result;
};

const progress = (dir, options) => (t) => async (name, expected) => {
    checkProgress(name, expected);
    
    const full = join(dir, name);
    const [input, isTS] = readFixture(full);
    
    const progress = createProgress();
    const [[result]] = await Promise.all([
        once(progress, 'file'),
        putout(input, {
            progress,
            printer: getPrinter(),
            isTS,
            ...options,
        }),
    ]);
    
    return t.deepEqual(result, expected);
};

const progressWithOptions = (dir, options) => (t) => async (name, pluginOptions, expected) => {
    const full = join(dir, name);
    const [input, isTS] = readFixture(full);
    
    const rule = parseRule(options);
    const rules = {
        [rule]: ['on', pluginOptions],
    };
    
    const progress = createProgress();
    
    const [[result]] = await Promise.all([
        once(progress, 'file'),
        putout(input, {
            rules,
            progress,
            printer: getPrinter(),
            isTS,
            ...options,
        }),
    ]);
    
    return t.deepEqual(result, expected);
};

const transform = currify((dir, options, t, name, transformed = null, addons = {}) => {
    const {plugins} = options;
    const full = join(dir, name);
    const isStr = isString(transformed);
    
    const [input, isTS] = readFixture(full);
    
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
    
    if (isUpdate() && !isStr) {
        writeFixture({
            full,
            code,
            isTS,
        });
        return t.pass('fixed fixture updated');
    }
    
    const [output] = isStr ? [transformed] : readFixture(`${full}-fix`);
    
    return t.equal(code, output);
});

const transformWithOptions = currify((dir, options, t, name, pluginOptions) => {
    const {writeFileSync} = global.__putout_test_fs;
    const full = join(dir, name);
    const [input, isTS] = readFixture(full);
    
    const rule = parseRule(options);
    
    const rules = {
        [rule]: ['on', pluginOptions],
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
    
    const [output] = readFixture(`${full}-fix`);
    
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
    
    if (isUpdate()) {
        writeSourceFixture({
            full,
            code,
            isTS,
        });
        
        return t.pass('source fixture updated');
    }
    
    return t.equal(code, input);
});

const noTransform = currify((dir, options, t, name, addons = {}) => {
    const full = join(dir, name);
    const [fixture] = readFixture(full);
    
    rmFixture(`${full}-fix`);
    
    const {plugins} = options;
    const [input, isTS] = readFixture(full);
    
    const {code} = putout(input, {
        printer: getPrinter(),
        isTS,
        ...options,
        plugins: [{
            ...toObject(plugins),
            ...addons,
        }],
    });
    
    if (isUpdate()) {
        writeSourceFixture({
            full,
            code,
            isTS,
        });
        
        return t.pass('source fixture updated');
    }
    
    return t.equal(code, fixture);
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

const report = (dir, options) => (t) => (name, message) => {
    checkReport(name, message);
    
    const full = join(dir, name);
    const [source, isTS] = readFixture(full);
    
    return reportCode({
        isTS,
        ...options,
    }, t, source, message);
};

const noReport = currify((dir, options, t, name) => {
    const full = join(dir, name);
    const [source, isTS] = readFixture(full);
    
    rmFixture(`${full}-fix`);
    
    return noReportCode({
        isTS,
        ...options,
    }, t, source);
});

module.exports._createNoReport = noReport;

const noReportAfterTransform = currify((dir, options, t, name) => {
    const full = join(dir, name);
    const [source, isTS] = readFixture(full);
    
    return noReportCodeAfterTransform({
        isTS,
        ...options,
    }, t, source);
});

module.exports._createNoReportAfterTransform = noReportAfterTransform;

const noReportAfterTransformWithOptions = currify((dir, options, t, name, ruleOptions) => {
    const full = join(dir, name);
    const [source, isTS] = readFixture(full);
    const rule = parseRule(options);
    
    const rules = {
        [rule]: ['on', ruleOptions],
    };
    
    return noReportCodeAfterTransform({
        isTS,
        ...options,
        rules: {
            ...options.rules,
            ...rules,
        },
    }, t, source);
});

module.exports._createNoReportAfterTransformWithOptions = noReportAfterTransformWithOptions;

const reportWithOptions = currify((dir, options, t, name, message, ruleOptions) => {
    const full = join(dir, name);
    const [source, isTS] = readFixture(full);
    
    const rule = parseRule(options);
    
    const rules = {
        [rule]: ['on', ruleOptions],
    };
    
    return reportCode({
        ...options,
        rules,
        isTS,
    }, t, source, message);
});

const noReportWithOptions = currify((dir, options, t, name, ruleOptions) => {
    const full = join(dir, name);
    const [source, isTS] = readFixture(full);
    
    rmFixture(`${full}-fix`);
    
    const rule = parseRule(options);
    
    const rules = {
        [rule]: ['on', ruleOptions],
    };
    
    return noReportCode({
        isTS,
        ...options,
        rules,
    }, t, source);
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

function checkReport(name, message) {
    if (!message) {
        const help = `☝️ Looks like you forget to pass the 'message' for 'report()' operator`;
        const source = `report(name: string, message: string): Operator`;
        const values = {
            name,
            message,
        };
        
        throw Error(createError(help, source, values));
    }
}

function checkProgress(name, expected) {
    if (!isString(name)) {
        const message = `☝️ Looks like you forget to pass the 'name' of a fixture for 'progress()' operator.`;
        const signature = 'await progress(name: string, expected: ExpectedProgress): Operator';
        const values = {
            name,
            expected,
        };
        
        throw Error(message, signature, values);
    }
}
